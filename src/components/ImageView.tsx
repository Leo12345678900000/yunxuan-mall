import { useCallback, useRef, useState, type MouseEvent } from 'react'
import './ImageView.scss'

export function ImageView({ imageList }: { imageList: string[] }) {
  const list = imageList?.length ? imageList : []
  const [activeIndex, setActiveIndex] = useState(0)
  const targetRef = useRef<HTMLDivElement>(null)
  const [left, setLeft] = useState(0)
  const [top, setTop] = useState(0)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [isOutside, setIsOutside] = useState(true)

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = targetRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const elementX = e.clientX - rect.left
    const elementY = e.clientY - rect.top
    if (elementX < 0 || elementY < 0 || elementX > rect.width || elementY > rect.height) {
      setIsOutside(true)
      return
    }
    setIsOutside(false)
    let l = 0
    let t = 0
    if (elementX > 100 && elementX < 300) l = elementX - 100
    if (elementY > 100 && elementY < 300) t = elementY - 100
    if (elementX > 300) l = 200
    if (elementX < 100) l = 0
    if (elementY > 300) t = 200
    if (elementY < 100) t = 0
    setLeft(l)
    setTop(t)
    setPositionX(-l * 2)
    setPositionY(-t * 2)
  }, [])

  const onMouseLeave = useCallback(() => setIsOutside(true), [])

  if (!list.length) return null
  const big = list[activeIndex] ?? list[0]

  return (
    <div className="goods-image">
      <div className="middle" ref={targetRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
        <img src={big} alt="" />
        {!isOutside && <div className="layer" style={{ left, top }} />}
      </div>
      <ul className="small">
        {list.map((img, i) => (
          <li
            key={i}
            className={i === activeIndex ? 'active' : ''}
            onMouseEnter={() => setActiveIndex(i)}
          >
            <img src={img} alt="" />
          </li>
        ))}
      </ul>
      <div
        className="large"
        style={{
          display: isOutside ? 'none' : 'block',
          backgroundImage: `url(${big})`,
          backgroundPosition: `${positionX}px ${positionY}px`,
        }}
      />
    </div>
  )
}
