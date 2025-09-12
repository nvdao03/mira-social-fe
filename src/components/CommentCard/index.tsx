import { useContext, useEffect, useRef, useState } from 'react'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import type { CommentType } from '../../types/comment.type'
import { AppContext } from '../../contexts/app.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi } from '../../apis/comment.api'

interface PropTypes {
  comment: CommentType
  post_id: string
}

function CommentCard({ comment, post_id }: PropTypes) {
  const { id } = useContext(AppContext)

  const queryClient = useQueryClient()

  const menuRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const commentMutation = useMutation({
    mutationFn: (comment_id: string) => {
      return commentApi.deleteComment(comment_id)
    }
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // menuRef.current tức là khi này menu đã được render && nhưng click lại ko nằm bên trong menu thì close menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDeleteComment = (comment_id: string) => {
    commentMutation.mutate(comment_id, {
      onSuccess: () => {
        setOpen(false)
        queryClient.invalidateQueries({ queryKey: ['comments', post_id] })
      }
    })
  }

  return (
    <div className='flex items-start px-4 py-5 gap-x-3 border-b border-solid border-[#2e3235]'>
      {/* Avatar */}
      <div className='w-10 h-10 rounded-full'>
        <img src={comment.user.avatar || AvatarDefault} alt='' className='w-full h-full rounded-full object-cover' />
      </div>
      {/* Content */}
      <div className=''>
        <div className='flex items-center'>
          <span className={`hover:underline text-[15px] leading-[1.5] font-semibold`}>{comment.user.name}</span>
          {comment.user.verify === 1 && (
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
          <span className='text-[#71767B] text-[15px] truncate max-w-[100px] ml-2'>@{comment.user.username}</span>
          <span className='text-[#71767B] text-[15px] mx-1'>·</span>
          <span className='text-[#71767B] text-[15px]'>{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <p className='text-sm text-[#e4e6eb]'>{comment.content}</p>
      </div>
      {/* Action */}
      <div className='flex items-center gap-x-3 ml-auto relative' ref={menuRef}>
        {comment.user._id === id && (
          <button onClick={() => setOpen(!open)}>
            <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5 fill-[#71767B]'>
              <g>
                <path d='M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z'></path>
              </g>
            </svg>
          </button>
        )}
        {/* Dropdown menu */}
        {open && (
          <div className='absolute right-0 mt-2 w-40 bottom-0 rounded-xl bg-black text-white border border-gray-700 overflow-hidden shadow-[0_0_12px_rgba(255,255,255,0.15),0_0_24px_rgba(255,255,255,0.05)] z-50'>
            <button
              onClick={() => handleDeleteComment(comment._id.toString() as string)}
              className='px-4 py-2 text-[15px] flex items-center gap-x-3 text-[#f4212e] font-semibold w-full cursor-pointer'
            >
              <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5 fill-[#f4212e]'>
                <g>
                  <path d='M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z'></path>
                </g>
              </svg>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentCard
