import React from "react";
import { Route, Routes } from 'react-router-dom';
import Signup from "./Login/Signup";
import Home from "./General/Index";
import Signin from "./Login/Signin";
import Profile from "./Staff/Account/Profile";
import Index from "./Staff/Index";
import Error from "./General/Message/Error";
import { AuthContextProvider } from "./Scripts/authContext";
import ProtectedRoute from "./ProtectedRoute";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Navbar
import General from "./Navbar/General";
import Staff from "./Navbar/Staff";


function App() {
  
  const auth = getAuth();
  const user = auth.currentUser;
  //console.log(user);
 
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
     console.log('yes');
     
      // ...
    } else {
      // User is signed out
      // ...
      console.log('no');
    
    }
  })
   
      return(
        <div className="App">
            <AuthContextProvider>
            <Routes>
              
              <Route path ='/' element={<Home/>} />
              <Route path="/signin" element={<Signin/>} />
              <Route path='/signup' element={<Signup/>} />
              
              <Route path='/account' element={<ProtectedRoute>
              <Staff />
              <Profile />  
              </ProtectedRoute>} />

              <Route path='/dashboard' element={<ProtectedRoute>
              <Staff />
              <Index />
              </ProtectedRoute>} />

              <Route path='*' element={<Error/>} />
            </Routes>
            </AuthContextProvider>  
          </div>
        );
    }

export default App;
