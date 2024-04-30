import { Hono } from "hono";
import { auth } from "../middlewares/middleware";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"

export const markdownRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables:{
        userId:string
    }
}>();


//create markdown
markdownRouter.post("/create/:post_id/:page_id",auth,async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    //get the page id and post id from the url
    const post_id=c.req.param('post_id')
    const page_id=c.req.param('page_id')

    const body=await c.req.json();

    try{
        //1. check weather the post_id and page_id is present in page model or not
        const page=await prisma.page.findUnique({
            where:{
                id:Number(page_id),
                post_id:post_id
            }
        })

        if(!page){
            c.status(404);
            return c.json({
                success:false,
                message:"No such page and post exist",
            })
        }

        //2. now create the markdown
        const markdown=await prisma.markdown.create({
            data:{
                content:body.content,
                page_id:Number(page_id)
            }
        })

        if(!markdown){
            c.status(401);
            return c.json({
                success:false,
                message:"Error in markdown creation"
            })
        }

        //return the success response
        return c.json({
            status:200,
            success:true,
            message:"Markdown created",
            data:markdown
        })

    }catch(error){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error in creating markdown"
        })
    }
})  