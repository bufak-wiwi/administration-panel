import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { LoadingOverlay, useNotifications } from '../../features/Feedback'
import { useAuthentication } from '../../hooks/useAuthentication'

interface RouteProps {
  redirectPath?: string
  children?: React.ReactChildren
}

interface GeneralRouteProps extends RouteProps {
  isAllowed: boolean
  loading?: boolean
}

/**
 * Route that enforces a custom check before displaying the content
 */
export const ProtectedRoute = (props: GeneralRouteProps): any => {
  const location = useLocation()
  const { isAllowed, loading = false, redirectPath = '/', children } = props

  if (loading) {
    return <LoadingOverlay invisible />
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}

/**
 * Route that forces user to be logged in. Redirects to /login by default
 */
export const AuthenticatedRoute = ({ redirectPath = '/login', children }: RouteProps): any => {
  const location = useLocation()
  const { user, loading } = useAuthentication()

  if (loading) {
    return <LoadingOverlay invisible />
  }

  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  return children ? children : <Outlet />
}

/**
 * Route that forces user to be admin. Redirects to /access-denied and prompts a notification
 */
export const AdminRoute = ({ redirectPath = '/access-denied', children }: RouteProps): any => {
  const { isAdmin, loading } = useAuthentication()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (!isAdmin && !loading) {
      addNotification({
        message: 'Du hast nicht die erforderlichen Rechte, um diesen Inhalt zu sehen',
        color: 'error',
      })
    }
  }, [isAdmin, loading, addNotification])

  if (loading) {
    return <LoadingOverlay invisible />
  }

  if (!isAdmin) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
