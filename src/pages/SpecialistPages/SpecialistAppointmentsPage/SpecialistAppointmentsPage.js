import Header from "./Header/Header";
import SearchBar from "./SearchBar/SearchBar";
import AppointmentList from "./AppointmentList/AppointmentList";
import Footer from "./Footer/Footer";
import "./style.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLogout } from '../../../hooks/useLogout';


// Main Page Component
const SpecialistAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [specialistName, setSpecialistName] = useState("")
  const [logout] = useLogout();

  const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL
  const specialist = '65e642d785477a61386469a0'
  const sortPopulated = 'slot.startTime'

  useEffect(() => {
    // Define the function to fetch appointments
    const fetchAppointments = async () => {
      try {
        // path to get appointments for a specialist
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_APPOINTMENTS_PATH
        const url = baseUrl + path + `?specialist=${specialist}&sortPopulated=${sortPopulated}`;

        // path to get specialities 
        const path2 = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_INFO_PATH.replace('<specialistId>', specialist)
        const url2 = baseUrl + path2;

        const response = await axios.get(url);
        setAppointments(response.data); // Assuming the API returns an array of appointments
        // Extracting users
        setUsers(response.data.map(appointment => appointment.user));

        const response2 = await axios.get(url2);
        // Extract names and specialities 
        // Extracting specialities
        setSpecialities(response2.data.specialities);
        setSpecialistName(response2.data.name)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  //Handle Joining the appointemnt when the join button is clicked
  const handleJoin = async (appointmentId) => {
    try {
      // go to path /specialist/video with a query that contains the joinUrl
      const path = process.env.REACT_APP_SPECIALIST_VIDEO_URL;
      const url = path + '?appointment=' + appointmentId

      // redirect to URL
      window.location.href = url;
    } catch (error) {
      console.error('Error joining', error);
    }
  };

  // Handle function to cancel appointment when cancel button is clicked
  const handleCancel = async (appointmentId) => {
    try {
      const path = `${process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_APPOINTMENTS_PATH}/${appointmentId}`
      const url = baseUrl + path

      const response = await axios.delete(`${url}`);
      console.log("cancel response: ", response)
      //setAppointments(response.data); // Assuming the API returns the filtered list of appointments
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  // Handler for reserving an appointment
  const handleScheduleAppointment = () => {
    // Redirect or perform action to schedule an appointment
    window.location.href = process.env.REACT_APP_SPECIALIST_SCHEDULE_APPOINTMENT_URL; // Update with your actual URL
  };

  // Handler for logging out
  const handleLogout = () => {
    logout()
  };

  const handleFilter = async (filters) => {

    console.log(filters)
    try {
        // path to get appointments for a specialist
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_APPOINTMENTS_PATH
        const url = baseUrl + path + `?specialist=${specialist}&sortPopulated=${sortPopulated}`;

      const filterKeys = Object.keys(filters);
      for (const key of filterKeys) {
        if (filters[key] === '') {
          delete filters[key];
        }
      }

      const response = await axios.get(url, { params: filters });

      setAppointments(response.data); // Assuming the API returns an array of appointments
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }

  }

  return (
    <div className="staff-appointments-page">
      <Header onScheduleAppointment={handleScheduleAppointment} onLogout={handleLogout} specialist={"Dr. " + specialistName} />
      <SearchBar onFilter={handleFilter} specialities={specialities} users={users}/>
      <AppointmentList onJoin={handleJoin} onCancel={handleCancel} appointments={appointments} />
      <Footer />
    </div>
  );
};


export default SpecialistAppointmentsPage;
