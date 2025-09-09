import http from '../utils/http'

export const fileApi = {
  uploadImage: (file: FormData) => {
    return http.post('/medias/upload-image', file)
  },
  uploadVideo: (file: FormData) => {
    return http.post('/medias/upload-video', file)
  }
}
