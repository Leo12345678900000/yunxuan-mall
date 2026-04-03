import { Button, Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useCartStore, selectCartStats } from '@/stores/cartStore'
import './HeaderCart.scss'

export function HeaderCart() {
  const cartList = useCartStore((s) => s.cartList)
  const delCart = useCartStore((s) => s.delCart)
  const stats = useCartStore(useShallow(selectCartStats))
  const navigate = useNavigate()

  return (
    <div className="header-cart">
      <a className="curr" href="#">
        <i className="iconfont icon-cart" />
        <em>{cartList.length}</em>
      </a>
      <div className="layer">
        <div className="list">
          {cartList.map((i) => (
            <div className="item" key={i.skuId}>
              <Link to="/cartlist">
                <img src={i.picture} alt="" />
                <div className="center">
                  <p className="name ellipsis-2">{i.name}</p>
                  <p className="attr ellipsis">{i.attrsText}</p>
                </div>
                <div className="right">
                  <p className="price">&yen;{i.price}</p>
                  <p className="count">x{i.count}</p>
                </div>
              </Link>
              <Popconfirm title="确认删除吗?" onConfirm={() => delCart(i.skuId)}>
                <i
                  className="iconfont icon-close-new"
                  onClick={(e) => e.preventDefault()}
                  onKeyDown={(e) => e.preventDefault()}
                  role="button"
                  tabIndex={0}
                />
              </Popconfirm>
            </div>
          ))}
        </div>
        <div className="foot">
          <div className="total">
            <p>共 {stats.allCount} 件商品</p>
            <p>&yen; {stats.allPrice.toFixed(2)} </p>
          </div>
          <Button type="primary" size="large" onClick={() => navigate('/cartlist')}>
            去购物车结算
          </Button>
        </div>
      </div>
    </div>
  )
}
