import http from '../utils/http'

export const bookmarkApi = {
  bookmark(post_id: string) {
    return http.post('/bookmarks', post_id)
  },
  unbookmark(post_id: string) {
    return http.delete(`/bookmarks/post/${post_id}`)
  }
}
