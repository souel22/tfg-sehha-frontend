import AppointmentItem from "../AppointmentItem/AppointmentItem";

// AppointmentList Component
const AppointmentList = ({ appointments, onJoin, onCancel }) => (
  <div className="appointment-list">
    {appointments.map((appointment, index) => (
      <AppointmentItem
        key={index}
        specialty={appointment.specialty}
        userName={appointment.userName}
        date={appointment.date}
        duration={appointment.duration}
        onJoin={onJoin}
        onCancel={onCancel}
      />
    ))}
  </div>
);

export default AppointmentList;
