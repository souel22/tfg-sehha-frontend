// AppointmentItem Component
const AppointmentItem = ({ specialty, doctorName, date, time }) => (
  <div className="appointment-item">
    <div className="appointment-info">
      <div className="specialty">{specialty}</div>
      <div className="doctor-name">{doctorName}</div>
    </div>
    <div className="appointment-time">
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </div>
    <div className="appointment-actions">
      <button className="join-button">join</button>
      <button className="cancel-button">cancel</button>
    </div>
  </div>
);

export default AppointmentItem;
