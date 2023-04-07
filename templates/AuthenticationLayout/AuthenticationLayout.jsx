import React from 'react'
import bgAuth from '../../src/assets/bg-authentication.png'

const AuthenticationLayout = ({children, className, classLeft, classRight}) => {
  return (
    <div className="container-fluid">
      <div className={`row vh-100 overflow-y-hidden ${className}`}>
        <div className={`${classLeft} vh-100`}>
          <div className="imageLogo h-100 d-flex flex-column justify-content-end align-items-center">
            <img src={bgAuth} className={`img-fluid d-block`} alt="" />
          </div>
        </div>
        <div className={`${classRight} vh-100 d-flex align-items-center justify-content-center-center`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthenticationLayout