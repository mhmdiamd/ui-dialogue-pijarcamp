import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { failedLoading, showLoading, successLoading } from '../../../src/common/loadingHandler'
import { useCreateUserChatMutation } from '../../../src/features/user/userApi'

const CardSearchContact = ({ data }) => {
  const [createUserChat, { isLoading, isSuccess, isError }] = useCreateUserChatMutation()

  const addContactHandler = async (e) => {
    Swal.fire({
      title: `Want to add ${data?.name} in your cotact?`,
      showDenyButton: true,
      confirmButtonText: 'Save',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await createUserChat({ contactId: data?._id })
      }
    })
  }

  useEffect(() => {
    if(isSuccess) successLoading('Contact success added!')
    if(isLoading) showLoading('Please Wait ...')
    if(isError) failedLoading('Failed add Contact!')
  }, [isLoading, isSuccess, isError])

  return (
    <div className="cardNewContact pointer d-flex gap-3 w-100 bg-dark-secondary my-2 p-2 rounded" onClick={addContactHandler}>
      <img src={`https://source.unsplash.com/random/64x64/?person`} className={`image-contact img-fluid  pointer`} width={64} height={62} alt="" />
      <div className="message d-flex flex-column justify-content-center overflow-x-hidden text-nowrap">
        <span className='text-light fw-semibold fs-5'>{data?.name}</span>
        <span className='text-secondary'>{data?.email}</span>
      </div>
    </div>
  )
}

export default CardSearchContact