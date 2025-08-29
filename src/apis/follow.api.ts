import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const followApi = {
  getFollowers: (user_id: string, param: QueryConfig) => {
    return http.get(`/follows/${user_id}/followers`, {
      params: param
    })
  },
  getFollowings: (user_id: string, param: QueryConfig) => {
    return http.get(`/follows/${user_id}/followings`, {
      params: param
    })
  },
  follow: (body: { followed_user_id: string }) => {
    return http.post('/follows', body)
  },
  unfollow: (followed_user_id: string) => {
    return http.delete(`/follows/user/${followed_user_id}`)
  }
}
