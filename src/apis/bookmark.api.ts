import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const bookmarkApi = {
  bookmark(body: { post_id: string }) {
    return http.post('/bookmarks', body)
  },
  unbookmark(post_id: string) {
    return http.delete(`/bookmarks/post/${post_id}`)
  },
  getBookmarks(query: QueryConfig) {
    return http.get('/bookmarks', {
      params: query
    })
  }
}
