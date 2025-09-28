
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer} from 'react-toastify';
import './index.css'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[]
  }
   
  
  ]);

const root = createRoot(document.getElementById('root')); 
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
{    <ToastContainer /> }
  </StrictMode>
);