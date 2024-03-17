import AppointmentItem from "../AppointmentItem/AppointmentItem";

// AppointmentList Component
const AppointmentList = ({ appointments }) => (
  <div className="appointment-list">
    {appointments.map((appointment, index) => (
      <AppointmentItem
        key={index}
        specialty={appointment.specialty}
        doctorName={appointment.doctorName}
        date={appointment.date}
        time={appointment.time}
      />
    ))}
  </div>
);

export default AppointmentList;
