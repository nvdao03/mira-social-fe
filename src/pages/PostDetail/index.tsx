import { Link, useParams } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import postApi from '../../apis/post.api'
import Post from '../../components/Post'
import type { PostType } from '../../types/post.type'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'
import { commentApi } from '../../apis/comment.api'
import useQueryParam from '../../hooks/useQueryParam'
import type { QueryConfig } from '../../configs/query.config'
import CommentCard from '../../components/CommentCard'
import type { CommentType } from '../../types/comment.type'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaAddComment, type AddCommentFormValues } from '../../utils/validation'
import { toast } from 'react-toastify'

function PostDetail() {
  const { avatar, name } = useContext(AppContext)

  const queryClient = useQueryClient()

  const params: QueryConfig = useQueryParam()

  const queryConfig: QueryConfig = {
    limit: params.limit || 15,
    page: params.page || 1
  }

  const param = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schemaAddComment)
  })

  const postQuery = useQuery({
    queryKey: ['post', param.post_id],
    queryFn: () => postApi.getPostDetail(param.post_id as string),
    keepPreviousData: true
  })

  const commentQuery = useQuery({
    queryKey: ['comments', param.post_id],
    queryFn: () => commentApi.getComments(param.post_id as string, queryConfig),
    keepPreviousData: true
  })

  const commentMutation = useMutation({
    mutationFn: (body: { content: string }) => {
      return commentApi.addComment(body, param.post_id as string)
    }
  })

  const handleSubmitComment = handleSubmit((data: AddCommentFormValues) => {
    commentMutation.mutate(data, {
      onSuccess: () => {
        reset({
          content: ''
        })
        queryClient.invalidateQueries({ queryKey: ['comments', param.post_id] })
      },
      onError: () => {
        toast.warn(errors.content?.message)
      }
    })
  })

  return (
    <div className='pb-[45px] md:pb-[5px] h-full flex flex-col'>
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
        {postQuery.data?.data.data &&
          postQuery.data.data.data.map((post: PostType) => {
            return <Post key={post._id} post={post} queryClient={queryClient} />
          })}
      </div>
      {/* List comment */}
      <div className=''>
        {commentQuery.data?.data.data &&
          commentQuery.data.data.data.comments.map((comment: CommentType) => {
            return <CommentCard key={comment._id} comment={comment} post_id={param.post_id as string} />
          })}
      </div>
      {/* Submtit comment */}
      <div className='px-4 pt-6 bg-black mt-auto'>
        <form className='flex items-start gap-3' onSubmit={handleSubmitComment}>
          <div className='w-10 h-10 rounded-full flex-shrink-0'>
            <img className='rounded-full w-full h-full object-cover' src={avatar || AvatarDefault} alt={name} />
          </div>
          <textarea
            className='bg-transparent w-full placeholder:text-[#71767B] focus:bg-transparent focus:outline-none leading-[1.5] resize-none overflow-hidden'
            {...register('content')}
            onInput={(e) => {
              const textarea = e.target as HTMLTextAreaElement
              textarea.style.height = 'auto'
              textarea.style.height = `${textarea.scrollHeight}px`
            }}
            placeholder='Post your reply'
          ></textarea>
          <button className='text-black bg-white py-2.5 px-5 rounded-full font-semibold'>Reply</button>
        </form>
      </div>
    </div>
  )
}

export default PostDetail
