import { useQuery } from '@tanstack/react-query'
import type { QueryConfig } from '../../../../configs/query.config'
import useQueryParam from '../../../../hooks/useQueryParam'
import { followApi } from '../../../../apis/follow.api'
import UserCardFollow from '../UserCardFollow'
import { useParams } from 'react-router-dom'

interface PropTypes {
  user_id: string
  type: string
}

function Followings({ user_id, type }: PropTypes) {
  const params = useParams()
  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    page: queryParams.page || 1,
    limit: queryParams.limit || 15
  }

  const getFollowersQuery = useQuery({
    queryKey: ['followings'],
    queryFn: () => followApi.getFollowings(user_id as string, queryConfig),
    keepPreviousData: true
  })

  const { data } = getFollowersQuery

  return (
    <div className='relative mt-1 px-4'>
      {data?.data.data.followers.length === 0 && (
        <h3 className='absolute mt-[50px] md:mt-[40px] xl:mt-[70px] top-[50%] left-[50%] right-[50%] -translate-x-[50%] text-color_auth text-[16px] w-full text-center'>
          No followers
        </h3>
      )}
      {data?.data.data.followers &&
        data.data.data.followers.map((user: any) => {
          return <UserCardFollow user={user.user_followings} key={user.user_followings} type={type} />
        })}
    </div>
  )
}

export default Followings
