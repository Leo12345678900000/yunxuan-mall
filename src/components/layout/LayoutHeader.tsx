import { Link } from 'react-router-dom'
import { LayoutHeaderUl } from './LayoutHeaderUl'
import { HeaderCart } from './HeaderCart'
import './LayoutHeader.scss'

export function LayoutHeader() {
  return (
    <header className="app-header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">云选优品</Link>
        </h1>
        <LayoutHeaderUl />
        <div className="search">
          <i className="iconfont icon-search" />
          <input type="text" placeholder="搜一搜" />
        </div>
        <HeaderCart />
      </div>
    </header>
  )
}
