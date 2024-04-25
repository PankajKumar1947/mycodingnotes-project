import { Hono } from "hono";
import { signup } from "../controllers/user";

export const userRouter=new Hono();

userRouter.get("/signup",signup)

userRouter.get("/signin",async(c)=>{
    return c.text("Hello from signin routes");
})