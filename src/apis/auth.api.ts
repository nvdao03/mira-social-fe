import http from '../utils/http'
import type { ChangePasswordFormValues, SignInFormValues, SignUpFormValues } from '../utils/validation'

type SignUpFormData = SignUpFormValues
type SignInFormData = SignInFormValues
type ChangePasswordFormData = ChangePasswordFormValues

export const authApi = {
  // --- Authentication ---
  signUp: (body: SignUpFormData) => http.post('/auth/sign-up', body),
  signIn: (body: SignInFormData) => http.post('/auth/sign-in', body),
  logout: (body: { refresh_token: string }) => http.post('/auth/logout', body),
  changePassword: (body: ChangePasswordFormData) => http.post('/auth/change-password', body),

  // --- Email verification  ---
  verifyEmailToken: (body: { email_verify_token: string }) => http.post('/auth/verify-email-token', body),
  verifyEmail: (body: { email_verify_token: string }) => http.post('/auth/verify-email', body),

  // --- Forgot password ---
  forgotPassword: (body: { email: string }) => http.post('/auth/forgot-password', body),
  verifyForgotPassword: (body: { forgot_password_token: string }) => http.post('/auth/verify-forgot-password', body),
  resetPassword: (body: { forgot_password_token: string; password: string; confirm_password: string }) =>
    http.post('/auth/reset-password', body)
}
