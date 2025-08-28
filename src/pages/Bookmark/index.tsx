import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { bookmarkApi } from '../../apis/bookmark.api'
import type { PostType } from '../../types/post.type'
import Post from '../../components/Post'

function Bookmark() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 10,
    page: queryParams.page || 1
  }

  const queryClient = useQueryClient()

  const bookmarkQuery = useQuery({
    queryKey: ['bookmarks', queryConfig],
    queryFn: () => bookmarkApi.getBookmarks(queryConfig),
    keepPreviousData: true
  })

  const { data } = bookmarkQuery

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
      {data?.data.data.posts.length === 0 && (
        <h3 className='absolute top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No bookmarks
        </h3>
      )}
      {data?.data.data.posts && (
        <div className=''>
          {data.data.data.posts.map((post: PostType) => (
            <Post key={post._id} post={post} queryClient={queryClient} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookmark
