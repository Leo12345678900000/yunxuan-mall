import { Link } from 'react-router-dom'
import { useCategoryStore } from '@/stores/categoryStore'
import './HomeCategory.scss'

export function HomeCategory() {
  const categoryList = useCategoryStore((s) => s.categoryList)
  return (
    <div className="home-category">
      <ul className="menu">
        {categoryList.map((item) => (
          <li key={item.id}>
            <Link to={`/category/${item.id}`}>{item.name}</Link>
            {item.children?.slice(0, 2).map((i) => (
              <Link key={i.id} to={`/category/sub/${i.id}`}>
                {i.name}
              </Link>
            ))}
            <div className="layer">
              <h4>
                分类推荐 <small>根据您的购买或浏览记录推荐</small>
              </h4>
              <ul>
                {item.goods?.map((i) => (
                  <li key={i.id}>
                    <Link to={`/detail/${i.id}`}>
                      <img src={i.picture} alt="" />
                      <div className="info">
                        <p className="name ellipsis-2">{i.name}</p>
                        <p className="desc ellipsis">{i.desc}</p>
                        <p className="price">
                          <i>¥</i>
                          {i.price}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
