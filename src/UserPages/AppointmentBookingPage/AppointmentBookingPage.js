import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import Header from "./Header/Header";
import SpecialistCard from "./SpecialistCard/SpecialistCard";
import Footer from "./Footer/Footer";
import SearchBar from "./SearchBar/SearchBar";
import "./AppointmentBookingPage.css";

// Main Page Component
const AppointmentBookingPage = () => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const userId = '65f262e2ead0021324f4730f';

  useEffect(() => {
    // Fetch user information using the user id 
    const fetchUser = async () => {
      try {
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_USERS_PATH;
        const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;
        const url = `${baseUrl}${path}/${userId}`;
        const response = await axios.get(url);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
      }
    };

    // Fetch specialists information
    const fetchSpecialists = async () => {
      try {
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALISTS_PATH;
        const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;
        const url = `${baseUrl}${path}`;
        const response = await axios.get(url);
        setSpecialists(response.data);
      } catch (error) {
        console.error("Error fetching specialists data:", error);
        setError("Failed to load specialists data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchSpecialists();
  }, []);

  const handleAppointments = () => {
    // Redirect or perform action to reserve an appointment
    window.location.href = process.env.REACT_APP_USER_APPOINTMENTS_URL; // Update with your actual URL
  };

  const handleLogout = () => {
    // Perform logout operations such as clearing session storage, etc.
    window.location.href = process.env.REACT_APP_USER_LOGOUT_URL; // Update with your actual URL
  };

  const handleFilter = (filters) => {
    // Implement filter logic here
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      <Header onLogout={handleLogout} onAppointments={handleAppointments} client={`${user.firstName} ${user.lastName}`} />
      <SearchBar specialists={specialists} onFilter={handleFilter} />
      <Container>
        <Row>
          {specialists.map((specialist) => (
            <Col md={6} lg={4} key={specialist.id} className="mb-4">
              <SpecialistCard
                name={`Dr. ${specialist.name}`}
                specialities={specialist.specialities}
                specialistId={specialist.id}
                userId={userId}
                profileImage={specialist.profileImage}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default AppointmentBookingPage;
