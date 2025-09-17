import { Link, useNavigate, useParams } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi } from '../../apis/user.api'
import type { ProfileType } from '../../types/user.type'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import { tabListPofile } from '../../data/tabListPofile'
import ProfileLike from '../../components/ProfileLike'
import ProfilePosts from '../../components/ProfilePosts'
import { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../contexts/app.context'
import { followApi } from '../../apis/follow.api'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import { toast } from 'react-toastify'

function Profile() {
  const { id } = useContext(AppContext)

  const queryClient = useQueryClient()

  const queryParams: QueryConfig = useQueryParam()

  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 100,
    page: queryParams.page || 1
  }

  const params = useParams()
  const navidate = useNavigate()

  const getProfileQuery = useQuery({
    queryKey: ['profile', params.user_id],
    queryFn: () => userApi.getProfile(params.user_id as string),
    keepPreviousData: true
  })

  const getFollowingQuery = useQuery({
    queryKey: ['followings'],
    queryFn: () => followApi.getFollowings(id as string, queryConfig),
    keepPreviousData: true
  })

  const getFollowersQuery = useQuery({
    queryKey: ['followers'],
    queryFn: () => followApi.getFollowers(id as string, queryConfig),
    keepPreviousData: true
  })

  const followMutation = useMutation({
    mutationFn: (body: { followed_user_id: string }) => {
      return followApi.follow(body)
    }
  })

  const unfollowMutation = useMutation({
    mutationFn: (user_id: string) => {
      return followApi.unfollow(user_id)
    }
  })

  const [isActiveTab, setIsActiveTab] = useState<string>('Posts')
  const [isHover, setIsHover] = useState<boolean>(false)

  const listIdFollowing: string[] = useMemo(() => {
    if (!getFollowingQuery.data?.data.data.followers) return []
    if (getFollowingQuery.data?.data.data.followers) {
      return getFollowingQuery.data.data.data.followers.map((user: any) => user.user_followings._id)
    }
  }, [getFollowingQuery.data?.data.data.followers])

  const listIdFollowers: string[] = useMemo(() => {
    if (!getFollowersQuery.data?.data.data.followers) return []
    if (getFollowersQuery.data?.data.data.followers) {
      return getFollowersQuery.data.data.data.followers.map((user: any) => user.user_followers._id)
    }
  }, [getFollowersQuery.data?.data.data.followers])

  const isFollowing = listIdFollowing.includes(params.user_id as string)
  const isFollowers = listIdFollowers.includes(params.user_id as string) && !isFollowing

  const handleFollow = (body: { followed_user_id: string }) => {
    followMutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user_not_follow_suggestions'] })
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        queryClient.invalidateQueries({ queryKey: ['followings'] })
        queryClient.invalidateQueries({ queryKey: ['followers'] })
        queryClient.invalidateQueries({ queryKey: ['user_suggestions_connect'] })
        toast.success('Follow successfully')
      }
    })
  }

  const handleUnfollow = (user_id: string) => {
    unfollowMutation.mutate(user_id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['user_not_follow_suggestions'] })
        queryClient.invalidateQueries({ queryKey: ['profile'] })
        queryClient.invalidateQueries({ queryKey: ['followings'] })
        queryClient.invalidateQueries({ queryKey: ['followers'] })
      }
    })
  }

  return (
    <div className='relative pb-[45px] md:pb-[5px]'>
      {getProfileQuery.data?.data.data &&
        getProfileQuery.data?.data.data.map((user: ProfileType) => (
          <>
            {/* Header */}
            <div className='px-4 pt-2 pb-2 flex items-center border-b border-solid border-[#2E3235] sticky top-0 left-0 right-0 bg-black z-20'>
              <Link to={PATH.HOME} className='py-3 pr-3'>
                <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5' fill='#eff3f4'>
                  <g>
                    <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
                  </g>
                </svg>
              </Link>
              <h3 className='text-color_auth text-[18px] font-semibold ml-3'>{user.name}</h3>
            </div>
            {user.verify === 0 && (
              <div className='bg-yellow-500/10 text-[14px] border border-yellow-500 text-yellow-500 text-center py-3 px-4'>
                <p className='font-medium flex items-center gap-2'>
                  Your account is not verified. Please check your email to verify your account
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 640 640'
                    className='w-4 h-4 text-[#fbbf24]'
                    fill='#fbbf24'
                  >
                    <path d='M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 384C302.3 384 288 398.3 288 416C288 433.7 302.3 448 320 448C337.7 448 352 433.7 352 416C352 398.3 337.7 384 320 384zM320 192C301.8 192 287.3 207.5 288.6 225.7L296 329.7C296.9 342.3 307.4 352 319.9 352C332.5 352 342.9 342.3 343.8 329.7L351.2 225.7C352.5 207.5 338.1 192 319.8 192z' />
                  </svg>
                </p>
              </div>
            )}
            {/*User Info*/}
            <div>
              <div
                className='relative w-full h-[140px] md:h-[200px] bg-[#333639] bg-center bg-cover bg-no-repeat'
                style={{ backgroundImage: user.cover_photo ? `url(${user.cover_photo})` : undefined }}
              >
                <div className='absolute bottom-0 left-4 translate-y-1/2 w-[94px] h-[94px] md:w-[133px] md:h-[133px] rounded-full bg-slate-400'>
                  <img className='w-full h-full object-cover rounded-full' src={user.avatar || AvatarDefault} alt='' />
                </div>
              </div>
              <div className='pt-3 px-4 w-full'>
                {id === params.user_id && (
                  <div className='flex justify-end rounded-full'>
                    <Link
                      to={`/update-profile/${user._id}`}
                      className='text-color_auth text-[15px] font-semibold ml-auto px-[17px] py-[10px] border border-solid border-[#536471] rounded-full hover:opacity-85 cursor-pointer transition-all duration-200 ease-in-out'
                    >
                      Edit profile
                    </Link>
                  </div>
                )}
                {id !== params.user_id && (
                  <div className='flex justify-end rounded-full'>
                    {!isFollowing && !isFollowers && (
                      <button
                        onClick={() => handleFollow({ followed_user_id: params.user_id as string })}
                        className='text-color_auth text-[15px] font-semibold ml-auto px-[17px] py-[10px] border border-solid border-[#536471] rounded-full hover:opacity-85 cursor-pointer transition-all duration-200 ease-in-out'
                      >
                        Follow
                      </button>
                    )}
                    {isFollowing && (
                      <button
                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}
                        onClick={() => handleUnfollow(params.user_id as string)}
                        className={`text-[15px] min-w-[105px] font-semibold ml-auto px-[17px] py-[10px] border border-solid border-[#536471] rounded-full hover:opacity-85 cursor-pointer transition-all duration-200 ease-in-out 
                        ${isHover && 'bg-[#f4212e1a] border-[#67070f] text-[#f4212e]'}`}
                      >
                        {isHover ? 'Unfollow' : 'Following'}
                      </button>
                    )}
                    {!isFollowing && isFollowers && (
                      <button
                        onClick={() => handleFollow({ followed_user_id: params.user_id as string })}
                        className='text-[15px] min-w-[105px] font-semibold ml-auto px-[17px] py-[10px] border border-solid border-[#536471] rounded-full hover:opacity-85 cursor-pointer transition-all duration-200 ease-in-out'
                      >
                        Follow back
                      </button>
                    )}
                  </div>
                )}
                <div className={`mt-4 md:mt-8`}>
                  <div className='flex items-center gap-x-3'>
                    <h3 className='font-semibold text-color_auth text-[20px]'>{user.name}</h3>
                    {user.verify === 1 && (
                      <div className='flex items-center gap-2 px-2 py-[4px] border border-solid border-[#536471] rounded-full'>
                        <svg
                          viewBox='0 0 22 22'
                          aria-label='Verified account'
                          role='img'
                          className='inline-block text-[#1d9bf0] h-4 w-4'
                          data-testid='icon-verified'
                          fill='currentColor'
                        >
                          <g>
                            <path d='M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z'></path>
                          </g>
                        </svg>
                        <span className='text-color_auth text-[14px] font-semibold'>Get verified</span>
                      </div>
                    )}
                  </div>
                  <p className='text-[#71767B] text-[15px] font-semibold mt-1'>{user.username}</p>
                  <div className='mt-3 flex flex-col gap-[10px]'>
                    {user.bio && (
                      <div className='w-full leading-[1.5]'>
                        <p className='text-color_auth text-[15px]'>{user.bio}</p>
                      </div>
                    )}
                    {user.location && (
                      <div className='flex items-end gap-1'>
                        <svg
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                          className='inline-block w-[18px] h-[18px]'
                          fill='#71767b'
                        >
                          <g>
                            <path d='M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z'></path>
                          </g>
                        </svg>
                        <span className='text-[15px] text-[#71767B]'>{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <div className='flex items-end gap-1'>
                        <svg
                          viewBox='0 0 24 24'
                          aria-hidden='true'
                          className='inline-block w-[18px] h-[18px]'
                          fill='#71767b'
                        >
                          <g>
                            <path d='M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z'></path>
                          </g>
                        </svg>
                        <Link to={'https://github.com'} className='text-[15px] text-[#1D9BF0]'>
                          {user.website}
                        </Link>
                      </div>
                    )}
                    <div className='flex items-end gap-1'>
                      <svg
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                        className='inline-block w-[18px] h-[18px]'
                        fill='#71767b'
                      >
                        <g>
                          <path d='M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z'></path>
                        </g>
                      </svg>
                      <span className='text-[15px] text-[#71767B]'>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-5'>
                    <div
                      onClick={() =>
                        navidate(`/${params.user_id}/follow`, {
                          state: {
                            type: 'Followings',
                            name: user.name
                          }
                        })
                      }
                      className='flex items-center gap-1 text-[14px] py-4 hover:underline transition-all duration-300 ease-in-out cursor-pointer'
                    >
                      <span className='font-semibold text-[14px]'>{user.following_count}</span>
                      <span className='text-[#71767B]'>Following</span>
                    </div>
                    <div
                      onClick={() =>
                        navidate(`/${params.user_id}/follow`, {
                          state: {
                            type: 'Followers',
                            name: user.name
                          }
                        })
                      }
                      className='flex items-center gap-1 text-[14px] py-4 hover:underline transition-all duration-300 ease-in-out cursor-pointer'
                    >
                      <span className='font-semibold text-[14px]'>{user.follower_count}</span>
                      <span className='text-[#71767B]'>Followers</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tabs */}
              <div className='px-2 flex items-center justify-around gap-7 md:gap-[40px] lg:gap-[50px] border-b border-solid border-[#2E3235]'>
                {tabListPofile.map((tab) => (
                  <button
                    onClick={() => setIsActiveTab(tab.name)}
                    className={`flex-1 relative text-[#71767B] hover:bg-[#E7E9EA1A] transition-all duration-200 ease-in-out text-[14px] py-4 px-2 font-semibold ${isActiveTab === tab.name ? 'text-color_auth after:absolute after:bottom-0 after:left-[50%] after:-translate-x-1/2 after:w-full after:max-w-[70px] after:h-1 after:bg-[#1d9bf0] after:rounded-full' : ''}`}
                    key={tab.id}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              {/* Content */}
              <div>
                {isActiveTab === 'Posts' && <ProfilePosts />}
                {isActiveTab === 'Likes' && <ProfileLike />}
              </div>
            </div>
          </>
        ))}
    </div>
  )
}

export default Profile
