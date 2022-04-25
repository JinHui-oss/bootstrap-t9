import React from 'react'
import {
    Nav,
    Navbar,
    Container,
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
        <Nav.Link href="./signin">Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default General
