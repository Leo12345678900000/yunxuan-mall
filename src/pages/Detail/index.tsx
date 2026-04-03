import { App, Breadcrumb, Button, InputNumber } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { getDetail } from '@/apis/detail'
import { ImageView } from '@/components/ImageView'
import { GoodsSku, type SkuPayload } from '@/components/GoodsSku'
import { useCartStore } from '@/stores/cartStore'
import { DetailHot } from './DetailHot'
import './index.scss'

export function DetailPage() {
  const { message } = App.useApp()
  const { id } = useParams<{ id: string }>()
  const [goods, setGoods] = useState<Record<string, unknown>>({})
  const [count, setCount] = useState(1)
  const skuRef = useRef<SkuPayload | Record<string, never>>({})
  const addCart = useCartStore((s) => s.addCart)

  useEffect(() => {
    if (!id) return
    getDetail(id)
      .then((res: { result: Record<string, unknown> }) => {
        setGoods(res.result ?? {})
      })
      .catch(() => {
        /* 错误提示由 http 拦截器处理，避免未捕获的 Promise */
      })
  }, [id])

  const categories = goods.categories as { id: string; name: string }[] | undefined
  const details = goods.details as
    | { properties?: { name: string; value: string }[]; pictures?: string[] }
    | undefined
  const brand = goods.brand as { name?: string } | undefined
  const mainPictures = (goods.mainPictures as string[]) ?? []

  const onSkuChange = (sku: SkuPayload | Record<string, never>) => {
    skuRef.current = sku
  }

  const handleAddCart = () => {
    const skuObj = skuRef.current as SkuPayload
    if (skuObj?.skuId) {
      addCart({
        id: goods.id as string,
        name: goods.name as string,
        picture: mainPictures[0],
        price: goods.price as number,
        count,
        skuId: skuObj.skuId,
        attrsText: skuObj.specsText,
        selected: true,
      })
    } else {
      message.warning('请选择规格')
    }
  }

  if (!details) {
    return null
  }

  return (
    <div className="xtx-goods-page">
      <div className="container">
        <div className="bread-container">
          <Breadcrumb
            items={[
              { title: <Link to="/">首页</Link> },
              {
                title: (
                  <Link to={`/category/${categories?.[1]?.id ?? ''}`}>{categories?.[1]?.name}</Link>
                ),
              },
              {
                title: (
                  <Link to={`/category/sub/${categories?.[0]?.id ?? ''}`}>
                    {categories?.[0]?.name}
                  </Link>
                ),
              },
              { title: (goods.name as string) ?? '' },
            ]}
          />
        </div>
        <div className="info-container">
          <div className="goods-info">
            <div className="media">
              <ImageView imageList={mainPictures} />
              <ul className="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p>{(goods.salesCount as number) ?? 0}+</p>
                  <p>
                    <i className="iconfont icon-task-filling" />
                    销量人气
                  </p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{(goods.commentCount as number) ?? 0}+</p>
                  <p>
                    <i className="iconfont icon-comment-filling" />
                    查看评价
                  </p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{(goods.collectCount as number) ?? 0}+</p>
                  <p>
                    <i className="iconfont icon-favorite-filling" />
                    收藏商品
                  </p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{brand?.name}</p>
                  <p>
                    <i className="iconfont icon-dynamic-filling" />
                    品牌主页
                  </p>
                </li>
              </ul>
            </div>
            <div className="spec">
              <p className="g-name">{goods.name as string}</p>
              <p className="g-desc">{goods.desc as string}</p>
              <p className="g-price">
                <span>{goods.oldPrice as number}</span>
                <span>{goods.price as number}</span>
              </p>
              <div className="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="#">了解详情</a>
                  </dd>
                </dl>
              </div>
              <GoodsSku
                goods={{
                  specs: goods.specs as never,
                  skus: goods.skus as never,
                }}
                onChange={onSkuChange}
              />
              <InputNumber min={1} value={count} onChange={(v) => setCount(Number(v) || 1)} />
              <div>
                <Button type="primary" size="large" className="btn" onClick={handleAddCart}>
                  加入购物车
                </Button>
              </div>
            </div>
          </div>
          <div className="goods-footer">
            <div className="goods-article">
              <div className="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div className="goods-detail">
                  <ul className="attrs">
                    {details.properties?.map((item) => (
                      <li key={item.value}>
                        <span className="dt">{item.name}</span>
                        <span className="dd">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                  {details.pictures?.map((img) => (
                    <img src={img} key={img} alt="" />
                  ))}
                </div>
              </div>
            </div>
            <div className="goods-aside">
              <DetailHot hotType={1} />
              <DetailHot hotType={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
