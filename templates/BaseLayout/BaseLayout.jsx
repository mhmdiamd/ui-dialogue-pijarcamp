import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'

const BaseLayout = ({children}) => {
  return (
    <div className='overflow-x-hidden position-relative vh-100 max-vh-100 bg-danger'>
      <div className="col-12 h-100">
        {children}
      </div>
    </div>
  )
}

export default BaseLayout