import "./AppointmentItem.css"

// AppointmentItem Component
const AppointmentItem = ({ appointemntId, specialty, doctorName, status, date, time, joinUrl, onCancel, onJoin }) => {
  // Handle the cancel button click event
  const handleCancelClick = (appointemntId) => {
    onCancel(appointemntId);
  };

  //handle the join button click event
  const handleJoinClick = (joinUrl) => {
    onJoin(joinUrl);
  };
  console.log("speciality: ", specialty);
  console.log(doctorName);


  return (
    <div className="appointment-item">
      <div className="appointment-info">
        <div className="specialty">{specialty}</div>
        <div className="doctor-name">Dr. {doctorName}</div>
      </div>
      <div className="appointment-time">
        <div className="date">{date}</div>
        <div className="time">{time}</div>
      </div>
      <div className="appointment-actions">
        {/* Conditional rendering for the join button based on status */}
        {status !== 'cancelled' && (
          <button className="join-button" onClick={() => handleJoinClick(joinUrl)}>Join</button>
        )}
        <button
          className="cancel-button"
          onClick={() => handleCancelClick(appointemntId)}
          style={{ backgroundColor: status === 'cancelled' ? 'grey' : '', cursor: status === 'cancelled' ? 'not-allowed' : '' }}
          disabled={status === 'cancelled'} // This makes the button not clickable when the status is 'cancelled'
        >
          Cancel
        </button>

      </div>
    </div>
  )

};

export default AppointmentItem;
