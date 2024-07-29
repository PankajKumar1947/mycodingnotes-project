import { apiConnector } from "../apiConnector"
import { AUTH_ENDPOINTS } from "../apis"

const {
    VERIFY_TOKEN,
}=AUTH_ENDPOINTS


export const verifytoken =async()=>{
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        const response=await apiConnector("GET",VERIFY_TOKEN,{},headers,{})
        return response.data;
    }catch(error){
        console.log("error occured in verifying token");
    }
}