import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { PATH } from '../../constants/path'
import registerBg from '../../assets/imgs/register/register-bg.png'
import registerIcon from '../../assets/imgs/register/register-icon.png'
import registerIconTablet from '../../assets/imgs/register/register-icon-tablet.png'
import InputAuth from '../../components/InputAuth'
import { countrys } from '../../data/countrys'
import { useMutation } from '@tanstack/react-query'
import { schemaSignUp, type SignUpFormValues } from '../../utils/validation'
import { authApi } from '../../apis/auth.api'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { toast } from 'react-toastify'
import { MESSAGE } from '../../constants/message'
import { HTTP_STATUS } from '../../constants/httpStatus'

type SignUpFormData = SignUpFormValues

function SignUp() {
  const { setIsauthenticated, setRefreshToken, setAvatar, setUsername, setName } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: yupResolver(schemaSignUp),
    defaultValues: {
      country: 'Viet Nam'
    }
  })

  const signUpMutation = useMutation({
    mutationFn: (body: SignUpFormData) => authApi.signUp(body)
  })

  const handleSubmuitForm = handleSubmit((data: SignUpFormData) => {
    signUpMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success(MESSAGE.CREATE_ACCOUNT_SUCCESSFULLY)
        setIsauthenticated(true)
        setRefreshToken(response.data.data.refresh_token)
        setAvatar(response.data.data.user.avatar)
        setUsername(response.data.data.user.username)
        setName(response.data.data.user.name)
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
          }
          if (formError.password) {
            setError('password', {
              message: formError.password.message,
              type: 'Server'
            })
          }
          if (formError.username) {
            setError('username', {
              message: formError.username.message,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  return (
    <div>
      <div className='grid grid-cols-12 h-screen'>
        <div
          style={{ backgroundImage: `url(${registerBg})` }}
          className='hidden md:flex flex-col md:col-span-6 relative bg-cover bg-center h-screen px-6 pt-[60px] lg:px-[80px] lg:pt-[80px]'
        >
          <div className='text-color_auth'>
            <h1 className='mb-3 text-[32px] font-semibold leading-[1.5]'>Create your free account</h1>
            <p className='text-[15px] leading-[1.5]'>Explore great experiences on our platform.</p>
          </div>
          <picture className='w-full mt-auto'>
            <source srcSet={registerIcon} media='(min-width: 1280px)' />
            <img className='w-full' src={registerIconTablet} alt='' />
          </picture>
        </div>
        <div className='col-span-12 relative md:col-span-6 bg-white px-6 pt-[60px] lg:px-[80px] md:pt-[80px]'>
          <div className='flex items-center justify-end absolute top-4 right-[24px] lg:right-[80px] gap-x-2 text-[#24292F] text-[14px]'>
            <span>Already have an account?</span>
            <Link className='underline' to={PATH.SIGN_IN}>
              Sign in
            </Link>
          </div>
          <div className='mx-auto max-w-[500px] w-full'>
            <h2 className='text-[#24292F] text-[20px] font-semibold mb-6 text-center md:text-left'>Sign up to Mira</h2>
            <form className='flex flex-col gap-y-4' onSubmit={handleSubmuitForm}>
              <div>
                <label htmlFor='email' className='text-[14px] text-[#1F2328] cursor-pointer'>
                  Email
                </label>
                <InputAuth
                  id='email'
                  classNameInput='bg-transparent text-black py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8] mt-2 placeholder:text-[#CCCCC] text-[14px]'
                  type='text'
                  placeholder='Email'
                  classNameError='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'
                  register={register}
                  name='email'
                  errorMessage={errors.email?.message}
                />
              </div>
              <div>
                <label htmlFor='password' className='text-[14px] text-[#1F2328] cursor-pointer'>
                  Password
                </label>
                <InputAuth
                  id='password'
                  classNameInput='text-black py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8] mt-2 placeholder:text-[#CCCCC] text-[14px]'
                  type='password'
                  placeholder='Password'
                  classNameError='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'
                  register={register}
                  name='password'
                  errorMessage={errors.password?.message}
                />
              </div>
              <div>
                <label htmlFor='username' className='text-[14px] text-[#1F2328] cursor-pointer'>
                  Username
                </label>
                <InputAuth
                  id='username'
                  classNameInput='text-black py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8] mt-2 placeholder:text-[#CCCCC] text-[14px]'
                  type='username'
                  placeholder='Username'
                  classNameError='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'
                  register={register}
                  name='username'
                  errorMessage={errors.username?.message}
                />
              </div>
              <div>
                <label className='text-[14px] text-[#1F2328]'>Your Country/Region</label>
                <div>
                  <select
                    {...register('country')}
                    className='text-black text-[14px] py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 mt-2 placeholder:text-[#CCCCC] cursor-pointer'
                  >
                    {countrys.sort().map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <p className='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'></p>
                </div>
              </div>
              <div>
                <button className='flex items-center justify-center gap-x-2 bg-[#1F2328] py-[17px] px-3 w-full rounded-[5px] text-color_auth font-semibold hover:opacity-90 cursor-pointer transition-all duration-300 ease-in-out'>
                  Create account
                  <span>
                    <svg
                      aria-hidden='true'
                      height='16'
                      viewBox='0 0 16 16'
                      version='1.1'
                      width='16'
                      data-view-component='true'
                      fill='#FFF'
                    >
                      <path d='M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z'></path>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
            <p className='text-[14px] mt-[12px] text-[#57606A] leading-[1.5]'>
              By creating an account, you agree to the{' '}
              <Link to={''} className='text-[#4493F8] underline'>
                Terms of Service
              </Link>
              . For more information about{' '}
              <Link to={''} className='text-[#4493F8] underline'>
                Mira's privacy
              </Link>{' '}
              practices, see the Mira Privacy{' '}
              <Link to={''} className='text-[#4493F8] underline'>
                Statement
              </Link>
              . We'll occasionally send you account-related emails.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
