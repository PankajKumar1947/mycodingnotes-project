import axios, { AxiosRequestHeaders, Method } from "axios"

axios.defaults.withCredentials=true;
export const axiosInstance=axios.create({});

export const apiConnector=(method:Method,url:string,bodyData:object,headers:AxiosRequestHeaders,params:object)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData: {},
        headers: headers ? headers: {},
        params:params? params: {}
    })
}