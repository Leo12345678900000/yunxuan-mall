import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useCategoryStore } from '@/stores/categoryStore'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { LayoutFixed } from './LayoutFixed'
import { LayoutNav } from './LayoutNav'
import { LayoutHeader } from './LayoutHeader'
import { LayoutFooter } from './LayoutFooter'

/** 已登录时从服务端拉取购物车（刷新页面后也需要，否则只有本地 persist 的旧数据） */
function syncServerCartIfLoggedIn() {
  const token = useUserStore.getState().userInfo?.token
  if (!token) return
  useCartStore
    .getState()
    .updateNewList()
    .catch(() => {
      /* 网络/CORS/401 时保留本地列表，避免静默清空 */
    })
}

export function Layout() {
  const getCategory = useCategoryStore((s) => s.getCategory)
  useEffect(() => {
    getCategory()
  }, [getCategory])

  // persist 从 localStorage 恢复完 token 后再请求 /member/cart，否则会没带 Authorization
  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      syncServerCartIfLoggedIn()
    }
    return useUserStore.persist.onFinishHydration(() => {
      syncServerCartIfLoggedIn()
    })
  }, [])
  return (
    <>
      <LayoutFixed />
      <LayoutNav />
      <LayoutHeader />
      <Outlet />
      <LayoutFooter />
    </>
  )
}
