import axios from 'axios'
import AlertIns from "./alert";
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000 // request timeout
})

const res = /\?token=(\S+)/.exec(window.location.href)
var token = getToken()
if (res && res[1]) {
  token = res[1]
  setToken(token)
}

const accessToken = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)

// request interceptor
service.interceptors.request.use(
  config => {
    if (token) {
      config.headers['X-Token'] = token
      config.headers['AccessToken'] = accessToken
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
