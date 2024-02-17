import Header from "./Header/Header";
import ConsultationHeader from "./ConsultationHeader/ConsultationHeader";
import ConsultationOptions from "./ConsultationOptions/ConsultationOptions";
import Footer from "./Footer/Footer";

// Main Page Component
const ConsultationPage = () => (
  <div className="consultation-page">
    <Header />
    <ConsultationHeader specialty="Speciality" doctorName="Name Surname" />
    <ConsultationOptions />
    <Footer />
  </div>
);

export default ConsultationPage;
