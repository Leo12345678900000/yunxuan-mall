import type { MessageInstance } from 'antd/es/message/interface'

/** 供 axios 等非组件代码使用，由 Ant Design App 内挂载后注入 */
let messageApi: MessageInstance | null = null

export function registerFeedbackMessage(api: MessageInstance) {
  messageApi = api
}

export function getFeedbackMessage(): MessageInstance | null {
  return messageApi
}
