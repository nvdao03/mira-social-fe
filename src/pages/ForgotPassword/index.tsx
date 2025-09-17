import { useForm } from 'react-hook-form'
import InputAuth from '../../components/InputAuth'
import Logo from '../../assets/imgs/logo.png'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaForgotPassword, type ForgotPasswordFormValues } from '../../utils/validation'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'

type ForgotPasswordFromData = ForgotPasswordFormValues

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm({
    resolver: yupResolver(schemaForgotPassword)
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: ForgotPasswordFromData) => authApi.forgotPassword(body),
    onSuccess: () => {
      setIsSuccess(true)
      reset({ email: '' })
    },
    onError: (error: any) => {
      setIsSuccess(false)
      const message = error.response.data.message
      setError('email', {
        message: message,
        type: 'Server'
      })
    }
  })

  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmitForm = handleSubmit((data: ForgotPasswordFromData) => {
    forgotPasswordMutation.mutate(data)
  })

  return (
    <div className='container h-[100vh]'>
      <div className='h-full flex justify-center items-center flex-col -mt-[20px] md:-mt-[50px]'>
        <div className='text-center w-full sm:w-[350px] text-white'>
          <img src={Logo} alt='logo' className='w-[45px] h-[45px] mx-auto' />
          <h1 className='mt-4 text-[20px] text-color_auth font-semibold'>Forgot password</h1>
          {isSuccess && (
            <p className='mt-3 text-[14px] text-green-500 leading-[1.5] font-semibold'>
              Please check your email to confirm password change.
            </p>
          )}
          <form className='mt-5' onSubmit={handleSubmitForm}>
            <div className='text-[14px]'>
              <label className='text-color_auth text-left block mb-3'>Email address</label>
              <InputAuth
                id='email'
                classNameInput='w-full bg-transparent py-[10px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
                type='email'
                classNameError='text-red-500 text-left mt-2 text-[13px] h-3'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              />
            </div>
            <div className=''>
              <button className='w-full py-[13px] px-4 bg-[#238636] rounded-[5px] mt-[10px] text-[14px] font-semibold'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='fixed w-full bg-[#151B23] py-[20px] left-0 right-0 bottom-0 text-[#9198A1] text-center text-[14px] text-wrap leading-[1.5]'>
        <div className='container'>
          <span>Copyright © 2025. Bản quyền website Nguyễn Văn Đạo</span>
        </div>
      </div>
    </div>
  )
}
