import { useState, useLayoutEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"

import { Header } from "./header/Header"
import { Footer } from "./footer/Footer"

import { Main }     from "../pages/main/Main"
import { Chats }    from "../pages/chats/Chats"
import { Login }    from "../pages/login/Login"
import { Register } from "../pages/register/Register"
import { NotFound } from "../pages/not-found/NotFound"

import axiosRequest from "../api/axios"


export const App = () => {
  const location = useLocation()
  const [connectedUser, setConnectedUser] = useState(null)


  useLayoutEffect(() => {
    axiosRequest.get("/user")
      .then(({ data }) => setConnectedUser(data.user))
      .catch(error => console.log(error))
  }, [location.key])



  return (
    <>
      <Header connectedUser={connectedUser} setConnectedUser={setConnectedUser} />
      
      <main>
        <Routes>
          <Route path="/" element={<Main connectedUser={connectedUser} />} />
          <Route path="/chats"    element={connectedUser ? <Chats connectedUser={connectedUser} /> : <Navigate to="/login" replace={true} />} />
          <Route path="/login"    element={!connectedUser ? <Login    setConnectedUser={setConnectedUser} /> : <Navigate to="/chats" replace={true} />} />
          <Route path="/register" element={!connectedUser ? <Register setConnectedUser={setConnectedUser} /> : <Navigate to="/chats" replace={true} />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}