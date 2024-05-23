import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import './NavBar.css';  // Import the custom CSS
// import logo from public/sehha_logo
import logo from "./sehha_logo.png"

function NavBar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
      <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="SAHHA logo"
          />
          <span className="ml-2">SEHHA</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#about" className="custom-nav-link">ABOUT</Nav.Link>
            <Nav.Link href="#services" className="custom-nav-link">SERVICES</Nav.Link>
            <Nav.Link href="#contact" className="custom-nav-link">CONTACT</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown" className="custom-nav-link">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Button variant="primary" href="#signin" className="custom-signin-button">SIGN IN</Button>
            <Button variant="outline-secondary" href="#login" className="custom-login-button">log in</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
