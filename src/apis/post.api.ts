import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

const postApi = {
  getPosts: (query: QueryConfig) => {
    return http.get('/posts', {
      params: query
    })
  },
  getPostDetail: (post_id: string) => {
    return http.get(`posts/post/${post_id}`)
  },
  deletePost: (post_id: string) => {
    return http.delete(`posts/${post_id}`)
  }
}

export default postApi
