import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import bcryptjs from 'bcryptjs';
import { sign } from "hono/jwt";
import { setSignedCookie } from "hono/cookie";
import { auth } from "../middlewares/middleware";

//for importing env variable
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables:{
        userId:string,
        username:string,
        fullname:string,
        email:string
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
userRouter.post("/login",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body=await c.req.json();
    //TOOD
    //1. Add zod validaton
    try{
        //2. check wether the user exists in db or not
        const user_exist=await prisma.user.findUnique({
            where:{
                username:body.username
            }
        })

        if(!user_exist){
            c.status(404)
            return c.json({
                success:false,
                message:"User does'n exist | Please Signup First",
            })
        }

        //3. verify the user password
        const verify_password=await bcryptjs.compare(body.password,user_exist.password);
        if(verify_password){
            //4. create a payload 
            const payload={
                id:user_exist.id,
                username:user_exist.username,
                email:user_exist.email,
                fullname:user_exist.fullname,
            }

            //5. create token
            const token=await sign(payload,c.env.JWT_SECRET);

            // Signed cookies
            await setSignedCookie(c,"token",token,c.env.JWT_SECRET,{
                secure: true,
                httpOnly: true,
                maxAge: 1000,
                expires: new Date(Date.now()+3*24*60*50*1000),
                sameSite: 'Strict',
            })
            
            //6. return the success response.
            return c.json({
                status:200,
                success:true,
                message:"User Logged in",
                data:user_exist,
                token:token
            })
        }else{
            //7. return the response if password not matched
            return c.json({
                success:false,
                status:401,
                message:"Wrong Password"
            })
        }
    }catch(error){
        c.status(500);
        console.log(error)
        return c.json({
            success:false,
            message:"Internal Server Error in Login"
        })
    }
})

//middleware
userRouter.use("/*",auth)

userRouter.get("verifytoken",async(c)=>{
    try{
        const data={
            userid:c.get("userId"),
            username:c.get("username"),
            email:c.get("email"),
            fullname:c.get("fullname"),
            loggedIn:true
        }

        if (!data) {
            return c.json({
                success: false,
                status: 400,
                message: "userId not provided",
            });
        }

        return c.json({
            success:true,
            status:200,
            message:"Verified token",
            data:data
        })
    }catch(error){
        c.status(500);
        console.log(error);
        return c.json({
            success:false,
            message:"Internal Server error in verifying token"
        })
    }
})

//3. GET USER INFO INCLUDING POSTS, BOOKMARKS
userRouter.get("/info",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const userId=c.get("userId");
    try{
        //1. fetch the user info including posts as well as bookmarks post
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            include: {
              posts: {
                where: {
                  authorId:userId,
                },
              },
              bookmarks:{
                where:{
                    user_id:userId
                }
              }
            }
          })

        if(!user){
            c.status(204);
            c.json({
                success:false,
                message:"Erro in finding User details"
            })
        }
        
        //creating data which has to be send
        const data={
            id:user?.id,
            username:user?.username,
            fullname:user?.fullname,
            email:user?.email,
            posts:user?.posts,
            bookmarks:user?.bookmarks
        }
        return c.json({
            success:200,
            message:"User Details Found",
            data:data
        })
    }catch(error){
        console.log(error)
        return c.json({
            status:400,
            success:false,
            message:"Internal server error in finding the user info"
        })
    }
})

//delete the user