import "./Header.css"

// Header Component
const Header = ({ onReserve, onLogout, client }) => (
  <div className="header">
    <div className="logo">SAHHA LOGO</div>
    <div className="page-title">{client} - My appointments</div>
    <div className="nav-buttons">
      <button className="reserve-button" onClick={onReserve}>RESERVE AN APPOINTMENT</button>
      <button className="logout-button" onClick={onLogout}>log out</button>
    </div>
  </div>
);

export default Header;
