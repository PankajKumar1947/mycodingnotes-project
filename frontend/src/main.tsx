import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Signup } from './Components/Auth/Signup.tsx'
import { Login } from './Components/Auth/Login.tsx'
import Layout from './Components/Layout.tsx'
import { Home } from './Pages/Home.tsx'
import { CreatePost} from './Pages/CreatePost.tsx'
import ViewPost from './Pages/ViewPost.tsx'
import Profile from './Pages/Profile.tsx'
import { CreateMarkdown } from './Pages/CreateMarkdown.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"createpost",
        element:<CreatePost/>,
      },
      {
        path:"createbookmark",
        element:<CreateMarkdown/>
      },
      {
        path:"viewpost",
        element:<ViewPost/>
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
