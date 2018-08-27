import axios from 'axios'
import {
  getToken
} from './auth'
const http = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  }
})
http.interceptors.request.use(config => {
  let headers = config.headers;
  config.headers = {
    token: getToken(),
    ...headers,
  }
  config.data = {
    ...config.data
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

http.interceptors.response.use(
  response => response.data,
  (error) => {
    alert(error.message)
    return Promise.reject(error)
  })

export default {
    install: function(Vue){
        Vue.prototype.$http = http
    }
}