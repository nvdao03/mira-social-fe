import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { useInfiniteQuery } from '@tanstack/react-query'
import { userApi } from '../../apis/user.api'
import UserCard from '../../components/UserCard'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function Connect() {
  const getUserSuggestionsQuery = useInfiniteQuery({
    queryKey: ['user_suggestions_connect'],
    queryFn: ({ pageParam = 1 }) => {
      return userApi.getUserSuggestions({
        page: pageParam,
        limit: 15
      })
    },
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data.data
      return pagination.page < pagination.total_page ? pagination.page + 1 : undefined
    }
  })

  const { data, isLoading, fetchNextPage, hasNextPage } = getUserSuggestionsQuery

  const userList = data?.pages.flatMap((page) => page.data.data.users) || []

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='w-full flex items-center justify-center h-[100vh]'>
          <Loading />
        </div>
      )
    }
    if (userList.length === 0) {
      return (
        <h3 className='absolute mt-[50px] md:mt-[40px] xl:mt-[40px] top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No users
        </h3>
      )
    }
    return (
      <InfiniteScroll
        dataLength={userList.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className='flex justify-center items-center py-4 min-h-[80px]'>
            <Loading />
          </div>
        }
        // endMessage={<p className='text-center text-[#71767B] py-4'>End 👀</p>}
      >
        <div className='flex flex-col'>
          {userList.map((user: any) => (
            <UserCard key={user.unfollowed_users._id} user={user.unfollowed_users} />
          ))}
        </div>
      </InfiniteScroll>
    )
  }

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
      <div className='px-4'>{renderContent()}</div>
    </div>
  )
}
