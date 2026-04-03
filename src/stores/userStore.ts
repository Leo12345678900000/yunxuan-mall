import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '@/types'
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'
import { useCartStore } from '@/stores/cartStore'

interface UserState {
  userInfo: UserInfo
  getUserInfo: (p: { account: string; password: string }) => Promise<void>
  clearUserInfo: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: {},
      getUserInfo: async ({ account, password }) => {
        const res = (await loginAPI({ account, password })) as { result: UserInfo }
        set({ userInfo: res.result })
        try {
          const cartList = useCartStore.getState().cartList
          if (cartList.length > 0) {
            await mergeCartAPI(
              cartList.map((item) => ({
                skuId: item.skuId,
                selected: item.selected,
                count: item.count,
              }))
            )
          }
          await useCartStore.getState().updateNewList()
        } catch {
          /* 合并/拉取购物车失败不撤销登录，与可继续浏览一致 */
        }
      },
      clearUserInfo: () => {
        set({ userInfo: {} })
        useCartStore.getState().clearCart()
      },
    }),
    { name: 'yunxuan-user' }
  )
)
