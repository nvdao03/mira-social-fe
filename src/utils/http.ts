import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import {
  getAccessTokenFromLocalStorage,
  getAvatarFromLocalStorage,
  getIdFromLocalStorage,
  getNameFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  getUsernameFromLocalStorage,
  removeAccessTokenFromLocalStorage,
  removeAvatarFromLocalStorage,
  removeIdFromLocalStorage,
  removeNameFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
  removeUsernameFromLocalStorage,
  saveAccessTokenFromLocalStorage,
  saveAvatarFromLocalStorage,
  saveIdFromLocalStorage,
  saveNameFromLocalStorage,
  saveRefreshTokenFromLocalStorage,
  saveUsernameFromLocalStorage
} from './auth'

const URL = import.meta.env.VITE_URL_BE_LOCAL

class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private avatar: string
  private username: string
  private name: string
  private id: string

  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.refresh_token = getRefreshTokenFromLocalStorage()
    this.avatar = getAvatarFromLocalStorage() || ''
    this.username = getUsernameFromLocalStorage()
    this.name = getNameFromLocalStorage()
    this.id = getIdFromLocalStorage()
    this.instance = axios.create({
      baseURL: URL,
      timeout: 10000
    })
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const access_token = getAccessTokenFromLocalStorage()

        if (access_token && config.headers) {
          config.headers.Authorization = `Bearer ${access_token}`
        }

        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data'
        } else {
          config.headers['Content-Type'] = 'application/json'
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
          this.avatar = response.data.data.user.avatar || ''
          this.username = response.data.data.user.username
          this.name = response.data.data.user.name
          this.id = response.data.data.user.id
          saveAccessTokenFromLocalStorage(this.access_token)
          saveRefreshTokenFromLocalStorage(this.refresh_token)
          saveAvatarFromLocalStorage(this.avatar)
          saveUsernameFromLocalStorage(this.username)
          saveNameFromLocalStorage(this.name)
          saveIdFromLocalStorage(this.id)
        } else if (url === '/auth/logout') {
          this.access_token = ''
          this.refresh_token = ''
          this.name = ''
          this.avatar = ''
          this.username = ''
          this.id = ''
          removeAccessTokenFromLocalStorage()
          removeRefreshTokenFromLocalStorage()
          removeAvatarFromLocalStorage()
          removeUsernameFromLocalStorage()
          removeNameFromLocalStorage()
          removeIdFromLocalStorage()
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
