import React, { useEffect, useState } from 'react'
import style from './CardContact.module.css'
import photoDefault from '../../../src/assets/profile.png'
import { messageApi, useGetMessageByIdChatQuery } from '../../../src/features/message/messageApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../../../src/features/message/messageSlice'
import { setCurrentContact } from '../../../src/features/userChat/userChatSlice'

const CardContact = ({ className, classChat, data, isOnline }) => {
  const dispatch = useDispatch()
  const [contact, setContact] = useState(false)
  const { data: userMessage} = useGetMessageByIdChatQuery(data._id)
  const { messages, chatId } = useSelector(state => state.message)
  const { user } = useSelector(state => state.auth)

  const clickHandler = (e) => {
    dispatch(setCurrentChat({ contactInfo: contact, messages: userMessage?.messages, chatId: data?._id }))
    dispatch(messageApi.util.invalidateTags(['getMessageByIdChat']))
  }

  useEffect(() => {
    if(messages){
      if(userMessage?.chatId == chatId) { 
        dispatch(setCurrentChat({ contactInfo: contact, messages: userMessage?.messages, chatId: data?._id }))
      }
    }
  }, [userMessage])

  useEffect(() => {
    setContact(data?.members?.filter(member => member._id != user?._id)[0])
  }, [user])

  return (
    <div className={`${className} col-12 d-flex gap-3 mb-3 pointer`} onClick={clickHandler}>
      <img 
        src={`${contact?.photo ? contact?.photo : photoDefault}`} 
        className={`image-contact img-fluid`} 
        width={64} height={62} alt="" />
      <div className="message d-flex flex-column justify-content-center overflow-x-hidden text-nowrap">
        <span className={`${isOnline ? 'text-blue' : 'text-light' } fw-bold`}>{contact?.name}</span>
        <span className={`${style.textChat} ${classChat} fw-normal`}>{data?.lastMessage?.text || `Hello World!`}</span>
      </div>
    </div>
  )
}

export default CardContact