import { Button, Empty, Pagination, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { getUserOrder } from '@/apis/order'
import './UserOrder.scss'

const TAB_ORDER_STATE = [0, 1, 2, 3, 4, 5, 6]

const tabTypes = [
  { label: '全部订单' },
  { label: '待付款' },
  { label: '待发货' },
  { label: '待收货' },
  { label: '待评价' },
  { label: '已完成' },
  { label: '已取消' },
]

function formatPayState(payState: number) {
  const stateMap: Record<number, string> = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '待评价',
    5: '已完成',
    6: '已取消',
  }
  return stateMap[payState] ?? ''
}

export function UserOrderPage() {
  const [orderList, setOrderList] = useState<
    {
      id: string
      createTime: string
      orderState: number
      countdown?: number
      payMoney?: number
      postFee?: number
      skus: {
        id: string
        image: string
        name: string
        attrsText?: string
        realPay?: number
        quantity: number
      }[]
    }[]
  >([])
  const [total, setTotal] = useState(0)
  const [params, setParams] = useState({ orderState: 0, page: 1, pageSize: 2 })

  useEffect(() => {
    getUserOrder(params)
      .then((res: { result: { items: typeof orderList; counts: number } }) => {
        setOrderList(res.result?.items ?? [])
        setTotal(res.result?.counts ?? 0)
      })
      .catch(() => {})
  }, [params])

  return (
    <div className="order-container">
      <Tabs
        activeKey={String(params.orderState)}
        onChange={(key) => setParams((p) => ({ ...p, orderState: Number(key), page: 1 }))}
        items={TAB_ORDER_STATE.map((state, i) => ({
          key: String(state),
          label: tabTypes[i].label,
        }))}
      />
      <div className="main-container">
        {orderList.length === 0 ? (
          <div className="holder-container">
            <Empty description="暂无订单数据" />
          </div>
        ) : (
          <>
            {orderList.map((order) => (
              <div className="order-item" key={order.id}>
                <div className="head">
                  <span>下单时间：{order.createTime}</span>
                  <span>订单编号：{order.id}</span>
                  {order.orderState === 1 && (
                    <span className="down-time">
                      <i className="iconfont icon-down-time" />
                      <b>付款截止: {order.countdown}</b>
                    </span>
                  )}
                </div>
                <div className="body">
                  <div className="column goods">
                    <ul>
                      {order.skus.map((item) => (
                        <li key={item.id}>
                          <a className="image" href="#">
                            <img src={item.image} alt="" />
                          </a>
                          <div className="info">
                            <p className="name ellipsis-2">{item.name}</p>
                            <p className="attr ellipsis">
                              <span>{item.attrsText}</span>
                            </p>
                          </div>
                          <div className="price">¥{item.realPay?.toFixed(2)}</div>
                          <div className="count">x{item.quantity}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="column state">
                    <p>{formatPayState(order.orderState)}</p>
                    {order.orderState === 3 && (
                      <p>
                        <a href="#" className="green">
                          查看物流
                        </a>
                      </p>
                    )}
                    {order.orderState === 4 && (
                      <p>
                        <a href="#" className="green">
                          评价商品
                        </a>
                      </p>
                    )}
                    {order.orderState === 5 && (
                      <p>
                        <a href="#" className="green">
                          查看评价
                        </a>
                      </p>
                    )}
                  </div>
                  <div className="column amount">
                    <p className="red">¥{order.payMoney?.toFixed(2)}</p>
                    <p>（含运费：¥{order.postFee?.toFixed(2)}）</p>
                    <p>在线支付</p>
                  </div>
                  <div className="column action">
                    {order.orderState === 1 && (
                      <Button type="primary" size="small">
                        立即付款
                      </Button>
                    )}
                    {order.orderState === 3 && (
                      <Button type="primary" size="small">
                        确认收货
                      </Button>
                    )}
                    <p>
                      <a href="#">查看详情</a>
                    </p>
                    {[2, 3, 4, 5].includes(order.orderState) && (
                      <p>
                        <a href="#">再次购买</a>
                      </p>
                    )}
                    {[4, 5].includes(order.orderState) && (
                      <p>
                        <a href="#">申请售后</a>
                      </p>
                    )}
                    {order.orderState === 1 && (
                      <p>
                        <a href="#">取消订单</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className="pagination-container">
              <Pagination
                total={total}
                pageSize={params.pageSize}
                current={params.page}
                onChange={(page) => setParams((p) => ({ ...p, page }))}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
