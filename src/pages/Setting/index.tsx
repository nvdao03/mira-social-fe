import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'

function Setting() {
  return (
    <div className='relative pb-[45px] md:pb-[5px]'>
      {/* Header */}
      <div className='px-4 pt-2 pb-2 flex items-center border-b border-solid border-[#2E3235] sticky top-0 left-0 right-0 bg-black z-20'>
        <Link to={PATH.HOME} className='py-3 pr-3'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5' fill='#eff3f4'>
            <g>
              <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
            </g>
          </svg>
        </Link>
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>Settings</h3>
      </div>
      <div className='flex flex-col'>
        <Link to={PATH.SETTINGS_PASSWORD} className='flex items-center p-4 cursor-pointer hover:bg-[#16181c]'>
          {/* svg */}
          <svg viewBox='0 0 24 24' aria-hidden='true' className='w-5 h-5 text-[#71767b]' fill='currentColor'>
            <g>
              <path d='M13 9.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm9.14 1.77l-5.83 5.84-4-1L6.41 22H2v-4.41l5.89-5.9-1-4 5.84-5.83 7.06 2.35 2.35 7.06zm-12.03 1.04L4 18.41V20h1.59l6.1-6.11 4 1 4.17-4.16-1.65-4.94-4.94-1.65-4.16 4.17 1 4z'></path>
            </g>
          </svg>
          {/* content */}
          <div className='flex flex-col items-start gap-1 ml-10'>
            <h4 className='text-color_auth text-[15px]'>Change your password</h4>
            <span className='text-[#71767B] text-[13px]'>Change your password at any time</span>
          </div>
          {/* arrow */}
          <svg viewBox='0 0 24 24' aria-hidden='true' className='w-5 h-5 text-[#71767b] ml-auto' fill='currentColor'>
            <g>
              <path d='M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z'></path>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Setting
