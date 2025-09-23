import { XCircle } from 'lucide-react'
import type { QueryConfig } from '../../configs/query.config'
import useQueryParam from '../../hooks/useQueryParam'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'
import { PATH } from '../../constants/path'

export default function VerifyForgotPassword() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    forgot_password_token: queryParams.forgot_password_token || ''
  }

  const navigate = useNavigate()
  const [status, setStatus] = useState<boolean>(false)

  const verifyForgotPasswordMutation = useMutation({
    mutationFn: (body: { forgot_password_token: string }) => authApi.verifyForgotPassword(body),
    onSuccess: () => {
      navigate(PATH.RESET_PASSWORD, {
        state: {
          forgot_password_token: queryConfig.forgot_password_token
        }
      })
    },
    onError: () => {
      setStatus(true)
    }
  })

  useEffect(() => {
    if (queryConfig.forgot_password_token) {
      verifyForgotPasswordMutation.mutate({ forgot_password_token: queryConfig.forgot_password_token })
    }
  }, [])

  return (
    <div className='flex items-center justify-center h-screen bg-[#0F0F0F] px-4'>
      <div className='bg-[#1A1A1A] shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-solid border-[#2E2E2E]'>
        {status && (
          <div className='flex flex-col items-center'>
            <XCircle className='w-[45px] h-[45px] text-red-400' />
            <h2 className='mt-4 text-[20px] font-bold text-red-400'>Authentication failed!</h2>
            <p className='mt-3 text-gray-400 text-[15px] leading-[1.5]'>
              The link is invalid or has expired. Please request a new one.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
