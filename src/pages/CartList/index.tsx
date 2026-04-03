import { Button, Checkbox, Empty, InputNumber, Popconfirm } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useShallow } from 'zustand/react/shallow'
import { useCartStore, selectCartStats } from '@/stores/cartStore'
import './index.scss'

export function CartListPage() {
  const cartList = useCartStore((s) => s.cartList)
  const singleCheck = useCartStore((s) => s.singleCheck)
  const allCheck = useCartStore((s) => s.allCheck)
  const delCart = useCartStore((s) => s.delCart)
  const patchItemCount = useCartStore((s) => s.patchItemCount)
  const stats = useCartStore(useShallow(selectCartStats))
  const navigate = useNavigate()

  return (
    <div className="xtx-cart-page">
      <div className="container m-top-20">
        <div className="cart">
          <table>
            <thead>
              <tr>
                <th style={{ width: 120 }}>
                  <Checkbox
                    checked={stats.isAll}
                    indeterminate={stats.selectedCount > 0 && !stats.isAll}
                    onChange={(e) => allCheck(e.target.checked)}
                  />
                </th>
                <th style={{ width: 400 }}>商品信息</th>
                <th style={{ width: 220 }}>单价</th>
                <th style={{ width: 180 }}>数量</th>
                <th style={{ width: 180 }}>小计</th>
                <th style={{ width: 140 }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((i) => (
                <tr key={i.skuId}>
                  <td>
                    <Checkbox
                      checked={i.selected}
                      onChange={(e) => singleCheck(i.skuId, e.target.checked)}
                    />
                  </td>
                  <td>
                    <div className="goods">
                      <Link to={i.id ? `/detail/${i.id}` : '/'}>
                        <img src={i.picture} alt="" />
                      </Link>
                      <div>
                        <p className="name ellipsis">{i.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="tc">
                    <p>&yen;{i.price}</p>
                  </td>
                  <td className="tc">
                    <InputNumber
                      min={1}
                      value={i.count}
                      onChange={(v) => patchItemCount(i.skuId, Number(v) || 1)}
                    />
                  </td>
                  <td className="tc">
                    <p className="f16 red">&yen;{(i.price * i.count).toFixed(2)}</p>
                  </td>
                  <td className="tc">
                    <Popconfirm title="确认删除吗?" onConfirm={() => delCart(i.skuId)}>
                      <a href="#">删除</a>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
              {cartList.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="cart-none">
                      <Empty description="购物车列表为空">
                        <Button type="primary" onClick={() => navigate('/')}>
                          随便逛逛
                        </Button>
                      </Empty>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="action">
          <div className="batch">
            共 {stats.allCount} 件商品，已选择 {stats.selectedCount} 件，商品合计：
            <span className="red">¥ {stats.selectedPrice.toFixed(2)} </span>
          </div>
          <div className="total">
            <Button type="primary" size="large" onClick={() => navigate('/checkout')}>
              下单结算
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
