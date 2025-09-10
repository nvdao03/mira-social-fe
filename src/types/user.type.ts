export interface UserSuggestion {
  _id: string
  email: string
  username: string
  name: string
  verify: number
  createdAt: string
  updatedAt: string
  __v: number
  avatar: string
}

export interface ProfileType {
  _id: string
  email: string
  username: string
  name: string
  country: string
  verify: number
  createdAt: string
  updatedAt: string
  __v: number
  avatar: string
  following_count: number
  follower_count: number
  bio: string
  website: string
  cover_photo: string
  date_of_birth: string | null
  location: string
}
