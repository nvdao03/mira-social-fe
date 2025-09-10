import { Link, useNavigate, useParams } from 'react-router-dom'
import AvatarDefault from '../../assets/imgs/avatar-default.png'
import { type UpdateProfileFormValues } from '../../utils/validation'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { userApi } from '../../apis/user.api'
import { useContext, useEffect, useState } from 'react'
import { fileApi } from '../../apis/file.api'
import { toast } from 'react-toastify'
import { MESSAGE } from '../../constants/message'
import { AppContext } from '../../contexts/app.context'
import type { ProfileType } from '../../types/user.type'

type UpdateProfileFormData = UpdateProfileFormValues

export default function UpdateProfile() {
  const { setAvatar, setName } = useContext(AppContext)
  const params = useParams()
  const navidate = useNavigate()
  const [avatarImage, setAvatarImage] = useState<string>('')
  const [coverPhoto, setCoverPhoto] = useState<string>('')

  const { register, handleSubmit, setValue } = useForm<UpdateProfileFormData>()

  const getProfileQuery = useQuery({
    queryKey: ['profile', params.user_id],
    queryFn: () => userApi.getProfile(params.user_id as string),
    keepPreviousData: true
  })

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: FormData) => fileApi.uploadAvatar(file)
  })

  const uploadCoverPhotoMutation = useMutation({
    mutationFn: (file: FormData) => fileApi.uploadCoverPhoto(file)
  })

  const updateProfileMutation = useMutation({
    mutationFn: (body: UpdateProfileFormValues) => userApi.updateProile(params.user_id as string, body)
  })

  const handleUploadAvatar = (file: FormData) => {
    uploadAvatarMutation.mutate(file, {
      onSuccess: (data) => {
        const newAvatar = data.data.data.map((avatar: any) => avatar.url)[0]
        setAvatarImage(newAvatar)
        setValue('avatar', newAvatar)
      }
    })
  }

  const handleUploadCoverPhoto = (file: FormData) => {
    uploadCoverPhotoMutation.mutate(file, {
      onSuccess: (data) => {
        const newCoverPhoto = data.data.data.map((coverPhoto: any) => coverPhoto.url)[0]
        setCoverPhoto(newCoverPhoto)
        setValue('cover_photo', newCoverPhoto)
      }
    })
  }

  const handleUpdateProfile = handleSubmit((data) => {
    console.log(data)
    updateProfileMutation.mutate(data, {
      onSuccess: (data) => {
        toast.success(MESSAGE.UPDATE_PROFILE_SUCCESSFULLY)
        setAvatar(data.data.data.avatar)
        setName(data.data.data.name)
        setAvatarImage('')
        setCoverPhoto('')
        navidate(`/${params.user_id}`)
      }
    })
  })

  useEffect(() => {
    if (!getProfileQuery.data?.data.data) return
    if (getProfileQuery.data.data.data) {
      getProfileQuery.data.data.data.map((user: ProfileType) => {
        setValue('name', user.name)
        setValue('bio', user.bio)
        setValue('avatar', user.avatar)
        setValue('website', user.website)
        setValue('location', user.location)
        setValue('date_of_birth', user.date_of_birth ? new Date(user.date_of_birth).toISOString().split('T')[0] : '')
        setValue('cover_photo', user.cover_photo)
        setAvatarImage(user.avatar)
        setCoverPhoto(user.cover_photo)
      })
    }
  }, [params.user_id, getProfileQuery.data?.data.data])

  return (
    <div className='relative pb-[45px] md:pb-[5px]'>
      {/* Header */}
      <div className='px-4 pt-2 pb-2 flex items-center border-b border-solid border-[#2E3235] sticky top-0 left-0 right-0 bg-black z-20'>
        <Link to={`/${params.user_id as string}`} className='py-3 pr-3'>
          <svg viewBox='0 0 24 24' aria-hidden='true' className='inline-block h-5 w-5' fill='#eff3f4'>
            <g>
              <path d='M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z'></path>
            </g>
          </svg>
        </Link>
        <h3 className='text-color_auth text-[18px] font-semibold ml-3'>Edit profile</h3>
      </div>
      <form encType='multipart/form-data' method='post' onSubmit={handleUpdateProfile}>
        <div className='relative'>
          {/* Cover photo */}
          <div
            {...register('cover_photo')}
            className={`relative w-full h-[140px] md:h-[200px] bg-[#16191B] flex justify-center items-center bg-cover bg-center bg-no-repeat`}
            style={{
              backgroundImage: coverPhoto ? `url(${coverPhoto})` : undefined
            }}
          >
            <label className='cursor-pointer'>
              <input
                className='hidden'
                type='file'
                name='image'
                multiple={true}
                accept='image/*'
                onChange={(e: any) => {
                  const file = e.target.files[0]
                  if (file) {
                    const formData = new FormData()
                    formData.append('image', file)
                    handleUploadCoverPhoto(formData)
                  }
                }}
              />
              <div className='w-[40px] h-[40px] bg-[#16191B] flex justify-center items-center rounded-full'>
                <svg viewBox='0 0 24 24' aria-hidden='true' className='w-5 h-5 inline-block' fill='#eff3f4'>
                  <g>
                    <path d='M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z'></path>
                  </g>
                </svg>
              </div>
            </label>
            {coverPhoto && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setCoverPhoto('')
                  setValue('cover_photo', '')
                }}
                className='w-[40px] h-[40px] bg-[#16191B] ml-2 flex justify-center items-center rounded-full'
              >
                <svg className='w-4 h-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640' fill='#ffffff'>
                  <path d='M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z' />
                </svg>
              </button>
            )}
          </div>
          {/* Avatar */}
          <div className='absolute -bottom-12 left-4'>
            <div className='relative bg-slate-400 rounded-full'>
              <label className='cursor-pointer'>
                <div className='w-[94px] h-[94px] md:w-[120px] md:h-[120px]'>
                  <img
                    src={avatarImage || AvatarDefault}
                    alt='avatar'
                    className='w-full h-full object-cover rounded-full'
                  />
                </div>
                <input
                  className='hidden'
                  type='file'
                  name='image'
                  multiple={true}
                  accept='image/*'
                  onChange={(e: any) => {
                    const file = e.target.files[0]
                    if (file) {
                      const formData = new FormData()
                      formData.append('image', file)
                      handleUploadAvatar(formData)
                    }
                  }}
                />
                <div className='absolute bottom-0 right-0 w-[40px] h-[40px] bg-[#16191B] flex justify-center items-center rounded-full'>
                  <svg viewBox='0 0 24 24' aria-hidden='true' className='w-5 h-5 inline-block' fill='#eff3f4'>
                    <g>
                      <path d='M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z'></path>
                    </g>
                  </svg>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className='mt-16 p-4 space-y-4'>
          <div className='flex flex-col gap-y-1'>
            <label className='text-[14px] text-color_auth'>Name</label>
            <input
              {...register('name')}
              type='text'
              className='w-full text-[14px] mt-2 p-2 rounded-md bg-transparent border border-[#2E3235] focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-[14px] text-color_auth mb-2'>Bio</label>
            <textarea
              {...register('bio')}
              className='bg-transparent text-[14px] w-full focus:bg-transparent focus:outline-none border border-[#2E3235] rounded-md px-2 py-[8px] lg:py-[8px] leading-[1.5] resize-none overflow-hidden'
              onInput={(e) => {
                const textarea = e.target as HTMLTextAreaElement
                textarea.style.height = 'auto'
                textarea.style.height = `${textarea.scrollHeight}px`
              }}
            ></textarea>
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-[14px] text-color_auth'>Location</label>
            <input
              {...register('location')}
              type='text'
              className='w-full mt-2 p-2 text-[14px] rounded-md bg-transparent border border-[#2E3235] focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-[14px] text-color_auth'>Website</label>
            <input
              {...register('website')}
              type='text'
              className='w-full mt-2 p-2 text-[14px] rounded-md bg-transparent border border-[#2E3235] focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='flex flex-col gap-y-1'>
            <label className='text-[14px] text-color_auth'>Birth date</label>
            <input
              {...register('date_of_birth')}
              type='date'
              className='w-full mt-2 p-2 text-[14px] rounded-md bg-transparent border border-[#2E3235] focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='w-full flex justify-end'>
            <button
              className={`px-5 py-2.5 ml-auto rounded-full text-[#0F1410] font-semibold bg-[#FFFFFF] hover:bg-gray-200 cursor-pointer`}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
