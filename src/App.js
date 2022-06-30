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

// General and SignIn Page
import Home from "./General/Index";
import Error from "./General/Message/Error";
import SigninStaff from "./Login/Signin/SigninStaff";
import SigninMember from "./Login/Signin/SigninMember";

// SignUp and Forgot Password General interface Page
import Signup_Staff from "./Login/Signup/Signup_Staff";
import SignUp_Member from "./Login/Signup/Signup_Member";
import ForgotPassword from "./Login/PasswordReset/Index";

// Staff Interface
import Profile from "./Staff/Account/Profile";
import Index from "./Staff/Index";
import MemberList from "./Staff/Member/MemberList";
import ProfileEdit from "./Staff/Account/Edit";
import StaffSecurity from "./Staff/Account/Security";
import StaffProfileUpdate from "./Staff/Account/Update";
import StaffPasswordUpdate from "./Staff/Account/Security/Password/Update";

// Member Account Interface
import MemberProfile from "./Member/Account/Profile";
import MemberEdit from "./Member/Account/Update";
import UpdateProfilePicture from "./Member/Account/Picture";
import MemberSecurity from "./Member/Account/Security/Index";
import MemberSecurityEdit from "./Member/Account/Security/Password/Edit";
import MemberDetail from "./Staff/Member/MemberDetail";
import Member2FAEdit from "./Member/Account/Security/2FA/Edit";

// Member & Loan Interface
import LoanIndex from "./Member/Kit/Index";
import LoanCreate from "./Member/Kit/Create";
import LoanDetail from "./Member/Kit/Detail";
import CurrentLoan from "./Member/Loan/Current";
import PastLoan from "./Member/Loan/Past";
import MemberKitCancel from "./Member/Loan/Cancel";
import MemberReadyCollection from "./Member/Loan/ReadyCollection";
import MemberKitConfirmed from "./Member/Loan/Confirmed";


// Staff & Kit Interface
import Kit from "./Staff/Kit/Dementia Kit/Index";
import AddKit from "./Staff/Kit/Dementia Kit/Create";
import Detail from "./Staff/Kit/Dementia Kit/Detail";
import Edit from "./Staff/Kit/Dementia Kit/Edit";

// Staff & KitQR Interface
import QRIndex from "./Staff/Kit/KitQR/QRIndex";
import QRCreate from "./Staff/Kit/KitQR/Create";
import QRDetail from "./Staff/Kit/KitQR/Detail"
import QREdit from "./Staff/Kit/KitQR/Edit";

// Dementia toolKits Status, Staff List of the Staff interface
import StaffKitBorrowed from "./Staff/Kit/Status/Kit/Borrowed";
import StaffUpdateReturned from "./Staff/Kit/Status/Update/UpdateReturned";
import StaffUpdateBorrowed from "./Staff/Kit/Status/Update/UpdateBorrowed";
import StaffReturned from "./Staff/Kit/Status/Kit/Returned";
import StaffReadyCollection from "./Staff/Kit/Status/Kit/ReadyCollection";
import StaffConfirmed from "./Staff/Kit/Status/Kit/Confirmed";
import StaffCancellation from "./Staff/Kit/Status/Kit/Cancellation";
import StaffList from "./Staff/Kit/Status/Kit/StaffList";
import StaffListProfile from "./Staff/Kit/Status/Kit/StaffDetails";
import StaffUpdateCollection from "./Staff/Kit/Status/Update/UpdateCollection";
import StaffUpdateCancel from "./Staff/Kit/Status/Update/UpdateCancellation";
import StaffUpdateConfirmed from "./Staff/Kit/Status/Update/UpdateConfirmed";
import UpdateSuccessful from "./Staff/Account/Security/Password/Successful";

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
        
        {/* Member Login Page */}
        <Route path='/Signin/Member' element={
        <>
          <General />
          <SigninMember />
        </>
        }/>

          {/* Staff Login Page */}
          <Route path='/Signin/Staff' element={
        <>
          <General />
          <SigninStaff />
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

         {/* Staff Profile Page */}      
         <Route path='/Staff/Account/UpdatedPassword/:id' element={<ProtectedRoute>
          <Staff />
          <UpdateSuccessful />  
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

        <Route path='/Staff/Collection' element={<ProtectedRoute>
          <Staff />
          <StaffReadyCollection/>
        </ProtectedRoute>} />

        <Route path='/Staff/Collection/Update/:id' element={<ProtectedRoute>
          <Staff />
          <StaffUpdateCollection/>
        </ProtectedRoute>} />

        <Route path='/Staff/Collection/Delete/:id' element={<ProtectedRoute>
          <Staff />
          <StaffUpdateCollection/>
        </ProtectedRoute>} />

        <Route path='/Staff/Cancellation' element={<ProtectedRoute>
          <Staff />
          <StaffCancellation />
        </ProtectedRoute>} />

        <Route path='/Staff/Cancellation/Update/:id' element={<ProtectedRoute>
          <Staff />
          <StaffUpdateCancel />
        </ProtectedRoute>} />

        <Route path='/Staff/Confirmed' element={<ProtectedRoute>
          <Staff />
          <StaffConfirmed/>
        </ProtectedRoute>} />

        <Route path='/Staff/Confirmed/Update/:id' element={<ProtectedRoute>
          <Staff />
          <StaffUpdateConfirmed/>
        </ProtectedRoute>} />

        <Route path='/Staff/StaffList' element={<ProtectedRoute>
          <Staff />
          <StaffList/>
        </ProtectedRoute>} />

        <Route path='/Staff/StaffList/Detail/:id' element={<ProtectedRoute>
          <Staff />
          <StaffListProfile/>
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

        {/* Cancellation Loan Kit interface for Member */} 
        <Route path='/Member/Cancelled' element={
        <ProtectedRoute>
          <Member />
          <MemberKitCancel/>
        </ProtectedRoute>} />

        {/* Past Loan Kit interface for Member */} 
        <Route path='/Member/PastLoan' element={
        <ProtectedRoute>
          <Member />
          <PastLoan/>
        </ProtectedRoute>} />

        {/*Ready Collection for the dementia Kit of Member interface for Member */} 
        <Route path='/Member/ReadyCollection' element={
        <ProtectedRoute>
          <Member />
          <MemberReadyCollection/>
        </ProtectedRoute>} />

        {/* Confirmation for the dementia Kit of Member interface for Member */} 
        <Route path='/Member/Confirmed' element={
        <ProtectedRoute>
          <Member />
          <MemberKitConfirmed/>
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

        {/* List all the Member Borrowed Dementia Kit */}
          <Route path='/Staff/Confirmed' element={<ProtectedRoute>
          <Staff />
          <StaffConfirmed/>
        </ProtectedRoute>} />

        {/* List all the Member Borrowed Dementia Kit */}
        <Route path='/Staff/Cancellation' element={<ProtectedRoute>
          <Staff />
          <StaffCancellation/>
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
