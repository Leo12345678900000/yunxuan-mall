import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutHeaderUl } from './LayoutHeaderUl'
import './LayoutFixed.scss'

export function LayoutFixed() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const onScroll = () => setY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`app-header-sticky ${y > 78 ? 'show' : ''}`}>
      <div className="container">
        <Link className="logo" to="/" />
        <LayoutHeaderUl />
        <div className="right">
          <Link to="/">品牌</Link>
          <Link to="/">专题</Link>
        </div>
      </div>
    </div>
  )
}
