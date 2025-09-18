import { useQuery } from '@tanstack/react-query'
import UserCard from '../UserCard'
import { userApi } from '../../apis/user.api'
import type { QueryConfig } from '../../configs/query.config'
import useQueryParam from '../../hooks/useQueryParam'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { useForm } from 'react-hook-form'

function SideBarRight() {
  const params = useParams()
  const location = useLocation()

  const queryParams: QueryConfig = useQueryParam()

  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 5,
    page: queryParams.page || 1
  }

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const userSuggestionsQuery = useQuery({
    queryKey: ['user_not_follow_suggestions', params.user_id],
    queryFn: () => userApi.getUserSuggestions(queryConfig)
  })

  const pathName = location.pathname

  const handleSubmitSearch = handleSubmit((data) => {
    if (data.key.trim()) {
      navigate(`${PATH.EXPLORE}?key=${encodeURIComponent(data.key.trim())}`)
    }
  })

  return (
    <aside className='hidden lg:block w-[330px] px-4 pb-4 pt-[6px]'>
      <div className='sticky top-0 pt-[10px]'>
        {pathName !== PATH.EXPLORE && (
          <form
            onSubmit={handleSubmitSearch}
            className='flex items-center border border-solid border-[#2E3235] mb-4 rounded-full focus-within:border-[#1d9bf0] focus-within:ring-1 focus-within:ring-[#1d9bf0] overflow-hidden cursor-text'
          >
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
                className='lucide lucide-search-icon lucide-search w-[28px] h-4 text-[#a9a9a9]'
              >
                <path d='m21 21-4.34-4.34' />
                <circle cx='11' cy='11' r='8' />
              </svg>
            </button>
            <input
              {...register('key')}
              type='text'
              placeholder='Search user'
              className='flex-1 text-[13px] outline-none border-none bg-transparent placeholder:text-[13px] placeholder:text-[#a9a9a9] py-[10px] pr-4'
            />
          </form>
        )}
        {pathName !== PATH.CONNECT && (
          <div className='bg-gray-900 rounded-xl p-4 bg-transparent border border-solid border-[#2E3235]'>
            <h2 className='font-bold mb-2 text-[20px]'>Who to follow</h2>
            <div className='flex flex-col mt-3'>
              {userSuggestionsQuery.data?.data.data.users &&
                userSuggestionsQuery.data?.data.data.users.map((user: any) => (
                  <UserCard key={user.unfollowed_users._id} user={user.unfollowed_users} />
                ))}
            </div>
            <Link to={PATH.CONNECT} className='block text-[13px] text-[#1d9bf0] mt-2 hover:underline font-semibold'>
              Show more
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}

export default SideBarRight
