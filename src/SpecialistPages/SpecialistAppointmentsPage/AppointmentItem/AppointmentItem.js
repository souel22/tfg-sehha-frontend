// AppointmentItem Component
const AppointmentItem = ({appointemntId, specialty, userName, date, duration, status, joinUrl, onJoin, onCancel }) => {

    // Handle the cancel button click event
    const handleCancelClick = (appointemntId) => {
      onCancel(appointemntId);
    };

  //handle the join button click event
  const handleJoinClick = (joinUrl) => {
    onJoin(joinUrl);
  };

  return (
    <div className="appointment-item">
      <div className="appointment-info">
        <div className="specialty">{specialty}</div>
        <div className="user-name">{userName}</div>
      </div>
      <div className="appointment-time">
        <div className="date">{date}</div>
        <div className="duration">{duration}</div>
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
