import React, { useEffect, useState } from 'react'
import style from './CardContact.module.css'
import photoDefault from '../../../src/assets/profile.png'
import { useGetMessageByIdChatQuery } from '../../../src/features/message/messageApi'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../../../src/features/message/messageSlice'

const CardContact = ({ className, classChat, data }) => {
  const dispatch = useDispatch()
  const [contact, setContact] = useState({})
  const { messages, chatId } = useSelector(state => state.message)
  const { data: userMessage, isSuccess, isLoading } = useGetMessageByIdChatQuery(data._id)
  const { user } = useSelector(state => state.auth)

  const clickHandler = async (e) => {
 
    dispatch(setCurrentChat({ contactInfo: contact, messages: userMessage?.messages, chatId: data?._id }))

  }

  useEffect(() => {
    setContact(data?.members?.filter(member => member._id != user?._id)[0])
  }, [user])

  return (
    <div className={`${className} col-12 d-flex gap-3 mb-3 pointer`} onClick={clickHandler}>
      <img src={`${contact?.photo ? contact?.photo : photoDefault}`} className={`image-contact img-fluid  pointer`} width={64} height={62} alt="" />
      <div className="message d-flex flex-column justify-content-center overflow-x-hidden text-nowrap">
        <span className='text-light fw-bold'>{contact?.name}</span>
        <span className={`${style.textChat} ${classChat} fw-normal`}>{data?.lastMessage?.text || `Hello World!`}</span>
      </div>
    </div>
  )
}

export default CardContact