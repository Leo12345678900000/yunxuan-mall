import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHotAPI } from '@/apis/home'
import { HomePanel } from './HomePanel'
import { LazyImg } from '@/components/LazyImg'
import './HomeHot.scss'

export function HomeHot() {
  const [hotList, setHotList] = useState<
    { id: string; title: string; alt: string; picture: string }[]
  >([])
  useEffect(() => {
    getHotAPI()
      .then((res: { result: typeof hotList }) => setHotList(res.result ?? []))
      .catch(() => {})
  }, [])
  return (
    <div className="home-hot">
      <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
        <ul className="goods-list hot">
          {hotList.map((item) => (
            <li key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <LazyImg src={item.picture} alt="" />
                <p className="name">{item.title}</p>
                <p className="desc">{item.alt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </HomePanel>
    </div>
  )
}
