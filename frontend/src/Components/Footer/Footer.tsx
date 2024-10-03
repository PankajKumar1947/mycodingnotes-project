import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
export const Footer = () => {
    return (
        <footer className="w-full py-4 mt-10 px-4 sm:px-10 bg-gradient-to-b from-transparent via-indigo-950 to-black">
            <NavLink to={"/"}  className="flex justify-center ">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text py-1">My Coding Notes</h1>
            </NavLink>
            <ul className="sm:text-lg flex items-center justify-center flex-wrap gap-4 md:gap-12 transition-all duration-500 py-8 mb-10 border-b border-gray-200">
                <li><Link to={"/"} className=" ">Home</Link></li>
                <li><a href="#" className="  ">Services</a></li>
                <li><Link to={"/about"} className="  ">About</Link></li>
                <li><Link to={"/notes"} className="  ">Blogs</Link></li>
                <li><a href="mailto:pankaj.ky3007@gmail.com" className="  ">Support</a></li>
            </ul>
            <div className="flex space-x-4 sm:space-x-10 justify-center items-center mb-3">
                <a href="https://www.linkedin.com/in/pankaj-kumar-5bbb44268/" className="block transition-all duration-500  ">
                    <FaLinkedin className="text-3xl hover:text-indigo-600" />
                </a>
                <a href="https://github.com/PankajKumar1947" className="block transition-all duration-500  ">
                    <FaGithub className="text-3xl hover:text-indigo-600" />
                </a>
                <a href="https://www.linkedin.com/in/pankaj-kumar-5bbb44268/" className="block transition-all duration-500  ">
                    <FaFacebook className="text-3xl hover:text-indigo-600" />
                </a>
                <a href="#" className="block transition-all duration-500  ">
                    <FaYoutube className="text-3xl hover:text-indigo-600" />
                </a>
            </div>
            <div className="flex justify-center">    
                <a href="https://github.com/PankajKumar1947" target="_blank" className="">Develped by <span  className="text-indigo-300 group-hover:text-indigo-400">Pankaj</span></a>
            </div>
            <span className="text-lg text-gray-500 text-center block mt-2">© mycodingnotes 2024, All rights reserved.</span>
        </footer>
    )
}