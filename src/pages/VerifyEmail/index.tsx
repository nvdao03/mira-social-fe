import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react' // icon đẹp
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { saveAccessToken, saveAvatar, saveId, saveName, saveRefreshToken, saveUsername } from '../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { HTTP_STATUS } from '../../constants/httpStatus'

export default function VerifyEmail() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    email_verify_token: queryParams.email_verify_token || ''
  }

  const verifyEmailMutation = useMutation({
    mutationFn: (body: { email_verify_token: string }) => authApi.verifyEmail(body),
    onSuccess: async (data) => {
      if (!data.data.data) return

      saveAccessToken(data.data.data.access_token)
      saveRefreshToken(data.data.data.refresh_token)
      saveId(data.data.data.user.id)
      saveAvatar(data.data.data.user.avatar)
      saveUsername(data.data.data.user.username)
      saveName(data.data.data.user.name)

      setMessage(data.data.message)
      setStatus('success')

      setTimeout(() => {
        navigate(PATH.HOME)
      }, 4000)
    },
    onError: (error: any) => {
      if (error.response.status === HTTP_STATUS.BAD_REQUEST) {
        setMessage(error.response.data.message)
        setStatus('success_before')
      }
      if (error.response.status !== HTTP_STATUS.BAD_REQUEST) {
        setMessage(error.response.data.message)
        setStatus('error')
      }
    }
  })

  const navigate = useNavigate()

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'success_before'>('loading')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (queryConfig.email_verify_token) {
      verifyEmailMutation.mutate({ email_verify_token: queryConfig.email_verify_token })
    }
  }, [])

  return (
    <div className='flex items-center justify-center h-screen bg-[#0F0F0F] px-4'>
      <div className='bg-[#1A1A1A] shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-solid border-[#2E2E2E]'>
        {status === 'loading' && (
          <div className='flex flex-col items-center'>
            <Loader2 className='w-[45px] h-[45px] text-cyan-400 animate-spin' />
            <h2 className='mt-3 text-[15px] font-semibold text-gray-200'>Verifying email...</h2>
          </div>
        )}
        {status === 'success_before' && (
          <div className='flex flex-col items-center'>
            <CheckCircle className='w-[45px] h-[45px] text-green-400' />
            <h2 className='mt-4 text-2xl font-bold text-green-400'>{message}</h2>
          </div>
        )}
        {status === 'success' && (
          <div className='flex flex-col items-center'>
            <CheckCircle className='w-[45px] h-[45px] text-green-400' />
            <h2 className='mt-4 text-2xl font-bold text-green-400'>{message}</h2>
            <p className='mt-3 text-gray-400 text-sm'>Redirecting to home page...</p>
          </div>
        )}
        {status === 'error' && (
          <div className='flex flex-col items-center'>
            <XCircle className='w-[45px] h-[45px] text-red-400' />
            <h2 className='mt-4 text-[20px] font-bold text-red-400'>Authentication failed!</h2>
            <p className='mt-3 text-gray-400 text-[15px]'>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
