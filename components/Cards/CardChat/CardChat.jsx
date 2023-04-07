import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageApi, useDeleteMessageByIdMutation, useGetMessageByIdChatQuery, useUpdateMessageByIdMutation } from '../../../src/features/message/messageApi'
import { setCurrentChat } from '../../../src/features/message/messageSlice'
import style from './CardChat.module.css'

const CardChat = ({ data, user, scrollRef, index }) => {
  const dispatch = useDispatch()
  const { chatId, contactInfo, messages } = useSelector(state => state.message)
  const [updateMessage, setUpdateMessage] = useState("")
  const [deleteMessageById] = useDeleteMessageByIdMutation()
  const [updateMessageById] = useUpdateMessageByIdMutation()

  const updateHandler = async () => {
    await updateMessageById({
      id_room: chatId,
      id_message: data._id,
      text: updateMessage
    })
  }

  const keyUpHandler = (e) => {
    if(e.key == 'Enter'){
      updateHandler()
    }
  }

  const deleteHandler = async () => {
    await deleteMessageById({ id_room: chatId, id_message: data._id })
  }

  useEffect(() => {
    setUpdateMessage(data?.text)
  }, [data])
  
  return (
    data.senderId == user?._id ? (
      <div ref={scrollRef}
        className={`rowChat d-flex align-items-end gap-3 mb-3`}>

        <div className={`${style.chat} ${style.currentUser} bg-blue text-content d-flex gap-2 p-3 ext-wrap ms-auto `}>
          <span className={`text-light`}>{
            data?.is_deleted ?
              <span className='fst-italic' >Message has been deleted</span>
              :
              data?.text}</span>
          {!data?.is_deleted && (
            <div className={`dropdown`}>
              <FontAwesomeIcon id='operation' className='text-light' icon={faChevronDown} role="button" data-bs-toggle={`dropdown`} aria-expanded="false" />
              <ul className={`${style.dropDown} dropdown-menu bg-dark`}>
                <li onClick={deleteHandler}>
                  <div className="container text-light pointer">Delete Message</div></li>
                <li>
                  <div className="container text-light d-flex flex-column">
                    <span className='text-small mb-1'>Edit Message</span>
                    <input type="text" className='bg-transparent form-control text-light shadow-0 border-1 border-light' onChange={(e) => setUpdateMessage(e.target.value)} value={updateMessage} onKeyDown={(e) => keyUpHandler(e)} />
                  </div>
                </li>
              </ul>
            </div>
          )}

        </div>

        <img src={`${user?.photo ? user.photo : 'https://source.unsplash.com/random/64x64/?person'}`} className={`image-chat img-fluid pointer d-sm-block d-none`} alt="" />
      </div>
    ) : (
      <div ref={scrollRef}
        className={`rowChat d-flex align-items-end gap-3 mb-3`}>
        <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid 
        pointer d-sm-block d-none`} alt="" />

        <span className={`${style.chat} ${style.otherUser} bg-dark-secondary text-light p-3 text-wrap text-light`}>{
          data?.is_deleted ?
            <span className='fst-italic'>Message has been deleted</span>
            :
            data?.text}
        </span>

      </div>
    )

  )
}

export default CardChat