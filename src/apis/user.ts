import request from '@/utils/http'

export const loginAPI = (data: { account: string; password: string }) =>
  request({ url: '/login', method: 'POST', data })

export const getLikeListAPI = (params: { limit?: number } = {}) =>
  request({ url: '/goods/relevant', params: { limit: params.limit ?? 4 } })
