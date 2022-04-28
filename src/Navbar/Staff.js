import React from 'react'
import {
    Nav,
    Navbar,
    Container,
}from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';
import { UserAuth } from "../Scripts/authContext" 


function Staff() {
  const { logout } = UserAuth();
  const naviagte = useNavigate();

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
        <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/Kit">Kit</Nav.Link>
        <Nav.Link href="/QRIndex">KitQR</Nav.Link>
        <Nav.Link href="/Account">Account</Nav.Link>
        <Nav.Link href="/Report">Report</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">Notifications</Nav.Link>
        <Nav.Link href="#deets">Announcement</Nav.Link>
        <Nav.Link onClick={handlelogout} >LogOut</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Staff
