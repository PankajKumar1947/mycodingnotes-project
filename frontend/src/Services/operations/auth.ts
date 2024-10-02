import { apiConnector } from "../apiConnector"
import { AUTH_ENDPOINTS } from "../apis"
import toast from "react-hot-toast";
import { setIsLoggedIn, setLogin } from "../../slices/loginSlice";

const {
    VERIFY_TOKEN,
}=AUTH_ENDPOINTS


export const verifytoken =async()=>{
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        const response=await apiConnector("GET",VERIFY_TOKEN,{},headers as any,{})
        return response.data;
    }catch(error:any){
        console.log("error occured in verifying token");
        throw error
    }
}

export function logout(navigate:any,dispatch:any){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn")
    dispatch(setLogin({}));
    dispatch(setIsLoggedIn(false));
    toast.success("Logged Out");
    navigate("/login");
}