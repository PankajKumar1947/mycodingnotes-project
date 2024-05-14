import { NavLink, useNavigate } from "react-router-dom"
import login from "../../assets/login.png"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from "axios"
import { AUTH_ENDPOINTS } from "../../Services/apis"

interface loginData{
    username:string,
    password:string,
}

export const Login=()=>{
    const navigate=useNavigate();

    const {register,handleSubmit}=useForm<loginData>();
    const onSubmit: SubmitHandler<loginData> = async(data) => {
        try{
            const response=await axios.post(AUTH_ENDPOINTS.LOGIN_API,data);
            if(response.data && response.data.success){
                // Successful login
                //console.log(response)
                localStorage.setItem("token",JSON.stringify(response.data.token));
                toast.success("Logged in ... ");
                navigate("/profile")
            }else{ 
                toast.error(response.data.message)
            }
        }catch(error:any){
            //console.log("Error in Signup=",error);
            toast.error(error.response.data.message)
            navigate("/login")
        }  
    };

    return (
        <div className="flex justify-center items-center my-6">
            <div className="w-[80vw] h-[80vh] bg-black overflow-hidden border-[1px] rounded-lg grid grid-cols-2 items-center">
                <div className="flex flex-col justify-center items-center gap-4 p-6">
                    <h1 className="text-2xl font-bold">MyCodingNotes</h1>
                    <img src={login} alt="mycodingnotes signup image" />
                </div>

                <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center p-2 gap-4 bg-gray-900 h-full justify-center ">
                    <h1 className="text-2xl font-bold">Login here</h1>
                    <div className="w-[80%]">
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" placeholder="username"
                        {...register("username",{required:true})}
                        name="username" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    
                    <div className="w-[80%]">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="text" placeholder="password"
                        {...register("password",{required:true})}
                        name="password" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
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