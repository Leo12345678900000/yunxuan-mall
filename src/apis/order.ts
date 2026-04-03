import request from '@/utils/http'

export const getUserOrder = (params: { orderState: number; page: number; pageSize: number }) =>
  request({ url: '/member/order', method: 'GET', params })
