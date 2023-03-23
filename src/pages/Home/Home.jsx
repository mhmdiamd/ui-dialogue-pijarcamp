import React from 'react'
import { useSelector } from 'react-redux'
import CardChatContent from '../../../components/Cards/CardChatContent/CardChatContent'
import NavbarChat from '../../../components/NavbarChat/NavbarChat'
import Sidebar from '../../../components/Sidebar/Sidebar'
import BaseLayout from '../../../templates/BaseLayout/BaseLayout'
import style from './Home.module.css'

const Home = () => {

  const { messages } = useSelector(state => state.message)

  return (
    <BaseLayout>
      <div className="row h-100">
        <Sidebar className={style.leftSide} />
        <div className={`${style.rightSide} ${messages ? style.onTop : ''} col-12 col-sm-7 col-md-8 col-lg-9 chat-list vh-100 px-0 position-relative`}>
          <NavbarChat />
          <CardChatContent />
        </div>
      </div>
    </BaseLayout>

  )
}

export default Home