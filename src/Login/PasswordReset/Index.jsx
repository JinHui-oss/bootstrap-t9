import React, {useState} from 'react'

import 
{ 
    Form, 
    Button,
} from 'react-bootstrap'

import '../../Login/Login.css'

import { 
  useNavigate,
} from 'react-router-dom'

import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

      const handleSubmit = async(e) =>{
      e.preventDefault();
      setError(error)

      try{
        sendPasswordResetEmail(auth, email)
        .then(() => {
        // Password reset email sent!
         // ..
         console.log('y')
         navigate('/signin')
        })
        
      }
      catch(e){
          // const errorCode = e.code;
          const errorMessage = e.message;
          console.log(errorMessage)
      }
    }

  return (
    <div className='header'>
    <div className='header-title'>
    <h1> Reset Password </h1>
    <p>Enter your email before resetting password</p>
    <br />
  
    </div>
   <div className='body-content'>
   <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
    </Form.Group>

    <Button variant="primary" type="submit"> Submit </Button>
    <br/>
    <br/>
    </Form>
   </div>
   
</div>
  
)}

export default ForgotPassword
