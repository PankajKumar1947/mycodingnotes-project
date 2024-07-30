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
import { Toaster } from 'react-hot-toast'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/index.ts'
import { Provider } from 'react-redux'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.tsx'
import OpenRoute from './Components/ProtectedRoutes/OpenRoute.tsx'

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
        element:<OpenRoute>
          <Signup/> 
        </OpenRoute>
      },
      {
        path:"login",
        element:<OpenRoute>
          <Login/>
        </OpenRoute>
      },
      {
        path:"createpost",
        element: <ProtectedRoutes>
          <CreatePost/>,
        </ProtectedRoutes>
      },
      {
        path:":postid/createmarkdown",
        element: <ProtectedRoutes>
          <CreateMarkdown/>
        </ProtectedRoutes>
        
      },
      {
        path:"profile",
        element: <ProtectedRoutes>
            <Profile/>
          </ProtectedRoutes>
      }
    ]
  },
  {
    path:"/viewpost",
    element:<ViewPost/>
  },
]);

const store=configureStore({
  reducer:rootReducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>,
)
