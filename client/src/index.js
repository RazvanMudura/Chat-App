import "./index.css"

import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "./layouts/App"

createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>)