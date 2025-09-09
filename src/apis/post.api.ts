import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'
import type { CreatePostFormValues } from '../utils/validation'

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
  },
  createPost: (body: CreatePostFormValues) => {
    return http.post('/posts', body)
  }
}

export default postApi
