import toast from "react-hot-toast";
import { COMMENT_ENDPOINTS } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    CREATE_COMMENT
}=COMMENT_ENDPOINTS;

export const createComment=async(pageId:number,title:string)=>{
    const toastId = toast.loading("Creating Comment ...");
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        await apiConnector("POST",CREATE_COMMENT(pageId),{title},headers as any, {});
        toast.success("Comment added");
        toast.remove(toastId);
    }catch(error){
        console.log("error occured in creating the comment",error); 
        toast.error("Comment creation Failed !");
        toast.remove(toastId);
    }
}

export const getComments=async(pageId:number)=>{
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        const response=await apiConnector("GET",CREATE_COMMENT(pageId),{},headers as any, {});
        return response.data;
    }catch(error){
        console.log("error occured in fetching the comment",error);
    }
}
