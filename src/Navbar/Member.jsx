import React, { useState, useEffect } from 'react'
import {
    Nav,
    Navbar,
    Container,
}from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';

//
import { UserAuth } from "../Scripts/authContext" 

// firebase inital setup
import { db } from '../Database/firebase';

//
import { 
  collection,
  getDoc,
  doc
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

function Member() {
    const [member, setMember] = useState([]);
    const MemberCollectionRef = collection(db, "Member");
   
    const { logout } = UserAuth();
    // create variable to reterive the specifc document id
  
    const naviagte = useNavigate();
  
    useEffect(() => {
      const getdata = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if(user !== null){
        
        const memberid = user.uid;
          
        const docRef = doc(db, "Member", memberid);
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
            Name: data.Name,
            PhotoUrl : data.PhotoUrl,
            Email: data.Email,
            Password: data.Password,
            Role: data.Role,
            CreatedAt: data.CreatedAt
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
      };
    }
      getdata();
  
    // eslint-disable-next-line 
    }, [MemberCollectionRef])
  
    const handlelogout= async() =>{
      try{
          await logout()
          naviagte('/Signin')
          console.log('you are logged out');
      }catch(e){
          console.log(e.message)
      }
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="/dashboard">YECC</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/Member/Loan">Loan</Nav.Link>
          <Nav.Link href={`/Member/Profile/${member.uid}`}>Account</Nav.Link>
          <Nav.Link href="/Report">Search</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link onClick={handlelogout} >LogOut</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }

export default Member
