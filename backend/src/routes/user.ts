import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcryptjs from 'bcryptjs';

//for importing env variable
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

//1. SIGNUP ROUTE
userRouter.post("/signup",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body = await c.req.json();
    //TODO: 
    //1.adding zod validation

	try{
        //2. checking if the user already exists in db
        const user_exist=await prisma.user.findUnique({
            where:{
                username:body.username
            }
        })

        if(user_exist){
            c.status(400);
            return c.json({
                success:false,
                message:"User already exist!! Please Login"
            })
        }

        //3. hash the password before storing into db
        const hashedPassword=await bcryptjs.hash(body.password,10);

        if(!hashedPassword){
            c.status(501);
            return c.json({
                success:false,
                message:"Error occured in hashing the password"
            })
        }

        //4. create the user and store the hashed Password
		const user = await prisma.user.create({
			data:{
                username:body.username,
                fullname:body.fullname,
				email: body.email,
				password: hashedPassword,
			}
		});

        if(!user){
            c.status(501);
            return c.json({
                success:false,
                message:"User not created"
            })
        }
        user.password="encrypted"

        //5. return the success response
        return c.json({
            status:200,
            success:true,
            message:"User created ",
            data:user
        })
		
	}catch(e){
		c.status(500);
		return c.json({
            success:false,
            message:"Internal Server Error in Signup"
        });
	}
})

//2. LOGIN ROUTE

userRouter.get("/signin",async(c)=>{
    return c.text("Hello from signin routes");
})