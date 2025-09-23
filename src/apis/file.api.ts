import http from '../utils/http'

export const fileApi = {
  // --- Upload image ---
  uploadImage: (file: FormData) => http.post('/medias/upload-image', file),

  // --- Upload video ---
  uploadVideo: (file: FormData) => http.post('/medias/upload-video', file),

  // --- Upload avatar ---
  uploadAvatar: (file: FormData) => http.post('/medias/upload-avatar', file),

  // --- Upload cover photo ---
  uploadCoverPhoto: (file: FormData) => http.post('/medias/upload-cover-photo', file)
}
