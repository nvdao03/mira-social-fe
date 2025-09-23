import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const commentApi = {
  // --- Get comments ---
  getComments: (post_id: string, param: QueryConfig) => http.get(`/comments/post/${post_id}`, { params: param }),

  // --- Add comment ---
  addComment: (body: { content: string }, post_id: string) => http.post(`/comments/${post_id}`, body),

  // --- Delete comment ---
  deleteComment: (comment_id: string) => http.delete(`/comments/${comment_id}`)
}
