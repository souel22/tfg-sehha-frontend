// Header Component
const Header = ({specialist, onScheduleAppointment, onLogout}) => {
// handle schedule appointment button click
  const handleScheduleAppointment = () => {
    onScheduleAppointment();
  }

  // handle logout button click
  const handleLogout = () => {
    onLogout();
  }
  
  return (
  <div className="header">
    <div className="logo">SAHHA LOGO</div>
    <div className="nav-buttons">
      <button 
       onClick={() => handleScheduleAppointment()}
      className="schedule-button">SCHEDULE APPOINTMENTS</button>
      <div className="user-info">{specialist}</div>
      <button
      onClick={() => handleLogout()}
      className="logout-button">log out</button>
    </div>
  </div>
);
}
export default Header;
