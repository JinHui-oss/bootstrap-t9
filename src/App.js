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
import Signup_Staff from "./Login/Signup/Signup_Staff";
import SignUp_Member from "./Login/Signup/Signup_Member";
import ForgotPassword from "./Login/PasswordReset/Index";

// Staff Interface
import Profile from "./Staff/Account/Profile";
import Index from "./Staff/Index";
import MemberList from "./Staff/Member/MemberList";

// Member Account Interface
import MemberProfile from "./Member/Account/Profile";
import MemberEdit from "./Member/Account/Update";
import MemberSecurity from "./Member/Account/Security/Index";
import MemberSecurityEdit from "./Member/Account/Security/Password/Edit";

// Member & Loan Interface
import LoanIndex from "./Member/Kit/Index";
import LoanCreate from "./Member/Kit/Create";
import LoanDetail from "./Member/Kit/Detail";
import CurrentLoan from "./Member/Loan/Current";
import PastLoan from "./Member/Loan/Past";

// Staff & Kit Interface
import Kit from "./Staff/Kit/Kit/Index";
import AddKit from "./Staff/Kit/Kit/Create";
import Detail from "./Staff/Kit/Kit/Detail";
import Edit from "./Staff/Kit/Kit/Edit";

// Staff & KitQR Interface
import QRIndex from "./Staff/Kit/KitQR/QRIndex";
import QRCreate from "./Staff/Kit/KitQR/Create";
import QRDetail from "./Staff/Kit/KitQR/Detail"
import QREdit from "./Staff/Kit/KitQR/Edit";
import ProfileEdit from "./Staff/Account/Edit";
import MemberDetail from "./Staff/Member/MemberDetail";
import UpdateProfilePicture from "./Member/Account/Picture";
import StaffPasswordUpdate from "./Staff/Account/Security/Password/Update";
import StaffSecurity from "./Staff/Account/Security";
import StaffProfileUpdate from "./Staff/Account/Update";
import StaffKitBorrowed from "./Staff/Kit/Status/Borrowed";
import StaffUpdateReturned from "./Staff/Kit/Status/Update/UpdateReturned";
import StaffUpdateBorrowed from "./Staff/Kit/Status/Update/UpdateBorrowed";
import Member2FAEdit from "./Member/Account/Security/2FA/Edit";
import StaffReturned from "./Staff/Kit/Status/Returned";




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

        <Route path='/Staff/Account/Security/:id' element={<ProtectedRoute>
          <Staff />
          <StaffSecurity/>  
        </ProtectedRoute>} />

        <Route path='/Staff/Account/UpdatePicture/:id' element={<ProtectedRoute>
          <Staff />
          <StaffProfileUpdate/>  
        </ProtectedRoute>} />
        
        <Route path='/Staff/Account/Edit/:id' element={<ProtectedRoute>
          <Staff />
          <ProfileEdit /> 
        </ProtectedRoute>} />

        <Route path='/Staff/Account/PasswordUpdate/:id' element={<ProtectedRoute>
          <Staff />
          <StaffPasswordUpdate /> 
        </ProtectedRoute>} />
        
         {/* Dashboard interface for staff */}
        <Route path='/Staff/Dashboard' element={<ProtectedRoute>
          <Staff />
          <Index />
        </ProtectedRoute>} />
        
        {/* listing all kits page */}
        <Route path='/Staff/Kit' element={<ProtectedRoute>
          <Staff />
          <Kit />
        </ProtectedRoute>} />

        <Route path='/Staff/MemberList' element={<ProtectedRoute>
          <Staff />
          <MemberList />
        </ProtectedRoute>} />

        <Route path='/Staff/MemberList/Detail/:id' element={<ProtectedRoute>
          <Staff />
          <MemberDetail />
        </ProtectedRoute>} />

         {/* Loan form interface for Member */} 
         <Route path='/Member/Index' element={
        <ProtectedRoute>
          <Member />
          <LoanIndex />
        </ProtectedRoute>} />

        {/* Profile interface for Member */}
        <Route path='/Member/Profile/:id' element={<ProtectedRoute>
          <Member />
          <MemberProfile />
        </ProtectedRoute>} />

        {/* Profile interface for Member */}
        <Route path='/Member/Profile/Edit/:id' element={<ProtectedRoute>
          <Member />
          <MemberEdit />
        </ProtectedRoute>} />

         {/* Profile interface for Member */}
        <Route path='/Member/Profile/UpdateProfilePicture/:id' element={<ProtectedRoute>
          <Member />
          <UpdateProfilePicture />
        </ProtectedRoute>} />

        {/* Kit interface for Member */}
          <Route path='/Member/Kit' element={
          <ProtectedRoute>
            <Member />
            <LoanIndex />
          </ProtectedRoute>} />
          
        {/* Kit Detail interface for Member */}
        <Route path='/Member/Kit/Detail/:id' element={
        <ProtectedRoute>
          <Member />
          <LoanDetail />
        </ProtectedRoute>} />

        {/* Loan form interface for Member */} 
        <Route path='/Member/Kit/Create/:id' element={
        <ProtectedRoute>
          <Member />
          <LoanCreate />
        </ProtectedRoute>} />

        {/* Current Loan Kit interface for Member */} 
        <Route path='/Member/CurrentLoan' element={
        <ProtectedRoute>
          <Member />
          <CurrentLoan/>
        </ProtectedRoute>} />

        {/* Past Loan Kit interface for Member */} 
        <Route path='/Member/PastLoan' element={
        <ProtectedRoute>
          <Member />
          <PastLoan/>
        </ProtectedRoute>} />

        {/* Past Loan Kit interface for Member */} 
        <Route path='/Member/Profile/Security/:id' element={
        <ProtectedRoute>
          <Member />
          <MemberSecurity/>
        </ProtectedRoute>} />

        {/* Past Loan Kit interface for Member */} 
        <Route path='/Member/Profile/Security/Edit/:id' element={
        <ProtectedRoute>
          <Member />
          <MemberSecurityEdit/>
        </ProtectedRoute>} />

        {/* Past Loan Kit interface for Member */} 
        <Route path='/Member/Profile/Security/2FA/:id' element={
        <ProtectedRoute>
          <Member />
          <Member2FAEdit/>
        </ProtectedRoute>} />

         {/* create new kit */}
         <Route path='/Staff/Kit/Add' element={<ProtectedRoute>
          <Staff />
          <AddKit />
        </ProtectedRoute>} />

        {/* displayed the document data based on id */}
        <Route path='/Staff/Kit/Detail/:id' element={<ProtectedRoute>
          <Staff />
          <Detail />
        </ProtectedRoute>} />
        
        {/* displayed the document data based on id */}
        <Route path='/Staff/Kit/Edit/:id' element={<ProtectedRoute>
          <Staff />
          <Edit />
        </ProtectedRoute>} />
        
        {/* List all the QRCode generated */}
        <Route path='/Staff/QRIndex' element={<ProtectedRoute>
          <Staff />
          <QRIndex />
        </ProtectedRoute>} />

        {/* List all the Member Borrowed Dementia Kit */}
        <Route path='/Staff/Borrowed' element={<ProtectedRoute>
          <Staff />
          <StaffKitBorrowed/>
        </ProtectedRoute>} />

        {/* Edit Specifc Member Borrowed Dementia Kit Status */}
        <Route path='/Staff/Borrowed/Update/:id' element={<ProtectedRoute>
          <Staff />
          <StaffUpdateBorrowed/>
        </ProtectedRoute>} />

        {/* List all the Member Returned Dementia Kit */}
        <Route path='/Staff/Returned' element={<ProtectedRoute>
          <Staff />
          <StaffReturned/>
        </ProtectedRoute>} />

          {/* List all the Member Returned Dementia Kit */}
          <Route path='/Staff/Returned/Update/:id' element={<ProtectedRoute>
          <Staff />
          <StaffUpdateReturned/>
        </ProtectedRoute>} />


        {/* Edit Specifc Member Returned Dementia Kit Status */}
        <Route path='/Staff/Returned/Delete/:id' element={<ProtectedRoute>
          <Staff />
          <StaffKitBorrowed/>
        </ProtectedRoute>} />
        
        {/* Create new QRCode */}
        <Route path='/Staff/QRIndex/Create' element={<ProtectedRoute>
          <Staff />
          <QRCreate />
        </ProtectedRoute>} />
        
        {/* displayed the document data based on id  */}
        <Route path='/Staff/QRIndex/Detail/:id' element={<ProtectedRoute>
          <Staff />
          <QRDetail />
        </ProtectedRoute>} />

        {/* update the document data based on id  */}
        <Route path='/Staff/QRIndex/Edit/:id' element={<ProtectedRoute>
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
