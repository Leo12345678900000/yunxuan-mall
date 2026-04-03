import request from '@/utils/http'

export const getOrderAPI = (id: string) => request({ url: `/member/order/${id}` })
