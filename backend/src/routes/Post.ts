import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { auth } from "../middlewares/middleware";

export const postRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables:{
        userId:string
    }
}>();

//creating middleware
postRouter.use("/*",auth)

// 1. create post
postRouter.post("/createPost",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const body=await c.req.json();
    //TODO
    //1. zod validation
    try{
        //2. take out the userId from the token
        const userId=c.get("userId");
        // check if user exist in db or not before creating the post
        const user_exist=await prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user_exist){
            c.status(400);
            return c.json({
                success:false,
                message:"User not Found"
            })
        }

        //3. create the post in db
        const post=await prisma.post.create({
            data:{
                title:body.title,
                description:body.description,
                post_img:body.post_img,
                authorId:userId,
                keywords:body.keywords,
                updated_at:new Date(Date.now())
            }
        })

        if(!post){
            c.status(304);
            return c.json({
                success:false,
                message:"Post not created",
            })
        }

        //4. Do we need to update the user DB ?

        //5. return the success response
        return c.json({
            status:200,
            success:true,
            message:"Post created",
            data:post
        })


    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error in Post"
        })
    }
})

//fetch the post
postRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
        const posts=await prisma.post.findMany({});

        if(!posts){
            c.status(404);
            return c.json({
                success:false,
                messgae:"No Post found"
            })
        }

        return c.json({
            status:200,
            success:true,
            message:"Post fetched ",
            data:posts,
        })
    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error in Post Fetching"
        })
    }
})

//fetch single post by keywords
postRouter.post("/getPost",async(c)=>{
    try{
        const prisma=new PrismaClient({
            datasourceUrl:c.env?.DATABASE_URL
        }).$extends(withAccelerate());

        const body=await c.req.json();

        //1. take out the keywords from body and split by space
        const serachInput=body.keywords;

        const keywords=serachInput.toLowerCase().split(' ');

        //2.Check if any keyword matches with post's keywords
        const posts=await prisma.post.findMany({});

        const filteredPosts = posts.filter((post) => {
            return keywords.some((keyword:string) => post.keywords.includes(keyword));
        });


        if(filteredPosts.length===0){
            c.status(204);
            return c.json({
                success:true,
                message:"No Post Found"
            })
        }

        //return the success response
        return c.json({
            status:200,
            success:true,
            message:"Post fetched",
            data:filteredPosts
        })
    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server error"
        })
    }
})

