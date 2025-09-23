import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import {
  getAccessToken,
  getAvatar,
  getId,
  getName,
  getRefreshToken,
  getUsername,
  removeAccessToken,
  removeAvatar,
  removeId,
  removeName,
  removeRefreshToken,
  removeUsername,
  saveAccessToken,
  saveAvatar,
  saveId,
  saveName,
  saveRefreshToken,
  saveUsername
} from './auth'

const URL = import.meta.env.VITE_API_ROOT

class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private avatar: string
  private username: string
  private name: string
  private id: string

  constructor() {
    this.access_token = getAccessToken()
    this.refresh_token = getRefreshToken()
    this.avatar = getAvatar() || ''
    this.username = getUsername()
    this.name = getName()
    this.id = getId()
    this.instance = axios.create({
      baseURL: URL,
      timeout: 60000
    })
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const access_token = getAccessToken()
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
          console.log(response)
          this.access_token = response.data.data.access_token
          this.refresh_token = response.data.data.refresh_token
          this.avatar = response.data.data.user.avatar || ''
          this.username = response.data.data.user.username
          this.name = response.data.data.user.name
          this.id = response.data.data.user.id
          saveAccessToken(this.access_token)
          saveRefreshToken(this.refresh_token)
          saveAvatar(this.avatar)
          saveUsername(this.username)
          saveName(this.name)
          saveId(this.id)
        } else if (url === '/auth/logout') {
          this.access_token = ''
          this.refresh_token = ''
          this.name = ''
          this.avatar = ''
          this.username = ''
          this.id = ''
          removeAccessToken()
          removeRefreshToken()
          removeAvatar()
          removeUsername()
          removeName()
          removeId()
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
