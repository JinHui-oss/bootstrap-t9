import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../Scripts/authContext'
import { Form, Button } from 'react-bootstrap'

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {createUser} = UserAuth();
    const navigate = useNavigate();

    const handlesubmit = async (e) =>{
        e.preventDefault();
        setError(error)
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
        
        <Form onSubmit={handlesubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required/>
        </Form.Group>
    
        <Button variant="primary" type="submit"> Submit </Button>
        </Form>
    </div>
  )
}

export default Signup
