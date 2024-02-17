import Header from "./Header/Header";
import SearchBar from "./SearchBar/SearchBar";
import AppointmentList from "./AppointmentList/AppointmentList";
import Footer from "./Footer/Footer";

const AppointmentBookingPage = () => {
  const appointments = [
    {
      specialty: "Speciality appointment",
      doctorName: "With Dr. Name Surname",
      date: "DATE: DD/MM/YYYY",
      time: "HH:mm - HH:mm",
    },
  ];

  return (
    <div className="appointment-booking-page">
      <Header />
      <SearchBar />
      <AppointmentList appointments={appointments} />
      <Footer />
    </div>
  );
};

export default AppointmentBookingPage;
