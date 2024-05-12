import AppointmentItem from "../AppointmentItem/AppointmentItem";

// AppointmentList Component
const AppointmentList = ({ appointments, onJoin, onCancel }) => {

  console.log("apps: ", appointments);
  return (
    <div className="appointment-list">
      {appointments.map((appointment, index) => (
        <AppointmentItem
          key={index}
          specialty={appointment.speciality.name}
          userName={appointment.user.firstName + " " + appointment.user.lastName}
          date={appointment.date}
          duration={appointment.duration}
          onJoin={onJoin}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}

export default AppointmentList;
