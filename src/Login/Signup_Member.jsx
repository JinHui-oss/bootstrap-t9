import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../Scripts/authContext'
import { Form, Button } from 'react-bootstrap'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../Database/firebase';

function SignUp_Member() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // eslint-disable-next-line
  const [user,setUser] = useState('');
 
  const { createUser } = UserAuth();
 
  const navigate = useNavigate();

  const handlesubmit = async (e) =>{
      e.preventDefault();
      let date = new Date();
      let pass = "Member";

      setError(error)
      try{
          const { user } = await createUser(email,password,pass)
          setUser(user);
          
          await setDoc(doc(db,"Member",user.uid), {
              Name: name,
              Email: email,
              Password: password,
              CreatedAt: date.toDateString(),
              PhotoUrl: "https://cdn-icons-png.flaticon.com/512/709/709722.png",
              Role: pass,
              uid: user.uid
          })
          navigate(`/Member/Loan`)
      }catch(e){
          setError(e.message)
          console.log(e.message)
      }
  }

return (
  <div className='max-w-[700px] mx-auto my-16 p-4'>
      <h1 className='text-center text-3xl font-bold'> Sign up to your account </h1>
      <br />
      <p> Already have an account yet? <Link to ='/Signin' className='underline'>Sign in.</Link></p>
      <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" required/>
      </Form.Group>
  
      <Button variant="primary" type="submit"> Submit </Button>
      </Form>
  </div>
)
}

export default SignUp_Member
