import { useRoutes } from 'react-router-dom'
import { PATH } from './constants/path'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Register from './pages/Register'

function useRouterElements() {
  const routerElements = useRoutes([
    {
      index: true,
      path: PATH.LOGIN,
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      )
    },
    {
      path: PATH.REGISTER,
      element: (
        <AuthLayout>
          <Register />
        </AuthLayout>
      )
    }
  ])
  return routerElements
}

export default useRouterElements
