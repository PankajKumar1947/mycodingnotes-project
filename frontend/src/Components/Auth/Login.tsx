import { NavLink } from "react-router-dom"
import login from "../../assets/login.png"

export const Login=()=>{
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <div className="w-[80vw] h-[80vh] bg-black overflow-hidden border-[1px] rounded-lg grid grid-cols-2 items-center">
                <div className="flex flex-col justify-center items-center gap-4 p-6">
                    <h1 className="text-2xl font-bold">Welcome back Mr.</h1>
                    <img src={login} alt="mycodingnotes signup image" />
                </div>

                <form className="flex flex-col items-center p-2 gap-4 bg-gray-900 h-full justify-center ">
                    <h1 className="text-2xl font-bold">Login here</h1>
                    <div className="w-[80%]">
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" placeholder="username" name="username" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    
                    <div className="w-[80%]">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="text" placeholder="password" name="password" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    

                    <input type="submit" value={"Login"} className="bg-black p-2 rounded-full w-[80%] font-bold cursor-pointer hover:bg-gray-800" />
                    <p>
                        New to MyCodingNotes ? <NavLink to={"/signup"} className={"italic hover:underline text-blue-500"}>Create account here</NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}