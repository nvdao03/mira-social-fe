import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { useQuery } from '@tanstack/react-query'
import { userApi } from '../../apis/user.api'
import UserCard from '../../components/UserCard'
import Loading from '../../components/Loading'

export default function Connect() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 20,
    page: queryParams.page || 1
  }

  const getUserSuggestionsQuery = useQuery({
    queryKey: ['user_suggestions_connect'],
    queryFn: () => userApi.getUserSuggestions(queryConfig),
    keepPreviousData: true
  })

  const { data, isLoading } = getUserSuggestionsQuery

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
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>Connect</h3>
      </div>
      {/* List Users */}
      <div className='px-4'>
        {isLoading && (
          <div className='flex justify-center items-center h-[100vh]'>
            <Loading />
          </div>
        )}
        {!isLoading && (
          <div className='flex flex-col'>
            {data?.data.data.users &&
              data?.data.data.users.map((user: any) => (
                <UserCard key={user.unfollowed_users._id} user={user.unfollowed_users} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
