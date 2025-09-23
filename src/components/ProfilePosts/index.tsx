import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../apis/user.api'
import type { QueryConfig } from '../../configs/query.config'
import useQueryParam from '../../hooks/useQueryParam'
import type { PostType } from '../../types/post.type'
import Post from '../Post'
import { useParams } from 'react-router-dom'
import Loading from '../Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

function ProfilePosts() {
  const params = useParams()
  const queryClient = useQueryClient()
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 10,
    page: queryParams.page || 1
  }

  const postsUserQuery = useInfiniteQuery({
    queryKey: ['profile_posts', params.user_id],
    queryFn: ({ pageParam = queryConfig.page }) => {
      return userApi.getPostsProfile(params.user_id as string, { page: pageParam, limit: queryConfig.limit })
    },
    keepPreviousData: true,
    getNextPageParam: (lastpage) => {
      const { pagination } = lastpage.data.data
      return pagination.page < pagination.total_page ? pagination.page + 1 : undefined
    }
  })

  const { data, isLoading, fetchNextPage, hasNextPage } = postsUserQuery

  const posts = data?.pages.flatMap((page) => page.data.data.posts) || []

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='w-full flex items-center justify-center h-[100vh]'>
          <Loading />
        </div>
      )
    }
    if (posts.length === 0) {
      return (
        <h3 className='absolute mt-[50px] md:mt-[40px] xl:mt-[40px] top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No posts
        </h3>
      )
    }
    return (
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={!!hasNextPage}
        next={fetchNextPage}
        loader={
          <div className='flex justify-center items-center py-4 min-h-[80px]'>
            <Loading />
          </div>
        }
      >
        {posts.map((post: PostType) => (
          <Post post={post} key={post._id} queryClient={queryClient} />
        ))}
      </InfiniteScroll>
    )
  }

  return <div className='relative mt-1'>{renderContent()}</div>
}

export default ProfilePosts
