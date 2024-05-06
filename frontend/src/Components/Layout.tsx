import { Outlet } from "react-router-dom"
import { Navbar } from "./Header/Navbar"
import { Footer } from "./Footer/Footer"

const Layout = () => {
  return (
    <div>
        
        <Outlet/>
        
    </div>
  )
}

export default Layout