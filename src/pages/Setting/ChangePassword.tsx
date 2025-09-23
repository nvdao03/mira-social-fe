import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { useForm } from 'react-hook-form'
import InputAuth from '../../components/InputAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaChangePassword, type ChangePasswordFormValues } from '../../utils/validation'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'
import { HTTP_STATUS } from '../../constants/httpStatus'
import { toast } from 'react-toastify'
import { MESSAGE } from '../../constants/message'

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset
  } = useForm({
    resolver: yupResolver(schemaChangePassword)
  })

  const current_password = watch('current_password')
  const new_password = watch('new_password')
  const confirm_password = watch('confirm_password')

  const isEnable = current_password !== '' && new_password !== '' && confirm_password !== ''

  const changePasswordMutation = useMutation({
    mutationFn: (body: ChangePasswordFormValues) => authApi.changePassword(body),
    onSuccess: () => {
      reset()
      toast.success(MESSAGE.CHANGE_PASSWORD_SUCCESSFULLY)
    },
    onError: (error: any) => {
      if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
        const formError = error.response.data
        setError('current_password', {
          message: formError.message
        })
      }
    }
  })

  const handleChangePassword = handleSubmit((data: ChangePasswordFormValues) => {
    changePasswordMutation.mutate(data)
  })

  return (
    <div className='relative pb-[45px] md:pb-[5px]'>
      <div className='px-4 pt-2 pb-2 flex items-center border-b border-solid border-[#2E3235] sticky top-0 left-0 right-0 bg-black z-20'>
        <Link to={PATH.SETTINGS} className='py-3 pr-3'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5' fill='#eff3f4'>
            <g>
              <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
            </g>
          </svg>
        </Link>
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>Change your password</h3>
      </div>
      <form className='flex flex-col' onSubmit={handleChangePassword}>
        <InputAuth
          id='email'
          classNameWrap='px-4 mt-5'
          classNameInput='w-full text-[14px] placeholder:text-[14px] bg-transparent py-[15px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
          type='password'
          classNameError='text-red-500 text-left mt-2 text-[13px] h-3'
          name='current_password'
          register={register}
          placeholder='Current password'
          errorMessage={errors.current_password?.message}
        />
        <InputAuth
          id='email'
          classNameWrap='px-4 mt-3'
          classNameInput='w-full text-[14px] placeholder:text-[14px] bg-transparent py-[15px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
          type='password'
          classNameError='text-red-500 text-left mt-2 text-[13px] h-3'
          name='new_password'
          register={register}
          placeholder='New password'
          errorMessage={errors.new_password?.message}
        />
        <InputAuth
          id='email'
          classNameWrap='px-4 mt-3'
          classNameInput='w-full text-[14px] placeholder:text-[14px] bg-transparent py-[15px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
          type='password'
          classNameError='text-red-500 text-left mt-2 text-[13px] h-3'
          name='confirm_password'
          register={register}
          placeholder='Confirm password'
          errorMessage={errors.confirm_password?.message}
        />
        <div className='flex justify-end px-4 mt-4'>
          <button
            disabled={!isEnable}
            className={`px-4 py-2.5 ml-3 rounded-full text-[#0F1410] font-semibold ${!isEnable ? 'bg-[#787A74] cursor-not-allowed' : ' bg-[#FFFFFF]  hover:bg-gray-200 cursor-pointer'}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
