import type { QueryConfig } from '../configs/query.config'
import http from '../utils/http'

export const bookmarkApi = {
  // --- Bookmark ---
  bookmark: (body: { post_id: string }) => http.post('/bookmarks', body),

  // --- Unbookmark ---
  unbookmark: (post_id: string) => http.delete(`/bookmarks/post/${post_id}`),

  // --- Get bookmarks ---
  getBookmarks: (query: QueryConfig) => http.get('/bookmarks', { params: query })
}
