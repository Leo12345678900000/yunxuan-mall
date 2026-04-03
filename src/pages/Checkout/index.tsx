import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCheckInfoAPI, createOrderAPI } from '@/apis/checkout'
import { useCartStore } from '@/stores/cartStore'
import './index.scss'

type Addr = {
  id: string
  receiver: string
  contact: string
  fullLocation: string
  address: string
  isDefault: number
}

export function CheckoutPage() {
  const navigate = useNavigate()
  const updateNewList = useCartStore((s) => s.updateNewList)
  const [checkInfo, setCheckInfo] = useState<{
    userAddresses?: Addr[]
    goods?: {
      id: string
      skuId: string
      name: string
      picture: string
      attrsText?: string
      price: number
      count?: number
      totalPrice: number
      totalPayPrice: number
    }[]
    summary?: {
      goodsCount: number
      totalPrice: number
      postFee: number
      totalPayPrice: number
    }
  }>({})
  const [curAddress, setCurAddress] = useState<Addr | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [activeAddress, setActiveAddress] = useState<Addr | null>(null)

  useEffect(() => {
    getCheckInfoAPI()
      .then((res: { result: typeof checkInfo }) => {
        const data = res.result ?? {}
        setCheckInfo(data)
        const item = data.userAddresses?.find((a) => a.isDefault === 0)
        setCurAddress(item ?? null)
      })
      .catch(() => {})
  }, [])

  const confirmAddr = () => {
    if (activeAddress) setCurAddress(activeAddress)
    setShowDialog(false)
    setActiveAddress(null)
  }

  const createOrder = async () => {
    const res = (await createOrderAPI({
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      goods: checkInfo.goods?.map((item) => ({
        skuId: item.skuId,
        count: item.count ?? 1,
      })),
      addressId: curAddress?.id,
    })) as { result: { id: string } }
    navigate({ pathname: '/pay', search: `?id=${res.result.id}` })
    updateNewList()
  }

  return (
    <div className="xtx-pay-checkout-page">
      <div className="container">
        <div className="wrapper">
          <h3 className="box-title">收货地址</h3>
          <div className="box-body">
            <div className="address">
              <div className="text">
                {!curAddress ? (
                  <div className="none">您需要先添加收货地址才可提交订单。</div>
                ) : (
                  <ul>
                    <li>
                      <span>收 货 人：</span>
                      {curAddress.receiver}
                    </li>
                    <li>
                      <span>联系方式：</span>
                      {curAddress.contact}
                    </li>
                    <li>
                      <span>收货地址：</span>
                      {curAddress.fullLocation} {curAddress.address}
                    </li>
                  </ul>
                )}
              </div>
              <div className="action">
                <Button size="large" onClick={() => setShowDialog(true)}>
                  切换地址
                </Button>
                <Button size="large">添加地址</Button>
              </div>
            </div>
          </div>
          <h3 className="box-title">商品信息</h3>
          <div className="box-body">
            <table className="goods">
              <thead>
                <tr>
                  <th style={{ width: 520 }}>商品信息</th>
                  <th style={{ width: 170 }}>单价</th>
                  <th style={{ width: 170 }}>数量</th>
                  <th style={{ width: 170 }}>小计</th>
                  <th style={{ width: 170 }}>实付</th>
                </tr>
              </thead>
              <tbody>
                {checkInfo.goods?.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <a href="#" className="info">
                        <img src={i.picture} alt="" />
                        <div className="right">
                          <p>{i.name}</p>
                          <p>{i.attrsText}</p>
                        </div>
                      </a>
                    </td>
                    <td>&yen;{i.price}</td>
                    <td>{i.count ?? 1}</td>
                    <td>&yen;{i.totalPrice}</td>
                    <td>&yen;{i.totalPayPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="box-title">配送时间</h3>
          <div className="box-body">
            <a className="my-btn active" href="#">
              不限送货时间：周一至周日
            </a>
            <a className="my-btn" href="#">
              工作日送货：周一至周五
            </a>
            <a className="my-btn" href="#">
              双休日、假日送货：周六至周日
            </a>
          </div>
          <h3 className="box-title">支付方式</h3>
          <div className="box-body">
            <a className="my-btn active" href="#">
              在线支付
            </a>
            <a className="my-btn" href="#">
              货到付款
            </a>
            <span style={{ color: '#999' }}>货到付款需付5元手续费</span>
          </div>
          <h3 className="box-title">金额明细</h3>
          <div className="box-body">
            <div className="total">
              <dl>
                <dt>商品件数：</dt>
                <dd>{checkInfo.summary?.goodsCount}件</dd>
              </dl>
              <dl>
                <dt>商品总价：</dt>
                <dd>¥{checkInfo.summary?.totalPrice?.toFixed(2)}</dd>
              </dl>
              <dl>
                <dt>运 费：</dt>
                <dd>¥{checkInfo.summary?.postFee?.toFixed(2)}</dd>
              </dl>
              <dl>
                <dt>应付总额：</dt>
                <dd className="price">{checkInfo.summary?.totalPayPrice?.toFixed(2)}</dd>
              </dl>
            </div>
          </div>
          <div className="submit">
            <Button type="primary" size="large" onClick={createOrder}>
              提交订单
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="切换收货地址"
        open={showDialog}
        onCancel={() => setShowDialog(false)}
        onOk={confirmAddr}
        okText="确定"
        cancelText="取消"
        centered
      >
        <div className="addressWrapper">
          {checkInfo.userAddresses?.map((item) => (
            <div
              key={item.id}
              className={`text item ${activeAddress?.id === item.id ? 'active' : ''}`}
              onClick={() => setActiveAddress(item)}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              <ul>
                <li>
                  <span>收 货 人：</span>
                  {item.receiver}
                </li>
                <li>
                  <span>联系方式：</span>
                  {item.contact}
                </li>
                <li>
                  <span>收货地址：</span>
                  {item.fullLocation + item.address}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
