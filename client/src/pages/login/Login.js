import "../auth-form.css"
import axiosRequest from "../../api/axios"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import validator from "validator"



export const Login = ({ setConnectedUser }) => {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  


  const handleLogin = async (event) => {
    event.preventDefault()

    const email = event.target.email.value.trim()
    const password = event.target.password.value.trim()


    if (email === "") {
      setError("Email must be completed!")
      return
    }

    if (password === "") {
      setError("Password must be completed!")
      return
    }


    if (!validator.isEmail(email)) {
      setError("Email is not valid!")
      return
    }



    try {
      const { data: user } = await axiosRequest.post("/login", { email, password })

      setConnectedUser(user)
      navigate("/chats")
      setError("")
    }
    catch(e) {
      setError("Invalid credentials!")
    }
  }

  


  return (
    <>
      <form onSubmit={handleLogin} className="auth-form">
        <h1 className="auth-title">Login</h1>

        <div className="input-wrapper">
          <label htmlFor="email" className="auth-label">Email</label>
          <input type="text" name="email" id="email" placeholder="Email" className="auth-input" />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password" className="auth-label">Password</label>
          <input type="password" name="password" id="password" placeholder="••••••••" className="auth-input" />
        </div>

        <h4 className="auth-error">{error}</h4>

        <button type="submit" className="auth-button">Sign In</button>
      </form> 
    </>
  )
}