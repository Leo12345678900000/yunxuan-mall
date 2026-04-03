import { App } from 'antd'
import { useEffect } from 'react'
import { registerFeedbackMessage } from '@/utils/feedback'

/** 将 App.useApp().message 注入 axios 等，消除静态 message 的 context 告警 */
export function FeedbackMessageBridge() {
  const { message } = App.useApp()
  useEffect(() => {
    registerFeedbackMessage(message)
  }, [message])
  return null
}
