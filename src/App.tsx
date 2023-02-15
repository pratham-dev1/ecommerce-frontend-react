import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Layout from "./components/Layout";
import Login from "./components/Login";
import ProtectedRoute from "./components/Protected_Routes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducer";
import {setAdminToken, setToken} from "./redux/slices/authSlice"
import "./App.css"
import ProductDetail from "./components/ProductDetail";
import MainForm from "./components/admin/MainForm";
import List from "./components/admin/List";
import Orders from "./components/Orders";
import AdminOrders from "./components/admin/AdminOrder";
import SignUp from "./components/Signup";
import jwt_decode from "jwt-decode"
import AdminLayout from "./components/admin/AdminLayout";
import AdminHome from "./components/admin/AdminHome";
import AdminLogin from "./components/admin/AdminLogin";
import AdminProtectedRoute from "./components/admin/AdminProtected_Routes";
import SessionExpiredDialog from "./components/SessionExpiredDialog";
import ResetPassword from "./components/ResetPassword";
import UpdatePassword from "./components/updatePassword";
import ResetPasswordAdmin from "./components/admin/ResetPasswordAdmin";
import UpdatePasswordAdmin from "./components/admin/UpdatePasswordAdmin";
import ServerError from "./components/500";
import MultipleImages from "./components/MultipleImages";
import Checkout from "./components/checkout/Checkout";
import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';



function App() {

  let location = useLocation();
  const dispatch = useDispatch()
  const isAuthenticated:any = useSelector((state:RootState)=>state.auth.token)
   let decoded_token:any = isAuthenticated && jwt_decode(isAuthenticated)
   let isAdmin = decoded_token?.role.includes('admin')
  const [render,setRender] = useState(false)
  const [expiredSession , setExpiredSession] = useState(false)

 useEffect(()=>{
  if(localStorage.getItem('token')){
    dispatch(setToken(localStorage.getItem('token') as string))
  }
  setRender(true)
 },[])


//  for session expired modal

useEffect(():any=>{
  let decoded :any = localStorage.getItem('refreshToken') && jwt_decode(localStorage.getItem('refreshToken') as any)
if(decoded?.exp * 1000 < Date.now()) {
  // localStorage.removeItem('token')
  // localStorage.removeItem('refreshToken')
  setExpiredSession(true)
}
},[location])
 



  return (
<>
{/* we need to restrict rendering , first we need to run useEffect before rendering then it will help us to show same page after reload*/}
    {render && 
    <>
    {expiredSession && <SessionExpiredDialog/>}
      <Routes>
       
         {/* user routes */}
       
            <Route element={<ProtectedRoute user={isAuthenticated}> <Layout /></ProtectedRoute>}>  /* Layout */

              <Route path="/home" element={<ProtectedRoute user={isAuthenticated}> <Home /></ProtectedRoute> } />
              <Route path="/about" element={<ProtectedRoute user={isAuthenticated}> <About /> </ProtectedRoute>} />
              <Route path="/contact" element={<ProtectedRoute user={isAuthenticated}> <Contact /> </ProtectedRoute>} /> 
              <Route path="/productdetail/:id" element={<ProtectedRoute user={isAuthenticated}> <ProductDetail/> </ProtectedRoute>}/>
              <Route path="/orders" element={<ProtectedRoute user={isAuthenticated}> <Orders/> </ProtectedRoute>}/>
              <Route path="/upload-images" element={<ProtectedRoute user={isAuthenticated}> <MultipleImages/> </ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute user={isAuthenticated}> <Checkout/> </ProtectedRoute>} />
            
            </Route>

            <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace/> : <Login/>} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to="/home"/> : <SignUp/>} />
            <Route path="/forgot-password" element={isAuthenticated ? <Navigate to="/home"/> : <ResetPassword/>} />
            <Route path="/update-password" element={isAuthenticated ? <Navigate to="/home"/> : <UpdatePassword/> } />
            <Route path="*" element={<ProtectedRoute user={isAuthenticated}> <Error /> </ProtectedRoute>} />
            <Route path="/error" element={!isAuthenticated ? <Navigate to="/home"/> : <ServerError/>} />
            
          
            {/* admin routes */}
            
            <Route element={<AdminLayout />}>
            <Route path="/admin-home" element={<AdminProtectedRoute user={isAdmin}> <AdminHome/> </AdminProtectedRoute>}/>
            <Route path="/mainform/:id" element={<AdminProtectedRoute user={isAdmin}> <MainForm/> </AdminProtectedRoute>}/>
            <Route path="/list" element={<AdminProtectedRoute user={isAdmin}> <List/> </AdminProtectedRoute>}/>
            <Route path="/adminOrders" element={<AdminProtectedRoute user={isAdmin}> <AdminOrders/> </AdminProtectedRoute>}/>

            </Route>
            <Route path="/admin" element={ isAdmin ? <Navigate to="/admin-home"/> : <AdminLogin/> } />
            <Route path="/admin-forgot-password" element={ isAdmin ? <Navigate to="/admin-home"/> : <ResetPasswordAdmin/> } />
            <Route path="/update-password-admin/:key" element={isAdmin ? <Navigate to="/admin-home"/> : <UpdatePasswordAdmin/> } />
            
      </Routes>
      <ToastContainer autoClose={3000} closeOnClick position="top-right" theme="colored" />
      </>
    }
    </>
  );
}

export default App;
