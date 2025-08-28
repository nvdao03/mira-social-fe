import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../apis/user.api'
import type { QueryConfig } from '../../configs/query.config'
import useQueryParam from '../../hooks/useQueryParam'
import type { PostType } from '../../types/post.type'
import Post from '../Post'
import { useParams } from 'react-router-dom'

function ProfilePosts() {
  const params = useParams()

  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 10,
    page: queryParams.page || 1
  }

  const queryClient = useQueryClient()

  const postsUserQuery = useQuery({
    queryKey: ['profile_posts', params.user_id],
    queryFn: () => userApi.getPostsProfile(params.user_id as string, queryConfig),
    keepPreviousData: true
  })

  const { data } = postsUserQuery

  return (
    <div className='relative mt-1'>
      {data?.data.data.posts.length === 0 && (
        <h3 className='absolute mt-[50px] md:mt-[40px] xl:mt-[70px] top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No posts
        </h3>
      )}
      {data?.data.data.posts &&
        data.data.data.posts.map((post: PostType) => {
          return <Post post={post} key={post._id} queryClient={queryClient} />
        })}
    </div>
  )
}

export default ProfilePosts
