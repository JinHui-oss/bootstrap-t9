import React, { useState } from 'react'

import { 
    Link, 
    useNavigate
} from 'react-router-dom'

import { UserAuth } from '../Scripts/authContext'

import 
{ 
    Form, 
    Button 
} from 'react-bootstrap'

import { db } from '../Database/firebase'

import 
{ 
    doc,
    getDoc
} from 'firebase/firestore'



function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [Member,setMember] = useState([]);
    const { signIn } = UserAuth();
    const naviagte = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError(error)
      
        try{
            const { user } = await signIn(email,password);
            
            const docRef = doc(db, "Staff", user.uid);
            const docSnap = await getDoc(docRef);
            console.log(docSnap)

            // check condition
            if (docSnap.exists()) 
            {
              // display the output if the record exist 
              // create a variable to store the data output.
              let data =  docSnap.data();
              console.log(data)
              
              setMember.state ={
                uid : data.uid,
                Role: data.Role
              }
              // reterive the data and stored into a setkit
              setMember(setMember.state)
             
              // check for the display output
              //console.log(setKit.state)
            }
            if(Member.Role === "Member")
            {
                naviagte('/index');
                console.log(Member.Role)
                console.log('you have logged in')
            }
            else if(Member.Role === "Staff"){
                naviagte('/dashboard')
                console.log('hello')
            } 
            else 
            {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
        }catch(e){
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
    <div className='header'>
        <h1 className='header-title'> Sign in to your account </h1>
        <br />
        <p> Don't have an member account yet? <Link to ='/Signup_Member' className='underline'>Sign up.</Link></p>
        <p> Don't have an staff account yet? <Link to ='/Signup_Staff' className='underline'>Sign up.</Link></p>
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
        <Button href='./forgotpassword'> Forgot Password? </Button>
        </Form>
    </div>
)}

export default Signin
