import { faBullhorn, faClose, faLock, faMagnifyingGlass, faPlus, faRightFromBracket, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react'
import CardContact from '../Cards/CardContact/CardContact'
import burgerBar from '../../src/assets/home/menu.svg'
import { useGetUserChatQuery } from '../../src/features/userChat/userChatApi'
import style from './Sidebar.module.css'
import CardSearchContact from '../Cards/CardSeachContact/CardSeachContact'
import { useGetAllUserQuery } from '../../src/features/user/userApi'
import { useDispatch, useSelector } from 'react-redux'
import CardMemberGroup from '../Cards/CardMemberGroup/CardMemberGroup'
import { useCreateGroupMutation, useGetGroupUserQuery } from '../../src/features/group/groupApi'
import { showLoading, successLoading } from '../../src/common/loadingHandler'
import CardContactGroup from '../Cards/CardContactGroup/CardContactGroup'
import { logout } from '../../src/app/reducer/authSlice'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [status, setStatus] = useState('all')
  const [showBtn, setShowBtn] = useState(false)
  const [searchContact, setSearchContact] = useState("")
  const [groupMember, setGroupMember] = useState([])
  const [groupName, setGroupName] = useState("")
  const { data: dataSearchUser, isLoading: isLoadingDataSearchUser } = useGetAllUserQuery({ name: searchContact }, { skip: searchContact ? false : true })
  const { data: groups } = useGetGroupUserQuery()
  const { data: chats, isLoading, isSuccess } = useGetUserChatQuery()
  const [createGroup, { isLoading: isLoadingCreateGroup, isSuccess: isSuccessCreateGroup, isError: isErrorCreateGroup }] = useCreateGroupMutation()
  const { user } = useSelector(state => state.auth)

  const changeHandler = (e) => {

  }

  const changeStatus = (value) => {
    setStatus(value)
  }

  const createGroupHandler = async (e) => {
    await createGroup({
      name: groupName,
      members: groupMember
    })
  }

  const addMemberToState = (data) => {
    if (!groupMember.some(member => member._id == data.contactId)) {
      setGroupMember(prev => {
        return [
          ...prev,
          { name: data.name, _id: data.contactId, photo: data?.photo }
        ]
      })
    }
  }

  const logoutHandler = async () => {
    dispatch(logout())
    return navigate('/login')
  }

  const deleteMemberGroupHandler = (id) => {
    console.log(id)
    setGroupMember(groupMember?.filter(member => member._id != id))
  }

  useEffect(() => {
    if (isLoadingCreateGroup) showLoading('Please Wait...')
    if (isSuccessCreateGroup) {
      successLoading('Please Wait...')
      setGroupMember([])
      setGroupName("")
    }
    if (isErrorCreateGroup) Swal.close()

  }, [isSuccessCreateGroup, isLoadingCreateGroup, isErrorCreateGroup])
  return (
    <>
      <div className={`${className} col-12 overflow-hidden col-sm-5 col-md-4 col-lg-3 h-100 chat-list h-100 pt-3 bg-dark ps-3 ps-sm-4 pe-4 pe-md-3 border-0 border-1 border-end border-secondary`}>
        <div className="row h-100">
          <div className="col-12 w-100 d-flex justify-content-between align-items-center mb-3 mb-sm-4">

            {showBtn ? (
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn bg-blue text-light rounded-start-pill ps-4">
                  <FontAwesomeIcon icon={faUserPlus} data-bs-toggle="modal" data-bs-target="#staticBackdrop" />
                </button>
                <button type="button" className="btn bg-blue text-light">
                  <FontAwesomeIcon icon={faUsers} data-bs-toggle="modal" data-bs-target="#staticBackdrop1" />
                </button>
                <button type="button" className="btn bg-blue text-light">
                  <FontAwesomeIcon icon={faLock} />
                </button>
                <button type="button" className="btn bg-blue text-light rounded-end-pill pe-4">
                  <FontAwesomeIcon icon={faRightFromBracket} onClick={logoutHandler}/>
                </button>
              </div>
            ) : (
              <span className='fs-3 fw-bold text-light'>Dialogue</span>
            )}

            <div className="listIcon d-flex gap-3">
              <FontAwesomeIcon className='fs-5 text-blue d-block d-sm-none' icon={faPlus} />
              <FontAwesomeIcon className='fs-5 text-blue d-block d-sm-none' icon={faMagnifyingGlass} />
              <img src={burgerBar} className='img-fluid pointer' onClick={() => setShowBtn(prev => !prev)} alt="" />
            </div>
          </div>

          <div className="col-12 d-none  pt-3 pt-sm-2 d-sm-flex align-items-center gap-2 mb-3">
            <div className="inputGroup position-relative d-flex w-100 align-items-center">
              <input type="text" className='form-control bg-dark-secondary border-0 shadow-none text-light ps-5' name='search' onChange={changeHandler} />
              <FontAwesomeIcon className={`${style.searchIcon} text-secondary position-absolute fs-5`} icon={faMagnifyingGlass} />
            </div>
            <FontAwesomeIcon className='btn text-secondary fs-5' icon={faPlus} />
          </div>
          <div className="col-12 py-0 mb-3 pb-0">
            <div className="listBtn d-flex gap-2">
              <button
                className={`btn ${status == 'all' ? 'bg-blue' : ''} text-light w-100 rounded-pill`}
                onClick={() => changeStatus('all')}
              >All</button>

              <button
                className={`btn ${status == 'group' ? 'bg-blue' : ''} text-light px-4 rounded-pill w-100`} onClick={() => changeStatus('group')}
              >Group</button>

              <button
                className={`btn ${status == 'unread' ? 'bg-blue' : ''} text-light w-100 rounded-pill`}
                onClick={() => changeStatus('unread')}
              >Unread</button>
            </div>
          </div>
          <div className={`col-12 ${style.contactContent} pe-0 pb-2`}>
            <div className={`${style.chatListContact} h-100 pb-5 pb-sm-1 pe-3 overflow-y-scroll`}>
              {status == "group" ?
                groups?.map((group, i) => (
                  <CardContactGroup key={i} data={group} classChat={`text-secondary`} />
                ))
                :
                chats?.map((chat, i) => (
                  <CardContact key={i} data={chat} classChat={`text-secondary `} />
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className={`modal-dialog ${searchContact && 'modal-dialog-scrollable'} ${style.modalAddContact} bg-dark rounded`}>
            <div className={`modal-content bg-transparent border-0  pb-2`}>
              <div className="modal-header">
                <h1 className="modal-title fs-5 text-light" id="staticBackdropLabel">Add New Contact</h1>
                <FontAwesomeIcon icon={faClose} className={'text-light fs-4 pointer'} data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className={`modal-body ${style.bodyModalSearchContact} `}>
                <div className="inputGroup position-relative d-flex w-100 align-items-center mb-3">

                  <input
                    type="text"
                    className='form-control bg-dark-secondary border-0 shadow-none text-light ps-5' name='searchContact'
                    placeholder='contact@gmail.com'
                    value={searchContact}
                    onChange={(e) => setSearchContact(e.target.value)} />
                  <FontAwesomeIcon className={`${style.searchIcon} text-secondary position-absolute fs-5`} icon={faMagnifyingGlass} />

                </div>
                <div className="row">
                  <div className="col-12 d-flex flex-column">
                    {searchContact && dataSearchUser?.map((userSearch, i) => (
                      <CardSearchContact key={i} data={userSearch} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className={`modal-dialog ${searchContact && 'modal-dialog-scrollable'} ${style.modalAddContact} bg-dark rounded`}>
          <div className={`modal-content bg-transparent border-0 pb-2`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-light" id="staticBackdropLabel">Create Group</h1>
              <FontAwesomeIcon icon={faClose} className={'text-light fs-4 pointer'} data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className={`modal-body ${style.bodyModalSearchContact} `}>\
              <label htmlFor="" className='text-light mb-2'>Group Name</label>
              <div className="inputGroup position-relative d-flex flex-colum w-100 align-items-center">
                <input
                  type="text"
                  className='form-control bg-dark-secondary border-0 shadow-none text-light ' name='searchContact'
                  placeholder='Group Name'
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)} />

              </div>
              <div className="row">
                <div className="col-12 min-h-25">
                  {groupMember.length != 0 && (
                    <div className="content p-2 gap-1 rounded bg-dark-secondary w-100 h-100 d-flex flex-wrap mt-2">
                      {groupMember?.map((member, i) => (
                        <div key={i} className={`${style.labelMember} rounded p-1 px-2 bg-dark-trinary d-flex gap-2 align-items-center`}>
                          <span className='text-light'>{member?.name}</span>
                          <FontAwesomeIcon className='text-light' icon={faClose} onClick={() => deleteMemberGroupHandler(member._id)} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="col-12 d-flex flex-column">
                  <div className="colCreate d-flex justify-content-between mt-3 mb-2 align-items-center">
                    <span className='text-light fs-5 fw-semibold'>Select Contact</span>
                    <button className='btn bg-blue text-light py-1' onClick={createGroupHandler}>Create Group</button>
                  </div>
                  {user?.contacts?.map((chat, i) => (
                    <CardMemberGroup key={i} data={chat} onclick={() => addMemberToState(chat)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar