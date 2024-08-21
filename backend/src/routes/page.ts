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

//get the page
pageRouter.get("/:post_id/:page_id",async(c)=>{
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

    //get the post_id and page_id from the url
    const post_id=c.req.param("post_id");
    const page_id=c.req.param('page_id')
    try{
        //1. find the page with post_id and page_id
        const page=await prisma.page.findUnique({
            where:{
                post_id:post_id,
                id:Number(page_id)
            },
            include:{
                markdowns:true
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
        const pageLength=await prisma.page.findMany({
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
            pageLength:pageLength.length
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

        //3. Create a page
        const page=await prisma.page.create({
            data:{
                page_title:body.page_title,
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