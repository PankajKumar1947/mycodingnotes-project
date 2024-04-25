import { Hono } from 'hono'
import { userRouter } from './routes/user'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/api/v1/user",userRouter);


export default app
