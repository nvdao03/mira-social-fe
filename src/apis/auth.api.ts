import http from '../utils/http'
import type { ChangePasswordFormValues, SignInFormValues, SignUpFormValues } from '../utils/validation'

type SignUpFormData = SignUpFormValues
type SignInFormData = SignInFormValues
type ChangePasswordFormData = ChangePasswordFormValues

export const authApi = {
  signUp(body: SignUpFormData) {
    return http.post('/auth/sign-up', body)
  },
  signIn(body: SignInFormData) {
    return http.post('/auth/sign-in', body)
  },
  logout(body: { refresh_token: string }) {
    return http.post('/auth/logout', body)
  },
  changePassword(body: ChangePasswordFormData) {
    return http.post('/auth/change-password', body)
  },
  verifyEmail: (body: { email_verify_token: string }) => {
    return http.post('/auth/verify-email', body)
  },
  forgotPassword: (body: { email: string }) => {
    return http.post('/auth/forgot-password', body)
  },
  verifyForgotPassword: (body: { forgot_password_token: string }) => {
    return http.post('/auth/verify-forgot-password', body)
  },
  resetPassword: (body: { forgot_password_token: string; password: string; confirm_password: string }) => {
    return http.post('/auth/reset-password', body)
  }
}
