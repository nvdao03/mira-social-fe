import { useState } from 'react'

interface PropTypes {
  isActive?: boolean
  count?: number
  activeColor: string
  iconPath: string
  handleSunmit?: () => void
}

function ButtonIcon({ isActive, handleSunmit, count, activeColor, iconPath }: PropTypes) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      className='flex items-center gap-1 cursor-pointer group pt-3 pb-3'
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        handleSunmit && handleSunmit() // Nếu có truyền prop handleSunmit thi thực thi function handleSunmit()
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        viewBox='0 0 24 24'
        aria-hidden='true'
        className={`text-[#71767b] h-5 w-5`}
        style={{
          // Nếu isActiver = true thì màu là activeColor hoặc hovered = true thì màu là activeColor và ngược lại ko cái nào bằng true thì là màu mặc định #71767b
          fill: isActive ? activeColor : hovered ? activeColor : '#71767b'
        }}
      >
        <g>
          <path d={iconPath} />
        </g>
      </svg>
      <span>{count}</span>
    </button>
  )
}

export default ButtonIcon
