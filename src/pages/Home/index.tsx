import { useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import FileImage from '../../assets/icons/file-image.svg'
import FileVideo from '../../assets/icons/file-video.svg'
import type { PostType } from '../../types/post.type'
import Post from '../../components/Post'

const posts: PostType[] = [
  {
    _id: '1',
    avatar: 'https://i.pravatar.cc/100?img=11',
    name: 'Alice',
    username: 'alice123',
    content: 'Hello world! Đây là bài post có 1 ảnh.',
    medias: [],
    likes: 120,
    comments: 15,
    reposts: 10,
    views: 2000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    avatar: 'https://i.pravatar.cc/100?img=12',
    name: 'Bob',
    username: 'bob_dev',
    content: 'Test multiple images (4 ảnh như Twitter).',
    medias: [
      {
        url: 'https://images.unsplash.com/photo-1755530603707-045e3306e4df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
        type: 0
      },
      {
        url: 'https://images.unsplash.com/photo-1755572209935-4f7600b6294b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8',
        type: 0
      },
      {
        url: 'https://plus.unsplash.com/premium_photo-1755552389190-4ef716bc24a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8',
        type: 0
      },
      {
        url: 'https://plus.unsplash.com/premium_photo-1755598865800-917a510fd9a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D',
        type: 0
      }
    ],
    likes: 330,
    comments: 45,
    reposts: 20,
    views: 5500,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    avatar: 'https://i.pravatar.cc/100?img=13',
    name: 'Charlie',
    username: 'charlie_music',
    content: 'Đây là bài post có video.',
    medias: [{ url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 1 }],
    likes: 800,
    comments: 120,
    reposts: 55,
    views: 20000,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

function Home() {
  const [isActive, setIsActive] = useState<string>('For you')

  return (
    <div>
      {/* Tabs */}
      <header className='sticky z-10 top-0 border-solid border-b border-[#2E3235] bg-black'>
        <div className='flex items-center justify-around text-[15px] text-[#71767B]'>
          {['For you', 'Following'].map((item, index) => (
            <Link
              to={''}
              key={index}
              className={`py-5 cursor-pointer ${
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
      {/* Content Submit */}
      <div className='px-4 py-3 border-b border-solid border-[#2E3235]'>
        <div className='flex gap-x-3'>
          <div className='w-10 h-10'>
            <img src={AvatarDefault} alt='avatar' className='w-full h-full object-center rounded-full' />
          </div>
          <form className='flex-1' encType='multipart/form-data' method='post'>
            <textarea
              name=''
              id=''
              className='bg-transparent w-full placeholder:text-[#71767B] focus:bg-transparent focus:outline-none py-[8px] lg:py-[8px] leading-[1.5] resize-none overflow-hidden border-solid border-b border-[#2E3235]'
              onInput={(e) => {
                const textarea = e.target as HTMLTextAreaElement
                textarea.style.height = 'auto'
                textarea.style.height = `${textarea.scrollHeight}px` // cập nhật chiều cao theo nội dung phần tử bên trong
              }}
              placeholder="What's happening?"
            ></textarea>
            <div className='flex items-center justify-between mt-2'>
              <div className='flex items-center gap-x-4'>
                <label className='cursor-pointer'>
                  <img src={FileImage} alt='' className='w-[20px]' />
                  <input className='hidden' type='file' name='image' multiple={true} />
                </label>
                <label className='cursor-pointer'>
                  <img src={FileVideo} alt='' className='w-[20px]' />
                  <input className='hidden' type='file' name='video' multiple={true} />
                </label>
              </div>
              <button className='bg-[#787A74] px-4 py-2.5 ml-3 rounded-full text-[#0F1410] font-semibold'>Post</button>
            </div>
          </form>
        </div>
      </div>
      {/* List Post */}
      {posts.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  )
}

export default Home
