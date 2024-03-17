import Header from "./Header";
import SearchBar from "./SearchBar";
import AppointmentList from "./AppointmentList/AppointmentList";
import Footer from "./Footer";
import "./style.css";

const appointments = [
  // This data will come from your state or props
  // Example appointment
  {
    specialty: "Speciality appointment",
    doctorName: "With Name Surname",
    date: "DATE: DD/MM/YYYY",
    time: "HH:mm - HH:mm",
  },
  // More appointments...
];
// Main Page Component
const SpecialistAppointmentsPage = () => {
  return (
    <div className="staff-appointments-page">
      <Header />
      <SearchBar />
      <AppointmentList appointments={appointments} />
      <Footer />
    </div>
  );
};

export default SpecialistAppointmentsPage;
