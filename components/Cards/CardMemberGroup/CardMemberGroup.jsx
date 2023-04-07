import React from 'react'

const CardMemberGroup = ({ data, onclick, i }) => {
  return (
    <div className="cardNewContact pointer d-flex gap-3 w-100 bg-dark-secondary my-2 p-2 rounded" onClick={() => onclick({name: data?.name, id: data?._id})}>
      <img src={`https://source.unsplash.com/random/64x6${4 + i}/?man`} className={`image-contact img-fluid  pointer`} width={64} height={62} alt="" />
      <div className="message d-flex flex-column justify-content-center overflow-x-hidden text-nowrap">
        <span className='text-light fw-semibold fs-5'>{data?.name}</span>
        <span className='text-secondary'>{data?.email}</span>
      </div>
    </div>
  )
}

export default CardMemberGroup