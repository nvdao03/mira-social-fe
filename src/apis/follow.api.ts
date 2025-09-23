import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const followApi = {
  // --- Get followers ---
  getFollowers: (user_id: string, param: QueryConfig) =>
    http.get(`/follows/${user_id}/followers`, {
      params: param
    }),

  // --- Get followings ---
  getFollowings: (user_id: string, param: QueryConfig) =>
    http.get(`/follows/${user_id}/followings`, {
      params: param
    }),

  // --- Follow ---
  follow: (body: { followed_user_id: string }) => http.post('/follows', body),

  // --- Unfollow ---
  unfollow: (followed_user_id: string) => http.delete(`/follows/user/${followed_user_id}`)
}
