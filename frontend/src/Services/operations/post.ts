import { apiConnector } from "../apiConnector";
import { MARKDOWN_ENDPOINTS, PAGE_ENDPOINTS, POST_ENDPOINTS } from "../apis";

const {
    GET_ALL_POST_API
}=POST_ENDPOINTS
;

const {
    GET_PAGE,
    CREATE_PAGE
}=PAGE_ENDPOINTS

const {
    CREATE_MARKDOWN,
    UPDATE_MARKDOWN
}=MARKDOWN_ENDPOINTS;

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
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        const response=await apiConnector("POST",CREATE_PAGE,{
            page_title:page_title,
            post_id:postId,
        },headers as any, {});
        return response.data;
    }catch(error){
        console.log("error occured in getting the page");
    }
}

export const createMarkdown=async(postId:string,pageId:number,content:string)=>{
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        await apiConnector("POST",CREATE_MARKDOWN(postId,pageId),{content},headers as any,{});
    }catch(eror){
        console.log("error occured in creating markdown");
    }
}

export const updateMarkdown=async(markdownId:number,content:string)=>{
    try{
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: JSON.parse(token) } : {};
        await apiConnector("PUT",UPDATE_MARKDOWN(markdownId),{content},headers as any,{})
    }catch(error){
        console.log("error occured in updating markdown");
    }
}