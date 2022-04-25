import React, {useState} from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { UserAuth } from '../Scripts/authContext'
import { Form, Button } from 'react-bootstrap'


function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = UserAuth();
    const naviagte = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('')
        try{
            await signIn(email,password);
            naviagte('/dashboard');
        }catch(e){
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
    <div className='header'>
    <h1 className='header-title'> Sign in to your account </h1>
    <br />
    <p> Don't have an account yet? <Link to ='/signup' className='underline'>Sign up.</Link></p>
  
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
    <Button href='../src/Login/forgotpassword'> Forgot Password? </Button>
    </Form>
</div>
)}

export default Signin
