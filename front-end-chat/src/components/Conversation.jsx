import axios from 'axios'
import React, { useEffect, useState } from 'react'
import img from './abc.jpg'


const Conversation = ({ data, currentUserID, online }) => {
  //this is the user to whom we have to chat
  const [userData, setUserData] = useState(null)
  useEffect(() => {


    const otherUserID = data.members.find((id) => id !== currentUserID)

    const getUserData = async () => {

      try {
        const { data } = await axios.get(`http://localhost:5000/user/${otherUserID}`)
        setUserData(data)

      } catch (error) {
        console.log(error)
      }
    }
    getUserData()

  }, [])

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img src={img} alt="" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
          <div className='name'>
            <span >{userData?.username}</span>
            <span>{online ?"Online":"Offline" }</span>
          </div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Conversation