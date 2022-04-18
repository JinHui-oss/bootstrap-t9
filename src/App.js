import React from "react";
import { Route, Routes } from 'react-router-dom';
import Signup from "./Login/Signup";
import Home from "./General/Home";
import Signin from "./Login/Signin";
import Profile from "./Staff/Profile";
import Error from "./Error";
import { AuthContextProvider } from "./Scripts/authContext";
import ProtectedRoute from "./ProtectedRoute";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path ='/' element={<Home/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/account' element={<ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </AuthContextProvider>
    </div>
  );
}

export default App;
