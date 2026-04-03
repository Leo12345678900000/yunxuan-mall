import { Breadcrumb, Tabs } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { GoodsItem } from '@/components/GoodsItem'
import './index.scss'

export function SubCategoryPage() {
  const { id } = useParams<{ id: string }>()
  const [categoryData, setCategoryData] = useState<{
    parentId?: string
    parentName?: string
    name?: string
  }>({})
  const [goodList, setGoodList] = useState<
    { id: string; name: string; desc?: string; picture: string; price: number }[]
  >([])
  const [sortField, setSortField] = useState('publishTime')
  const [noMore, setNoMore] = useState(false)
  const pageRef = useRef(1)
  const loadingRef = useRef(false)
  const readyRef = useRef(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const fetchPage = useCallback(
    async (page: number, append: boolean) => {
      if (!id || loadingRef.current) return undefined
      loadingRef.current = true
      try {
        const res = (await getSubCategoryAPI({
          categoryId: id,
          page,
          pageSize: 20,
          sortField,
        })) as { result: { items: typeof goodList } }
        const items = res.result?.items ?? []
        if (append) {
          setGoodList((prev) => [...prev, ...items])
        } else {
          setGoodList(items)
        }
        setNoMore(items.length === 0)
      } catch {
        /* http 已提示 */
      } finally {
        loadingRef.current = false
      }
    },
    [id, sortField]
  )

  useEffect(() => {
    if (!id) return
    getCategoryFilterAPI(id)
      .then((res: { result: typeof categoryData }) => {
        setCategoryData(res.result ?? {})
      })
      .catch(() => {})
  }, [id])

  useEffect(() => {
    if (!id) return
    readyRef.current = false
    pageRef.current = 1
    setNoMore(false)
    fetchPage(1, false).finally(() => {
      readyRef.current = true
    })
  }, [id, sortField, fetchPage])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const ob = new IntersectionObserver(
      (entries) => {
        if (!readyRef.current || !entries[0].isIntersecting || noMore || loadingRef.current) return
        pageRef.current += 1
        fetchPage(pageRef.current, true)
      },
      { rootMargin: '120px' }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [noMore, fetchPage])

  const onTabChange = (key: string) => {
    setSortField(key)
    pageRef.current = 1
  }

  return (
    <div className="container">
      <div className="bread-container">
        <Breadcrumb
          items={[
            { title: <Link to="/">首页</Link> },
            {
              title: (
                <Link to={`/category/${categoryData.parentId ?? ''}`}>
                  {categoryData.parentName}
                </Link>
              ),
            },
            { title: categoryData.name ?? '' },
          ]}
        />
      </div>
      <div className="sub-container">
        <Tabs
          activeKey={sortField}
          onChange={onTabChange}
          items={[
            { key: 'publishTime', label: '最新商品' },
            { key: 'orderNum', label: '最高人气' },
            { key: 'evaluateNum', label: '评论最多' },
          ]}
        />
        <div className="body sub-goods">
          {goodList.map((goods) => (
            <GoodsItem key={`${goods.id}-${goods.picture}`} goods={goods} />
          ))}
          <div ref={sentinelRef} className="sentinel" />
        </div>
      </div>
    </div>
  )
}
