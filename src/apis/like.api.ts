import http from '../utils/http'

export const likeApi = {
  like(body: { post_id: string }) {
    return http.post('/likes', body)
  },
  unlike(post_id: string) {
    return http.delete(`/likes/post/${post_id}`)
  }
}
