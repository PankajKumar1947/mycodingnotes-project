import { NavLink, useNavigate } from "react-router-dom"
import login from "../../assets/login.png"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import axios from "axios"
import { AUTH_ENDPOINTS } from "../../Services/apis"
import { useDispatch } from "react-redux"
import { setIsLoggedIn } from "../../slices/loginSlice"
import { verifytoken } from "../../Services/operations/auth"

interface loginData{
    username:string,
    password:string,
}

export const Login=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const {register,handleSubmit}=useForm<loginData>();
    const onSubmit: SubmitHandler<loginData> = async(data) => {
        const toastId = toast.loading("Logging in ...");
        try{
            const response=await axios.post(AUTH_ENDPOINTS.LOGIN_API,data);
            if(response.data && response.data.success){
                dispatch(setIsLoggedIn(true))
                // Successful login
                //console.log(response)
                localStorage.setItem("token",JSON.stringify(response.data.token));
                const verifytokenResponse = await verifytoken();
                localStorage.setItem('isLoggedIn', JSON.stringify(verifytokenResponse.data));
                toast.success("Logged in ... ");
                toast.remove(toastId);
                navigate("/profile")
            }else{ 
                toast.error(response.data.message)
                toast.remove(toastId);
            }
        }catch(error:any){
            //console.log("Error in Signup=",error);
            toast.error(error.response.data.message)
            toast.remove(toastId);
            navigate("/login")
        }  
    };

    return (
        <div className="flex justify-center items-center my-6">
            <div className="sm:w-[80vw] w-[95%] bg-black overflow-hidden border-[1px] rounded-lg grid sm:grid-cols-2 items-center">
                <div className="hidden sm:flex flex-col justify-center items-center gap-4 p-6">
                    <h1 className="text-2xl font-bold">MyCodingNotes</h1>
                    <img src={login} alt="mycodingnotes signup image" />
                </div>

                <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center p-6 py-10  gap-4 bg-gray-900 h-full justify-center ">
                    <h1 className="text-2xl font-bold">Login here</h1>
                    <div className="sm:w-[80%] w-full">
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" placeholder="username"
                        {...register("username",{required:true})}
                        name="username" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    
                    <div className="sm:w-[80%] w-full">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="text" placeholder="password"
                        {...register("password",{required:true})}
                        name="password" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    

                    <input type="submit" value={"Login"} className="bg-black p-2 rounded-full sm:w-[80%] w-full font-bold cursor-pointer hover:bg-gray-800" />
                    <p>
                        New to MyCodingNotes ? <NavLink to={"/signup"} className={"italic hover:underline text-blue-500"}>Create account here</NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}