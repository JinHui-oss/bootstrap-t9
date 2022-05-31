import React, { useState, useEffect } from 'react'

import { 
    Link, 
    useNavigate,
} from 'react-router-dom'

import { UserAuth } from '../Scripts/authContext'

import 
{ 
    Form, 
    Button 
} from 'react-bootstrap'

import { db } from '../Database/firebase'
import '../Login/Login.css'

import 
{ 
    doc,
    getDoc,
    collection
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'



function Signin() {
    const MemberCollectionRef = collection(db, "Member");
    const StaffCollectionRef = collection(db, "Staff");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [staff,setStaff] = useState([]);
    const [member,setMember] = useState([]);
    const { signIn } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const membergetdata = async () => {
          const auth = getAuth();
          const user = auth.currentUser;
          if(user !== null){
          
          const t = user.uid;
            
          const docRef = doc(db, "Member", t);
          const docSnap = await getDoc(docRef);
          
          // check for display output
          // console.log(docSnap);
          
          // check condition
          if (docSnap.exists()) 
          {
            // display the output if the record exist 
            // create a variable to store the data output.
            let data =  docSnap.data();
            // console.log(data)
            
            setMember.state = {
              uid : data.uid,
              Role: data.Role,
            }
            
            // reterive the data and stored into a setkit
            setMember(setMember.state)
           
            // check for the display output
            // console.log(setMember.state)
          } 
          else 
          {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }
      };
      membergetdata();
    
      // eslint-disable-next-line 
      }, [MemberCollectionRef])

     

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError(error)

        try{
            const { user } = await signIn(email,password);
            if(user.uid === member.uid){
               navigate('/Member/Index')
            }
            else{
                navigate('/Staff/Dashboard')
            }
        }
        catch(e){
            setError(e.message);
            console.log(e.message);
        }
    }

    return (
    <div className='header'>
        <div className='header-title'>
        <h1> Sign in to your account </h1>
        <br />
        <p> Don't have an member account yet? <Link to ='/Signup_Member' className='underline'>Sign up.</Link></p>
        <p> Don't have an staff account yet? <Link to ='/Signup_Staff' className='underline'>Sign up.</Link></p>
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
        <Button href='./forgotpassword'> Forgot Password? </Button>
        </Form>
       </div>
       
    </div>
)}

export default Signin
