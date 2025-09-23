import http from '../utils/http'

export const likeApi = {
  // --- Like ---
  like: (body: { post_id: string }) => http.post('/likes', body),

  // --- Unlike ---
  unlike: (post_id: string) => http.delete(`/likes/post/${post_id}`)
}
