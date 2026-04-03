import { Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import './LayoutNav.scss'

export function LayoutNav() {
  const userInfo = useUserStore((s) => s.userInfo)
  const clearUserInfo = useUserStore((s) => s.clearUserInfo)
  const navigate = useNavigate()

  return (
    <nav className="app-topnav">
      <div className="container">
        <ul>
          {userInfo.token ? (
            <>
              <li>
                <a href="#">
                  <i className="iconfont icon-user" />
                  {userInfo.account}
                </a>
              </li>
              <li>
                <Popconfirm
                  title="确认退出吗?"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={() => {
                    clearUserInfo()
                    navigate('/login')
                  }}
                >
                  <a href="#">退出登录</a>
                </Popconfirm>
              </li>
              <li>
                <Link to="/member/order">我的订单</Link>
              </li>
              <li>
                <Link to="/member">会员中心</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">请先登录</Link>
              </li>
              <li>
                <a href="#">帮助中心</a>
              </li>
              <li>
                <a href="#">关于我们</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
