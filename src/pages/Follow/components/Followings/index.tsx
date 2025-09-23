import { useInfiniteQuery } from '@tanstack/react-query'
import type { QueryConfig } from '../../../../configs/query.config'
import useQueryParam from '../../../../hooks/useQueryParam'
import { followApi } from '../../../../apis/follow.api'
import UserCardFollow from '../UserCardFollow'
import Loading from '../../../../components/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

interface PropTypes {
  user_id: string
  type: string
}

function Followings({ user_id, type }: PropTypes) {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    page: queryParams.page || 1,
    limit: queryParams.limit || 10
  }

  const getFollowingsQuery = useInfiniteQuery({
    queryKey: ['followings'],
    queryFn: ({ pageParam = queryConfig.page }) =>
      followApi.getFollowings(user_id as string, { page: pageParam, limit: queryConfig.limit }),
    keepPreviousData: true,
    getNextPageParam: (lastpage) => {
      const { pagination } = lastpage.data.data
      return pagination.page < pagination.total_page ? pagination.page + 1 : undefined
    }
  })

  const { data, isLoading, fetchNextPage, hasNextPage } = getFollowingsQuery

  const followings = data?.pages?.flatMap((page) => page.data.data.followings) || []

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='w-full flex items-center justify-center h-[100vh]'>
          <Loading />
        </div>
      )
    }
    if (followings.length === 0) {
      return (
        <h3 className='absolute mt-[50px] md:mt-[40px] xl:mt-[40px] top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No followings
        </h3>
      )
    }
    return (
      <InfiniteScroll
        dataLength={followings.length}
        hasMore={!!hasNextPage}
        next={fetchNextPage}
        loader={
          <div className='flex justify-center items-center py-4 min-h-[80px]'>
            <Loading />
          </div>
        }
      >
        {followings.map((user: any) => {
          return <UserCardFollow user={user.user_followings} key={user.user_followings} type={type} />
        })}
      </InfiniteScroll>
    )
  }

  return <div className='relative mt-1 px-4'>{renderContent()}</div>
}

export default Followings
