import { faEllipsisV, faEllipsisVertical, faFolderOpen, faImage, faPhoneVolume, faVideo, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const NavbarChat = () => {
  return (
    <nav className="navbar px-2 shadow bg-dark navbar-expand-lg">
      <div className="container">
        <div className="userInformation d-flex">
          <img src="https://source.unsplash.com/random/45x45/?person" className={`img-fluid pointer image-contact`} width={64} height={62} alt="" />
          <div className="d-flex flex-column justify-content-center ms-2">
            <span className='fw-bold text-light'>Muhamad Ilham Darmawan</span>
            <span className='text-secondary d-block text-medium'>@mhmdiamd</span>
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