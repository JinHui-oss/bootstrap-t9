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
import { getAuth, signOut } from 'firebase/auth';

function Staff() {
  const [staff, setStaff] = useState([]);
  const StaffCollectionRef = collection(db, "Staff");
 
  const { logout } = UserAuth();
  // create variable to reterive the specifc document id

  const naviagte = useNavigate();

  useEffect(() => {
    const getdata = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if(user !== null){
      
      const t = user.uid;
        
      const docRef = doc(db, "Staff", t);
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
        
        setStaff.state = {
          uid : data.uid,
          Name: data.Name,
          PhotoUrl : data.PhotoUrl,
          Email: data.Email,
          Password: data.Password,
          Role: data.Role,
          CreatedAt: data.CreatedAt
        }
        
        // reterive the data and stored into a setkit
        setStaff(setStaff.state)
       
        // check for the display output
        // console.log(setMember.state)
        
      } 
      else 
      {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        alert('Returning to the staff sign in page for no authorised credentials from Yong En Care Centre')
        await signOut(auth)
        naviagte("/Signin/Staff")
      }
    };
  }
    getdata();

  // eslint-disable-next-line 
  }, [StaffCollectionRef])

  const handlelogout= async() =>{
    try{
        await logout()
        naviagte('/Signin/Staff')
        console.log('you are logged out');
    }catch(e){
        console.log(e.message)
    }
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/Staff/Dashboard">YCC-DDC</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/Staff/Dashboard">Dashboard</Nav.Link>
        <Nav className="me-auto">
          <NavDropdown title="Dementia Kit" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/Staff/Kit">Kit</NavDropdown.Item>
            <NavDropdown.Item href="/Staff/QRIndex">QR Code</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="me-auto">
          <NavDropdown title="Member" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/Staff/MemberList">Member List</NavDropdown.Item>
            <NavDropdown.Item href="/Staff/Confirmed">Pending</NavDropdown.Item>
            <NavDropdown.Item href="/Staff/Borrowed">Borrowed</NavDropdown.Item>
            <NavDropdown.Item href="/Staff/Collection">Collection</NavDropdown.Item>
            <NavDropdown.Item href="/Staff/Cancellation">Cancellation</NavDropdown.Item>
            <NavDropdown.Item href="/Staff/Returned">Returned</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="me-auto">
          <NavDropdown title="Staff" id="navbarScrollingDropdown">
            <NavDropdown.Item href="/Staff/StaffList">Staff List</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Nav>
      <Nav>
        <Nav>
          <NavDropdown title={`Welcome ${staff.Name}`} id="navbarScrollingDropdown">
            <NavDropdown.Item href={`/Staff/Account/${staff.uid}`}>Profile</NavDropdown.Item>
            <NavDropdown.Item href={`/Staff/Account/Security/${staff.uid}`}>Security</NavDropdown.Item>
           
            <NavDropdown.Item onClick={handlelogout}>LogOut</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Staff
