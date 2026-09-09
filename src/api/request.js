import axios from 'axios'
import { ElMessage } from 'element-plus'

// axios 实例封装
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截：携带 token
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截：统一处理业务码
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== undefined && res.code !== 200) {
      ElMessage.error(res.message || '请求异常')
      return Promise.reject(new Error(res.message || '请求异常'))
    }
    return res
  },
  (error) => {
    ElMessage.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)

export default service
