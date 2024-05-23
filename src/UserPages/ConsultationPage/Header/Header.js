import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import './Header.css';  // Import the custom CSS
import logo from './sehha_logo.png';  // Adjust the path to your logo image

// Header Component
const Header = ({onReserve, onAppointments, onLogout, client}) => {
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
          <Nav className="ml-auto d-flex align-items-center w-100 justify-content-between">
            <div className="page-title mx-auto">{client}</div>
            <div className="nav-buttons d-flex">
              <Button variant="primary" className="appointments-button mx-2" onClick={onReserve}>RESERVE</Button>
              <Button variant="primary" className="appointments-button mx-2" onClick={onAppointments}>APPOINTMENTS</Button>
              <Button variant="outline-secondary" className="logout-button mx-2" onClick={onLogout}>LOG OUT</Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
  
  
//   (
//   <div className="header">
//     <div className="logo">SAHHA LOGO</div>
//     <div className="nav-buttons">
//       <button className="reserve-button">RESERVE</button>
//       <button className="appointments-button">APPOINTMENTS</button>
//       <div className="user-info">SURNAME, NAME</div>
//       <button className="logout-button">log out</button>
//     </div>
//   </div>
// );

export default Header;
