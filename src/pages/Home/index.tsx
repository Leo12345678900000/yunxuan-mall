import { HomeCategory } from './HomeCategory'
import { HomeBanner } from './HomeBanner'
import { HomeNew } from './HomeNew'
import { HomeHot } from './HomeHot'
import { HomeProduct } from './HomeProduct'
import './index.scss'

export function HomePage() {
  return (
    <>
      <div className="container home-top">
        <HomeCategory />
        <HomeBanner />
      </div>
      <HomeNew />
      <HomeHot />
      <HomeProduct />
    </>
  )
}
