import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getOrderAPI } from '@/apis/pay'
import './PayBack.scss'

export function PayBackPage() {
  const [searchParams] = useSearchParams()
  const orderId = searchParams.get('orderId') ?? searchParams.get('id') ?? ''
  const payResult = searchParams.get('payResult') === 'true'
  const [orderInfo, setOrderInfo] = useState<{ payMoney?: number }>({})

  useEffect(() => {
    if (!orderId) return
    getOrderAPI(orderId)
      .then((res: { result: typeof orderInfo }) => {
        setOrderInfo(res.result ?? {})
      })
      .catch(() => {})
  }, [orderId])

  return (
    <div className="xtx-pay-page">
      <div className="container">
        <div className="pay-result">
          <span className={`iconfont ${payResult ? 'icon-queren2 green' : 'icon-shanchu red'}`} />
          <p className="tit">支付{payResult ? '成功' : '失败'}</p>
          <p className="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
          <p>
            支付方式：<span>支付宝</span>
          </p>
          <p>
            支付金额：<span>¥{orderInfo.payMoney?.toFixed(2)}</span>
          </p>
          <div className="btn">
            <Link to="/member/order">
              <Button type="primary" style={{ marginRight: 20 }}>
                查看订单
              </Button>
            </Link>
            <Link to="/">
              <Button>进入首页</Button>
            </Link>
          </div>
          <p className="alert">
            <span className="iconfont icon-tip" />
            温馨提示：云选优品不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
          </p>
        </div>
      </div>
    </div>
  )
}
