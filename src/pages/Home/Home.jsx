import React from 'react'
import CardChatContent from '../../../components/Cards/CardChatContent/CardChatContent'
import NavbarChat from '../../../components/NavbarChat/NavbarChat'
import Sidebar from '../../../components/Sidebar/Sidebar'
import BaseLayout from '../../../templates/BaseLayout/BaseLayout'


const Home = () => {  
  
  return (
    <BaseLayout>
        <div className="row h-100">
          <Sidebar />
          <div className={`col-12 col-sm-7 col-md-8 col-lg-9 chat-list h-100 bg-dark px-0 position-relative`}>
            <NavbarChat />
            <CardChatContent />
          </div>
        </div>
    </BaseLayout>
    
  )
}

export default Home