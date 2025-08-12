interface MainLayoutPropsType {
  children: React.ReactNode
}

function MainLayout({ children }: MainLayoutPropsType) {
  return <div>{children}</div>
}

export default MainLayout
