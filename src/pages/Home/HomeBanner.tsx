import { Carousel } from 'antd'
import { useEffect, useState } from 'react'
import { getBannerAPI } from '@/apis/home'
import './HomeBanner.scss'

export function HomeBanner() {
  const [bannerList, setBannerList] = useState<{ id: string; imgUrl: string }[]>([])
  useEffect(() => {
    getBannerAPI()
      .then((res: { result: { id: string; imgUrl: string }[] }) => {
        setBannerList(res.result ?? [])
      })
      .catch(() => {})
  }, [])
  return (
    <div className="home-banner">
      <Carousel autoplay dots>
        {bannerList.map((item) => (
          <div key={item.id}>
            <img src={item.imgUrl} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
