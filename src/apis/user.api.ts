import http from '../utils/http'

export const userApi = {
  getUserSuggestions: () => {
    return http.get('/users/suggestions')
  }
}
