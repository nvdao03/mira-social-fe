import http from '../utils/http'

export const likeApi = {
  like(post_id: string) {
    return http.post('/likes', post_id)
  },
  unlike(post_id: string) {
    return http.delete(`/likes/post/${post_id}`)
  }
}
