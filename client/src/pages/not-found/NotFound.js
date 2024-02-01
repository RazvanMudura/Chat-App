import { Link } from "react-router-dom"


export const NotFound = () => {
  return (
    <>
      <h1 className="mt-10 text-4xl font-bold overflow-hidden">404 Not Found!</h1>
      <Link to="/" className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md px-3 py-1 mt-4 hover:from-blue-400 hover:to-blue-300 transition">Back Home</Link>
    </>
  )
}