import { useNavigate, useParams } from 'react-router-dom'
import AvatarDefault from '../../../../assets/imgs/avatar-default.png'
import type { UserSuggestion } from '../../../../types/user.type'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../contexts/app.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { followApi } from '../../../../apis/follow.api'
import type { QueryConfig } from '../../../../configs/query.config'
import useQueryParam from '../../../../hooks/useQueryParam'

interface PropTypes {
  user: UserSuggestion
  type: string
}

function UserCardFollow({ user, type }: PropTypes) {
  const { id } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const params = useParams<{ user_id: string }>()

  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    page: queryParams.page || 1,
    limit: queryParams.limit || 100
  }

  const [isHovered, setIsHovered] = useState<boolean>(false) // Thay đổi text following || unfollow
  const [isFollowing, setIsFollowing] = useState<boolean>(false) // Thay đổi text following || follow back

  // Check điều kiện phải là đang ở trang profile của user login thì mới hiện các nút following || unfollow hoặc follow back
  const isUserProfile = Boolean(params.user_id === id)

  const getFollowingsQuery = useQuery({
    queryKey: ['followings', params.user_id],
    queryFn: () => followApi.getFollowings(params.user_id as string, queryConfig),
    keepPreviousData: true,
    enabled: Boolean(params.user_id) // chỉ gọi API khi có user_id
  })

  const unfollowMutation = useMutation({
    mutationFn: (user_id: string) => followApi.unfollow(user_id),
    onSuccess: () => {
      const keys = ['user_not_follow_suggestions', 'profile', 'followings', 'followers']
      keys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }))
    }
  })

  const followMutation = useMutation({
    mutationFn: (body: { followed_user_id: string }) => followApi.follow(body),
    onSuccess: () => {
      const keys = ['user_not_follow_suggestions', 'profile', 'followings', 'followers']
      keys.forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }))
    }
  })

  const handleFollowToggle = () => {
    if (isFollowing) {
      unfollowMutation.mutate(user._id)
    } else {
      followMutation.mutate({ followed_user_id: user._id })
    }
    setIsFollowing(!isFollowing)
  }

  useEffect(() => {
    const followings = getFollowingsQuery.data?.data.data.followings ?? []
    const isFollowBack = followings.some((u: any) => u.user_followings._id === user._id)
    setIsFollowing(isFollowBack)
  }, [getFollowingsQuery.data, user._id])

  const renderButton = () => {
    if (!isUserProfile) return null
    if (type === 'Followings' || (type === 'Followers' && isFollowing)) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleFollowToggle()
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`border border-solid min-w-[99px] font-semibold text-[14px] rounded-full px-4 py-2 transition-all duration-200 ease-in-out ${
            isHovered
              ? 'bg-[#f4212e1a] border-[#67070f] text-[#f4212e]'
              : 'bg-[#eff3f4] border-[#eff3f4] text-[#0F1419]'
          }`}
        >
          {isHovered ? 'Unfollow' : 'Following'}
        </button>
      )
    }
    if (type === 'Followers' && !isFollowing) {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleFollowToggle()
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='border border-solid text-[#0F1419] min-w-[99px] font-semibold bg-[#eff3f4] hover:opacity-85 text-[14px] rounded-full px-4 py-2 transition-all duration-200 ease-in-out'
        >
          Follow back
        </button>
      )
    }
    return null
  }

  return (
    <div onClick={() => navigate(`/${user._id}`)} className='flex items-center justify-between py-4 cursor-pointer'>
      <div className='flex gap-x-3'>
        <div className='w-10 h-10 rounded-full'>
          <img src={user.avatar || AvatarDefault} alt={user.name} className='w-full h-full object-cover rounded-full' />
        </div>
        <div className='h-10 flex flex-col justify-center'>
          <div className='flex items-center'>
            <span className={`hover:underline text-[15px] leading-[1.5] font-semibold w-full`}>{user.name}</span>
            {user.verify === 1 && (
              <svg
                viewBox='0 0 22 22'
                aria-label='Verified account'
                role='img'
                className='inline-block text-[#1d9bf0] h-4 w-4 ml-1'
                data-testid='icon-verified'
                fill='currentColor'
              >
                <g>
                  <path d='M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z'></path>
                </g>
              </svg>
            )}
          </div>
          <span className='text-[#71767B] text-[13px] w-full mt-1'>{user.username}</span>
        </div>
      </div>
      {renderButton()}
    </div>
  )
}

export default UserCardFollow
