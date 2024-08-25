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
            include:{
                likes:true,
                comments:true,
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

//like post route
postRouter.post("/like",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const user_id =c.get('userId')
    try{
        //1. extract the post_id from body and userId from token for liking
        
        //check wether the post exist or not
        const post=await prisma.post.findUnique({
            where:{
                id:body.post_id
            }
        })

        if(!post){
            c.status(404);
            return c.json({
                success:false,
                message:"Such post doesn't exist",
            })
        }


        //2. check wether the post_id  and userid already exist in the like model
        const like=await prisma.like.findFirst({
            where:{
                user_id:user_id,
                post_id:body.post_id
            },
            
        })

        if(!like){
            //like the post
            const doLike=await prisma.like.create({
                data:{
                    user_id:user_id,
                    post_id:body.post_id
                }
            })

            if(!doLike){
                c.status(501);
                return c.json({
                    success:false,
                    message:"Error in doing like"
                })
            }

            return c.json({
                status:200,
                success:true,
                message:"Post liked",
                data:doLike
            })
        }else{
            //unlike the post
            const removeLike=await prisma.like.delete({
                where:{
                    id:like.id,
                    post_id:body.post_id,
                    user_id:user_id
                }
            })

            if(!removeLike){
                c.status(501);
                return c.json({
                    success:false,
                    message:"Error in disliking the post"
                })
            }

            return c.json({
                status:200,
                success:true,
                message:"Like removed",
                data:removeLike
            })
        }

    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server error in liking post"
        })
    }
})

//comment post route
postRouter.post("/comment/:post_id",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const user_id=c.get("userId");
    const post_id=c.req.param('post_id');
    try{
        //extract the post id from the body and userId from the token
        const post=await prisma.post.findUnique({
            where:{
                id:post_id
            }
        })

        if(!post){
            c.status(404);
            return c.json({
                success:false,
                message:"No such post found"
            })
        }

        //2. do the comment on this post
        const comment=await prisma.comment.create({
            data:{
                post_id:post_id,
                user_id:user_id,
                title:body.title
            }
        })

        if(!comment){
            c.status(501);
            return c.json({
                success:false,
                message:"No comment created"
            })
        }

        //return the success response
        return c.json({
            success:true,
            message:"Comment created",
            data:comment
        })

    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server error in comment"
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
