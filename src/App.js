// React 
import React from "react";
import { Route, Routes } from 'react-router-dom';

// Firebase Database
import { AuthContextProvider } from "./Scripts/authContext";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ProtectedRoute from "./ProtectedRoute";

// Navbar
import General from "./Navbar/General";
import Staff from "./Navbar/Staff";

// General Page
import Home from "./General/Index";
import Error from "./General/Message/Error";

// Account Signin & out inteface
import Signin from "./Login/Signin";
import Signup from "./Login/Signup";

// Staff Interface
import Profile from "./Staff/Account/Profile";
import Index from "./Staff/Index";

// Staff & Kit Interface
import Kit from "./Staff/Kit/Index";
import AddKit from "./Staff/Kit/AddKit";



function App() {

    // get data from the firebase/auth
    const auth = getAuth();
  
    // check the correct display output
    // console.log(user);
 
    onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // check the correct display output if condition is met 
      console.log('yes');
      //
    } else {
      // check the incorrect display output if condition is not met
      console.log('no');
    
    }
  })
  return(
    <div className="App">
      <AuthContextProvider>
      <Routes>
         {/* A JSX comment */}      
        <Route path ='/' element={<Home/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path='/signup' element={<Signup/>} />
        
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
         <Route path='/Kit/AddKit' element={<ProtectedRoute>
          <Staff />
          <AddKit />
        </ProtectedRoute>} />
        
        {/* A JSX comment */}
        <Route path='*' element={<Error/>} />
        </Routes>
      </AuthContextProvider>  
    </div>
  );
}

export default App;
