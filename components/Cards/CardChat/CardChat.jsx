import React from 'react'
import { Link } from 'react-router-dom'
import style from './CardChat.module.css'

const CardChat = ({className, classChat, data}) => {
  return (
    <Link className={`${className} col-12 d-flex gap-3 mb-3 pointer text-decoration-none`}>
      <img src="https://source.unsplash.com/random/64x64/?person" className={`image-contact img-fluid  pointer`} width={64} height={62} alt="" />
      <div className="message d-flex flex-column justify-content-center overflow-x-hidden text-nowrap">
        <span className='text-light fw-bold'>Muhamad Ilham Darmawan</span>
        <span className={`${style.textChat} ${classChat} fw-normal`}>Lorem ipsum dolor sit amet</span>
      </div>
    </Link>
  )
}

export default CardChat