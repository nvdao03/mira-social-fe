import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const followApi = {
  getFollowers: (user_id: string, param: QueryConfig) => {
    console.log('user_id', user_id)
    return http.get(`/follows/${user_id}/followers`, {
      params: param
    })
  },
  getFollowings: (user_id: string, param: QueryConfig) => {
    return http.get(`/follows/${user_id}/followings`, {
      params: param
    })
  },
  follow: (user_id: string) => `/follow/follow/${user_id}`,
  unfollow: (user_id: string) => `/follow/unfollow/${user_id}`
}
