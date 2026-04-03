import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'

export function useCountDown() {
  const [time, setTime] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const formatTime = useMemo(
    () => (time > 0 ? dayjs.unix(time).format('mm分ss秒') : '00分00秒'),
    [time]
  )

  const start = useCallback((currentTime: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTime(currentTime)
    timerRef.current = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return { formatTime, start }
}
