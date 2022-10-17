import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Conversation from '../../components/Conversation'
import Home from './home.png'
import Noti from './noti.png'
import './Chat.css'
import ChatBox from '../../components/ChatBox'
import { io } from 'socket.io-client'

const Chat = () => {
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const user = localStorage.getItem('user')
    const userID = JSON.parse(user).id
    const socket = useRef()
    useEffect(() => {
        socket.current = io('http://localhost:8800')
        socket.current.emit('new-user-add', userID)
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users)
        })
    }, [userID])


    //send message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage])

    //receive message from socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {

            setReceiveMessage(data);
        }

        );
    }, []);

    useEffect(() => {
        const getChats = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/chat/${userID}`)
                setChats(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        return () => {
            getChats()
        }
    }, [userID])

    const checkOnlineStatus = (chat) => {
        const chatMembers = chat.members.find((member)=>member!==userID)
        const online = onlineUsers.find((user)=>user.userID === chatMembers)
        return online? true : false
     }
    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <h1>Logo</h1>
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserID={userID} online={checkOnlineStatus(chat)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="Right-side-chat">
                <div className="navIcons">
                    <Link to="../home">
                        <img src={Home} alt="" />
                    </Link>

                    <img src={Noti} alt="" />
                    <Link to="../chat">
                        <img src={Comment} alt="" />
                    </Link>
                </div>
                <ChatBox chat={currentChat} currentUser={userID} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
            </div>
        </div>
    )
}

export default Chat