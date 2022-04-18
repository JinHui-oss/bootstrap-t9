import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../Scripts/authContext'

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {createUser} = UserAuth();
    const navigate = useNavigate();

    const handlesubmit = async (e) =>{
        e.preventDefault();
        setError('')
        try{
            await createUser(email,password)
            navigate('/account');
        }catch(e){
            setError(e.message)
            console.log(e.message)
        }
    }

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <h1 className='text-center text-3xl font-bold'> Sign up to your account </h1>
      <br />
      <p> Already have an account yet? <Link to ='/signin' className='underline'>Sign in.</Link></p>
    
    <form onSubmit={handlesubmit}>
        <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address</label>
            <br />
            <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
        </div>
   
        <div className ='flex flex-col py-2'>
            <label className='py-2 font-medium' >Password</label>
            <br />
            <input onChange={(e) => setPassword(e.target.value)} className= 'border p-3' type="password" />
        </div>
        <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
        Sign Up</button>
        <br />
    </form>
    </div>
  )
}

export default Signup
