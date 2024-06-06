import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import './Header.css';  // Import the custom CSS

// Header Component
const Header = ({specialist, onScheduleAppointment, onLogout}) => {
  
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
      <Navbar.Brand href={process.env.REACT_APP_HOMEPAGE} className="d-flex align-items-center">
          <img
            src= {`${process.env.PUBLIC_URL}/images/sehha_logo.png`}
            className="d-inline-block align-top"
            alt="SAHHA logo"
            style={{ width: '30%', height: 'auto' }}
          />
          <span className="ml-2">SEHHA</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex align-items-center w-100 justify-content-between">
            <div className="page-title mx-auto">{specialist}</div>
            <div className="nav-buttons d-flex">
              <Button variant="primary" className="appointments-button mx-2" onClick={onScheduleAppointment}>SCHEDULE APPOINTMENTS</Button>
              <Button variant="outline-secondary" className="logout-button mx-2" onClick={onLogout}>LOG OUT</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
