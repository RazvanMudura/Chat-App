const UserModel = require("../models/UserModel")


const loginUser = async (request, response) => {
    const email = request.body.email
    const password = request.body.password

    try {
        const user = await UserModel.findByCredentials(email, password)
        const token = await user.generateAuthToken()

        response.cookie("chat_token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        return response.json(user)
    }
    catch(error) {
        return response.status(400).json(error)
    }
}


const registerUser = async (request, response) => {
    const user = new UserModel(request.body)

    try {
        const token = await user.generateAuthToken()
        await user.save()

        response.cookie("chat_token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        return response.status(201).json(user)
    }
    catch(error) {
        return response.status(400).json(error)
    }
}



const logoutUser = async (request, response) => {
    response.clearCookie("chat_token")

    try {
        request.user.tokens = request.user.tokens.filter(token => token.token !== request.token)
        await request.user.save()
    }
    catch(error) {
        return response.status(400).json(error)
    }

    return response.send()
}





const getUser = (request, response) => {
    return response.send({ user: request.user })
}


const getUsername = async (request, response) => {
    const id = request.body.id
    const user = await UserModel.findOne({ _id: id })

    return response.send(user.username)
}






module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    getUser,
    getUsername
}