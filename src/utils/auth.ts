export const saveAccessTokenFromLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token')
}

export const saveRefreshTokenFromLocalStorage = (refreshToken: string) => {
  localStorage.setItem('refresh_token', refreshToken)
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const removeRefreshTokenFromLocalStorage = () => {
  localStorage.removeItem('refresh_token')
}
