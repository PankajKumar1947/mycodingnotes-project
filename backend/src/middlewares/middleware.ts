import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export const auth=async(c:any,next:any)=>{
    const authHeader=c.req.header("authorization") || getCookie(c).token || "";
    
    try{
        const user=await verify(authHeader,c.env.JWT_SECRET);

        if(user){
            c.set("userId",user.id);
            c.set("username",user.username);
            c.set("fullname",user.fullname);
            c.set("email",user.email);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    }catch(error){
        c.status(403);
        console.log(error)
        return c.json({
            message: "You are not logged in"
        })
    }
}