import { App as AntdApp, ConfigProvider } from 'antd'
import { FeedbackMessageBridge } from '@/components/FeedbackMessageBridge'
import zhCN from 'antd/locale/zh_CN'
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/Home'
import { CategoryPage } from '@/pages/Category'
import { SubCategoryPage } from '@/pages/SubCategory'
import { DetailPage } from '@/pages/Detail'
import { CartListPage } from '@/pages/CartList'
import { CheckoutPage } from '@/pages/Checkout'
import { PayPage } from '@/pages/Pay'
import { PayBackPage } from '@/pages/Pay/PayBack'
import { LoginPage } from '@/pages/Login'
import { MemberLayout } from '@/pages/Member'
import { UserInfoPage } from '@/pages/Member/UserInfo'
import { UserOrderPage } from '@/pages/Member/UserOrder'
import { RequireAuth } from '@/components/RequireAuth'

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Layout />,
          children: [
            { index: true, element: <HomePage /> },
            { path: 'category/:id', element: <CategoryPage /> },
            { path: 'category/sub/:id', element: <SubCategoryPage /> },
            { path: 'detail/:id', element: <DetailPage /> },
            { path: 'cartlist', element: <CartListPage /> },
            {
              path: 'checkout',
              element: (
                <RequireAuth>
                  <CheckoutPage />
                </RequireAuth>
              ),
            },
            {
              path: 'pay',
              element: (
                <RequireAuth>
                  <PayPage />
                </RequireAuth>
              ),
            },
            { path: 'paycallback', element: <PayBackPage /> },
            {
              path: 'member',
              element: (
                <RequireAuth>
                  <MemberLayout />
                </RequireAuth>
              ),
              children: [
                { index: true, element: <UserInfoPage /> },
                { path: 'order', element: <UserOrderPage /> },
              ],
            },
          ],
        },
        { path: '/login', element: <LoginPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
)

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#2563eb',
        },
      }}
    >
      <AntdApp>
        <FeedbackMessageBridge />
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </AntdApp>
    </ConfigProvider>
  )
}
