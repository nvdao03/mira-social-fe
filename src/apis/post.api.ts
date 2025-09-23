import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'
import type { CreatePostFormValues, UpdatePostFormValues } from '../utils/validation'

const postApi = {
  // --- Get posts ---
  getPosts: (query: QueryConfig) => http.get('/posts', { params: query }),
  getPostFollowing: (query: QueryConfig) => http.get('/posts/followings', { params: query }),
  getPostDetail: (post_id: string) => http.get(`/posts/post/${post_id}`),

  // --- Post management ---
  createPost: (body: CreatePostFormValues) => http.post('/posts', body),
  updatePost: (post_id: string, body: UpdatePostFormValues) => http.put(`/posts/${post_id}`, body),
  deletePost: (post_id: string) => http.delete(`/posts/${post_id}`)
}

export default postApi
