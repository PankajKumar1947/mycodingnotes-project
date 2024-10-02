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

//fetch the post
postRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    try{
        const posts=await prisma.post.findMany({
            where:{
                private:false,
            },
            include:{
                pages: true,
            }
        });

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

//fetch post by keywords
postRouter.post("/getPost",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body=await c.req.json();

    try{
        //1. take out the keywords from body and split by space
        const serachInput=body.keywords;
        const keywords=serachInput.toLowerCase().split(' ');

        //2.Check if any keyword matches with post's keywords
        const posts=await prisma.post.findMany({
            where:{
                private:false
            }
        });

        const filteredPosts = posts.filter((post) => {
            return keywords.some((keyword:string) => post.keywords.includes(keyword));
        });
        
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

//creating middleware
postRouter.use("/*",auth)

// 1. create post
postRouter.post("/createPost",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    console.log("check1")
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
        console.log("check1")
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

//make the post private
postRouter.put("/private/:post_id",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        //get the post_id from the params
        const post_id=c.req.param("post_id");

        //get the userId from the token
        const user_id=c.get("userId");

        //1. find the post using userId and post_id
        const post=await prisma.post.findUnique({
            where:{
                id:post_id,
                authorId:user_id
            }
        })

        if(!post){
            c.status(404);
            return c.json({
                success:false,
                message:"Such post doesn't exist"
            })
        }

        //2. now update the post
        const updated_post=await prisma.post.update({
            where:{
                id:post_id,
                authorId:user_id
            },
            data:{
                private:!post.private
            }
        })

        if(!updated_post){
            c.status(501);
            return c.json({
                success:false,
                message:"Post not updated"
            })
        }

        //3. return the success response
        return c.json({
            status:200,
            success:true,
            message:"Post updated",
            data:updated_post
        })

    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server error"
        })
    }
})

//delete post
postRouter.delete("/delete/:post_id",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        //get the post_id from the params
        const post_id=c.req.param("post_id");

        //get the userId from the token
        const user_id=c.get("userId");

        //1. find the post using userId and post_id
        const post=await prisma.post.findUnique({
            where:{
                id:post_id,
                authorId:user_id
            }
        })

        if(!post){
            c.status(404);
            return c.json({
                success:false,
                message:"Such post doesn't exist"
            })
        }

        console.log(post)

        //2. now delete the post
        const deleted_post=await prisma.post.delete({
            where:{
                id:post_id,
                authorId:user_id
            }
        })

        if(!deleted_post){
            c.status(501);
            return c.json({
                success:false,
                message:"Post not deleted"
            })
        }

        //return the success response
        return c.json({
            status:200,
            success:true,
            message:"Post deleted",
            data:deleted_post
        })

    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server error in deleting the post"
        })
    }
})


//bookmark post route
postRouter.post("/bookmark/:post_id",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const post_id=c.req.param("post_id");
    const user_id=c.get("userId");

    try{
        
    }catch(error){

    }
})
