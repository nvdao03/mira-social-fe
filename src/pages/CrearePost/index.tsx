import { Link, useNavigate } from 'react-router-dom'
import { PATH } from '../../constants/path'
import FileImage from '../../assets/icons/file-image.svg'
import FileVideo from '../../assets/icons/file-video.svg'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { fileApi } from '../../apis/file.api'
import type { CreatePostFormValues } from '../../utils/validation'
import { useContext, useMemo, useState } from 'react'
import { AppContext } from '../../contexts/app.context'
import { toast } from 'react-toastify'
import postApi from '../../apis/post.api'

type CreatePostFormData = CreatePostFormValues

export default function CreatePost() {
  const { id } = useContext(AppContext)
  const navigate = useNavigate()
  const [medias, setMedias] = useState<{ url: string; type: number }[]>([])
  let images: { url: string; type: number }[] = useMemo(() => {
    return medias.filter((item) => item.type === 0)
  }, [medias])
  let videos: { url: string; type: number }[] = useMemo(() => {
    return medias.filter((item) => item.type === 1)
  }, [medias])

  const { register, handleSubmit, setValue, watch, reset } = useForm<CreatePostFormData>({
    defaultValues: {
      type: 0,
      parent_id: null,
      user_id: id,
      medias: [],
      content: ''
    }
  })

  const content = watch('content')

  const uploadImageMutation = useMutation({
    mutationFn: (file: FormData) => fileApi.uploadImage(file)
  })

  const uploadVideoMutation = useMutation({
    mutationFn: (file: FormData) => fileApi.uploadVideo(file)
  })

  const createPostMutation = useMutation({
    mutationFn: (body: CreatePostFormData) => {
      return postApi.createPost(body)
    }
  })

  const handleSubmitForm = handleSubmit((data: CreatePostFormData) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        ;(toast.success('Create Post Successfully'), reset(), setMedias([]))
        navigate(PATH.HOME)
      }
    })
  })

  const handleUploadImage = (file: FormData) => {
    uploadImageMutation.mutate(file, {
      onSuccess: (data) => {
        const newMedias = data.data.data
        setMedias(newMedias)
        setValue('medias', newMedias)
      },
      onError: () => {
        toast.warn('Maximum 1 image allowed')
      }
    })
  }

  const handleUploadVideo = (file: FormData) => {
    uploadVideoMutation.mutate(file, {
      onSuccess: (data) => {
        const newMedias = data.data.data
        setMedias(newMedias)
        setValue('medias', newMedias)
      }
    })
  }

  return (
    <div className='relative pb-[45px] md:pb-[5px]'>
      {/* Header */}
      <div className='px-4 pt-2 pb-2 flex items-center border-b border-solid border-[#2E3235] sticky top-0 left-0 right-0 bg-black z-20'>
        <Link to={PATH.HOME} className='py-3 pr-3'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5' fill='#eff3f4'>
            <g>
              <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
            </g>
          </svg>
        </Link>
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>Create Post</h3>
      </div>
      {/* Content Submit */}
      <div className='px-4 py-3 min-h-[92vh]'>
        <div className='flex gap-x-3'>
          <form onSubmit={handleSubmitForm} className='flex-1' encType='multipart/form-data' method='post'>
            {/* Content */}
            <textarea
              {...register('content')}
              className='bg-transparent w-full placeholder:text-[#71767B] focus:bg-transparent focus:outline-none py-[8px] lg:py-[8px] leading-[1.5] resize-none overflow-hidden'
              onInput={(e) => {
                const textarea = e.target as HTMLTextAreaElement
                textarea.style.height = 'auto'
                textarea.style.height = `${textarea.scrollHeight}px`
              }}
              placeholder="What's happening?"
            ></textarea>
            {/* Media preview */}
            {videos.length === 1 && (
              <div className='relative rounded-2xl border border-[#2E3235]'>
                <video
                  controls
                  className='w-full h-auto rounded-2xl max-h-[600px] object-contain cursor-pointer'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <source src={videos[0].url} type='video/mp4' />
                  Your browser does not support HTML5 video.
                </video>
                <button
                  onClick={() => setMedias([])}
                  className='absolute -top-2 -right-2 z-10 flex justify-center items-center w-[25px] h-[25px] bg-white rounded-full shadow-md hover:bg-gray-200'
                >
                  <svg className='w-4 h-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' fill='black'>
                    <path d='M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z' />
                  </svg>
                </button>
              </div>
            )}
            {images.length > 0 && (
              <div
                className={`relative grid gap-1 rounded-[5px] border border-[#2E3235]
                ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}
              >
                {images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className={`relative ${images.length === 3 && idx === 0 ? 'col-span-2' : ''}`}>
                    <img
                      src={img.url}
                      alt='post media'
                      className='w-full object-cover max-h-[700px] overflow-hidden rounded-[5px]'
                    />
                    <button
                      onClick={() => setMedias([])}
                      className='absolute -top-2 -right-2 z-10 flex justify-center items-center w-[25px] h-[25px] bg-white rounded-full shadow-md hover:bg-gray-200'
                    >
                      <svg className='w-4 h-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' fill='black'>
                        <path d='M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z' />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Media submit */}
            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center gap-x-4'>
                <label className='cursor-pointer'>
                  <img src={FileImage} alt='' className='w-[20px]' />
                  <input
                    className='hidden'
                    type='file'
                    name='image'
                    multiple={true}
                    accept='image/*'
                    onChange={(e: any) => {
                      const files = e.target.files
                      if (files && files.length > 0) {
                        const formData = new FormData()
                        Array.from(files).forEach((file: any) => {
                          formData.append('image', file)
                        })
                        handleUploadImage(formData)
                      }
                    }}
                  />
                </label>
                <label className='cursor-pointer'>
                  <img src={FileVideo} alt='' className='w-[20px]' />
                  <input
                    className='hidden'
                    type='file'
                    name='video'
                    multiple
                    accept='video/*'
                    onChange={(e: any) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const formData = new FormData()
                        formData.append('video', file)
                        handleUploadVideo(formData)
                      }
                    }}
                  />
                </label>
              </div>
              <button
                disabled={medias.length === 0 && !content?.trim()}
                className={`px-4 py-2.5 ml-3 rounded-full text-[#0F1410] font-semibold ${medias.length === 0 && !content?.trim() ? 'bg-[#787A74] cursor-not-allowed' : 'bg-[#FFFFFF] hover:bg-gray-200 cursor-pointer'}`}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
