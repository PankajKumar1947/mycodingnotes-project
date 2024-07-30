import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { postRouter } from './routes/Post'
import { pageRouter } from './routes/page'
import { markdownRouter } from './routes/markdown'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors({
  origin: 'https://mycodingnotes.vercel.app',
  allowHeaders: ['Origin', 'Content-Type', 'Content-Length', 'Host','User-Agent','Connection', 'Authorization'],
  allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/user",userRouter);
app.route("/api/v1/post",postRouter);
app.route("/api/v1/post/page",pageRouter);
app.route("/api/v1/post/page/markdown",markdownRouter)


export default app
