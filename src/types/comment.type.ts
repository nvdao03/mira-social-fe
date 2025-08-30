export interface CommentType {
  _id: string
  content: string
  createdAt: string
  updatedAt: string
  user: {
    _id: string
    email: string
    username: string
    name: string
    avatar: string
    verify: number
  }
}

export interface CommentListType {
  comments: CommentType[]
  pagination: {
    page: number
    limit: number
    total_page: number
  }
}
