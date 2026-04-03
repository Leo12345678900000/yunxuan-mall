import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getOrderAPI } from '@/apis/pay'
import { useCountDown } from '@/hooks/useCountDown'
import { API_ORIGIN } from '@/utils/apiBase'
import './index.scss'

export function PayPage() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') ?? ''
  const [payInfo, setPayInfo] = useState<{ payMoney?: number; countdown?: number }>({})
  const { formatTime, start } = useCountDown()

  useEffect(() => {
    if (!id) return
    getOrderAPI(id)
      .then((res: { result: typeof payInfo & { countdown?: number } }) => {
        const r = res.result ?? {}
        setPayInfo(r)
        if (r.countdown != null) start(r.countdown)
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 仅订单 id 变化时拉取
  }, [id])

  const backURL = `${window.location.origin}/paycallback`
  const payUrl = `${API_ORIGIN}/pay/aliPay?orderId=${id}&redirect=${encodeURIComponent(backURL)}`

  return (
    <div className="xtx-pay-page">
      <div className="container">
        <div className="pay-info">
          <span className="icon iconfont icon-queren2" />
          <div className="tip">
            <p>订单提交成功！请尽快完成支付。</p>
            <p>
              支付还剩 <span>{formatTime}</span>, 超时后将取消订单
            </p>
          </div>
          <div className="amount">
            <span>应付总额：</span>
            <span>¥{payInfo.payMoney?.toFixed(2)}</span>
          </div>
        </div>
        <div className="pay-type">
          <p className="head">选择以下支付方式付款</p>
          <div className="item">
            <p>支付平台</p>
            <a className="btn wx" href="#" />
            <a className="btn alipay" href={payUrl} />
          </div>
          <div className="item">
            <p>支付方式</p>
            <a className="btn" href="#">
              招商银行
            </a>
            <a className="btn" href="#">
              工商银行
            </a>
            <a className="btn" href="#">
              建设银行
            </a>
            <a className="btn" href="#">
              农业银行
            </a>
            <a className="btn" href="#">
              交通银行
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
