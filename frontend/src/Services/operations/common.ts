import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { COMMON_ENDPOINTS } from "../apis";

const {
    CREATE_NEWSLETTER,
    CREATE_REVIEW
} = COMMON_ENDPOINTS

export const createNewsLetter=async(data:any)=>{
    try{
        const response=await apiConnector("POST",CREATE_NEWSLETTER,{email:data},{} as any,{} as any);
        return response.data;
    }catch(error:any){
        console.log("error occured in sending newsletter",error);   
        return error?.response
    }
}

export const createReview=async(data:any)=>{
    const toastId = toast.loading("Submitting Your Review ...");
    try{
        const response=await apiConnector("POST",CREATE_REVIEW,data,{} as any,{} as any);
        toast.success("Thank you for your review !");
        toast.remove(toastId);
        return response.data;
    }catch(error:any){
        console.log("error occured in sending newsletter",error);   
        toast.error("Something went wrong !");
        toast.remove(toastId);
        return error?.response
    }
}