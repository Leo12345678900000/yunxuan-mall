import { NavLink, Outlet } from 'react-router-dom'
import './index.scss'

export function MemberLayout() {
  return (
    <div className="member-container container">
      <div className="xtx-member-aside">
        <div className="user-manage">
          <h4>我的账户</h4>
          <div className="links">
            <NavLink to="/member" end>
              个人中心
            </NavLink>
          </div>
          <h4>交易管理</h4>
          <div className="links">
            <NavLink to="/member/order">我的订单</NavLink>
          </div>
        </div>
      </div>
      <div className="article">
        <Outlet />
      </div>
    </div>
  )
}
