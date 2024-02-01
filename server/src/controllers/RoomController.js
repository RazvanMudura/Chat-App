const RoomModel = require("../models/RoomModel")


const getUserRooms = async (request, response) => {
    const userId = request.user._id.toString()

    try {
        const rooms = await RoomModel.find({ "members._id": userId })
        return response.json(rooms)
    }
    catch (error) {
        return response.status(500).json(error)
    }
}


const joinRoom = async (request, response) => {
    const userId = request.user._id
    const name = request.body.name

    try {
        const room = await RoomModel.findOne({ name })
        const members = room.members

        let isUnique = true
        for (let i = 0; i < members.length; i++) {
            if (members[i]._id === userId) {
                isUnique = false
                break
            }
        }

        if (isUnique) {
            room.members.push({ _id: userId, username: request.user.username })
            await room.save()
        }

        return response.json(room)
    }
    catch(error) {
        console.log(error)
        return response.status(400).json(error)
    }

}


const leaveRoom = async (request, response) => {
    const room = request.body.room
    const username = request.user.username

    try {
        const selectedRoom = await RoomModel.findOne({ name: room })
        
        for (let i = 0; i < selectedRoom.members.length; i++) {
            if (selectedRoom.members[i].username === username) {
                selectedRoom.members.splice(i, 1)
            }
        }

        await selectedRoom.save()
        return response.json(selectedRoom)
    }
    catch(error) {
        return response.status(400).json(error)
    }
}


const createRoom = async (request, response) => {
    const messages = []
    const members = [{
        _id: request.user._id,
        username: request.user.username
    }]
    const name = request.body.name

    const room = new RoomModel({ name, members, messages })

    try {
        await room.save()
        return response.status(201).json(room)
    }
    catch (error) {
        return response.status(400).json(error)
    }
}



const sendMessage = async (request, response) => {
    const id = request.user._id
    const username = request.user.username
    const roomName = request.body.name
    const text = request.body.text


    try {
        const room = await RoomModel.findOne({ name: roomName })
        room.messages.push({ author: { id, username }, text })
        
        await room.save()
        
        return response.send(room)
    }
    catch (error) {
        return response.status(500).send(error)
    }
}


module.exports = {
    getUserRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    sendMessage
}