import request from '@/utils/http'

export const getCheckInfoAPI = () => request({ url: '/member/order/pre' })

export const createOrderAPI = (data: Record<string, unknown>) =>
  request({ url: '/member/order', method: 'POST', data })
