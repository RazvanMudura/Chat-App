const cookieParser = require("cookie-parser")
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")


const connectDatabase = require("./database/db")
const UserRouter = require("./routers/UserRouter")
const RoomRouter = require("./routers/RoomRouter")


dotenv.config()
connectDatabase()


const app = express()
const PORT = process.env.PORT || 8080



app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(cookieParser())
app.use(express.json())


app.use(UserRouter)
app.use(RoomRouter)



app.all("*", (request, response) => response.status(404).send({ error: "Route not found!" }))

app.listen(PORT)