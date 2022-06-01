import React, { useState, useEffect } from 'react'
import {
    Nav,
    Navbar,
    Container,
    NavDropdown
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
      <Navbar.Brand href="/Member/Kit">YECC</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link href={`/Member/Kit`}>Kit</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <NavDropdown title="Loan" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/Member/CurrentLoan">Current Loan</NavDropdown.Item>
            <NavDropdown.Item href="/Member/PastLoan">Past Loan</NavDropdown.Item>
          </NavDropdown>
      
        </Nav>
        <Nav>
          <Nav.Link href={`/Member/Kit`}>Notification</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title={`Welcome ${member.Name}`} id="navbarScrollingDropdown">
            <NavDropdown.Item href={`/Member/Profile/${member.uid}`}>Profile</NavDropdown.Item>
            <NavDropdown.Item href={`/Member/Profile/${member.uid}`}>Security</NavDropdown.Item>
            <NavDropdown.Item onClick={handlelogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
    )
  }

export default Member
