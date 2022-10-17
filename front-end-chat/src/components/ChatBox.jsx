import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import './ChatBox.css'
import img from './abc.jpg'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const otherUserID = chat?.members?.find((id) => id !== currentUser)
    const scroll = useRef()
    useEffect(() => {
        const getUserData = async () => {

            try {
                const { data } = await axios.get(`http://localhost:5000/user/${otherUserID}`)
                setUserData(data)


            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData()

    }, [chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {

                const { data } = await axios.get(`http://localhost:5000/message/${chat._id}`)
                setMessages(data)

            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) fetchMessages()

    }, [chat])


    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderID: currentUser,
            text: newMessage,
            chatID: chat._id
        }
        //send message to db
        try {
            const { data } = await axios.post('http://localhost:5000/message', message)
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
        //send message to socket server
        const receiverID = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverID })

    }
    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatID === chat._id) {
            setMessages([...messages, receiveMessage]);
        }

    }, [receiveMessage])
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (<>
                    <div className="chat-header">
                        <div className="follower">
                            <div>

                                <img src={img} alt="" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                <div className='name'>
                                    <span >{userData?.username}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="chat-body">
                        {messages.map((message) => (
                            <>
                                <div ref={scroll} className={message.senderID === currentUser ? "message own" : "message"}>
                                    <span>{message.text}</span>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            </>
                        ))}
                    </div>
                    <div className="chat-sender">
                        <div>+</div>
                        <InputEmoji
                            value={newMessage}
                            onChange={handleChange}
                        />
                        <button className="send-button button" onClick={handleSend}>send</button>
                    </div>
                </>) : (<span className='chatbox-empty-message'>Tap on a chat to start a conversation</span>)}

            </div>
        </>
    )
}

export default ChatBox