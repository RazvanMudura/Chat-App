import "./Sidebar.css"

import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'

import axiosRequest from "../../api/axios"
import moment from "moment"



export const Sidebar = ({ chats, setChats, selectedRoom, setSelectedRoom }) => {
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const [addToggle, setAddToggle] = useState(false)
    const [joinToggle, setJoinToggle] = useState(false)


    const toggleAdd = () => {
        setAddToggle(() => !addToggle)
        setJoinToggle(false)
        setError("")
    }
    
    const toggleJoin = () => {
        setAddToggle(false)
        setJoinToggle(() => !joinToggle)
        setError("")
    }

    
  const createRoom = async (event) => {
    event.preventDefault()

    const name = event.target.input.value.trim()

    if (name.length < 4) {
        setError("The minimum length for a name is 4 characters!")
        return
    }


    try {
      const { data: room } = await axiosRequest.post("/room", { name })

      setAddToggle(false)
      setChats([...chats, room])
      setError("")
    }
    catch(error) {
      setError("Room already exists!")
    }


  }


  const joinRoom = async (event) => {
    event.preventDefault()

    const name = event.target.input.value.trim()

    if (name.length < 4) {
        setError("The minimum length for a name is 4 characters!")
        return
    }

    
    try {
      const room = await axiosRequest.post("/join-room", { name })

      setJoinToggle(false)
      setChats([...chats, room])
      setError("")
    }
    catch(error) {
      setError("Room doesn't exist!")
    }

  }




  return (
    <div className="sidebar">
        <div className="flex justify-between items-center flex-wrap w-full overflow-visible">
            <h1 className="text-3xl font-bold p-2 drop-shadow-md">Chats</h1>

            <div className="flex items-center gap-2 overflow-visible">
                <button 
                    onClick={toggleAdd}
                    className="shadow-xl w-[35px] h-[35px] flex justify-center items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 transition text-white"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>

                <button 
                    onClick={toggleJoin}
                    className="shadow-xl w-[35px] h-[35px] flex justify-center items-center rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 transition text-white"
                >
                    <FontAwesomeIcon icon={faUserPlus} className="text-sm" />
                </button>
            </div>
        </div>

    {
        addToggle &&
        <>
            <form onSubmit={createRoom} className="flex justify-between gap-3 w-full overflow-visible mt-2">
                <input type="text" name="input" placeholder="Create room" className="shadow-xl bg-white rounded-xl pl-2 text-sm hover:bg-gray-100 transition" />
                <button 
                    type="submit"
                    className="text-sm flex justify-center shadow-xl px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 transition text-white"
                >Add</button>
            </form>
            <span className="text-center text-red-500 font-bold mt-2 text-sm">{error}</span>
        </>
    }
    {
        joinToggle &&
        <>
            <form onSubmit={joinRoom} className="flex justify-between gap-3 w-full overflow-visible mt-2">
                <input type="text" name="input" placeholder="Join room" className="shadow-lg bg-white rounded-xl pl-2 text-sm hover:bg-gray-100 transition" />
                <button 
                    type="submit" 
                    className="text-sm flex justify-center shadow-xl px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300 transition text-white"
                >Join</button>
            </form>
            <span className="text-center text-red-500 font-bold mt-2 text-sm">{error}</span>
        </>
    }




    <div className="relative w-full overflow-visible">
        <FontAwesomeIcon icon={faSearch} color="grey" className="absolute top-[28px] left-3" />
        <input type="text" placeholder="Search" name="search" className="search-input" onChange={e => setSearch(e.target.value)} />
    </div>



    <div className="chats">
        {
            chats.length === 0 ?
            
            <>
                <h2 className="font-bold text-center mt-10 text-xl">No rooms joined!</h2> 
                <span className="text-center">Create or join a room!</span>
            </> : 
            
            chats
                .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                .map(({name, messages}, index) => 
                    <button 
                        key={index} 
                        className={`room p-2 px-4 ${index === selectedRoom ? '!text-white !bg-gradient-to-r from-blue-400 to-blue-500' : ''}`} 
                        onClick={() => setSelectedRoom(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="drop-shadow-md">{name}</h2>
                            <span className={`text-sm ${index === selectedRoom ? 'text-black' : 'text-gray-400'}`}>
                                {messages.length === 0 ? "" : moment(messages[messages.length - 1].date).format("HH:mm")}
                            </span>
                        </div>
                        
                        <p className={`text-xs text-left ${index === selectedRoom ? 'text-black' : 'text-gray-400'}`}>
                            {messages.length === 0 ? "No messages sent!" : messages[messages.length - 1].text}
                        </p>
                    </button>
                )
        }
    </div>
  </div>

  )
}