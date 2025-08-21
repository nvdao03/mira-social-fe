export interface AuthResponseSuccess {
  message: string
  data: {
    access_token: string
    refresh_token: string
    user: {
      id: string
      email: string
      username: string
      name: string
      avatar: string
    }
  }
}
