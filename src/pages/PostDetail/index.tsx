import { Link, useParams } from 'react-router-dom'
import { PATH } from '../../constants/path'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../../components/Loading'

function PostDetail() {
  const { avatar, name } = useContext(AppContext)
  const queryClient = useQueryClient()
  const params = useParams()

  const queryParams: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = {
    limit: queryParams.limit || 12,
    page: queryParams.page || 1
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schemaAddComment)
  })

  const postQuery = useQuery({
    queryKey: ['post', params.post_id],
    queryFn: () => postApi.getPostDetail(params.post_id as string),
    keepPreviousData: true
  })

  const commentQuery = useInfiniteQuery({
    queryKey: ['comments', params.post_id],
    queryFn: ({ pageParam = queryConfig.page }) =>
      commentApi.getComments(params.post_id as string, { page: pageParam, limit: queryConfig.limit }),
    keepPreviousData: true,
    getNextPageParam: (lastpage) => {
      const { pagination } = lastpage.data.data
      return pagination.page < pagination.total_page ? pagination.page + 1 : undefined
    }
  })

  const commentMutation = useMutation({
    mutationFn: (body: { content: string }) => commentApi.addComment(body, params.post_id as string),
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: ['comments', params.post_id] })
    },
    onError: () => {
      toast.warn(errors.content?.message)
    }
  })

  const handleSubmitComment = handleSubmit((data: AddCommentFormValues) => {
    commentMutation.mutate(data)
  })

  const { data, hasNextPage, fetchNextPage, isLoading } = commentQuery
  const commentList = data?.pages.flatMap((page) => page.data.data.comments) || []

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
      {postQuery.data?.data.data &&
        postQuery.data.data.data.map((post: PostType) => <Post key={post._id} post={post} queryClient={queryClient} />)}

      {/* List comment */}
      {isLoading ? (
        <div className='flex justify-center items-center py-4 min-h-[80px]'>
          <Loading />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={commentList.length}
          hasMore={!!hasNextPage}
          next={fetchNextPage}
          loader={
            <div className='flex justify-center items-center py-4 min-h-[80px]'>
              <Loading />
            </div>
          }
        >
          {commentList.map((comment: CommentType) => (
            <CommentCard key={comment._id} comment={comment} post_id={params.post_id as string} />
          ))}
        </InfiniteScroll>
      )}

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
          <button className='text-black bg-white py-2.5 px-5 rounded-full font-semibold'>
            {commentMutation.isLoading ? 'Loading...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostDetail
