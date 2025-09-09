import { Link } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import SideBarRight from '../../components/SideBarRight'
import { PATH } from '../../constants/path'
import { sidebars } from '../../data/sidebars'
import { useContext, useState } from 'react'
import { AppContext } from '../../contexts/app.context'

interface MainLayoutPropsType {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutPropsType) {
  const [path, setPath] = useState<string>(PATH.HOME)
  const { id } = useContext(AppContext)

  return (
    <>
      <div className='flex max-w-7xl mx-auto'>
        <SideBar />
        <main className='relative flex-1 border-r border-gray-700 min-h-screen'>{children}</main>
        <SideBarRight />
      </div>
      <nav className='fixed bottom-0 left-0 right-0 bg-black border-t border-solid border-[#2E3235] flex justify-around md:hidden py-2'>
        {sidebars.map((sidebar) => {
          if (sidebar.path === PATH.BOOKMARK || sidebar.path === PATH.UPLOAD) return null
          return (
            <Link
              to={sidebar.path === PATH.PROFILE ? `/${id}` : sidebar.path}
              onClick={() => setPath(sidebar.path)}
              key={sidebar.id}
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
          )
        })}
      </nav>
    </>
  )
}

export default MainLayout
