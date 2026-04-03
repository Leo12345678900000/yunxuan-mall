import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getGoodsAPI } from '@/apis/home'
import { HomePanel } from './HomePanel'
import { GoodsItem } from '@/components/GoodsItem'
import { LazyImg } from '@/components/LazyImg'
import './HomeProduct.scss'

type Cate = {
  id: string
  name: string
  picture: string
  saleInfo: string
  goods: { id: string; name: string; desc?: string; picture: string; price: number }[]
}

export function HomeProduct() {
  const [goodsProduct, setGoodsProduct] = useState<Cate[]>([])
  useEffect(() => {
    getGoodsAPI()
      .then((res: { result: Cate[] }) => setGoodsProduct(res.result ?? []))
      .catch(() => {})
  }, [])
  return (
    <div className="home-product">
      {goodsProduct.map((cate) => (
        <HomePanel key={cate.id} title={cate.name}>
          <div className="box">
            <Link className="cover" to={`/category/${cate.id}`}>
              <LazyImg src={cate.picture} alt="" />
              <strong className="label">
                <span>{cate.name}馆</span>
                <span>{cate.saleInfo}</span>
              </strong>
            </Link>
            <ul className="goods-list">
              {cate.goods.map((goods) => (
                <li key={goods.id}>
                  <GoodsItem goods={goods} lazy />
                </li>
              ))}
            </ul>
          </div>
        </HomePanel>
      ))}
    </div>
  )
}
