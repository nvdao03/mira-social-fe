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

export const saveAvatarFromLocalStorage = (avatar: string) => {
  localStorage.setItem('avatar', avatar)
}

export const getAvatarFromLocalStorage = () => {
  return localStorage.getItem('avatar') || ''
}

export const removeAvatarFromLocalStorage = () => {
  localStorage.removeItem('avatar')
}

export const saveUsernameFromLocalStorage = (username: string) => {
  localStorage.setItem('username', username)
}

export const getUsernameFromLocalStorage = () => {
  return localStorage.getItem('username') || ''
}

export const removeUsernameFromLocalStorage = () => {
  localStorage.removeItem('username')
}

export const saveNameFromLocalStorage = (name: string) => {
  return localStorage.setItem('name', name)
}

export const getNameFromLocalStorage = () => {
  return localStorage.getItem('name') || ''
}

export const removeNameFromLocalStorage = () => {
  localStorage.removeItem('name')
}
