export interface CommentType {
  _id: string
  content: string
  user: {
    _id: string
    email: string
    username: string
    name: string
    avatar: string
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
