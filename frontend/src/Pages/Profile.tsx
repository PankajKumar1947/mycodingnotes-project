import { NavLink, useNavigate } from "react-router-dom"
import { Card } from "../Components/Card/Card"
import { useEffect, useState } from "react"
import axios from "axios";
import { AUTH_ENDPOINTS } from "../Services/apis";
import { logout } from "../Services/operations/logout";

const Profile = () => {
  const [user,setUser]=useState({});
  const navigate=useNavigate();

  const getUser=async(token:string)=>{
    try{
      const response=await axios.get(AUTH_ENDPOINTS.USER_INFO_API,{
        headers: {
        'Authorization': `${token}`
      }})
      setUser(response?.data);
    }catch(error){
      console.log("Error in getting user info")
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null;
    getUser(token);
  },[])

  useEffect(()=>{
    console.log("User",user)
  },[user])

  return (
    <div className="sm:w-[80vw] mx-auto">
      <div className="flex items-center justify-between sm:w-[60vw] mx-auto  p-4">
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div>
              <h1 className="text-xl sm:text-3xl font-bold">{user?.data?.fullname}</h1>
              <p className="text-gray-400">{user?.data?.username}</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <button className="px-4 bg-yellow-500 py-1 rounded-full">Edit</button>
            <button 
            onClick={()=>logout(navigate)}
            className="px-4 bg-red-500 py-1 rounded-full">Logout</button>
          </div>
          
      </div>

      <NavLink to={"/createpost"} className="mt-6 rounded-lg border-[1px] h-[50px] flex justify-center items-center bg-black hover:bg-gray-800">
        <p>Create a new notes</p>
      </NavLink>

      <div className="my-2 text-xl sm:text-2xl font-bold flex justify-between items-center">
        <h2>My Notes</h2>
        <h2 className="text-sm ">Total Notes : 12</h2>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-2">
        <Card/>
        <Card/>
      </div>

      <div className="my-2 text-xl sm:text-2xl font-bold flex justify-between items-center">
        <h2>Saved notes</h2>
        <h2 className="text-sm ">Total Notes : 12</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <Card/>
        <Card/>
      </div>
    </div>
  )
}

export default Profile