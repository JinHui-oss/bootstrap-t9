// React 
import React, { useEffect, useState} from "react";
import { Route, Routes } from 'react-router-dom';

// Firebase Database
import { AuthContextProvider } from "./Scripts/authContext";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ProtectedRoute from "./ProtectedRoute";

// Navbar
import General from "../src/Navbar/General"
import Staff from "../src/Navbar/Staff"

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
import GeneralLayout from "./Navbar/GeneralLayout";



function App() {
    
    // get data from the firebase/auth
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log('y');
        } else {
        // User is signed out
        // ..,
          console.log('n')
        }
      })
    })     
       
    // check the display output
    console.log(user);

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
        
        {/* A JSX comment */}
        <Route path='*' element={<Error/>} />

        </Routes>
      </AuthContextProvider>  
    </div>
  );
}

export default App;
