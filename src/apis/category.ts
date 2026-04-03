import request from '@/utils/http'

export function getCategoryAPI(id: string) {
  return request({ url: '/category', params: { id } })
}

export const getCategoryFilterAPI = (id: string) =>
  request({ url: '/category/sub/filter', params: { id } })

export const getSubCategoryAPI = (data: {
  categoryId: string
  page: number
  pageSize: number
  sortField: string
}) => request({ url: '/category/goods/temporary', method: 'POST', data })
