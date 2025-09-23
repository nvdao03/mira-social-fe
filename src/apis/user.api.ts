import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'
import type { UpdateProfileFormValues } from '../utils/validation'

export const userApi = {
  // --- Suggestions ---
  getUserSuggestions: (query: QueryConfig) => http.get('/users/suggestions', { params: query }),

  // --- Profile ---
  getProfile: (user_id: string) => http.get(`/users/${user_id}`),
  getPostsProfile: (user_id: string, query: QueryConfig) => http.get(`/users/${user_id}/posts`, { params: query }),
  getLikePostsProfile: (user_id: string, query: QueryConfig) => http.get(`/users/${user_id}/likes`, { params: query }),
  getRepostsProfile: (user_id: string, query: QueryConfig) => http.get(`/users/${user_id}/reposts`, { params: query }),

  // --- User management ---
  updateProfile: (user_id: string, body: UpdateProfileFormValues) => http.put(`/users/${user_id}`, body)
}
