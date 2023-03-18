import React from 'react'
import { Link } from 'react-router-dom'
import InputFormAuth from '../../../components/Forms/InputFormAuth/InputFormAuth'
import AuthenticationLayout from '../../../templates/AuthenticationLayout/AuthenticationLayout'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const Login = () => {
  const [data, setData] = useState({
    name: "",
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
  }
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
                <h5 className="card-title text-light fs-1">Login</h5>
                <p className="mb-2 small text-light mt-2 mb-3 mt-3">If you want to join our chat app, get ready for a lot of 'chat'-ter and laughter because we're a funny bunch!</p>

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