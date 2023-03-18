import { faMagnifyingGlass, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import InputSendMessage from '../../../components/InputSendMessage/InputSendMessage'
import NavbarChat from '../../../components/NavbarChat/NavbarChat'
import Sidebar from '../../../components/Sidebar/Sidebar'
import BaseLayout from '../../../templates/BaseLayout/BaseLayout'
import style from './Home.module.css'

const Home = () => {  
  return (
    <BaseLayout>
        <div className="row h-100">
          <Sidebar />
          <div className={`col-8 col-lg-9 chat-list h-100 bg-dark px-0 position-relative`}>
            <NavbarChat />
            <div className={`${style.chatContent} container h-100`}>
              <div className={`bg-dark-trinary h-100 overflow-y-scroll row px-2 mb-0 text-light`}>
                <div className={`${style.colChat} col-12 d-flex flex-column justify-content-end`}>
                  <div className="rowChat d-flex align-items-end gap-3 mb-3">
                    <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid pointer`} alt="" />
                    <span className={`${style.chat} ${style.chatOtherUser} text-light p-3 bg-dark-secondary text-wrap`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quae!</span>
                  </div>

                  <div className="rowChat d-flex align-items-end gap-3 mb-3">
                    <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid pointer`} alt="" />
                    <span className={`${style.chat} ${style.chatOtherUser} text-light p-3 bg-dark-secondary text-wrap`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quae!</span>
                  </div>

                  <div className="rowChat d-flex align-items-end gap-2 mb-3">
                    <span className={`${style.chat} ${style.chatPerson} bg-blue text-light text-end p-3 ms-auto bg-dark-secondary text-wrap`}>Lorem ipsum dolor sit amet consectetur, adipisicing elit Porro, quae!, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro, quae!</span>
                    <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid pointer`} alt="" />
                  </div>
                </div>
              </div>
              <InputSendMessage />
            </div>
          </div>
        </div>
    </BaseLayout>
    
  )
}

export default Home