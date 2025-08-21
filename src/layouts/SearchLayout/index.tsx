import type React from 'react'

interface PropTypes {
  children: React.ReactNode
}

function SearchLayout({ children }: PropTypes) {
  return <div>{children}</div>
}

export default SearchLayout
