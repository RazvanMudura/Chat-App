import "./Header.css"

import axiosRequest from "../../api/axios"
import { Link, useNavigate } from "react-router-dom"


export const Header = ({connectedUser, setConnectedUser}) => {
  const navigate = useNavigate()


  const logoutUser = async () => {
    await axiosRequest.get("/logout")
    setConnectedUser(null)
    navigate("/")
  }


  return (
    <header>
        <Link to="/" className="header-title">Chat App</Link>
            
        {
          connectedUser ?
          
          <button onClick={() => logoutUser()} className="signup-button header-button">Logout</button> :

          <div className="header-buttons">
            <Link to="/login"    className="login-button header-button">Log In</Link>
            <Link to="/register" className="signup-button header-button">Sign Up</Link>
          </div>
        }    

    </header>
  )
}