import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import Logo from '../../assets/imgs/logo.png'
import { PATH } from '../../constants/path'
import { useContext } from 'react'
import { sidebars } from '../../data/sidebars'
import { AppContext } from '../../contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'

function SideBar() {
  const {
    id,
    avatar,
    name,
    username,
    refreshToken,
    setId,
    setIsauthenticated,
    setRefreshToken,
    setAvatar,
    setUsername,
    setName
  } = useContext(AppContext)

  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()

  const logoutMutation = useMutation({
    mutationFn: (body: { refresh_token: string }) => authApi.logout(body)
  })

  const handleLogout = () => {
    logoutMutation.mutate(
      { refresh_token: refreshToken },
      {
        onSuccess: () => {
          setIsauthenticated(false)
          setRefreshToken('')
          setAvatar('')
          setUsername('')
          setName('')
          setId('')
          navigate(PATH.SIGN_IN)
        }
      }
    )
  }

  return (
    <aside className='hidden items-center w-20 lg:w-64 border-solid border-r border-[#2E3235] p-4 sticky top-0 h-screen md:flex md:flex-col lg:items-start'>
      <Link to={PATH.HOME} className='mb-8 lg:mb-6 lg:ml-3'>
        <img src={Logo} className='w-[37px] h-[37px]' alt='logo' />
      </Link>
      <nav className='space-y-7 lg:space-y-4'>
        {sidebars.map((sidebar) => (
          <Link
            to={sidebar.path === PATH.PROFILE ? `/${id}` : sidebar.path}
            key={sidebar.id}
            className={`flex items-center space-x-3 hover:bg-[#E7E9EA1A] rounded-full lg:px-3 lg:py-2 ${
              (sidebar.path === PATH.PROFILE ? params.user_id === id : sidebar.path === location.pathname)
                ? 'text-[#1d9bf0] font-semibold'
                : ''
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 640 640'
              fill='none'
              stroke={
                (sidebar.path === PATH.PROFILE ? params.user_id === id : sidebar.path === location.pathname)
                  ? '#1d9bf0'
                  : '#FFFFFF'
              }
              strokeWidth={40}
              className='w-7 h-7'
            >
              {sidebar.icon}
            </svg>
            <span className='hidden lg:block'>{sidebar.name}</span>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className={`lg:hidden w-full px-0 flex items-center md:space-x-3 lg:px-3 hover:bg-[#E7E9EA1A]`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 640 640'
            fill='none'
            stroke='#FFFFFF'
            strokeWidth={40}
            className='w-7 h-7'
          >
            <path d='M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z' />
          </svg>
        </button>
      </nav>
      <div className='relative mt-auto flex items-center gap-x-3 lg:p-3 lg:pt-[20px] transition-all rounded-[10px] duration-200 ease-in-out cursor-pointer group'>
        <div className='flex items-center gap-x-3'>
          <div className='w-10 h-10'>
            <img
              src={avatar && avatar.trim() !== '' ? avatar : AvatarDefault}
              alt='avatar'
              className='w-full h-full object-cover rounded-full'
            />
          </div>
          <div className='h-10 text-[15px] hidden lg:flex flex-col justify-between'>
            <span className='font-semibold max-w-[150px] truncate leading-[1.5]'>{name}</span>
            <span className='text-[#71767B] text-xs'>{username}</span>
          </div>
        </div>
        <div className='absolute bottom-[100%] left-0 z-50 w-60 rounded-lg hidden bg-black text-white lg:group-hover:block transition-all duration-200 ease-in-out shadow-[0_0_12px_rgba(255,255,255,0.15),0_0_24px_rgba(255,255,255,0.05)]'>
          <div className='text-sm'>
            <button
              onClick={handleLogout}
              className='w-full text-color_text text-left font-semibold p-4 cursor-pointer rounded-lg'
            >
              Log out {username}
            </button>
          </div>
          <div className='absolute left-1/2 top-[48px] border-t-8 border-r-8 border-solid border-black rotate-45 shadow-[0_0_12px_rgba(255,255,255,0.15),0_0_24px_rgba(255,255,255,0.05)]'></div>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
