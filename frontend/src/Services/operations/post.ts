import { apiConnector } from "../apiConnector";
import { POST_ENDPOINTS } from "../apis";

const {
    GET_ALL_POST_API
}=POST_ENDPOINTS
;

export const getAllNotes=async()=>{
    try{
        const response=await apiConnector("GET",GET_ALL_POST_API,{},{} as any,{});
        return response.data.data;

    }catch(error){
        console.log("error occured in fetching the post",error);
    }
}