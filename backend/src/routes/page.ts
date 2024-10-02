import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { auth } from "../middlewares/middleware";

export const pageRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables:{
        userId:string
    }
}>();

//fetch comments for the page
pageRouter.get("/comment/:page_id",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());
    const page_id=c.req.param('page_id');
    try{
        const comments=await prisma.comment.findMany({
            where:{
                page_id:parseInt(page_id)
            },
            include:{
                user:{
                    select:{
                        id:true,
                        username:true,
                        fullname:true
                    }
                }
            }   
        })
        return c.json({
            success:true,
            data:comments
        })
    }catch(error){
        c.status(500);
        return c.json({ 
            success:false,  
            message:"Internal Server error in fetching comments"
        })  
    }
})

//get the page
pageRouter.get("/:post_id/:page_cnt",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    //get the post_id and page_id from the url
    const post_id=c.req.param("post_id");
    const page_cnt=c.req.param('page_cnt')
    try{
        //1. find the page with post_id and page_id
        const page=await prisma.page.findFirst({
            where:{
                post_id:post_id,
                page_cnt:Number(page_cnt),
            },
            include:{
                markdowns:{
                    orderBy:{
                        id:"asc"
                    }
                }
                
            }
        })

        if(!page){
            c.status(404);
            return c.json({
                success:false,
                message:"Page does not exist",
            })
        }

        //find the length of the pages
        const pages=await prisma.page.findMany({
            where:{
                post_id:post_id
            }
        })

        //return the success response
        return c.json({
            status:200,
            success:true,
            message:"Page fetched ",
            data:page,
            pages:pages,
        })

    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error"
        })
    }
})

//middleware
pageRouter.use("/*",auth)

//create the page
pageRouter.post("/create",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    const body=await c.req.json();

    //1. TODO
    //perform zod validation
    try{
        //need post_id,page_title and,increase page_cnt

        const userId=c.get("userId");

        //2. find the post with post_id and author_id if it exist or not?
        const post=await prisma.post.findUnique({
            where:{
                id:body.post_id,
                authorId:userId
            },
            select:{
                pages:true,
                title:true
            }
        })

        if(!post){
            c.status(404);
            return c.json({
                success:false,
                message:"Such post doesn't exist"
            })
        }

        //3. Create a page
        const page=await prisma.page.create({
            data:{
                page_title:body.page_title,
                post_title:post.title,
                post_id:body.post_id,
                page_cnt:post.pages.length+1
            }
        })

        if(!page){
            c.status(501);
            return c.json({
                success:false,
                message:"page not created",
            })
        }

        //4. return the success response
        return c.json({
            status:"200",
            success:true,
            message:"Page created",
            data:page
        })
    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error"
        })
    }
})

//update the page
pageRouter.put("/update",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    const body=await c.req.json();

    //1. TODO
    //perform zod validation
    try{
        //need post_id,page_title and,increase page_cnt

        const userId=c.get("userId");

        //2. find the post with post_id and author_id if it exist or not?
        const post=await prisma.post.findUnique({
            where:{
                id:body.post_id,
                authorId:userId
            },
            include:{
                pages:{
                    where:{
                        id:body.page_id,
                    }
                }
            }
        })

        if(!post || !post.pages.length){
            c.status(404);
            return c.json({
                success:false,
                message:"Such post or page doesn't exist"
            })
        }

        //3. update the page title
        const page=await prisma.page.update({
            where:{
                id:body.page_id,
                post_id:body.post_id
            },
            data:{
                page_title:body.page_title
            }
        })

        if(!page){
            c.status(501);
            return c.json({
                success:false,
                message:"page not updated",
            })
        }

        //4. return the success response
        return c.json({
            status:"200",
            success:true,
            message:"Page updated",
            data:page
        })
    }catch(error){
        c.status(500);
        console.log(error)
        return c.json({
            success:false,
            message:"Internal Server Error"
        })
    }
})

//delete the page
pageRouter.delete("/delete",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    const body=await c.req.json();
    try{
        //need post_id,page_title and,increase page_cnt

        const userId=c.get("userId");

        //2. find the post with post_id and author_id if it exist or not?
        const post=await prisma.post.findUnique({
            where:{
                id:body.post_id,
                authorId:userId
            },
            select:{
                pages:true
            }
        })

        if(!post){
            c.status(404);
            return c.json({
                success:false,
                message:"Such post doesn't exist"
            })
        }

        //3. delete
        const page=await prisma.page.delete({
            where:{
                id:body.page_id,
                post_id:body.post_id
            }
        })

        if(!page){
            c.status(501);
            return c.json({
                success:false,
                message:"page not deleted",
            })
        }

        //4. return the success response
        return c.json({
            status:"200",
            success:true,
            message:"Page deleted",
            data:page
        })
    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error"
        })
    }
})

//like page route
pageRouter.post("/like",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    
    const body=await c.req.json();
    const user_id =c.get('userId')

    try{
        //1. extract the page_id from body and userId from token for liking
        //check wether the post exist or not
        const page=await prisma.page.findUnique({
            where:{
                id:parseInt(body.page_id)
            },
            include:{
                likes:true
            }
        })
        

        if(!page){
            c.status(404);
            return c.json({
                success:false,
                message:"Such page doesn't exist",
            })
        }

        

        //2. check wether the page_id  and userid already exist in the like model
        const like=await prisma.like.findFirst({
            where:{
                user_id:user_id,
                page_id:parseInt(body.page_id)
            },
            
        })


        console.log("error 2",like)

        if(like==null){
            //like the page
            const doLike=await prisma.like.create({
                data:{
                    user_id:user_id,
                    page_id:parseInt(body.page_id)
                }
            })

            console.log("error in liking",doLike)

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
                message:"page liked",
                data:doLike
            })
        }else{
            //unlike the page
            const removeLike=await prisma.like.delete({
                where:{
                    id:like.id,
                    page_id:body.post_id,
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
            message:"Internal Server error in liking post",
            error:error
        })
    }
})

//comment post route
pageRouter.post("/comment/:page_id",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL
    }).$extends(withAccelerate());

    const body=await c.req.json();
    const user_id=c.get("userId");
    const page_id=c.req.param('page_id');
    try{
        //extract the page id from the body and userId from the token
        const page=await prisma.page.findUnique({
            where:{
                id:parseInt(page_id)
            }
        })

        if(!page){
            c.status(404);
            return c.json({
                success:false,
                message:"No such page found"
            })
        }

        //2. do the comment on this page
        const comment=await prisma.comment.create({
            data:{
                page_id:parseInt(page_id),
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