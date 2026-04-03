import { useEffect, useState } from 'react'
import { getLikeListAPI } from '@/apis/user'
import { useUserStore } from '@/stores/userStore'
import { GoodsItem } from '@/components/GoodsItem'
import './UserInfo.scss'

export function UserInfoPage() {
  const userInfo = useUserStore((s) => s.userInfo)
  const [likeList, setLikeList] = useState<
    { id: string; name: string; desc?: string; picture: string; price: number }[]
  >([])

  useEffect(() => {
    getLikeListAPI({ limit: 4 })
      .then((res: { result: typeof likeList }) => {
        setLikeList(res.result ?? [])
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <div className="home-overview">
        <div className="user-meta">
          <div className="avatar">
            <img src={userInfo.avatar as string} alt="" />
          </div>
          <h4>{userInfo.account}</h4>
        </div>
        <div className="item">
          <a href="#">
            <span className="iconfont icon-hy" />
            <p>会员中心</p>
          </a>
          <a href="#">
            <span className="iconfont icon-aq" />
            <p>安全设置</p>
          </a>
          <a href="#">
            <span className="iconfont icon-dw" />
            <p>地址管理</p>
          </a>
        </div>
      </div>
      <div className="like-container">
        <div className="home-panel">
          <div className="header">
            <h4>猜你喜欢</h4>
          </div>
          <div className="goods-list">
            {likeList.map((good) => (
              <GoodsItem key={good.id} goods={good} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
