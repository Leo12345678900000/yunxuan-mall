import { Spin } from 'antd'
import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'

/**
 * 需登录页面：等待 user persist 从 localStorage 恢复后再判断，避免误判未登录
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(() => useUserStore.persist.hasHydrated())
  useEffect(() => {
    return useUserStore.persist.onFinishHydration(() => setHydrated(true))
  }, [])
  const token = useUserStore((s) => s.userInfo?.token)
  const location = useLocation()

  if (!hydrated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
        <Spin size="large" />
      </div>
    )
  }
  if (!token) {
    return (
      <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
    )
  }
  return <>{children}</>
}
