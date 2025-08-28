import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const userApi = {
  getUserSuggestions: () => {
    return http.get('/users/suggestions')
  },
  getProfile: () => {
    return http.get(`/users/profile/me`)
  },
  getPostsUser(username: string, query: QueryConfig) {
    return http.get(`/users/${username}/posts`, { params: query })
  },
  getPostsUserLike(username: string, query: QueryConfig) {
    return http.get(`/users/${username}/likes`, { params: query })
  }
}
