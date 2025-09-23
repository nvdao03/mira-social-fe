import { useForm } from 'react-hook-form'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { searchApi } from '../../apis/search.api'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { UserSuggestion } from '../../types/user.type'
import Loading from '../../components/Loading'
import UserCardFollow from '../Follow/components/UserCardFollow'
import InfiniteScroll from 'react-infinite-scroll-component'
import useDebounce from '../../hooks/useDebounce'

export default function Explore() {
  const { register, watch } = useForm()
  const key = watch('key')
  const debounceKey = useDebounce(key, 500)

  const queryParam: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParam.limit || 10,
    page: queryParam.page || 1,
    key: queryParam.key || debounceKey
  }

  const searchQuery = useInfiniteQuery({
    queryKey: ['search', queryConfig],
    queryFn: ({ pageParam = queryConfig.page }) => {
      return searchApi.search({
        page: pageParam,
        limit: queryConfig.limit,
        key: queryConfig.key as string
      })
    },
    keepPreviousData: true,
    getNextPageParam: (lastpage) => {
      const { pagination } = lastpage.data.data
      return pagination.page < pagination.total_page ? pagination.page + 1 : undefined
    }
  })

  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = searchQuery

  const users = data?.pages.flatMap((page) => page.data.data.users) || []

  const renderContent = () => {
    if (isLoading || isFetching) {
      return (
        <div className='flex items-center justify-center h-[100vh]'>
          <Loading />
        </div>
      )
    }
    if (users.length === 0) {
      return (
        <h3 className='absolute top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No users
        </h3>
      )
    }
    return (
      <div className='px-4'>
        <InfiniteScroll
          dataLength={users.length}
          hasMore={!!hasNextPage}
          next={fetchNextPage}
          loader={
            <div className='flex justify-center items-center py-4 min-h-[80px]'>
              <Loading />
            </div>
          }
        >
          {users.map((user: UserSuggestion) => (
            <UserCardFollow key={user._id} user={user} type='' />
          ))}
        </InfiniteScroll>
      </div>
    )
  }

  return (
    <div className='relative pb-[45px] md:pb-[5px]'>
      {/* Header */}
      <div className='px-4 mt-4 flex items-center sticky top-0 left-0 right-0 bg-black z-20'>
        <form className='w-full flex items-center border border-solid border-[#2E3235] rounded-full focus-within:border-[#1d9bf0] focus-within:ring-1 focus-within:ring-[#1d9bf0] overflow-hidden cursor-text'>
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
            placeholder='Search'
            className='flex-1 text-[13px] outline-none border-none bg-transparent placeholder:text-[13px] placeholder:text-[#a9a9a9] py-[10px] pr-4'
          />
        </form>
      </div>
      {/* List User */}
      {renderContent()}
    </div>
  )
}
