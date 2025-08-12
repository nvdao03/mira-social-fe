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

export type SignInFormValues = yup.InferType<typeof schemaSignIn>
export type SignUpFormValues = yup.InferType<typeof schemaSignUp>
