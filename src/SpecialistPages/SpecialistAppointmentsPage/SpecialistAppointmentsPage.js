import Header from "./Header/Header";
import SearchBar from "./SearchBar/SearchBar";
import AppointmentList from "./AppointmentList/AppointmentList";
import Footer from "./Footer/Footer";
import "./style.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

// Main Page Component
const SpecialistAppointmentsPage = () => {
  const [appointments, setAppointments] = useState([
    // This data will come from your state or props
    // Example appointment
    {
      specialty: "Speciality appointment",
      userName: "With Name Surname",
      date: "DATE: DD/MM/YYYY",
      time: "HH:mm - HH:mm",
    },
    // More appointments...

  ]);
  const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL

  useEffect(() => {
    // Define the function to fetch appointments
    const fetchAppointments = async () => {
      try {
        const specialistId = '65e642d785477a61386469a0'
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_SCHEDULE_PATH.replace('<specialistId>', specialistId);
        const url = baseUrl + path;
        const response = await axios.get(url);

        const appointments = response.data.slots.map(slot => {
          return slot.appointment ? {
            appointmentId: slot.appointment.id,
            specialty: slot.appointment.speciality.name,
            userName: slot.appointment.user.firstName + " " + slot.appointment.user.lastName,
            // use start and end time to calculate date and time (as the difference of the start and end times) with a format like ""2024-12-23T12:20:59.000Z"
            date: `${slot.date} ${slot.time}`,
            duration: slot.duration,
            joinUrl: slot.appointment.joinUrl,
            status: slot.appointment.status,

          } : {
            date: `${slot.date} ${slot.time}`,
            duration: slot.duration,
          };
        });

        console.log(appointments);
        setAppointments(appointments); // Assuming the API returns an array of appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  //Handle Joining the appointemnt when the join button is clicked
  const handleJoin = async (joinUrl) => {
    try {
      // go to path /specialist/video with a query that contains the joinUrl
      const path = process.env.REACT_APP_SPECIALIST_VIDEO_URL;
      const url = path + '?joinUrl=' + joinUrl

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
    // Perform logout operations such as clearing session storage, etc.
    // Then redirect or adjust application state as needed
    window.location.href = process.env.REACT_APP_SPECIALIST_LOGOUT_URL; // Update with your actual URL
  };

  const handleFilter = async (filters) => {

    console.log(filters)
    try {
      const specialistId = '65e642d785477a61386469a0'
      const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_SCHEDULE_PATH.replace('<specialistId>', specialistId);
      const url = baseUrl + path;

      const filterKeys = Object.keys(filters);
      for (const key of filterKeys) {
        if (filters[key] === '') {
          delete filters[key];
        }
      }

      const response = await axios.get(url, { params: filters });

      const appointments = response.data.slots.map(slot => {
        return {
          appointmentId: slot.appointment.id,
          specialty: slot.appointment.speciality.name,
          userName: slot.appointment.user.firstName + " " + slot.appointment.user.lastName,
          // use start and end time to calculate date and time (as the difference of the start and end times) with a format like ""2024-12-23T12:20:59.000Z"
          date: `${slot.date} ${slot.time}`,
          duration: slot.duration,
          joinUrl: slot.appointment.joinUrl,
          status: slot.appointment.status,

        };
      });

      console.log(appointments);
      setAppointments(appointments); // Assuming the API returns an array of appointments
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }

  }

  return (
    <div className="staff-appointments-page">
      <Header onScheduleAppointment={handleScheduleAppointment} onLogout={handleLogout} specialist={"Specialist Name"} />
      <SearchBar onFilter={handleFilter} />
      <AppointmentList onJoin={handleJoin} onCancel={handleCancel} appointments={appointments} />
      <Footer />
    </div>
  );
};


export default SpecialistAppointmentsPage;
