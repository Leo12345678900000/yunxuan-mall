import axios, { type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/userStore'
import { getAxiosBaseURL } from '@/utils/apiBase'
import { getFeedbackMessage } from '@/utils/feedback'

const httpInstance = axios.create({
  baseURL: getAxiosBaseURL(),
  timeout: 20000,
})

httpInstance.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().userInfo?.token as string | undefined
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const msg =
      e?.code === 'ECONNABORTED'
        ? '请求超时，请检查网络或稍后重试'
        : String(e?.response?.data?.message ?? e?.message ?? '请求失败')
    const api = getFeedbackMessage()
    if (api) {
      api.warning(msg)
    } else {
      console.warn(msg)
    }
    return Promise.reject(e)
  }
)

/** 响应拦截器已 return res.data；泛型默认 any，便于各页 .then 里写具体 result 结构 */
export type RequestFn = <T = any>(config: AxiosRequestConfig) => Promise<T>

const request = httpInstance as unknown as RequestFn
export default request
