import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'
import type { CreatePostFormValues, UpdatePostFormValues } from '../utils/validation'

const postApi = {
  getPosts: (query: QueryConfig) => {
    return http.get('/posts', {
      params: query
    })
  },
  getPostFollwing: (query: QueryConfig) => {
    return http.get('/posts/followings', {
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
  },
  updatePost: (body: UpdatePostFormValues, post_id: string) => {
    return http.put(`/posts/${post_id}`, body)
  }
}

export default postApi
