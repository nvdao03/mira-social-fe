import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const searchApi = {
  search: (query: QueryConfig) => {
    return http.get('/search', { params: query })
  }
}
