const express = require("express")
const router = express.Router()


const auth = require("../middleware/auth")
const {
    getUserRooms,
    createRoom,
    joinRoom,
    sendMessage,
    leaveRoom
} = require("../controllers/RoomController")


router.get("/rooms", auth, getUserRooms)
router.post("/room", auth, createRoom)
router.post("/join-room", auth, joinRoom)
router.post("/send-message", auth, sendMessage)
router.post("/leave-room", auth, leaveRoom)


module.exports = router