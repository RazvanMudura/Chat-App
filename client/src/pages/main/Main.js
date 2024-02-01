import { Link } from "react-router-dom"


export const Main = ({ connectedUser }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to the Chat App!</h1>

      {
        !connectedUser ?

        <div>
          <h2 className="text-lg">Sign in to get started!</h2>
          <Link to="/login" className="header-button home-link">Sign In</Link>
        </div> :

        <div>
          <h2 className="text-lg">Go to the chatting page</h2>
          <Link to="/chats" className="header-button home-link">Chats</Link>
        </div>
      }
    </>
  )
}