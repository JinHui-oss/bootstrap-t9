import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../Scripts/authContext'
import { Form, Button } from 'react-bootstrap'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../Database/firebase';
import '../../Login/Login.css'

function SignUp_Member() {
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
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
              Gender: gender,
              PhotoUrl: "https://cdn-icons-png.flaticon.com/512/709/709722.png",
              PhoneNumber: phonenumber,
              Role: pass,
              uid: user.uid
          })
          navigate(`/Member/Index`)
      }catch(e){
          setError(e.message)
          console.log(e.message)
      }
  }

return (
  <div className='signup-body-content'>
      <div className='signup body-title'>
        <h1> Sign up to your account </h1>
        <br />
        <p> Already have an account yet? <Link to ='/Signin' className='underline'>Sign in.</Link></p>
      </div>
    <div className='signup-body-form'>
    <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formbasicgender" onChange={(e) => setGender(e.target.value)}>
          <Form.Label>Gender</Form.Label>
          <Form.Select>
                <option onChange={(e) => setGender(e.target.value)}>Select a Gender</option>
                <option onChange={(e) => setGender(e.target.value)}>Male</option>
                <option onChange={(e) => setGender(e.target.value)}>Female</option>
            </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formcontactinfo">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control onChange={(e) => setPhoneNumber(e.target.value)} type="number" placeholder="12345678" required/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" required/>
      </Form.Group>
  
      <Button variant="primary" type="submit"> Submit </Button>
      </Form>
    </div> 
  </div>
)
}

export default SignUp_Member
