import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputFormAuth from '../../../components/Forms/InputFormAuth/InputFormAuth'
import AuthenticationLayout from '../../../templates/AuthenticationLayout/AuthenticationLayout'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useLoginMutation } from '../../features/auth/authApi';
import { setCredentials } from '../../app/reducer/authSlice';
import { useDispatch } from 'react-redux';
import { failedLoading, showLoading } from '../../common/loadingHandler';
import Swal from 'sweetalert2';

const Login = () => {
  const [login, {isSuccess, isLoading, isError, error}] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const changeHandler = async (e) => {
    setData(prev => {
      return {
        ...prev,
        [e.target.name] : e.target.value
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try{
      const res = await login(data)
      const {token, refreshToken, ...other } = res.data.data
      dispatch(setCredentials({user: other, token: refreshToken, accessToken: token}))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if(isSuccess) {
      Swal.close()
      navigate(`/`)
    }
    if(isLoading) showLoading('Please Wait...')
    if(isError) {
      failedLoading(error?.data?.message || `Something went wrong!`)
    }
  }, [isLoading, isSuccess, isError])

  return (
    <AuthenticationLayout 
      classLeft={`col-6 d-md-block d-none`}
      classRight={`col-12 col-md-6`}
      className={`bg-dark`}
    >
      <div className="row mx-auto d-flex justify-content-center">
        <div className="col-12 col-sm-8 col-md-10 col-lg-8 d-flex justify-content-center">
          <div className="card bg-transparent border-0">
            <div className="card-body">
              <Form onSubmit={submitHandler}>
                <h1 className='text-light mb-5 fw-bold'>Welcome in  <br /> <span className='text-blue'>Dialogue!</span></h1>
                <h5 className="card-title text-light fs-3">Login</h5>
                <p className="mb-2 small text-light mt-2 mb-3 mt-3">Login and join now, we give so many Social Experience, Lets Join in Dialverse!</p>

                <InputFormAuth className={`text-light`} type={`email`} name={'email'} placeholder={`Input Email`} title={`Email`} required={true} onchange={changeHandler}/>

                <InputFormAuth className={`text-light`} type={`password`} name={'password'} placeholder={`Input Password`} title={`Password`} required={true} onchange={changeHandler}/>

                <Link to="#" className="text-end text-decoration-none fw-normal fw-none text-light mb-3 d-block">Forgot Password?</Link>
                
                <div className="row">
                  <div className="col-12">
                    <button type='submit' className="btn bg-blue text-light w-100 rounded-pill fw-semibold">Login</button>
                  </div>
                  <div className="col-12 mt-2">
                    <span className='text-light text-center d-block'>Dont have an account?  
                      <Link to="/register" className="text-blue text-decoration-none w-100 rounded-pill fw-semibold"> Register</Link>
                    </span>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationLayout>
  )
}

export default Login