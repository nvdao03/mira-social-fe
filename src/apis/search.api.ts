import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const searchApi = {
  // --- Search ---
  search: (query: QueryConfig) => http.get('/search', { params: query })
}
