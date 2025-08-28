import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const userApi = {
  getUserSuggestions: (query: QueryConfig) => {
    return http.get('/users/suggestions', {
      params: query
    })
  },
  getProfile: (user_id: string) => {
    return http.get(`/users/${user_id}`)
  },
  getPostsProfile(user_id: string, query: QueryConfig) {
    return http.get(`/users/${user_id}/posts`, { params: query })
  },
  getLikePostsProfile(user_id: string, query: QueryConfig) {
    return http.get(`/users/${user_id}/likes`, { params: query })
  },
  getRepostsProfile(user_id: string, query: QueryConfig) {
    return http.get(`/users/${user_id}/reposts`, { params: query })
  }
}
