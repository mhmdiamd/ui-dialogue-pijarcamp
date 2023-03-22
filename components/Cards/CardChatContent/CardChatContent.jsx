import React, { useEffect, useRef, useState } from 'react'
import style from './CardChatContent.module.css'
import InputSendMessage from '../../InputSendMessage/InputSendMessage'
import { useDispatch, useSelector } from 'react-redux'
import { useSendMessageMutation } from '../../../src/features/message/messageApi'
import { setCurrentChat } from '../../../src/features/message/messageSlice'
import { io } from 'socket.io-client'

const CardChatContent = () => {
  const [messageBeforeSend, setMessageBeforeSend] = useState(null)
  const [activeUsers, setActiveUsers] = useState([])
  const { user } = useSelector(state => state.auth)
  const [chats, setChats] = useState([])
  const { messages, chatId, contactInfo } = useSelector(state => state.message)
  const dispatch = useDispatch()
  const [sendMessage, { isLoading, isError, isSuccess }] = useSendMessageMutation()

  const socket = useRef()

  const sendMessageHandler = async (value) => {
    await sendMessage({ chatId, data: { message: { text: value, senderId: user?._id } } })
    setChats(prev => {
      return [
        ...prev, 
        { text: value, senderId: user?._id }
      ]
    })

    dispatch(setCurrentChat({
      chatId,
      messages: [...messages, { text: value, senderId: user?._id } ],
      contactInfo
    }))
  }


  useEffect(() => {
    socket.current = io('http://localhost:3000')
  }, [])

  useEffect(() => {
    if(user){
      socket.current.emit('user-login', user._id)
      socket.current.on('get-users', (data) => {
        setActiveUsers(data)
      })
    }

  }, [user])

  
  // Get Receive Message
  useEffect(() => {
    socket.current.on('get-socket-id', (id) => {
      console.log(id)
    })

    socket.current.on('receive-data', (data) => {
      console.log(data)
      setChats(prev => {
        return [
          ...prev, 
          { text: data.text, senderId: data.senderId }
        ]
      })
  
    })
  }, [])


    // Send Message 
    useEffect(() => {
      if(messageBeforeSend != null) socket.current.emit(`send-message`, {message: messageBeforeSend, receiverId: contactInfo._id, senderId: user?._id})
    }, [messageBeforeSend])
  

  useEffect(() => {
    setChats(messages)
  },[messages] )

  return (
    <div className={`${style.chatContent} container h-100`}>
      <div className={`${style.colChat} bg-dark-trinary h-100 row px-2 text-light`}>
        <div className={`pt-3 col-12 px-0 pe-1 h-100 d-flex flex-column justify-content-end`}>
          <div className={`${style.overflow} overflow-y-scroll pe-3 ps-2 content`}>
            {chats?.map((chat, i) => (
              chat?.senderId == user?._id ? (
                <div key={i} className="rowChat d-flex align-items-end gap-3 mb-3">
                  <span className={`${style.chat} ${style.chatPerson} bg-blue text-light text-end p-3 ms-auto bg-dark-secondary text-wrap`}>{chat?.text}</span>
                  <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid pointer`} alt="" />
                </div>
              )
                :
                (
                  <div key={i} className="rowChat d-flex align-items-end gap-3 mb-3">
                    <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid pointer`} alt="" />
                    <span className={`${style.chat} ${style.chatOtherUser} text-light p-3 bg-dark-secondary text-wrap`}>{chat?.text}</span>
                  </div>
                )
            ))}

          </div>
        </div>
      </div>
      <InputSendMessage onclick={(value) => {
        sendMessageHandler(value)
        setMessageBeforeSend(value)
      }} />
    </div>
  )
}

export default CardChatContent