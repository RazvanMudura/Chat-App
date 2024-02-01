import "../auth-form.css"
import axiosRequest from "../../api/axios"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import validator from "validator"




export const Register = ({ setConnectedUser }) => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)  

  const handleRegister = async (event) => {
    event.preventDefault()

    const username = event.target.username.value.trim()
    const email = event.target.email.value.trim()
    const password = event.target.password.value.trim()
    const confirmPassword = event.target.confirm_password.value.trim()


    if (username === "") {
      setError("Username must be completed!")
      return
    }

    if (email === "") {
      setError("Email must be completed!")
      return
    }

    if (password === "") {
      setError("Password must be completed!")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords are different!")
      return
    }


    if (!validator.isEmail(email)) {
      setError("Email is not valid!")
      return
    }

    if (username.length < 6) {
      setError("Username too short!")
      return
    }

    if (username.length > 15) {
      setError("Username too long!")
      return
    }



    try {
      const { data: user } = await axiosRequest.post("/register", { username, email, password })

      setConnectedUser(user)
      navigate("/chats")
      setError("")
    }
    catch(error) {
      console.log(error)
      if (error.response.data.keyValue === undefined) {
        setError("There was an error registering!")
        return
      }

      const errorMessage = capitalizeFirstLetter(Object.keys(error.response.data.keyValue)[0]) + " already in use!"
      setError(errorMessage)
    }
  }

  


  return (
    <>
      <form onSubmit={handleRegister} className="auth-form">
        <h1 className="auth-title">Register</h1>

        <div className="input-wrapper">
          <label htmlFor="username" className="auth-label">Username</label>
          <input type="text" name="username" id="username" placeholder="Username" className="auth-input" />
        </div>

        <div className="input-wrapper">
          <label htmlFor="email" className="auth-label">Email</label>
          <input type="text" name="email" id="email" placeholder="Email" className="auth-input" />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="auth-label">Password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" className="auth-input" />
        </div>

        <div className="input-wrapper">
          <label htmlFor="confirm_password" className="auth-label">Confirm Password</label>
          <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" className="auth-input" />
        </div>

        <h4 className="auth-error">{error}</h4>

        <button type="submit" className="auth-button">Sign Up</button>
      </form> 
    </>
  )
}