import * as yup from 'yup'
import { MESSAGE } from '../constants/message'

export const schemaSignIn = yup.object({
  email: yup.string().email(MESSAGE.EMAIL_INVALID).required(MESSAGE.EMAIL_REQUIRED),
  password: yup
    .string()
    .trim()
    .required(MESSAGE.PASSWORD_REQUIRED)
    .min(6, MESSAGE.PASSWORD_LENGTH)
    .max(180, MESSAGE.PASSWORD_LENGTH)
})

export const schemaSignUp = yup.object({
  email: yup.string().email(MESSAGE.EMAIL_INVALID).required(MESSAGE.EMAIL_REQUIRED),
  password: yup
    .string()
    .trim()
    .required(MESSAGE.PASSWORD_REQUIRED)
    .min(6, MESSAGE.PASSWORD_LENGTH)
    .max(180, MESSAGE.PASSWORD_LENGTH),
  username: yup
    .string()
    .trim()
    .required(MESSAGE.USERNAME_REQUIRED)
    .min(3, MESSAGE.USERNAME_LENGTH)
    .max(30, MESSAGE.USERNAME_LENGTH),
  country: yup.string().required(MESSAGE.COUNTRY_REQUIRED)
})

export const schemaAddComment = yup.object({
  content: yup.string().trim().required('Content is required').trim().max(500, 'Content must be at most 500 characters')
})

export const schemaCreatePost = yup.object({
  type: yup.number().required('Type is required'),
  user_id: yup.string().required('User ID is required'),
  content: yup.string().trim().max(500, 'Content must be at most 500 characters').nullable(),
  medias: yup.array(),
  parent_id: yup.string().nullable()
})

export const schemaUpdatePost = yup.object({
  type: yup.number().required('Type is required'),
  user_id: yup.string().required('User ID is required'),
  content: yup.string().trim().max(500, 'Content must be at most 500 characters').nullable(),
  medias: yup.array(),
  parent_id: yup.string().nullable()
})

export const schemaUpdateProfile = yup.object({
  cover_photo: yup.string().nullable(),
  avatar: yup.string().nullable(),
  name: yup.string().nullable(),
  bio: yup.string().nullable(),
  location: yup.string().nullable(),
  website: yup.string().nullable(),
  date_of_birth: yup.string().nullable()
})

export const schemaChangePassword = yup.object({
  current_password: yup
    .string()
    .trim()
    .required(MESSAGE.PASSWORD_REQUIRED)
    .min(6, MESSAGE.PASSWORD_LENGTH)
    .max(180, MESSAGE.PASSWORD_LENGTH),
  new_password: yup
    .string()
    .trim()
    .required(MESSAGE.NEW_PASSWORD_REQUIRED)
    .min(6, MESSAGE.NEW_PASSW0RD_LENGTH)
    .max(180, MESSAGE.NEW_PASSW0RD_LENGTH),
  confirm_password: yup
    .string()
    .trim()
    .required(MESSAGE.CONFIRM_PASSWORD_REQUIRED)
    .min(6, MESSAGE.CONFIRM_PASSWORD_LENGTH)
    .max(180, MESSAGE.CONFIRM_PASSWORD_LENGTH)
    .oneOf([yup.ref('new_password')], MESSAGE.CONFIRM_PASSWORD_NOT_MATCH)
})

export const schemaResetPassword = yup.object({
  password: yup
    .string()
    .trim()
    .required(MESSAGE.PASSWORD_REQUIRED)
    .min(6, MESSAGE.PASSWORD_LENGTH)
    .max(180, MESSAGE.PASSWORD_LENGTH),
  confirm_password: yup
    .string()
    .trim()
    .required(MESSAGE.CONFIRM_PASSWORD_REQUIRED)
    .min(6, MESSAGE.CONFIRM_PASSWORD_LENGTH)
    .max(180, MESSAGE.CONFIRM_PASSWORD_LENGTH)
    .oneOf([yup.ref('password')], MESSAGE.CONFIRM_PASSWORD_NOT_MATCH)
})

export const schemaForgotPassword = yup.object({
  email: yup.string().email(MESSAGE.EMAIL_INVALID).required(MESSAGE.EMAIL_REQUIRED)
})

export type SignInFormValues = yup.InferType<typeof schemaSignIn>
export type SignUpFormValues = yup.InferType<typeof schemaSignUp>
export type AddCommentFormValues = yup.InferType<typeof schemaAddComment>
export type CreatePostFormValues = yup.InferType<typeof schemaCreatePost>
export type UpdatePostFormValues = yup.InferType<typeof schemaUpdatePost>
export type UpdateProfileFormValues = yup.InferType<typeof schemaUpdateProfile>
export type ChangePasswordFormValues = yup.InferType<typeof schemaChangePassword>
export type ForgotPasswordFormValues = yup.InferType<typeof schemaForgotPassword>
export type ResetPasswordFormValues = yup.InferType<typeof schemaResetPassword>
