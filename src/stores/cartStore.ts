import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

interface CartState {
  cartList: CartItem[]
  updateNewList: () => Promise<void>
  addCart: (goods: CartItem) => Promise<void>
  delCart: (skuId: string) => Promise<void>
  clearCart: () => void
  singleCheck: (skuId: string, selected: boolean) => void
  allCheck: (selected: boolean) => void
  setCartList: (list: CartItem[]) => void
  patchItemCount: (skuId: string, count: number) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartList: [],
      updateNewList: async () => {
        const res = (await findNewCartListAPI()) as { result: CartItem[] }
        set({ cartList: res.result ?? [] })
      },
      addCart: async (goods) => {
        const { useUserStore } = await import('@/stores/userStore')
        const token = useUserStore.getState().userInfo?.token
        const { skuId, count } = goods
        if (token) {
          await insertCartAPI({ skuId, count })
          await get().updateNewList()
        } else {
          const list = [...get().cartList]
          const item = list.find((i) => i.skuId === goods.skuId)
          if (item) {
            set({
              cartList: list.map((i) =>
                i.skuId === goods.skuId ? { ...i, count: i.count + 1 } : i
              ),
            })
          } else {
            set({ cartList: [...list, goods] })
          }
        }
      },
      delCart: async (skuId) => {
        const { useUserStore } = await import('@/stores/userStore')
        const token = useUserStore.getState().userInfo?.token
        if (token) {
          await delCartAPI([skuId])
          await get().updateNewList()
        } else {
          set({
            cartList: get().cartList.filter((i) => i.skuId !== skuId),
          })
        }
      },
      clearCart: () => set({ cartList: [] }),
      singleCheck: (skuId, selected) => {
        const list = get().cartList
        if (!list.some((item) => item.skuId === skuId)) return
        set({
          cartList: list.map((item) => (item.skuId === skuId ? { ...item, selected } : item)),
        })
      },
      allCheck: (selected) => {
        set({
          cartList: get().cartList.map((item) => ({ ...item, selected })),
        })
      },
      setCartList: (list) => set({ cartList: list }),
      patchItemCount: (skuId, count) => {
        const list = get().cartList
        if (!list.some((item) => item.skuId === skuId)) return
        set({
          cartList: list.map((item) => (item.skuId === skuId ? { ...item, count } : item)),
        })
      },
    }),
    { name: 'yunxuan-cart' }
  )
)

export const selectCartStats = (s: CartState) => ({
  allCount: s.cartList.reduce((a, c) => a + c.count, 0),
  allPrice: s.cartList.reduce((a, c) => a + c.count * c.price, 0),
  selectedCount: s.cartList.filter((i) => i.selected).reduce((a, c) => a + c.count, 0),
  selectedPrice: s.cartList.filter((i) => i.selected).reduce((a, c) => a + c.count * c.price, 0),
  isAll: s.cartList.length > 0 && s.cartList.every((i) => i.selected),
})
