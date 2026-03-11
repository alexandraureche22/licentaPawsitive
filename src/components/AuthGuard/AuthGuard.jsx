import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthGuard = ({ children, isAuthenticated }) => {
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to='/autentificare' state={{ from: location }} replace />
  }

  return children
}

export default AuthGuard
