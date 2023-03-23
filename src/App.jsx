import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useDispatch, useSelector } from 'react-redux'
import { useGetCurrentDataQuery } from './features/auth/authApi'
import { setCredentials } from './app/reducer/authSlice'
import AuthenticateRoute from './middleware/AuthenticateRoute'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const { data, isSuccess } = useGetCurrentDataQuery()

  useEffect(() => {
    if(!user){
      if(isSuccess){
        dispatch(setCredentials({user: data, token : localStorage.getItem(`token`)}))
      }
    }
  }, [user, isSuccess])

  return (
    <Routes>
      <Route path='/' element={
          <Home />
      } 
      />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
