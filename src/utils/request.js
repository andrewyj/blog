import axios from 'axios'
import AlertIns from "./alert";
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['X-Token'] = getToken()
    }
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      AlertIns.message({
        content: res.msg,
        duration: 3
      });
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    AlertIns.message({
      content: error.message,
      duration: 3
    });
    return Promise.reject(error)
  }
)

export default service
