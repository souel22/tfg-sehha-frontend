import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SearchBar from "./SearchBar/SearchBar"; // Make sure this is the path to your modified SearchBar
import AppointmentList from "./AppointmentList/AppointmentList"; // Adjust based on your component

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL 

  useEffect(() => {
    // Define the function to fetch appointments
    const fetchAppointments = async () => {
      try {
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_APPOINTMENTS_PATH;
        const url = baseUrl + path;
        const response = await axios.get(url);
        setAppointments(response.data); // Assuming the API returns an array of appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    // Call the fetch function
    fetchAppointments();
  }, []);

  // This function is called when the SearchBar form is submitted.
  const handleFilter = async (filters) => {
    try {
      console.log(filters)
      const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_APPOINTMENTS_PATH
      const url = baseUrl + path

      // Check if filters values are empty before sending the said filters looping over the filters
      // Send only non empty filters
      const filterKeys = Object.keys(filters);
      for (const key of filterKeys) {
        if (filters[key] === '') {
          delete filters[key];
        }
      }

      const response = await axios.get( url , { params: filters });
      console.log(response.data)
      setAppointments(response.data); // Assuming the API returns the filtered list of appointments
    } catch (error) {
      console.error('Error fetching filtered appointments:', error);
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

//Handle Joining the appointemnt when the join button is clicked
const handleJoin = async (joinUrl) => {
  try {
    // go to path /user/video with a query that contains the joinUrl
    const path = process.env.REACT_APP_USER_VIDEO_URL;
    const url = path + '?joinUrl=' + joinUrl

    // redirect to URL
    window.location.href = url;
  } catch (error) {
    console.error('Error joining', error);
  }
};

  // Handler for reserving an appointment
  const handleReserve = () => {
    // Redirect or perform action to reserve an appointment
    window.location.href = process.env.REACT_APP_USER_RESERVE_URL; // Update with your actual URL
  };

  // Handler for logging out
  const handleLogout = () => {
    // Perform logout operations such as clearing session storage, etc.
    // Then redirect or adjust application state as needed
    window.location.href = process.env.REACT_APP_USER_LOGOUT_URL; // Update with your actual URL
  };

  return (
    <div>
      <Header onReserve={handleReserve} onLogout={handleLogout} client={"Client Name"} />
      <SearchBar onFilter={handleFilter} />
      <AppointmentList appointments={appointments} onCancel={handleCancel} onJoin={handleJoin} />
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
