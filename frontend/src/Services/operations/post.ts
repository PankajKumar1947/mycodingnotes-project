import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { MARKDOWN_ENDPOINTS, NOTES_ENDPOINTS, PAGE_ENDPOINTS, POST_ENDPOINTS } from "../apis";

const {
    GET_ALL_POST_API,
    GET_POST_KEYWORDS_API,
    MAKE_PRIVATE,
}=POST_ENDPOINTS
;
const {
    CREATE_NOTE
}=NOTES_ENDPOINTS

const {
    GET_PAGE,
    CREATE_PAGE
}=PAGE_ENDPOINTS

const {
    CREATE_MARKDOWN,
    UPDATE_MARKDOWN
}=MARKDOWN_ENDPOINTS;

export const createNotes=async(data:any,navigate:any)=>{
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        const response=await apiConnector("POST",CREATE_NOTE,data,headers as any,{});
        navigate(`/adminpost/${response.data.data.id}`);
    }catch(error){
        console.log("error occured in creating the post",error);
    }
}


export const getPostByKeywords=async(keywords:string)=>{
    try{
        const response=await apiConnector("POST",GET_POST_KEYWORDS_API,{keywords},{} as any,{});
        return response.data;       
    }catch(error){
        console.log("error occured in fetching the post",error);
    }
}

export const getAllNotes=async()=>{
    try{
        const response=await apiConnector("GET",GET_ALL_POST_API,{},{} as any,{});
        return response.data.data;

    }catch(error){
        console.log("error occured in fetching the post",error);
    }
}

export const getPage=async(postId:string,pageId:string)=>{
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        const response=await apiConnector("GET",GET_PAGE(postId,pageId),{},headers as any, {});
        return response.data;
    }catch(error){
        console.log("error occured in getting the page");
    }
}

export const createPage=async(postId:string,page_title:string)=>{
    const toastId = toast.loading("Creating Page...");
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        const response=await apiConnector("POST",CREATE_PAGE,{
            page_title:page_title,
            post_id:postId,
        },headers as any, {});
        toast.success("Page created successfully");
        toast.remove(toastId);
        return response.data;
    }catch(error){
        toast.success("Page creation Failed !");
        toast.remove(toastId);
        console.log("error occured in getting the page");
    }
}

export const makePrivate=async(postId:string)=>{
    const toastId = toast.loading("Changing the post visibility");
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        await apiConnector("PUT",MAKE_PRIVATE(postId),{},headers as any, {});
        toast.success("Visibility changed successfully");
        toast.remove(toastId);
    }catch(error){
        console.log("error occured in changing the post visibility");
        toast.success("changing visibility Failed !");
        toast.remove(toastId);
    }
}

export const createMarkdown=async(postId:string,pageId:number,content:string)=>{
    const toastId = toast.loading("Creating Notes...");
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        await apiConnector("POST",CREATE_MARKDOWN(postId,pageId),{content},headers as any,{});
        toast.success("Notes created successfully");
        toast.remove(toastId);
    }catch(eror){
        toast.success("Notes creation Failed !");
        toast.remove(toastId);
        console.log("error occured in creating markdown");
    }
}

export const updateMarkdown=async(markdownId:number,content:string)=>{
    const toastId = toast.loading("Updating Notes...");
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        await apiConnector("PUT",UPDATE_MARKDOWN(markdownId),{content},headers as any,{})
        toast.success("Notes updated successfully");
        toast.remove(toastId);
    }catch(error){
        console.log("error occured in updating markdown");
        toast.success("Notes update Failed !");
        toast.remove(toastId);
    }
}