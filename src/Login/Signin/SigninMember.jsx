import React, { useState } from 'react'

import { 
    Link, 
    useNavigate,
} from 'react-router-dom'

import { UserAuth } from '../../Scripts/authContext'

import 
{ 
    Form, 
    Button,
    Alert, 
} from 'react-bootstrap'

import { db } from '../../Database/firebase'
import '../../Login/Login.css'

import 
{ 
  doc,
  getDoc,
} from 'firebase/firestore'

import '../Login.css'


function SigninMember() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const { signIn } = UserAuth();
    const navigate = useNavigate();
   
      const handleSubmit = async(e) =>{
        e.preventDefault();
        setError(error)
        
        try{
          const {user} = await signIn(email,password);
          // console.log(user)
          if(user) {
            
          const data = user.uid;
          const docRef = doc(db, "Member", data);
          const docSnap = await getDoc(docRef);
          let data1 =  docSnap.data();

          console.log(data1)

          if(data1.Role === 'Member')
            {
              console.log('y')
              navigate("/Member/Kit")
            }
          }
        }
        catch(e){
          setError(e.message);
        }
    }


    return (
    <div className='header'>
        <div className='header-title'>
        <h1> Sign in to a Member account </h1>
        <br />
        <p> Don't have an member account yet? <Link to ='/Signup_Member' className='underline'>Sign up.</Link></p>
        <p>{error}</p>
        </div>
       <div className='body-content'>
       <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>
    
        <Button variant="primary" type="submit"> Submit </Button>
        <br/>
        <br/>
        <Button href='/forgotpassword' className='forgotbutton'> Forgot Password? </Button>
        </Form>
       </div>
       
    </div>
    
)}
    
export default SigninMember
