import type { ReactNode } from 'react'
import './HomePanel.scss'

export function HomePanel({
  title,
  subTitle,
  children,
}: {
  title: string
  subTitle?: string
  children: ReactNode
}) {
  return (
    <div className="home-panel">
      <div className="container">
        <div className="head">
          <h3>
            {title}
            {subTitle && <small>{subTitle}</small>}
          </h3>
        </div>
        {children}
      </div>
    </div>
  )
}
