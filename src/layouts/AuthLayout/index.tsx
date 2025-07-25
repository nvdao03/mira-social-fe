interface PropsType {
  children: React.ReactNode
}

function AuthLayout({ children }: PropsType) {
  return <div className='bg-[#0D1117] w-[100vw] h-[100vh]'>{children}</div>
}

export default AuthLayout
