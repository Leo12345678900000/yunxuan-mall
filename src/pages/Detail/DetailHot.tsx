import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getHotGoodsAPI } from '@/apis/detail'
import './DetailHot.scss'

const TYPEMAP: Record<number, string> = {
  1: '24小时热榜',
  2: '周热榜',
}

export function DetailHot({ hotType }: { hotType: number }) {
  const { id } = useParams<{ id: string }>()
  const [hotList, setHotList] = useState<
    { id: string; name: string; desc?: string; picture: string; price: number }[]
  >([])

  useEffect(() => {
    if (!id) return
    getHotGoodsAPI({ id, type: hotType })
      .then((res: { result: typeof hotList }) => setHotList(res.result ?? []))
      .catch(() => {})
  }, [id, hotType])

  return (
    <div className="goods-hot">
      <h3>{TYPEMAP[hotType]}</h3>
      {hotList.map((item, index) => (
        <Link
          to={`/detail/${item.id}`}
          className="goods-item"
          key={`${hotType}-${item.id}-${index}`}
        >
          <img src={item.picture} alt="" />
          <p className="name ellipsis">{item.name}</p>
          <p className="desc ellipsis">{item.desc}</p>
          <p className="price">&yen;{item.price}</p>
        </Link>
      ))}
    </div>
  )
}
