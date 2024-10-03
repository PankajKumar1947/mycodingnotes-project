import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono";

export const commonRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables:{
        userId:string
    }
}>();

commonRouter.post("/review",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json();

    try{
        const review=await prisma.review.create({
            data:{
                ...body
            }
        })

        return c.json({
            status:200,
            data:review 
        })
    }catch(e){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error"
        })
    }
})

commonRouter.post("/newsletter",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json();

    try{
        const newsletter=await prisma.newsLetter.create({
            data:{
                ...body
            }
        })

        return c.json({
            status:200,
            data:newsletter
        })
    }catch(e){
        c.status(500);
        return c.json({
            success:false,
            message:"Internal Server Error"
        })
    }
})

commonRouter.post("/contact",async(c)=>{
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const body=await c.req.json();

    try{
        const contact=await prisma.contact.create({
            data:{
                ...body
            }
        })

        return c.json({
            status:200,
            data:contact
        })
    }catch(e){
        c.status(500);
        console.log(e)
        return c.json({
            success:false,
            message:"Internal Server Error"
        })
    }
})