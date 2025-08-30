import { Link, useParams } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import postApi from '../../apis/post.api'
import Post from '../../components/Post'
import type { PostType } from '../../types/post.type'

function PostDetail() {
  const param = useParams()
  const queryClient = useQueryClient()

  const postQuery = useQuery({
    queryKey: ['post', param.post_id],
    queryFn: () => postApi.getPostDetail(param.post_id as string),
    keepPreviousData: true
  })

  const { data } = postQuery

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
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>Post</h3>
      </div>
      {/* Post */}
      <div className=''>
        {data?.data.data &&
          data.data.data.map((post: PostType) => {
            return <Post key={post._id} post={post} queryClient={queryClient} />
          })}
      </div>
      {/* Submtit comment */}
    </div>
  )
}

export default PostDetail
