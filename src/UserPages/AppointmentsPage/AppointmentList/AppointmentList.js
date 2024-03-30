import AppointmentItem from "../AppointmentItem/AppointmentItem";

// AppointmentList Component
const AppointmentList = ({ appointments, onCancel, onJoin }) => {
 console.log("@AppointmentList: ", appointments);
 
  return (
    <div className="appointment-list">
      {appointments.map((appointment, index) => (
        <AppointmentItem
          key={index}
          appointemntId={appointment.id}
          specialty={appointment.speciality}
          doctorName={appointment.specialist}
          status={appointment.status}
          date={appointment.date}
          time={appointment.duration}
          onCancel={onCancel}
          onJoin={onJoin}
        />
      ))}
    </div>
  );
}

export default AppointmentList;
