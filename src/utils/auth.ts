// --- helper chung ---
const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key) || ''
}

const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

// --- access token ---
export const saveAccessToken = (token: string) => saveToLocalStorage('access_token', token)
export const getAccessToken = () => getFromLocalStorage('access_token')
export const removeAccessToken = () => removeFromLocalStorage('access_token')

// --- refresh token ---
export const saveRefreshToken = (token: string) => saveToLocalStorage('refresh_token', token)
export const getRefreshToken = () => getFromLocalStorage('refresh_token')
export const removeRefreshToken = () => removeFromLocalStorage('refresh_token')

// --- avatar ---
export const saveAvatar = (avatar: string) => saveToLocalStorage('avatar', avatar)
export const getAvatar = () => getFromLocalStorage('avatar')
export const removeAvatar = () => removeFromLocalStorage('avatar')

// --- username ---
export const saveUsername = (username: string) => saveToLocalStorage('username', username)
export const getUsername = () => getFromLocalStorage('username')
export const removeUsername = () => removeFromLocalStorage('username')

// --- name ---
export const saveName = (name: string) => saveToLocalStorage('name', name)
export const getName = () => getFromLocalStorage('name')
export const removeName = () => removeFromLocalStorage('name')

// --- id ---
export const saveId = (id: string) => saveToLocalStorage('id', id)
export const getId = () => getFromLocalStorage('id')
export const removeId = () => removeFromLocalStorage('id')
