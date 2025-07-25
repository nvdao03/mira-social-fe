import { Link } from 'react-router-dom'
import googleIcon from '../../assets/imgs/google.svg'
import Logo from '../../components/Logo'
import { PATH } from '../../constants/path'

function Login() {
  return (
    <div className='container h-[100vh]'>
      <div className='h-full flex justify-center items-center flex-col -mt-[20px] md:-mt-[50px]'>
        <div className='text-center w-full sm:w-[350px] text-white'>
          <Logo />
          <h1 className='mt-4 text-[20px] text-color_auth font-semibold'>Sign in to Mira</h1>
          <form className='mt-7'>
            <div className='text-[14px]'>
              <label className='text-color_auth text-left block mb-2'>Email address</label>
              <div>
                <input
                  type='email'
                  className='w-full bg-transparent py-[10px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
                />
                <p className='text-red-500 text-left mt-2 text-[13px] h-3'></p>
              </div>
            </div>
            <div className='mt-[10px] text-[14px]'>
              <div className='flex justify-between items-center mb-2'>
                <label className='text-color_auth text-left block'>Password</label>
                <Link to={PATH.FORGOT_PASSWORD} className='text-[#4493F8] hover:underline'>
                  Forgot password?
                </Link>
              </div>
              <div>
                <input
                  type='password'
                  className='w-full bg-transparent py-[10px] px-3 border border-[#3d444d] rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8]'
                />
                <p className='text-red-500 text-left mt-2 text-[13px] h-3'></p>
              </div>
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
                to={''}
                className='w-full flex items-center justify-center gap-x-2 py-[12px] px-4 bg-[#212830] rounded-[5px] mt-4 text-[14px] font-semibold'
              >
                <img src={googleIcon} alt='google' />
                Continue with Google
              </Link>
            </div>
          </form>
          <div className='text-[14px] text-color_auth mt-5'>
            <span>New to Mira?</span>
            <Link to={PATH.REGISTER} className='text-[#4493F8] ml-1 hover:underline'>
              Create an account
            </Link>
          </div>
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

export default Login
