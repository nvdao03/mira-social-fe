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
import Follow from './pages/Follow'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CrearePost'
import UpdatePost from './pages/UpdatePost'
import UpdateProfile from './pages/UpdateProfile'
import Explore from './pages/Explore'
import Connect from './pages/Connect'
import ChangePassword from './pages/Setting/ChangePassword'
import VerifyEmail from './pages/VerifyEmail'
import VerifyForgotPassword from './pages/VerifyForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

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
        },
        {
          path: PATH.FOLLOW,
          element: (
            <MainLayout>
              <Follow />
            </MainLayout>
          )
        },
        {
          path: PATH.POST_DETAIL,
          element: (
            <MainLayout>
              <PostDetail />
            </MainLayout>
          )
        },
        {
          path: PATH.UPLOAD,
          element: (
            <MainLayout>
              <CreatePost />
            </MainLayout>
          )
        },
        {
          path: PATH.UPDATE_POST,
          element: (
            <MainLayout>
              <UpdatePost />
            </MainLayout>
          )
        },
        {
          path: PATH.UPDATE_PROFILE,
          element: (
            <MainLayout>
              <UpdateProfile />
            </MainLayout>
          )
        },
        {
          path: PATH.EXPLORE,
          element: (
            <MainLayout>
              <Explore />
            </MainLayout>
          )
        },
        {
          path: PATH.CONNECT,
          element: (
            <MainLayout>
              <Connect />
            </MainLayout>
          )
        },
        {
          path: PATH.SETTINGS_PASSWORD,
          element: (
            <MainLayout>
              <ChangePassword />
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
    },
    {
      path: PATH.VERIFY_EMAIL,
      element: (
        <AuthLayout>
          <VerifyEmail />
        </AuthLayout>
      )
    },
    {
      path: PATH.FORGOT_PASSWORD,
      element: (
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      )
    },
    {
      path: PATH.VERIFY_FORGOT_PASSWORD,
      element: (
        <AuthLayout>
          <VerifyForgotPassword />
        </AuthLayout>
      )
    },
    {
      path: PATH.RESET_PASSWORD,
      element: (
        <AuthLayout>
          <ResetPassword />
        </AuthLayout>
      )
    },
    {
      path: PATH.PRIVACY_POLICY,
      element: (
        <AuthLayout>
          <PrivacyPolicy />
        </AuthLayout>
      )
    },
    {
      path: PATH.TERMS_OF_SERVICE,
      element: (
        <AuthLayout>
          <TermsOfService />
        </AuthLayout>
      )
    }
  ])
  return routerElements
}

export default useRouterElements
