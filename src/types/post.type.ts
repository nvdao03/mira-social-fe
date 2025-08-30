export interface Media {
  url: string
  type: number
}

export interface PostType {
  _id: string
  content: string | null
  medias:
    | {
        url: string
        type: number
        _id: string
      }[]
    | []
  views: number
  createdAt: string
  updatedAt: string
  __v: number
  users: {
    _id: string
    username: string
    name: string
    verify: number
    avatar: string | ''
  }
  like_count: number
  comment_count: number
  bookmark_count: number
  isLiked?: boolean
  isBookmarked?: boolean
}

export interface PostList {
  posts: PostType[]
  pagination: {
    page: number
    limit: number
    total_page: number
  }
}
