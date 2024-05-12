import Header from "./Header/Header";
import SpecialistCard from "./SpecialistCard/SpecialistCard";
import Footer from "./Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";


// Main Page Component
const AppointmentBookingPage = () => {

  // we bring all the specialists schedules
  const [specialists, setSpecialists] = useState([]);
  const [specialistsCards, setSpecialistsCards] = useState([]);
  const [user, setUser] = useState("")

  const userId = '65f262e2ead0021324f4730f'


  useEffect(() => {
    // fetch user infromation using the user id 
    const fetchUser = async () => {
      try {
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_USERS_PATH
        const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;
        const url = `${baseUrl}${path}/${userId}`;
        const response = await axios.get(url);
        console.log("user: ", response.data);
        setUser(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    // fetch specialists information
    const fetchSpecialists = async () => {
      try {
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALISTS_PATH
        const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;
        const url = `${baseUrl}${path}`;
        const response = await axios.get(url);
        console.log(response.data);
        setSpecialists(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpecialists();
    fetchUser();
  }, []);

  useEffect(() => {
    if (specialists.length > 0) {
      console.log("specialists ", specialists); // This will log the initial state
      const cards = specialists.map((specialist) => (
        <SpecialistCard
          key={specialist.id}
          name={`Dr. ${specialist.name}`}
          specialities={specialist.specialities}
          specialistId={specialist.id}
          userId={userId}
        />
      ));
      setSpecialistsCards(cards);
      console.log(cards); // Now this will log the correct state
    }
  }, [specialists]);

    // Handler for reserving an appointment
    const handleAppointments = () => {
      // Redirect or perform action to reserve an appointment
      window.location.href = process.env.REACT_APP_USER_APPOINTMENTS_URL; // Update with your actual URL
    };
  
    // Handler for logging out
    const handleLogout = () => {
      // Perform logout operations such as clearing session storage, etc.
      // Then redirect or adjust application state as needed
      window.location.href = process.env.REACT_APP_USER_LOGOUT_URL; // Update with your actual URL
    };

    const handleFilter = (filters) => {
      
    }

  return (
    <div>
      <Header onLogout={handleLogout} onAppointments={handleAppointments} client={`${user.firstName} ${user.lastName}`} />
      <SearchBar specialists={specialists} onFilter={handleFilter()}/>
      {specialistsCards}
      <Footer />
    </div>
  );
};

export default AppointmentBookingPage;
