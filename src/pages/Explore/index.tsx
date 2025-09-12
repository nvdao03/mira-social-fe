import { useForm } from 'react-hook-form'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { searchApi } from '../../apis/search.api'
import { useQuery } from '@tanstack/react-query'
import type { UserSuggestion } from '../../types/user.type'
import Loading from '../../components/Loading'
import UserCardFollow from '../Follow/components/UserCardFollow'

export default function Explore() {
  const queryParam: QueryConfig = useQueryParam()

  const { register, watch } = useForm()

  const key = watch('key')

  const queryConfig: QueryConfig = {
    limit: queryParam.limit || 20,
    page: queryParam.page || 1,
    key: queryParam.key || key
  }

  const searchQuery = useQuery({
    queryKey: ['search', queryConfig],
    queryFn: () => searchApi.search(queryConfig),
    keepPreviousData: true
  })

  const { data, isLoading } = searchQuery

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
      <div className='px-4'>
        {isLoading && (
          <div className='flex items-center justify-center h-[100vh]'>
            <Loading />
          </div>
        )}
        {!isLoading &&
          data?.data.data &&
          data.data.data.users.map((user: UserSuggestion) => <UserCardFollow type='' key={user._id} user={user} />)}
      </div>
    </div>
  )
}
