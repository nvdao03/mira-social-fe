import * as yup from 'yup'
import { MESSAGE } from '../constants/message'

export const schemaSignIn = yup.object({
  email: yup.string().email(MESSAGE.EMAIL_INVALID).required(MESSAGE.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(MESSAGE.PASSWORD_REQUIRED)
    .min(6, MESSAGE.PASSWORD_LENGTH)
    .max(180, MESSAGE.PASSWORD_LENGTH)
})

export const schemaSignUp = yup.object({
  email: yup.string().email(MESSAGE.EMAIL_INVALID).required(MESSAGE.EMAIL_REQUIRED),
  password: yup
    .string()
    .required(MESSAGE.PASSWORD_REQUIRED)
    .min(6, MESSAGE.PASSWORD_LENGTH)
    .max(180, MESSAGE.PASSWORD_LENGTH),
  username: yup
    .string()
    .required(MESSAGE.USERNAME_REQUIRED)
    .min(3, MESSAGE.USERNAME_LENGTH)
    .max(30, MESSAGE.USERNAME_LENGTH),
  country: yup.string().required(MESSAGE.COUNTRY_REQUIRED)
})

export const schemaAddComment = yup.object({
  content: yup.string().required('Content is required').trim().max(500, 'Content must be at most 500 characters')
})

export const schemaCreatePost = yup.object({
  type: yup.number().required('Type is required'),
  user_id: yup.string().required('User ID is required'),
  content: yup.string().trim().max(500, 'Content must be at most 500 characters'),
  medias: yup.array(),
  parent_id: yup.string().nullable()
})

export type SignInFormValues = yup.InferType<typeof schemaSignIn>
export type SignUpFormValues = yup.InferType<typeof schemaSignUp>
export type AddCommentFormValues = yup.InferType<typeof schemaAddComment>
export type CreatePostFormValues = yup.InferType<typeof schemaCreatePost>
