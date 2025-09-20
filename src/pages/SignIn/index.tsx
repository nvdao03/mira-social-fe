import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import googleIcon from '../../assets/imgs/google.svg'
import Logo from '../../assets/imgs/logo.png'
import { PATH } from '../../constants/path'
import { schemaSignIn, type SignInFormValues } from '../../utils/validation'
import InputAuth from '../../components/InputAuth'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { MESSAGE } from '../../constants/message'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../contexts/app.context'
import { HTTP_STATUS } from '../../constants/httpStatus'
import useQueryParam from '../../hooks/useQueryParam'
import {
  saveAccessTokenFromLocalStorage,
  saveAvatarFromLocalStorage,
  saveIdFromLocalStorage,
  saveNameFromLocalStorage,
  saveRefreshTokenFromLocalStorage,
  saveUsernameFromLocalStorage
} from '../../utils/auth'

type SignInFromData = SignInFormValues

interface OauthParamsType {
  access_token: string
  avatar: string
  email: string
  id: string
  name: string
  refresh_token: string
  username: string
}

function SignIn() {
  const { setId, setIsauthenticated, setRefreshToken, setAvatar, setUsername, setName } = useContext(AppContext)
  const navigate = useNavigate()
  const params = useQueryParam()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver(schemaSignIn)
  })

  const signInMutation = useMutation({
    mutationFn: (body: SignInFromData) => authApi.signIn(body)
  })

  const handleSubmitForm = handleSubmit((data: SignInFromData) => {
    signInMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success(MESSAGE.LOGIN_SUCCESSFULLY)
        setIsauthenticated(true)
        setRefreshToken(response.data.data.refresh_token)
        setAvatar(response.data.data.user.avatar)
        setUsername(response.data.data.user.username)
        setName(response.data.data.user.name)
        setId(response.data.data.user.id)
        navigate(PATH.HOME)
      },
      onError: (error: any) => {
        if (error.response.status === HTTP_STATUS.UNPROCESSABLE_ENTITY) {
          const formError = error.response.data.errors
          if (formError.email) {
            setError('email', {
              message: formError.email.message,
              type: 'Server'
            })
            setError('password', {
              message: formError.email.message,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  useEffect(() => {
    if (!params) return
    if (params) {
      const data = params as unknown as OauthParamsType
      const { access_token, avatar, id, name, refresh_token, username } = data

      if (!access_token || !id) {
        return
      }

      setIsauthenticated(true)
      saveAccessTokenFromLocalStorage(access_token)
      saveRefreshTokenFromLocalStorage(refresh_token)
      saveIdFromLocalStorage(id)
      saveAvatarFromLocalStorage(avatar)
      saveNameFromLocalStorage(name)
      saveUsernameFromLocalStorage(username)

      setRefreshToken(refresh_token)
      setId(id)
      setAvatar(avatar)
      setName(name)
      setUsername(username)

      navigate(PATH.HOME)
    }
  }, [params])

  const getGoogleOauthUrl = () => {
    const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
    const URL = 'https://accounts.google.com/o/oauth2/auth'
    const query = new URLSearchParams({
      client_id: VITE_GOOGLE_CLIENT_ID,
      redirect_uri: VITE_GOOGLE_REDIRECT_URI,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ].join(' '),
      response_type: 'code',
      prompt: 'consent'
    })
    return `${URL}?${query.toString()}`
  }

  return (
    <div className='container h-[100vh]'>
      <div className='h-full flex justify-center items-center flex-col -mt-[20px] md:-mt-[50px]'>
        <div className='text-center w-full sm:w-[350px] text-white'>
          <img src={Logo} alt='logo' className='w-[45px] h-[45px] mx-auto' />
          <h1 className='mt-4 text-[20px] text-color_auth font-semibold'>Sign in to Mira</h1>
          <form className='mt-7' onSubmit={handleSubmitForm}>
            <div className='text-[14px]'>
              <label className='text-color_auth text-left block mb-2'>Email address</label>
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
            <div className='mt-[10px] text-[14px]'>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-color_auth text-left block'>Password</label>
                <Link to={PATH.FORGOT_PASSWORD} className='text-[#4493F8] hover:underline'>
                  Forgot password?
                </Link>
              </div>
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
            <div className=''>
              <button className='w-full py-[13px] px-4 bg-[#238636] rounded-[5px] mt-[10px] text-[14px] font-semibold'>
                Sign in
              </button>
              <div className='flex items-center justify-center mt-4 text-color_auth'>
                <hr className='w-full bg-[#3d444d]' />
                <span className='px-4 text-[15px]'>or</span>
                <hr className='w-full bg-[#3d444d]' />
              </div>
              <Link
                to={getGoogleOauthUrl()}
                className='w-full flex items-center justify-center gap-x-2 py-[12px] px-4 bg-[#212830] rounded-[5px] mt-4 text-[14px] font-semibold'
              >
                <img src={googleIcon} alt='google' />
                Continue with Google
              </Link>
            </div>
          </form>
          <div className='text-[14px] text-color_auth mt-5'>
            <span>New to Mira?</span>
            <Link to={PATH.SIGN_UP} className='text-[#4493F8] ml-1 hover:underline'>
              Create an account
            </Link>
          </div>
        </div>
      </div>
      <div className='fixed w-full bg-[#151B23] py-[20px] left-0 right-0 bottom-0 text-[#9198A1] text-center text-[14px] text-wrap leading-[1.5]'>
        <div className='container flex justify-center leading-[1.5] gap-2 flex-col'>
          <span className='block'>Copyright © 2025. Bản quyền website Nguyễn Văn Đạo</span>
        </div>
      </div>
    </div>
  )
}

export default SignIn
