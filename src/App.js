// React 
import React from "react";
import { Route, Routes } from 'react-router-dom';

// Firebase Database
import { AuthContextProvider } from "./Scripts/authContext";
import ProtectedRoute from "./ProtectedRoute";

// Navbar
import General from "../src/Navbar/General"
import Staff from "../src/Navbar/Staff"

// General Page
import Home from "./General/Index";
import Error from "./General/Message/Error";

// Login interface
import Signin from "./Login/Signin";
import Signup from "./Login/Signup";
import ForgotPassword from "./Login/ForgotPassword";

// Staff Interface
import Profile from "./Staff/Account/Profile";
import Index from "./Staff/Index";

// Staff & Kit Interface
import Kit from "./Staff/Kit/DementiaKit/Index";
import AddKit from "./Staff/Kit/DementiaKit/Create";
import Detail from "./Staff/Kit/DementiaKit/Detail";

// Staff & KitQR Interface
import QRIndex from "./Staff/Kit/KitQR/QRIndex";

function App() {
  return(
    <div className="App">
      <AuthContextProvider>
      <Routes>
        {/* A JSX comment */}
        <Route path='/' element={
        <>
          <General />
          <Home />
        </>
        } />
        
        {/* A JSX comment */}
        <Route path='/signin' element={
        <>
          <General />
          <Signin />
        </>
        }/>
        
        {/* A JSX comment */}
        <Route path='/signup' element={
        <>
          <General />
          <Signup />
        </>
        }/>

         {/* A JSX comment */}
         <Route path='/forgotpassword' element={
        <>
          <General />
          <ForgotPassword />
        </>
        }/>
        
         {/* A JSX comment */}      
        <Route path='/account' element={<ProtectedRoute>
          <Staff />
          <Profile />  
        </ProtectedRoute>} />
        
         {/* A JSX comment */}
        <Route path='/dashboard' element={<ProtectedRoute>
        <Staff />
        <Index />
        </ProtectedRoute>} />
      
         {/* A JSX comment */}
        <Route path='/Kit' element={<ProtectedRoute>
          <Staff />
          <Kit />
        </ProtectedRoute>} />

         {/* A JSX comment */}
         <Route path='/Kit/Add' element={<ProtectedRoute>
          <Staff />
          <AddKit />
        </ProtectedRoute>} />

        <Route path='/Kit/Detail/:id' element={<ProtectedRoute>
          <Staff />
          <Detail />
        </ProtectedRoute>} />
        
        <Route path='/QRIndex' element={<ProtectedRoute>
          <Staff />
          <QRIndex />
        </ProtectedRoute>} />

        {/* A JSX comment */}
        <Route path='*' element={<Error/>} />

        </Routes>
      </AuthContextProvider>  
    </div>
  );
}

export default App;
