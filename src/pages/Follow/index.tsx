import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Followers from './components/Followers'
import Followings from './components/Followings'

function Follow() {
  const params = useParams()
  const location = useLocation()
  const navidate = useNavigate()

  const type = location.state.type as string
  const name = location.state.name as string

  const [isActiveTab, setIsActiveTab] = useState<string>(type)

  return (
    <div className='relative pb-[45px] md:pb-[5px]'>
      {/* Header */}
      <div className='px-4 pt-2 flex items-center sticky top-0 left-0 right-0 bg-black z-20'>
        <div onClick={() => navidate(`/${params.user_id}`)} className='py-3 pr-3'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5' fill='#eff3f4'>
            <g>
              <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
            </g>
          </svg>
        </div>
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>{name}</h3>
      </div>
      {/* Tabs */}
      <div className='px-2 flex items-center justify-around gap-7 md:gap-[40px] lg:gap-[50px] border-b border-solid border-[#2E3235]'>
        {['Followers', 'Followings'].map((tab, index) => (
          <button
            onClick={() => setIsActiveTab(tab)}
            className={`flex-1 relative text-[#71767B] hover:bg-[#E7E9EA1A] transition-all duration-200 ease-in-out text-[14px] py-4 px-2 font-semibold ${isActiveTab === tab ? 'text-color_auth after:absolute after:bottom-0 after:left-[50%] after:-translate-x-1/2 after:w-full after:max-w-[70px] after:h-1 after:bg-[#1d9bf0] after:rounded-full' : ''}`}
            key={index}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Content */}
      <div>
        {isActiveTab === 'Followers' && <Followers user_id={params.user_id as string} type={'Followers'} />}
        {isActiveTab === 'Followings' && <Followings user_id={params.user_id as string} type={'Followings'} />}
      </div>
    </div>
  )
}

export default Follow
