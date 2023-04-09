import React, { useEffect, useRef, useState } from 'react'
import style from './CardChatContent.module.css'
import InputSendMessage from '../../InputSendMessage/InputSendMessage'
import { useDispatch, useSelector } from 'react-redux'
import { messageApi, useSendMessageMutation } from '../../../src/features/message/messageApi'
import { io } from 'socket.io-client'
import CardChat from '../CardChat/CardChat'
import { setCurrentChat } from '../../../src/features/message/messageSlice'
import { setActiveUsers } from '../../../src/features/user/userSlice'
import NavbarChat from '../../NavbarChat/NavbarChat'
import notfound from '../../../src/assets/notfound.svg'
import { userChatApi } from '../../../src/features/userChat/userChatApi'

const CardChatContent = () => {
  const { user } = useSelector(state => state.auth)
  const { messages, chatId, contactInfo } = useSelector(state => state.message)
  const [sendMessage] = useSendMessageMutation()
  const dispatch = useDispatch()

  const socket = useRef()
  const scroll = useRef()

  useEffect(() => {
    socket.current = io('https://socket-realtime-chat-pijarcamp-production.up.railway.app')
  }, [])

  useEffect(() => {
    if (user) {
      socket.current.emit('user-login', user._id)

      socket.current.on('get-users', (data) => {
        dispatch(setActiveUsers({ activeUsers: data }))
      })
    }
  }, [user])

  const receiveMessage = (contact) => {
    socket.current.on('receive-data', async (data) => {
      if(contact._id == data.senderId) {
        dispatch(messageApi.util.invalidateTags(['getMessageByIdChat']))
      }else {
        dispatch(setCurrentChat({
          contactInfo,
          messages,
          chatId
        }))
      }

      dispatch(userChatApi.util.invalidateTags(['getUserChat']))
    })
  }
  
  useEffect(() => {
    if (user) {
      socket.current.on('get-users', (data) => {
        dispatch(setActiveUsers({ activeUsers: data }))
      })
    }
  }, [])


  useEffect(() => {
    contactInfo && receiveMessage(contactInfo)
  }, [contactInfo])


  const sendMessageHandler = async (value) => {
    if (value) {
      socket.current.emit(`send-message`, { message: value, receiverId: contactInfo._id, senderId: user?._id })
      await sendMessage({ chatId, data: { message: { text: value, senderId: user?._id } } })
    }
  }

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      {messages ? (
        <>
          <NavbarChat />
          <div className={`${style.chatContent} overflow-y-hidden container vh-100`}>
            <div className={`${style.colChat} bg-dark-trinary h-100 row px-2 text-light`}>
              <div className={`col-12 px-0 pe-1 h-100 d-flex flex-column justify-content-end`}>
                <div className={`${style.overflow} overflow-y-scroll pe-2 pe-sm-3 ps-3 ps-sm-2 content`}>
                  {messages && messages?.map((message, i) => (
                    <CardChat
                      key={i}
                      index={i}
                      scrollRef={scroll}
                      data={message}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            </div>
            <InputSendMessage onclick={(value) => {
              sendMessageHandler(value)
            }} />
          </div>
        </>
      ) : (
        <div className="row h-100">
          <div className="col-12 border-0 border-1 border-start border-secondary ms-2 h-100 d-flex flex-column justify-content-center align-items-center bg-dark">
            <img src={notfound} alt="" width={300} height={300} className="img-fluid" />
            <h2 className='text-secondary fw-bold'>No chat history</h2>
          </div>
        </div>
      )}
    </>
  )
}

export default CardChatContent