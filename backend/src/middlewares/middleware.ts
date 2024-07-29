import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export const auth=async(c:any,next:any)=>{
    const authHeader=c.req.header("authorization") || getCookie(c).token || "";
    
    try{
        const user=await verify(authHeader,c.env.JWT_SECRET);

        if(user){
            c.set("userId",user.id);
            await next();
        }else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    }catch(error){
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
}