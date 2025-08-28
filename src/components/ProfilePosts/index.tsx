import { useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../apis/user.api'
import type { QueryConfig } from '../../configs/query.config'
import useQueryParam from '../../hooks/useQueryParam'
import type { PostType } from '../../types/post.type'
import Post from '../Post'

interface PropTypes {
  username: string
}

function ProfilePosts({ username }: PropTypes) {
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 10,
    page: queryParams.page || 1
  }

  const queryClient = useQueryClient()

  const postsUserQuery = useQuery({
    queryKey: ['postsUser'],
    queryFn: () => userApi.getPostsUser(username, queryConfig),
    keepPreviousData: true
  })

  const { data } = postsUserQuery

  return (
    <div className='mt-1'>
      {data?.data.data.posts &&
        data.data.data.posts.map((post: PostType) => {
          return <Post post={post} key={post._id} queryClient={queryClient} />
        })}
    </div>
  )
}

export default ProfilePosts
