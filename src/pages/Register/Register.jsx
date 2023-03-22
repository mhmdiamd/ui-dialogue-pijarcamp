import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InputFormAuth from '../../../components/Forms/InputFormAuth/InputFormAuth'
import AuthenticationLayout from '../../../templates/AuthenticationLayout/AuthenticationLayout'
import Form from 'react-bootstrap/Form';
import { useRegisterMutation } from '../../features/auth/authApi';
import { failedLoading, showLoading, successLoading } from '../../common/loadingHandler';

const Register = () => {  
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation()

  const changeHandler = async (e) => {
    console.log(data)
    setData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await register(data)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if(isSuccess) {
      successLoading('Register Success')
      navigate(`/`)
    }
    if(isLoading) showLoading('Please Wait...')
    if(isError) {
      failedLoading(error?.data?.message || `Something went wrong!`)
    }
  }, [isLoading, isSuccess, isError])

  return (
    <AuthenticationLayout
      classLeft={`col-6 d-md-block d-none order-2`}
      classRight={`col-12 col-md-6 order-1`}
      className={`bg-dark`}
    >
      <div className="row mx-auto d-flex justify-content-center">
        <div className="col-12 col-sm-8 col-md-10 col-lg-8 d-flex justify-content-center">
          <div className="card bg-transparent border-0">
            <div className="card-body">
              <Form onSubmit={submitHandler}>
                <h5 className="card-title text-light fs-1">Register</h5>
                <p className="mb-2 small text-light mt-2 mb-3 mt-3">If you want to join our chat app, get ready for a lot of 'chat'-ter and laughter because we're a funny bunch!</p>
                <InputFormAuth className={`text-light`} type={`text`} name={'name'} placeholder={`Input Name`} title={`Name`} required={true} onchange={changeHandler} />

                <InputFormAuth className={`text-light`} type={`email`} name={'email'} placeholder={`Input Email`} title={`Email`} required={true} onchange={changeHandler} />

                <InputFormAuth className={`text-light`} type={`password`} name={'password'} placeholder={`Input Password`} title={`Password`} onchange={changeHandler} required={true} />

                <Link to="#" className="text-end text-decoration-none fw-normal fw-none text-light mb-3 d-block">Forgot Password?</Link>

                <div className="row">
                  <div className="col-12">
                    <button type='submit' className="btn bg-blue text-light w-100 rounded-pill fw-semibold">Register</button>
                  </div>
                  <div className="col-12 mt-2">
                    <span className='text-light text-center d-block'>Already have account?
                      <Link to="/login" className="text-blue text-decoration-none w-100 rounded-pill fw-semibold"> Login</Link>
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

export default Register