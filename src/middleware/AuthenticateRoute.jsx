import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthenticateRoute = ({childern}) => {
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if(!user) return navigate('/login')
  }, [user])

  return childern
}

export default AuthenticateRoute