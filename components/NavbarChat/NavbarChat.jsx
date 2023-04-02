import { faArrowLeft, faEllipsisV, faEllipsisVertical, faFolderOpen, faImage, faPhoneVolume, faVideo, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../../src/features/message/messageSlice'
import style from './NavbarChat.module.css'

const NavbarChat = () => {
  const dispatch = useDispatch()
  const {contactInfo, messages} = useSelector(state => state.message)
  const { activeUsers } = useSelector(state => state.user)

  const isOnline = () => {
    const users = activeUsers?.filter(user => user.userId == contactInfo._id)

    if(users?.length > 0) return true
    return false
  }


  const backHandler = (e) => {
    dispatch(setCurrentChat({
      contactInfo: null,
      messages: undefined,
      chatId: undefined,
    }))
  }

  return (
    <nav className={`${style.navbar} navbar px-2 py-3 shadow bg-dark navbar-expand-lg`}>
      <div className="container">
        <div className="userInformation d-flex align-items-center">
          <FontAwesomeIcon className='text-light me-2 d-sm-none fs-5' icon={faArrowLeft} onClick={backHandler}/>

          <img src="https://source.unsplash.com/random/45x45/?person" className={`img-fluid pointer rounded-circle d-sm-none`} width={45} height={45} alt="" />

          <img src="https://source.unsplash.com/random/45x45/?person" className={`img-fluid pointer image-contact d-none d-sm-block`} width={64} height={62} alt="" />

          <div className="d-flex flex-column justify-content-center ms-2">
            <span className='fw-bold text-light'>{contactInfo?.name}</span>
            <span className='text-secondary d-block text-medium'>{
              isOnline() ? 'Online' : 'Offline'
            }</span>
          </div>
        </div>
        <button className="navbar-toggler shadow-none border-0 text-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex ms-auto" role="search">
            <ul className="navbar-nav gap-2 me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-secondary active" aria-current="page" href="#">
                  <FontAwesomeIcon icon={faVideo} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary active" aria-current="page" href="#">
                  <FontAwesomeIcon icon={faFolderOpen} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary active" aria-current="page" href="#">
                  <FontAwesomeIcon icon={faPhoneVolume} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary active" aria-current="page" href="#">
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary active" aria-current="page" href="#">
                  <FontAwesomeIcon icon={faImage} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarChat