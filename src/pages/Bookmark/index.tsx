import { Link } from 'react-router-dom'
import { PATH } from '../../constants/path'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { useQuery } from '@tanstack/react-query'
import { bookmarkApi } from '../../apis/bookmark.api'
import type { PostType } from '../../types/post.type'
import Post from '../../components/Post'

function Bookmark() {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 10,
    page: queryParams.page || 1
  }

  const bookmarkQuery = useQuery({
    queryKey: ['bookmarks', queryConfig],
    queryFn: () => bookmarkApi.getBookmarks(queryConfig)
  })

  const { data } = bookmarkQuery

  return (
    <div className='pb-[5px]'>
      {/* Header */}
      <div className='px-4 pt-2 pb-2 flex items-center border-b border-solid border-[#2E3235]'>
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
      {data?.data.data.posts && data.data.data.posts.map((post: PostType) => <Post key={post._id} post={post} />)}
    </div>
  )
}

export default Bookmark
