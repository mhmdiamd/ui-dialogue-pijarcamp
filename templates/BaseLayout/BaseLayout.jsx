import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'

const BaseLayout = ({children}) => {
  return (
    <div className='overflow-hidden'>
      <div className="col-12 vh-100 max-vh-100 bg-dark">
        {children}
      </div>
    </div>
  )
}

export default BaseLayout