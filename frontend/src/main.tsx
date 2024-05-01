import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Signup } from './Components/Auth/Signup.tsx'
import { Login } from './Components/Auth/Login.tsx'
import Layout from './Components/Layout.tsx'
import { Home } from './Pages/Home.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"login",
        element:<Login/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
