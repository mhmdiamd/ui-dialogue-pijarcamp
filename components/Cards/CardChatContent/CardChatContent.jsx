import React, { useEffect, useRef, useState } from 'react'
import style from './CardChatContent.module.css'
import InputSendMessage from '../../InputSendMessage/InputSendMessage'
import { useDispatch, useSelector } from 'react-redux'
import { useSendMessageMutation } from '../../../src/features/message/messageApi'
import { setCurrentChat } from '../../../src/features/message/messageSlice'
import { io } from 'socket.io-client'
import CardChat from '../CardChat/CardChat'

const CardChatContent = () => {
  const [messageBeforeSend, setMessageBeforeSend] = useState(null)
  const [activeUsers, setActiveUsers] = useState([])
  const { user, accessToken } = useSelector(state => state.auth)
  const [chats, setChats] = useState([{}])
  const { messages, chatId, contactInfo } = useSelector(state => state.message)
  const dispatch = useDispatch()
  const [sendMessage, { isLoading, isError, isSuccess }] = useSendMessageMutation()

  const socket = useRef()
  const scroll = useRef()

  const sendMessageHandler = async (value) => {
    await sendMessage({ chatId, data: { message: { text: value, senderId: user?._id } } })
    setChats(prev => {
      return [
        ...prev,
        { text: value, senderId: user?._id }
      ]
    })
  }


  useEffect(() => {
    socket.current = io('http://localhost:3000')
  }, [])

  useEffect(() => {
    if (user) {
      socket.current.emit('user-login', user._id)
      socket.current.on('get-users', (data) => {
        setActiveUsers(data)
      })
    }

  }, [user])


  // Get Receive Message
  useEffect(() => {
    socket.current.on('receive-data', async (data) => {
      setChats(prev => {
        return [
          ...prev,
          { text: data.text, senderId: data.senderId }
        ]
      })

      
      // Store to db
      await sendMessage({ chatId, data: { message: { text: data.text, senderId: data.senderId } } })

      dispatch(setCurrentChat({
        chatId,
        messages:[...messages, { text: data.text, senderId: user?._id }],
        contactInfo
      }))

    })
  }, [])


  // Send Message 
  useEffect(() => {
    if (messageBeforeSend != null) socket.current.emit(`send-message`, { message: messageBeforeSend, receiverId: contactInfo._id, senderId: user?._id })
  }, [messageBeforeSend])


  useEffect(() => {
    setChats(messages)
  }, [messages, dispatch])

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats])

  return (
    <div className={`${style.chatContent} overflow-y-hidden container vh-100`}>
      <div className={`${style.colChat} bg-dark-trinary h-100 row px-2 text-light`}>
        <div className={`col-12 px-0 pe-1 h-100 d-flex flex-column justify-content-end`}>
          <div className={`${style.overflow} overflow-y-scroll pe-2 pe-sm-3 ps-3 ps-sm-2 content`}>
            {chats?.map((chat, i) => (
              <CardChat key={i} scrollRef={scroll} data={chat} user={user}/>
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