import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router-dom";
export const Footer = () => {
    return (
        <footer className="w-full py-4 mt-10 px-4 sm:px-10 bg-gradient-to-b from-transparent via-indigo-950 to-black">
            <NavLink to={"/"}  className="flex justify-center ">
                <h1 className="text-3xl sm:text-4xl font-bold">My Coding Notes</h1>
            </NavLink>
            <ul className="text-lg flex items-center justify-center flex-wrap gap-4 md:gap-12 transition-all duration-500 py-8 mb-10 border-b border-gray-200">
                <li><a href="#" className=" ">Home</a></li>
                <li><a href="#" className="  ">Services</a></li>
                <li><a href="#" className="  ">About</a></li>
                <li><a href="#" className="  ">Blogs</a></li>
                <li><a href="#" className="  ">Support</a></li>
            </ul>
            <div className="flex space-x-4 sm:space-x-10 justify-center items-center mb-3">
                <a href="#" className="block   transition-all duration-500  ">
                    <FaLinkedin className="text-3xl hover:text-indigo-600" />
                </a>
                <a href="#" className="block   transition-all duration-500  ">
                    <FaGithub className="text-3xl hover:text-indigo-600" />
                </a>
                <a href="#" className="block   transition-all duration-500  ">
                    <FaFacebook className="text-3xl hover:text-indigo-600" />
                </a>
                <a href="#" className="block   transition-all duration-500  ">
                    <FaYoutube className="text-3xl hover:text-indigo-600" />
                </a>
            </div>
            <div className="flex justify-center">
                <p>Develped by <span>Pankaj</span></p>
            </div>
            <span className="text-lg text-gray-500 text-center block mt-2">©<a href="https://pagedone.io/">mycodingnotes</a> 2024, All rights reserved.</span>
        </footer>
    )
}