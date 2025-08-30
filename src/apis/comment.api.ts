import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const commentApi = {
  getComments: (post_id: string, param: QueryConfig) => {
    return http.get(`/comments/post/${post_id}`, { params: param })
  },
  addComment: (body: { content: string }, post_id: string) => {
    return http.post(`/comments/${post_id}`, body)
  },
  deleteComment: (comment_id: string) => {
    return http.delete(`/comments/${comment_id}`)
  }
}
