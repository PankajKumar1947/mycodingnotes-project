import { NavLink, useNavigate } from "react-router-dom"
import signup from "../../assets/signup.png"
import { useForm ,SubmitHandler} from "react-hook-form"
import axios from "axios"
import toast from "react-hot-toast"
import { AUTH_ENDPOINTS } from "../../Services/apis"

interface SignupData{
    username:string,
    fullname:string,
    email:string,
    password:string,
}

export const Signup=()=>{
    const navigate=useNavigate();

    const {register,handleSubmit}=useForm<SignupData>()
    const onSubmit: SubmitHandler<SignupData> = async(data) => {
        const toastId=toast.loading("Creating Account ...");
        try{
            const response=await axios.post(AUTH_ENDPOINTS.SIGNUP_API,data);
            if(!response)
                throw new Error("Error in Signup");
            console.log(response);
            toast.success("Account creted ... ");
            toast.success("Please Login ... ");
            toast.remove(toastId);
            navigate("/profile")
        }catch(error){
            console.log("Error in Signup=",error);
            toast.error("Error")
            toast.remove(toastId);
            navigate("/signup")
        }  
    };
    
    return (
        <div className="flex justify-center items-center my-6">
            <div className="sm:w-[80vw] w-[95%] bg-black overflow-hidden border-[1px] rounded-lg grid sm:grid-cols-2 items-center">
                <div className="hidden sm:flex flex-col justify-center items-center gap-4 p-6">
                    <h1 className="text-2xl font-bold">Welcome to MyCodingNotes</h1>
                    <img src={signup} alt="mycodingnotes signup image" />
                </div>

                <form 
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center p-6 py-10  gap-4 bg-gray-900 h-full justify-center ">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <div className="sm:w-[80%] w-full">
                        <label htmlFor="username">Username</label>
                        <br />
                        <input type="text" 
                        {...register("username",{required:true,maxLength:15})}
                        placeholder="username" name="username"  className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    <div className="sm:w-[80%] w-full">
                        <label htmlFor="fullname">Fullname</label>
                        <br />
                        <input type="text" 
                        {...register("fullname",{required:true,maxLength:20})}
                        placeholder="fullname" name="fullname" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    <div className="sm:w-[80%] w-full">
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email"  
                        {...register("email",{required:true})}
                        placeholder="email" 
                        name="email"
                        className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>
                    <div className="sm:w-[80%] w-full">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="text" 
                        {...register("password", {required:true,minLength:5})}
                        placeholder="password" name="password" className="bg-gray-700 border-[1px] px-4 p-2 w-[100%]  rounded-md" />
                    </div>

                    <input type="submit" value={"Signup"} name="submit" className="bg-black p-2 rounded-full sm:w-[80%] w-full font-bold cursor-pointer hover:bg-gray-800" />
                    <p>
                        Already have an account ? <NavLink to={"/login"} className={"italic hover:underline text-blue-500"}> Login here</NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}