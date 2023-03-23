import React from 'react'
import style from './CardChat.module.css'

const CardChat = ({data, user, scrollRef}) => {
  return (
    data.senderId == user?._id ? (
      <div ref={scrollRef}
      className={`rowChat d-flex align-items-end gap-3 mb-3`}>
        <span className={`${style.chat} ${style.currentUser} bg-blue ms-auto text-light p-3 text-wrap`}>{data?.text}</span>
        <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid pointer d-sm-block d-none`} alt="" />
      </div>
    ) : (
    <div ref={scrollRef}
      className={`rowChat d-flex align-items-end gap-3 mb-3`}>
        <img src="https://source.unsplash.com/random/64x64/?person" className={`image-chat img-fluid 
        pointer d-sm-block d-none`} alt="" />
        <span className={`${style.chat} ${style.otherUser} bg-dark-secondary text-light p-3 text-wrap`}>{data?.text}</span>
      </div>
    )
   
  )
}

export default CardChat