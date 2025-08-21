import { Link } from 'react-router-dom'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import Logo from '../../assets/imgs/logo.png'
import { PATH } from '../../constants/path'
import { useState } from 'react'
import { sidebars } from '../../data/sidebars'

function SideBar() {
  const [path, setPath] = useState<string>(PATH.HOME)

  return (
    <aside className='hidden md:flex md:flex-col w-20 lg:w-64 border-solid border-r border-[#2E3235] p-4 sticky top-0 h-screen'>
      <Link to={PATH.HOME} className='mb-8 lg:mb-6 lg:ml-3'>
        <img src={Logo} className='w-[37px] h-[37px]' alt='logo' />
      </Link>
      <nav className='space-y-7 lg:space-y-4'>
        {sidebars.map((sidebar) => (
          <Link
            to={sidebar.path}
            key={sidebar.id}
            onClick={() => setPath(sidebar.path)}
            className={`flex items-center space-x-3 hover:bg-[#E7E9EA1A] rounded-full lg:px-3 lg:py-2 ${sidebar.path === path ? 'text-[#1d9bf0] font-semibold' : ''}`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 640 640'
              fill='none'
              stroke={sidebar.path === path ? '#1d9bf0' : '#FFFFFF'}
              strokeWidth={40}
              className='w-7 h-7'
            >
              {sidebar.icon}
            </svg>
            <span className='hidden lg:block'>{sidebar.name}</span>
          </Link>
        ))}
      </nav>
      <div className='mt-auto flex items-center gap-x-3 lg:p-3'>
        <div className='w-full lg:w-10 lg:h-10'>
          <img src={AvatarDefault} alt='avatar' className='w-full h-full object-center rounded-full' />
        </div>
        <div className='text-[15px] hidden lg:flex flex-col justify-between h-full'>
          <span className='font-semibold'>Nguyễn Văn Đạo</span>
          <span className='text-[#71767B] text-xs'>@30072003</span>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
