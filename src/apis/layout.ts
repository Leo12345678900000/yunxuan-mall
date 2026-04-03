import httpInstance from '@/utils/http'

export function getCategoryHeadAPI() {
  return httpInstance({ url: '/home/category/head' })
}
