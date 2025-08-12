import http from '../utils/http'
import type { SignInFormValues, SignUpFormValues } from '../utils/validation'

type SignUpFormData = SignUpFormValues
type SignInFormData = SignInFormValues

export const authApi = {
  signUp(body: SignUpFormData) {
    return http.post('/auth/sign-up', body)
  },
  signIn(body: SignInFormData) {
    return http.post('/auth/sign-in', body)
  }
}
