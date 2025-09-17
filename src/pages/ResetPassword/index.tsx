import { useForm } from 'react-hook-form'
import Logo from '../../assets/imgs/logo.png'
import InputAuth from '../../components/InputAuth'
import { schemaResetPassword } from '../../utils/validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { MESSAGE } from '../../constants/message'
import { PATH } from '../../constants/path'

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaResetPassword)
  })

  const resetPasswordMutation = useMutation({
    mutationFn: (body: { forgot_password_token: string; password: string; confirm_password: string }) => {
      return authApi.resetPassword(body)
    },
    onSuccess: () => {
      toast.success(MESSAGE.CHANGE_PASSWORD_SUCCESSFULLY)
      navigate(PATH.SIGN_IN)
    }
  })

  const location = useLocation()
  const navigate = useNavigate()

  const forgot_password_token = location.state.forgot_password_token

  const handleSubmitForm = handleSubmit((data: { password: string; confirm_password: string }) => {
    resetPasswordMutation.mutate({
      password: data.password,
      confirm_password: data.confirm_password,
      forgot_password_token
    })
  })

  return (
    <div className='container h-[100vh]'>
      <div className='h-full flex justify-center items-center flex-col -mt-[20px] md:-mt-[50px]'>
        <div className='text-center w-full sm:w-[350px] text-white'>
          <img src={Logo} alt='logo' className='w-[45px] h-[45px] mx-auto' />
          <h1 className='mt-4 text-[20px] text-color_auth font-semibold'>Reset password</h1>
          <form className='mt-7' onSubmit={handleSubmitForm}>
            <div className='text-[14px]'>
              <label className='text-color_auth text-left block mb-2'>Password</label>
              <InputAuth
                id='password'
                classNameInput='w-full bg-transparent py-[10px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
                type='password'
                classNameError='text-red-500 text-left mt-2 text-[13px] h-3'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className='text-[14px] mt-3'>
              <label className='text-color_auth text-left block mb-2'>Confirm password</label>
              <InputAuth
                id='confirm_password'
                classNameInput='w-full bg-transparent py-[10px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
                type='password'
                classNameError='text-red-500 text-left mt-2 text-[13px] h-3'
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
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
