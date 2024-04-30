import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { postRouter } from './routes/Post'
import { pageRouter } from './routes/page'
import { markdownRouter } from './routes/markdown'

const app = new Hono()


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/user",userRouter);
app.route("/api/v1/post",postRouter);
app.route("/api/v1/post/page",pageRouter);
app.route("/api/v1/post/page/markdown",markdownRouter)


export default app
