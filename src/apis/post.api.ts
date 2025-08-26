import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

const postApi = {
  getPosts: (query: QueryConfig) => {
    return http.get('/posts', {
      params: query
    })
  }
}

export default postApi
