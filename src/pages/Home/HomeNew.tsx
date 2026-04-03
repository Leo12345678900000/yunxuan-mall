import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { findNewAPI } from '@/apis/home'
import { HomePanel } from './HomePanel'
import './HomeNew.scss'

export function HomeNew() {
  const [newList, setNewList] = useState<
    { id: string; name: string; picture: string; price: number }[]
  >([])
  useEffect(() => {
    findNewAPI()
      .then((res: { result: typeof newList }) => setNewList(res.result ?? []))
      .catch(() => {})
  }, [])
  return (
    <div className="home-new">
      <HomePanel title="精选好物" subTitle="严选上架 品质靠谱">
        <ul className="goods-list">
          {newList.map((item) => (
            <li key={item.id}>
              <Link to={`/detail/${item.id}`}>
                <img src={item.picture} alt="" />
                <p className="name">{item.name}</p>
                <p className="price">&yen;{item.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </HomePanel>
    </div>
  )
}
