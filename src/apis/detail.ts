import request from '@/utils/http'

export const getDetail = (id: string) => request({ url: '/goods', params: { id } })

export const getHotGoodsAPI = (params: { id: string; type: number; limit?: number }) =>
  request({
    url: '/goods/hot',
    params: { id: params.id, type: params.type, limit: params.limit ?? 3 },
  })
