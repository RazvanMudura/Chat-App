const express = require("express")
const router = express.Router()


const auth = require("../middleware/auth")
const {
    loginUser,
    logoutUser,
    registerUser,
    getUser,
    getUsername
} = require("../controllers/UserController")


router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/logout", auth, logoutUser)
router.get("/user", auth, getUser)
router.post("/username", getUsername)



module.exports = router