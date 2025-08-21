export interface Media {
  url: string
  type: number
}

export interface PostType {
  _id: string
  avatar: string
  name: string
  username: string
  content: string | null
  medias: Media[] | []
  likes: number
  comments: number
  reposts: number
  views: number
  createdAt: string
  updatedAt: string
}

export interface PostList {
  posts: PostType[]
  pagination: {
    page: number
    limit: number
    total_page: number
  }
}
