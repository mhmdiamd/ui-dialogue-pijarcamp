import React from 'react'
import CardChat from '../../components/Cards/CardChat/CardChat'
import burgerBar from '../../src/assets/home/menu.svg'

const Sidebar = () => {
  return (
    <div className="col-4 col-lg-3 chat-list vh-100 pt-3 bg-dark px-4 border-0 border-1 border-end border-secondary">
      <div className="searchBar w-100 d-flex justify-content-between align-items-center mb-5">
        <span className='fs-2 fw-bold text-light'>Dialogue</span>
        <img src={burgerBar} className='img-fluid pointer' alt="" />
      </div>
      <div className="row pt-2">
        <div className="col-12">
          <CardChat classChat={`text-light`} />
        </div>
      </div>
    </div> 
  )
}

export default Sidebar