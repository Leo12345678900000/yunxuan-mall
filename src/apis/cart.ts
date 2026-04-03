import request from '@/utils/http'

export const insertCartAPI = (data: { skuId: string; count: number }) =>
  request({ url: '/member/cart', method: 'POST', data })

export const findNewCartListAPI = () => request({ url: '/member/cart' })

export const delCartAPI = (ids: string[]) =>
  request({ url: '/member/cart', method: 'DELETE', data: { ids } })

export const mergeCartAPI = (data: { skuId: string; selected: boolean; count: number }[]) =>
  request({ url: '/member/cart/merge', method: 'POST', data })
