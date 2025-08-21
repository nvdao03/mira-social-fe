import UserCard from '../UserCard'

function SideBarRight() {
  return (
    <aside className='hidden lg:block w-[330px] px-4 pb-4 pt-[6px]'>
      <div className='sticky top-0 pt-[10px]'>
        <form className='flex items-center border border-solid border-[#2E3235] mb-4 rounded-full focus-within:border-[#1d9bf0] focus-within:ring-1 focus-within:ring-[#1d9bf0] overflow-hidden cursor-text'>
          <button className='pl-2 py-[11px] overflow-hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-search-icon lucide-search w-[28px] h-4'
            >
              <path d='m21 21-4.34-4.34' />
              <circle cx='11' cy='11' r='8' />
            </svg>
          </button>
          <input
            type='text'
            placeholder='Search'
            className='flex-1 text-[13px] outline-none border-none bg-transparent placeholder:text-[13px] placeholder:text-white py-[10px] pr-4'
          />
        </form>
        <div className='bg-gray-900 rounded-xl p-4 bg-transparent border border-solid border-[#2E3235]'>
          <h2 className='font-bold mb-2 text-[20px]'>Who to follow</h2>
          <div className='flex flex-col mt-3'>
            <UserCard />
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideBarRight
