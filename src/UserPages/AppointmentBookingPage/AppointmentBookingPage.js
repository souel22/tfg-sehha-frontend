import Header from "./Header/Header";
import SearchBar from "./SearchBar/SearchBar";
import SpecialistCard from "./SpecialistCard/SpecialistCard";
import Footer from "./Footer/Footer";

// Main Page Component
const AppointmentBookingPage = () => {
  return (
    <div>
      <Header />
      <SearchBar />
      <SpecialistCard
        name="Dr. Name and surname"
        specialty="Specialty"
        services="Services"
      />
      {/* Add more SpecialistCard components as needed */}
      <Footer />
    </div>
  );
};

export default AppointmentBookingPage;
