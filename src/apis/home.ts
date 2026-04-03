import httpInstance from '@/utils/http'

export function getBannerAPI(params: { distributionSite?: string } = {}) {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: { distributionSite },
  })
}

export const findNewAPI = () => httpInstance({ url: '/home/new' })
export const getHotAPI = () => httpInstance({ url: '/home/hot' })
export const getGoodsAPI = () => httpInstance({ url: '/home/goods' })
