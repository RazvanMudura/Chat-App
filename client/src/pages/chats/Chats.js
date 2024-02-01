import "./Chats.css"

import moment from "moment"
import axiosRequest from "../../api/axios"
import { useState, useEffect, useRef } from "react"

import { Sidebar } from "../../components/sidebar/Sidebar"
import { Chat } from "../../components/chat/Chat"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faRightToBracket } from '@fortawesome/free-solid-svg-icons'

import { io } from "socket.io-client"



export const Chats = ({ connectedUser }) => {
  const [chats, setChats] = useState([])
  const [showMembers, setShowMembers] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)

  const socket = useRef()



  const leaveRoom = async () => {
      try {
        await axiosRequest.post("/leave-room", { room: chats[selectedRoom].name })
        setSelectedRoom(null)
        setChats(chats.filter((chat, index) => index !== selectedRoom))
      }
      catch(error) {
        console.log(error)
      }
    }



  const sendMessage = async (event) => {
    event.preventDefault()

    const message = event.target.message.value.trim()

    try {
      const { data: room } = await axiosRequest.post("/send-message", { text: message, name: chats[selectedRoom].name })
      const aux = chats
      aux[selectedRoom] = room

      
      setChats([...aux])
    }
    catch(error) {
      console.log(error)
    }

    event.target.message.value = ""
  }




  useEffect(() => {
    // socket.current = io("http://localhost:8800")
    // socket.current.emit()
  }, [connectedUser])



  useEffect(() => {
    axiosRequest.get("/rooms").then(({ data }) => setChats(data))
  }, [])


  return (
    <>
      <div className="chat-page">
        <Sidebar chats={chats} setChats={setChats} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />

        {
          selectedRoom !== null &&
          <div className="current-room">
            <div className="bg-gray-100 flex items-center justify-between p-3 shrink-0">
              <h1 className="text-2xl font-bold drop-shadow-md text-black">{chats[selectedRoom].name}</h1>
              <div className="flex items-center gap-2 overflow-visible">
                <button 
                  onClick={() => setShowMembers(!showMembers)}
                  className="shadow-xl w-[35px] h-[35px] flex justify-center items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 transition text-white"
                >
                  <FontAwesomeIcon icon={faUsers} />
                </button>

                <button 
                  onClick={leaveRoom}
                  className="shadow-xl w-[35px] h-[35px] flex justify-center items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 transition text-white"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                </button>
              </div>
            </div>

            <div className="flex overflow-hidden bg-gradient-to-r from-gray-50 to-white h-full">
              <div className="chat">
                <div className="messages">
                  {
                    chats[selectedRoom].messages.map(({text, author, date}, index) => 
                      <div className={`flex items-center justify-between gap-5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 p-2 px-4 ${author.username === connectedUser.username ? "ml-auto" : ""}`} key={index}>
                          <span className="text-white">{text}</span>
                          <span className="message-date">{moment(date).format("HH:mm")}</span>
                      </div>
                    )
                  }
                </div>

                <form className="mt-auto mb-3 gap-5 flex justify-between items-center overflow-visible" onSubmit={sendMessage}>
                  <input type="text" autoComplete="off" name="message" placeholder="Message" className="shadow-lg rounded-full pl-2 text-sm bg-gray-100 transition w-full px-5 py-2" />
                  <button type="submit" className="text-sm flex justify-center shadow-xl px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 transition text-white">Send</button>
                </form>
              </div>

              {
                showMembers &&
                <div className="members">
                  <h1 className="font-bold text-xl text-center my-3 ">Members</h1>
                  {
                    chats[selectedRoom].members.map(({username}, index) => 
                      <div className={`text-center drop-shadow-xl my-1 ${username === connectedUser.username ? "text-blue-400" : ""}`} key={index}>
                        {username}
                      </div>
                    )
                  }
                </div>
              }
            </div>

          </div>  
        }

        {
          selectedRoom === null &&
          <div className="current-room">
            <h1 className="text-3xl font-bold h-full text-center mt-20">No chats opened!</h1>
          </div>
        }
      </div>
    </>
  )
}