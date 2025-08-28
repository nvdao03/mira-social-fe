import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { PATH } from './constants/path'
import AuthLayout from './layouts/AuthLayout'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import MainLayout from './layouts/MainLayout'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import Profile from './pages/Profile'
import Bookmark from './pages/Bookmark'
import Setting from './pages/Setting'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.SIGN_IN} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={PATH.HOME} />
}

function useRouterElements() {
  const routerElements = useRoutes([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: PATH.HOME,
          element: (
            <MainLayout>
              <Home />
            </MainLayout>
          )
        },
        {
          path: PATH.BOOKMARK,
          element: (
            <MainLayout>
              <Bookmark />
            </MainLayout>
          )
        },
        {
          path: PATH.SETTINGS,
          element: (
            <MainLayout>
              <Setting />
            </MainLayout>
          )
        },
        {
          path: PATH.PROFILE,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },

    {
      element: <RejectedRoute />,
      children: [
        {
          path: PATH.SIGN_IN,
          element: (
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          )
        },
        {
          path: PATH.SIGN_UP,
          element: (
            <AuthLayout>
              <SignUp />
            </AuthLayout>
          )
        }
      ]
    }
  ])
  return routerElements
}

export default useRouterElements
