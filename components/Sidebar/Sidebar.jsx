import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import CardChat from '../../components/Cards/CardChat/CardChat'
import burgerBar from '../../src/assets/home/menu.svg'
import { useGetUserChatQuery } from '../../src/features/userChat/userChatApi'
import style from './Sidebar.module.css'

const Sidebar = () => {
  const [status, setStatus] = useState('all')
  const {data: chats, isLoading, isSuccess} =  useGetUserChatQuery()

  const changeHandler = (e) => {
    
  }

  const changeStatus = (value) => {
    setStatus(value)
  }
  return (
    <div className="col-12 col-sm-5 col-md-4 col-lg-3 h-100 chat-list vh-100 pt-3 bg-dark ps-4 pe-4 pe-md-3 border-0 border-1 border-end border-secondary">
      <div className="searchBar w-100 d-flex justify-content-between align-items-center mb-0 mb-sm-5">
        <span className='fs-2 fw-bold text-light'>Dialogue</span>
        <div className="listIcon d-flex gap-3">
          <FontAwesomeIcon className='fs-5 text-blue d-block d-sm-none' icon={faPlus} />
          <FontAwesomeIcon className='fs-5 text-blue d-block d-sm-none' icon={faMagnifyingGlass} />
          <img src={burgerBar} className='img-fluid pointer' alt="" />
        </div>
      </div>
      <div className="row h-100 pt-3 pt-sm-2">
        <div className="col-12 d-none d-sm-flex align-items-center gap-2 mb-3">
          <div className="inputGroup position-relative d-flex w-100 align-items-center">
            <input type="text" className='form-control bg-dark-secondary border-0 shadow-none text-light ps-5' name='search' onChange={changeHandler}/>
            <FontAwesomeIcon className={`${style.searchIcon} text-secondary position-absolute fs-5`} icon={faMagnifyingGlass} />
          </div>
          <FontAwesomeIcon className='btn bg-dark-secondary text-light' icon={faPlus} />
        </div>
        <div className="col-12 py-0 mb-3 pb-0">
          <div className="listBtn d-flex gap-2">
            <button 
              className={`btn ${status == 'all' ? 'bg-blue' : ''} text-light w-100 rounded-pill`} 
              onClick={() => changeStatus('all')}
            >All</button>

            <button 
              className={`btn ${status == 'important'? 'bg-blue' : ''} text-light px-4 rounded-pill w-100`} onClick={() => changeStatus('important')}
            >Important</button>

            <button 
              className={`btn ${status == 'unread' ? 'bg-blue' : ''} text-light w-100 rounded-pill`} 
              onClick={() => changeStatus('unread')}
            >Unread</button>
          </div>
        </div>
        <div className={`col-12 ${style.contactContent} pb-5 pe-0`}>
          <div className={`${style.chatListContact} h-100 pb-5 pb-sm-4 pe-3 overflow-y-scroll`}>
            {chats?.map((chat, i) => (
              <CardChat key={i} data={chat} classChat={`text-secondary`} />
            ))}
            <CardChat classChat={`text-secondary`} />
            <CardChat classChat={`text-secondary`} />
            <CardChat classChat={`text-secondary`} />
            <CardChat classChat={`text-secondary`} />
            <CardChat classChat={`text-secondary`} />
            <CardChat classChat={`text-secondary`} />
            <CardChat classChat={`text-secondary`} />
            <CardChat classChat={`text-secondary`} />
          </div>
        </div>
      </div>
    </div> 
  )
}

export default Sidebar