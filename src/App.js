// React 
import React from "react";
import { Route, Routes } from 'react-router-dom';

// Firebase Database
import { AuthContextProvider } from "./Scripts/authContext";
import ProtectedRoute from "./ProtectedRoute";

// Navbar
import General from "../src/Navbar/General"
import Staff from "../src/Navbar/Staff"
import Member from "./Navbar/Member";

// General Page
import Home from "./General/Index";
import Error from "./General/Message/Error";

// Login interface
import Signin from "./Login/Signin";
import Signup_Staff from "./Login/Signup_Staff";
import SignUp_Member from "./Login/Signup_Member";
import ForgotPassword from "./Login/ForgotPassword";

// Staff Interface
import Profile from "./Staff/Account/Profile";
import Index from "./Staff/Index";

// Member Interface
import Memberindex from "./Member/Loan/Index";
import MemberProfile from "./Member/Account/Profile";
import LoanIndex from "./Member/Loan/Index";

// Staff & Kit Interface
import Kit from "./Staff/Kit/DementiaKit/Index";
import AddKit from "./Staff/Kit/DementiaKit/Create";
import Detail from "./Staff/Kit/DementiaKit/Detail";
import Edit from "./Staff/Kit/DementiaKit/Edit";

// Staff & KitQR Interface
import QRIndex from "./Staff/Kit/KitQR/QRIndex";
import QRCreate from "./Staff/Kit/KitQR/Create";
import QRDetail from "./Staff/Kit/KitQR/Detail"
import QREdit from "./Staff/Kit/KitQR/Edit";
import ProfileEdit from "./Staff/Account/Edit";



function App() {
  return(
    <div className="App">
      <AuthContextProvider>
      <Routes>
        {/* Home Page */}
        <Route path='/' element={
        <>
          <General />
          <Home />
        </>
        } />
        
        {/* Login Page */}
        <Route path='/Signin' element={
        <>
          <General />
          <Signin />
        </>
        }/>
        
        {/* Member Signup Page */}
        <Route path='/Signup_Member' element={
        <>
          <General />
          {/* eslint-disable-next-line */}
          <SignUp_Member />
        </>
        }/>

        {/* Staff Signup Page */}
        <Route path='/Signup_Staff' element={
        <>
          <General />
          {/* eslint-disable-next-line */}
          <Signup_Staff />
        </>
        }/>

         {/* Forgot Password Page */}
         <Route path='/Forgotpassword' element={
        <>
          <General />
          <ForgotPassword />
        </>
        }/>
        
        {/* Staff Profile Page */}      
        <Route path='/Staff/Account/:id' element={<ProtectedRoute>
          <Staff />
          <Profile />  
        </ProtectedRoute>} />
        
        <Route path='/Staff/Account/Edit/:id' element={<ProtectedRoute>
          <Staff />
          <ProfileEdit /> 
        </ProtectedRoute>} />
        
         {/* Dashboard interface for staff */}
        <Route path='/Staff/Dashboard' element={<ProtectedRoute>
          <Staff />
          <Index />
        </ProtectedRoute>} />

        {/* Dashboard interface for Member */}
        <Route path='/Member/Loan' element={<ProtectedRoute>
          <Member />
          <Memberindex />
        </ProtectedRoute>} />
      
        {/* Profile interface for Member */}
        <Route path='/Member/Profile/:id' element={<ProtectedRoute>
          <Member />
          <MemberProfile />
        </ProtectedRoute>} />

        {/* Profile Edit interface for Member */}
          <Route path='/Member/Profile/Edit/:id' element={<ProtectedRoute>
          <Member />
          <MemberProfile />
        </ProtectedRoute>} />

        {/* Profile Edit interface for Member */}
          <Route path='/Member/Loan' element={
          <ProtectedRoute>
            <Member />
            <LoanIndex />
          </ProtectedRoute>} />
      
        <Route path='/Member/Profile/Edit/:id' element={
          <ProtectedRoute>
            <Member />
            
        </ProtectedRoute>} />
      
         {/* listing all kits page */}
        <Route path='/Kit' element={<ProtectedRoute>
          <Staff />
          <Kit />
        </ProtectedRoute>} />

         {/* create new kit */}
         <Route path='/Kit/Add' element={<ProtectedRoute>
          <Staff />
          <AddKit />
        </ProtectedRoute>} />

        {/* displayed the document data based on id */}
        <Route path='/Kit/Detail/:id' element={<ProtectedRoute>
          <Staff />
          <Detail />
        </ProtectedRoute>} />
        
        {/* displayed the document data based on id */}
        <Route path='/Kit/Edit/:id' element={<ProtectedRoute>
          <Staff />
          <Edit />
        </ProtectedRoute>} />
        
        {/* List all the QRCode generated */}
        <Route path='/QRIndex' element={<ProtectedRoute>
          <Staff />
          <QRIndex />
        </ProtectedRoute>} />
        
        {/* Create new QRCode */}
        <Route path='/QRIndex/Create' element={<ProtectedRoute>
          <Staff />
          <QRCreate />
        </ProtectedRoute>} />
        
        {/* displayed the document data based on id  */}
        <Route path='/QRIndex/Detail/:id' element={<ProtectedRoute>
          <Staff />
          <QRDetail />
        </ProtectedRoute>} />

        {/* update the document data based on id  */}
        <Route path='/QRIndex/Edit/:id' element={<ProtectedRoute>
          <Staff />
          <QREdit />
        </ProtectedRoute>} />
        
        {/* Displayed an error page if user typed invalid input */}
        <Route path='*' element={
        <>
          <General />
          <Error />
        </>
        }/>

        </Routes>
      </AuthContextProvider>  
    </div>
  );
}

export default App;
