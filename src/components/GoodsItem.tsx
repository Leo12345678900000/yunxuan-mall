import { Link } from 'react-router-dom'
import { LazyImg } from '@/components/LazyImg'
import './GoodsItem.scss'

export function GoodsItem({
  goods,
  lazy = false,
}: {
  goods: { id: string; name: string; desc?: string; picture: string; price: number }
  /** 为 true 时使用懒加载图片（首页商品区） */
  lazy?: boolean
}) {
  return (
    <Link to={`/detail/${goods.id}`} className="goods-item">
      {lazy ? <LazyImg src={goods.picture} alt="" /> : <img src={goods.picture} alt="" />}
      <p className="name ellipsis">{goods.name}</p>
      {goods.desc != null && <p className="desc ellipsis">{goods.desc}</p>}
      <p className="price">&yen;{goods.price}</p>
    </Link>
  )
}
