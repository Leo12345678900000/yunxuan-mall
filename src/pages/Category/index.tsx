import { Breadcrumb, Carousel } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getBannerAPI } from '@/apis/home'
import { getCategoryAPI } from '@/apis/category'
import { GoodsItem } from '@/components/GoodsItem'
import './index.scss'

type Child = {
  id: string
  name: string
  picture: string
  goods?: { id: string; name: string; desc?: string; picture: string; price: number }[]
}

export function CategoryPage() {
  const { id } = useParams<{ id: string }>()
  const [bannerList, setBannerList] = useState<{ id: string; imgUrl: string }[]>([])
  const [categoryData, setCategoryData] = useState<{
    name?: string
    children?: Child[]
  }>({})

  useEffect(() => {
    getBannerAPI({ distributionSite: '2' })
      .then((res: { result: typeof bannerList }) => {
        setBannerList(res.result ?? [])
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!id) return
    getCategoryAPI(id)
      .then((res: { result: typeof categoryData }) => {
        setCategoryData(res.result ?? {})
      })
      .catch(() => {})
  }, [id])

  return (
    <div className="top-category">
      <div className="container m-top-20">
        <div className="bread-container">
          <Breadcrumb
            items={[{ title: <Link to="/">首页</Link> }, { title: categoryData.name ?? '' }]}
          />
        </div>
        <div className="home-banner">
          <Carousel autoplay>
            {bannerList.map((item) => (
              <div key={item.id}>
                <img src={item.imgUrl} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="sub-list">
          <h3>全部分类</h3>
          <ul>
            {categoryData.children?.map((i) => (
              <li key={i.id}>
                <Link to={`/category/sub/${i.id}`}>
                  <img src={i.picture} alt="" />
                  <p>{i.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {categoryData.children?.map((item) => (
          <div className="ref-goods" key={item.id}>
            <div className="head">
              <h3>- {item.name} -</h3>
            </div>
            <div className="body">
              {item.goods?.map((good) => (
                <GoodsItem key={good.id} goods={good} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
