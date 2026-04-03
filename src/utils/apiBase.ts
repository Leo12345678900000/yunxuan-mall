/** 真实后端源站（支付跳转、生产环境直连 axios 使用） */
export const API_ORIGIN =
  (import.meta.env.VITE_API_ORIGIN as string | undefined)?.replace(/\/$/, '') ||
  'http://pcapi-xiaotuxian-front-devtest.itheima.net'

/**
 * axios baseURL：开发走 Vite 代理 /api 避免浏览器 CORS；生产默认直连源站
 */
export function getAxiosBaseURL(): string {
  const custom = import.meta.env.VITE_API_BASE as string | undefined
  if (custom) return custom.replace(/\/$/, '')
  if (import.meta.env.DEV) return '/api'
  return API_ORIGIN
}
