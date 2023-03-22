import { faCamera, faFaceSmile, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { io } from 'socket.io-client'
import style from './InputSendMessage.module.css'

const InputSendMessage = ({onclick}) => {
  const [message, setMessage] = useState("")
  const sendHandler = (e) => {
    onclick(message)
    setMessage("")
  }

  const keyUpHandler = (e) => {
    if(e.key == 'Enter'){
      sendHandler(e)
    }
  }

  return (
    <div className={`${style.inputSendMessage} row w-100`}>
      <div className="col-12 d-flex align-items-center pt-1 bg-dark pe-4 gap-2">
        <div className="inputMessage w-100 position-relative d-flex align-items-center py-2">
          <input 
            type="text" 
            className='form-control bg-transparent posiiton-absolute text-light shadow-none' 
            placeholder='Text here...' 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={keyUpHandler}
          />
          <div className={`${style.messageOption} position-absolute d-flex ms-auto align-item-center gap-3`}>
            <FontAwesomeIcon className='text-light fs-5 pointer' icon={faPlus} />
            <FontAwesomeIcon className='text-light fs-5 pointer' icon={faFaceSmile} />
            <FontAwesomeIcon className='text-light fs-5 pointer' icon={faCamera} />
          </div>
        </div>
        <button className='btn bg-blue text-light' onClick={sendHandler}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  )
}

export default InputSendMessage