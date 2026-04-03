import { useEffect, useRef, useState } from 'react'

/** 占位，避免未加载时 img 无尺寸导致父级 flex 布局塌陷、图片叠在一起 */
const PLACEHOLDER_SRC =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export function LazyImg({
  src,
  alt,
  className,
}: {
  src: string
  alt?: string
  className?: string
}) {
  const ref = useRef<HTMLImageElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true)
          ob.disconnect()
        }
      },
      { rootMargin: '100px' }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  return (
    <img
      ref={ref}
      src={show ? src : PLACEHOLDER_SRC}
      data-src={src}
      alt={alt ?? ''}
      className={className}
    />
  )
}
