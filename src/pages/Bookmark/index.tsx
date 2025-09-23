import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { bookmarkApi } from '../../apis/bookmark.api'
import type { PostType } from '../../types/post.type'
import Post from '../../components/Post'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../../components/Loading'

function Bookmark() {
  const queryClient = useQueryClient()
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit ?? 15,
    page: queryParams.page ?? 1
  }

  const bookmarkQuery = useInfiniteQuery({
    queryKey: ['bookmarks', queryConfig],
    queryFn: ({ pageParam = 1 }) => bookmarkApi.getBookmarks({ page: pageParam, limit: queryConfig.limit }),
    keepPreviousData: true,
    getNextPageParam: (lastpage) => {
      const { pagination } = lastpage.data.data
      return pagination.page < pagination.total_page ? pagination.page + 1 : undefined
    }
  })

  const { data, isLoading, fetchNextPage, hasNextPage } = bookmarkQuery

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
        <h3 className='absolute top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No bookmarks
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
          <Post key={post._id} post={post} queryClient={queryClient} />
        ))}
      </InfiniteScroll>
    )
  }

  return (
    <div className='pb-[45px] md:pb-[5px]'>
      {/* Header */}
      <div className='px-4 pt-2 pb-2 flex items-center border-b border-solid border-[#2E3235] sticky top-0 left-0 right-0 bg-black z-20'>
        <Link to={PATH.HOME} className='py-3 pr-3'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5' fill='#eff3f4'>
            <g>
              <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
            </g>
          </svg>
        </Link>
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>Bookmarks</h3>
      </div>
      {/* Posts */}
      {renderContent()}
    </div>
  )
}

export default Bookmark
