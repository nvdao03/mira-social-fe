import registerBg from '../../assets/imgs/register/register-bg.png'
import registerIcon from '../../assets/imgs/register/register-icon.png'
import registerIconTablet from '../../assets/imgs/register/register-icon-tablet.png'
import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'

function Register() {
  return (
    <div className=''>
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
            <Link className='underline' to={PATH.LOGIN}>
              Sign in
            </Link>
          </div>
          <div className='mx-auto max-w-[500px] w-full'>
            <h2 className='text-[#24292F] text-[20px] font-semibold mb-6 text-center md:text-left'>Sign up to Mira</h2>
            <form>
              <div>
                <label htmlFor='' className='text-[14px] text-[#1F2328]'>
                  Email
                </label>
                <div>
                  <input
                    type='email'
                    placeholder='Email'
                    className='py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8] mt-2 placeholder:text-[#CCCCC] text-[14px]'
                  />
                  <p className='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'></p>
                </div>
              </div>
              <div className='mt-[10px]'>
                <label htmlFor='' className='text-[14px] text-[#1F2328]'>
                  Password
                </label>
                <div>
                  <input
                    type='password'
                    placeholder='Password'
                    className='py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8] mt-2 placeholder:text-[#CCCCC] text-[14px]'
                  />
                  <p className='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'></p>
                </div>
              </div>
              <div className='mt-[10px]'>
                <label htmlFor='' className='text-[14px] text-[#1F2328]'>
                  Username
                </label>
                <div>
                  <input
                    type='text'
                    placeholder='Username'
                    className='py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#4493F8] mt-2 placeholder:text-[#CCCCC] text-[14px]'
                  />
                  <p className='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'></p>
                </div>
              </div>
              <div className='mt-[10px]'>
                <label htmlFor='' className='text-[14px] text-[#1F2328]'>
                  Your Country/Region
                </label>
                <div>
                  <select
                    name=''
                    id=''
                    className='text-[14px] py-3 px-3 w-full bg-white border border-[#d1d9e0] border-solid rounded-[5px] focus:outline-none focus:border-[#4493F8] focus:ring-1 focus:ring-[#25292E] mt-2 placeholder:text-[#CCCCC] cursor-pointer'
                  >
                    <option value='VN' defaultChecked>
                      Viet Nam
                    </option>
                    <option value='CA'>Canada</option>
                    <option value='GB'>United Kingdom</option>
                    <option value='AU'>Australia</option>
                    <option value='IN'>India</option>
                    {/* Add more countries as needed */}
                  </select>
                  <p className='text-red-500 text-left text-[13px] mt-2 flex items-center gap-x-2'></p>
                </div>
              </div>
              <div className='mt-[10px]'>
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

export default Register
