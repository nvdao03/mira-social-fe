import type { AxiosInstance } from 'axios'
import axios from 'axios'
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  saveAccessTokenFromLocalStorage,
  saveRefreshTokenFromLocalStorage
} from './auth'

const URL = import.meta.env.VITE_URL_BE_LOCAL

class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string

  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.refresh_token = getRefreshTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL: URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.Authorization = `Bearer ${this.access_token}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/auth/sign-in' || url === '/auth/sign-up') {
          this.access_token = response.data.data.access_token
          this.refresh_token = response.data.data.refresh_token
          saveAccessTokenFromLocalStorage(this.access_token)
          saveRefreshTokenFromLocalStorage(this.refresh_token)
        } else if (url === '/auth/logout') {
          this.access_token = ''
          this.refresh_token = ''
          removeAccessTokenFromLocalStorage()
          removeRefreshTokenFromLocalStorage()
        }
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
