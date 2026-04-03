import { NavLink } from 'react-router-dom'
import { useCategoryStore } from '@/stores/categoryStore'
import './LayoutHeaderUl.scss'

export function LayoutHeaderUl() {
  const categoryList = useCategoryStore((s) => s.categoryList)
  return (
    <ul className="app-header-nav">
      <li className="home">
        <NavLink to="/" end>
          首页
        </NavLink>
      </li>
      {categoryList.map((item) => (
        <li className="home" key={item.id}>
          <NavLink to={`/category/${item.id}`}>{item.name}</NavLink>
        </li>
      ))}
    </ul>
  )
}
