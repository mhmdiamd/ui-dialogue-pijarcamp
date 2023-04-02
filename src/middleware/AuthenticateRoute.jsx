import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthenticateRoute = ({ children }) => {
  const navigate = useNavigate()

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      console.log('tes')
      return navigate('/login')
    } 
    
  }, [])

  return children
}

export default AuthenticateRoute