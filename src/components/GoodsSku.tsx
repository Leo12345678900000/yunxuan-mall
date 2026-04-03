import { useCallback, useEffect, useMemo, useState } from 'react'
import getPowerSet from '@/components/power-set'
import './GoodsSku.scss'

const spliter = '★'

type SpecVal = {
  name: string
  picture?: string
  selected?: boolean
  disabled?: boolean
}
type Spec = { id: string; name: string; values: SpecVal[] }
type Sku = {
  id: string
  inventory: number
  specs: { name?: string; valueName: string }[]
  price: number
  oldPrice: number
}

function getPathMap(skus: Sku[]) {
  const pathMap: Record<string, string[]> = {}
  if (!skus?.length) return pathMap
  skus.forEach((sku) => {
    if (sku.inventory) {
      const specs = sku.specs.map((s) => s.valueName)
      const powerSet = getPowerSet(specs)
      powerSet.forEach((set) => {
        const key = set.join(spliter)
        if (!pathMap[key]) pathMap[key] = []
        pathMap[key].push(sku.id)
      })
    }
  })
  return pathMap
}

function initDisabledStatus(specs: Spec[], pathMap: Record<string, string[]>) {
  specs.forEach((spec) => {
    spec.values.forEach((val) => {
      val.disabled = !pathMap[val.name]
    })
  })
}

function getSelectedArr(specs: Spec[]) {
  const selectedArr: (string | undefined)[] = []
  specs.forEach((spec, index) => {
    const selectedVal = spec.values.find((v) => v.selected)
    selectedArr[index] = selectedVal?.name
  })
  return selectedArr
}

function updateDisabledStatus(specs: Spec[], pathMap: Record<string, string[]>) {
  specs.forEach((item, i) => {
    const selectedArr = getSelectedArr(specs)
    item.values.forEach((val) => {
      if (!val.selected) {
        selectedArr[i] = val.name
        const key = selectedArr.filter(Boolean).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })
}

export type SkuPayload = {
  skuId: string
  price: number
  oldPrice: number
  inventory: number
  specsText: string
}

export function GoodsSku({
  goods,
  onChange,
}: {
  goods: { specs?: Spec[]; skus?: Sku[] }
  onChange: (sku: SkuPayload | Record<string, never>) => void
}) {
  const pathMap = useMemo(() => getPathMap(goods?.skus ?? []), [goods?.skus])
  const [specs, setSpecs] = useState<Spec[]>([])

  useEffect(() => {
    if (!goods?.specs?.length) {
      setSpecs([])
      return
    }
    const cloned = JSON.parse(JSON.stringify(goods.specs)) as Spec[]
    initDisabledStatus(cloned, pathMap)
    setSpecs(cloned)
  }, [goods?.specs, pathMap, goods])

  const clickSpecs = useCallback(
    (item: Spec, val: SpecVal) => {
      if (val.disabled) return
      setSpecs((prev) => {
        const next = JSON.parse(JSON.stringify(prev)) as Spec[]
        const row = next.find((s) => s.id === item.id)
        if (!row) return prev
        const v = row.values.find((x) => x.name === val.name)
        if (!v) return prev
        if (v.selected) v.selected = false
        else {
          row.values.forEach((bv) => {
            bv.selected = false
          })
          v.selected = true
        }
        updateDisabledStatus(next, pathMap)
        const selectedArr = getSelectedArr(next).filter(Boolean) as string[]
        if (selectedArr.length === (goods.specs?.length ?? 0)) {
          const skuId = pathMap[selectedArr.join(spliter)]?.[0]
          const sku = goods.skus?.find((s) => s.id === skuId)
          if (sku) {
            onChange({
              skuId: sku.id,
              price: sku.price,
              oldPrice: sku.oldPrice,
              inventory: sku.inventory,
              specsText: sku.specs
                .reduce((p, n) => `${p} ${n.name ?? ''}：${n.valueName}`, '')
                .trim(),
            })
          }
        } else {
          onChange({})
        }
        return next
      })
    },
    [goods, onChange, pathMap]
  )

  if (!specs.length) return null

  return (
    <div className="goods-sku">
      {specs.map((item) => (
        <dl key={item.id}>
          <dt>{item.name}</dt>
          <dd>
            {item.values.map((val) => (
              <span key={val.name}>
                {val.picture ? (
                  <img
                    className={`${val.selected ? 'selected' : ''} ${val.disabled ? 'disabled' : ''}`}
                    src={val.picture}
                    alt=""
                    onClick={() => clickSpecs(item, val)}
                  />
                ) : (
                  <span
                    className={`sku-text ${val.selected ? 'selected' : ''} ${val.disabled ? 'disabled' : ''}`}
                    onClick={() => clickSpecs(item, val)}
                  >
                    {val.name}
                  </span>
                )}
              </span>
            ))}
          </dd>
        </dl>
      ))}
    </div>
  )
}
