import React from 'react'
import {
    Nav,
    Navbar,
    Container,
    NavDropdown
}from 'react-bootstrap'

function General() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">YECC</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="./Kit"> Kit</Nav.Link>
        <Nav.Link href="./About">About</Nav.Link>
        <Nav.Link href="./Contact">Contact</Nav.Link>
      </Nav>
      <Nav>
        <Nav>
          <NavDropdown title='Login' id="navbarScrollingDropdown">
            <NavDropdown.Item href={`/Signin/Staff`}>Staff</NavDropdown.Item>
            <NavDropdown.Item href={`/Signin`}>Member</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default General
