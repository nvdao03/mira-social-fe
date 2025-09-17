import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import Logo from '../../assets/imgs/logo.png'
import { AppContext } from '../../contexts/app.context'
import { PATH } from '../../constants/path'
import { sidebars } from '../../data/sidebars'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'
import postApi from '../../apis/post.api'
import Post from '../../components/Post'
import type { PostType } from '../../types/post.type'
import Loading from '../../components/Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

function Home() {
  const {
    id,
    avatar,
    name,
    username,
    refreshToken,
    setIsauthenticated,
    setRefreshToken,
    setAvatar,
    setUsername,
    setName
  } = useContext(AppContext)

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const [isActive, setIsActive] = useState<string>('For you')
  const [openSidebar, setOpenSidebar] = useState(false)

  const postListQuery = useInfiniteQuery({
    queryKey: ['posts'],
    // Khi dùng useInfiniteQuery nó chỉ nhận tham số pageParam dùng để tính toán page tiếp theo, chứ ko truyền cứng giá trị page bàng paramConfig được
    queryFn: ({ pageParam = 1 }) => {
      return postApi.getPosts({
        page: pageParam,
        limit: 10
      })
    },
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.data.data
      return pagination.page < pagination.total_page ? pagination.page + 1 : undefined
    }
  })

  const logoutMutation = useMutation({
    mutationFn: (body: { refresh_token: string }) => authApi.logout(body)
  })

  const handleLogout = () => {
    logoutMutation.mutate(
      { refresh_token: refreshToken },
      {
        onSuccess: () => {
          setIsauthenticated(false)
          setRefreshToken('')
          setAvatar('')
          setUsername('')
          setName('')
          navigate(PATH.SIGN_IN)
        }
      }
    )
  }

  const { data, isLoading, fetchNextPage, hasNextPage } = postListQuery

  const posts: PostType[] = data?.pages.flatMap((page) => page.data.data.posts) || []

  return (
    <div className='relative pb-[45px] md:pb-[6px]'>
      {/* overlay */}
      {openSidebar && (
        <div
          className='fixed inset-0 bg-black/50 z-40 transition-opacity duration-300'
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
      {/* sidebar on mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          openSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='p-4 border-b border-[#2E3235] border-solid'>
          <img src={avatar || AvatarDefault} alt='avatar' className='w-10 h-10 rounded-full' />
          <div className='mt-2 text-color_text text-[17px]'>
            <h2 className='font-semibold text-[17px]'>{name}</h2>
            <p className='text-[15px] text-[#71767B] mt-2'>@{username}</p>
          </div>
        </div>
        <nav className='px-3 py-0'>
          {sidebars.map((sidebar) => (
            <Link
              to={sidebar.path === PATH.PROFILE ? `/${id}` : sidebar.path}
              key={sidebar.id}
              className={`py-4 flex items-center space-x-5 hover:bg-[#E7E9EA1A]`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 640 640'
                fill='none'
                stroke={'#FFFFFF'}
                strokeWidth={40}
                className='w-7 h-7'
              >
                {sidebar.icon}
              </svg>
              <span>{sidebar.name}</span>
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className={`w-full px-3 py-4 flex items-center space-x-5 hover:bg-[#E7E9EA1A] border-t border-[#2E3235] border-solid`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 640 640'
            fill='none'
            stroke='#FFFFFF'
            strokeWidth={40}
            className='w-7 h-7'
          >
            <path d='M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z' />
          </svg>
          <span>Logout</span>
        </button>
      </div>
      {/* Tabs */}
      <header className='sticky z-10 top-0 border-solid border-b border-[#2E3235] bg-black md:block'>
        <div className='items-center px-4 pt-3 flex md:hidden'>
          <div className='w-[32px] h-[32px] md:hidden cursor-pointer' onClick={() => setOpenSidebar(true)}>
            <img src={avatar ? avatar : AvatarDefault} alt='avatar' className='w-full h-full rounded-full' />
          </div>
          <Link to={PATH.HOME} className='mx-auto'>
            <img src={Logo} alt='logo' className='w-[30px] h-[30]' />
          </Link>
        </div>
        <div className='flex-1 flex items-center justify-around text-[15px] text-[#71767B]'>
          {['For you', 'Following'].map((item, index) => (
            <Link
              to={''}
              key={index}
              className={`py-4 md:py-5 cursor-pointer ${
                isActive === item
                  ? 'relative text-[#E7E9EA] font-semibold transition-all duration-200 ease-in-out after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#1d9bf0] after:rounded-full'
                  : ''
              }
              `}
              onClick={() => setIsActive(item)}
            >
              {item}
            </Link>
          ))}
        </div>
      </header>
      {/* List Post */}
      <div className='mt-1'>
        {isLoading && (
          <div className='w-full flex items-center justify-center h-[100vh]'>
            <Loading />
          </div>
        )}
        {!isLoading && (
          <InfiniteScroll
            dataLength={posts.length} // tổng số posts đã load
            next={fetchNextPage} // gọi hàm load thêm
            hasMore={!!hasNextPage} // kiểm soát còn trang không
            loader={
              <div className='flex justify-center items-center py-4 min-h-[80px]'>
                <Loading />
              </div>
            }
            endMessage={<p className='text-center text-[#71767B] py-4'>End 👀</p>}
          >
            {posts.map((post: PostType) => (
              <Post key={post._id} post={post} queryClient={queryClient} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

export default Home
