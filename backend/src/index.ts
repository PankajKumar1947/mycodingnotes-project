import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { postRouter } from './routes/Post';
import { pageRouter } from './routes/page';
import { markdownRouter } from './routes/markdown';
import { cors } from 'hono/cors';
import { commonRouter } from './routes/common';

const app = new Hono();

// CORS configuration
app.use(
  cors({
    origin: 'https://mycodingnotes.vercel.app', 
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,  
  })
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});


app.route("/api/v1/user",userRouter);
app.route("/api/v1/post",postRouter);
app.route("/api/v1/page",pageRouter);
app.route("/api/v1/post/page/markdown",markdownRouter);
app.route("/api/v1/common",commonRouter);

export default app;
