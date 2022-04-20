import React from 'react'
import { useNavigate } from 'react-router-dom';
import {UserAuth} from "../../Scripts/authContext" 

function Profile() {
  const {user, logout} = UserAuth();
  const naviagte = useNavigate();
  
  const handlelogout= async() =>{
    try{
        await logout()
        naviagte('/signin')
        console.log('you are logged out');
    }catch(e){
        console.log(e.message)
    }
  }

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>User Email:{user && user.email}</p>

      <button onClick={handlelogout} className='border px-6 py-2 my-4'>LogOut</button>
    </div>
  )
}

export default Profile
