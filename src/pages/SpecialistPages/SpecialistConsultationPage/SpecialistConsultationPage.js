import React, { useState, useEffect, useRef } from 'react';
import Header from "./Header/Header";
import ConsultationHeader from "./ConsultationHeader/ConsultationHeader";
import ConsultationOptions from "./ConsultationOptions/ConsultationOptions";
import Footer from "./Footer/Footer";
import io from 'socket.io-client';
import './SpecialistConsultationPage.css';
import { useLocation } from 'react-router-dom';
import { useLogout } from '../../../hooks/useLogout';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SpecialistConsultationPage = () => {
  const query = useQuery();
  const [socket, setSocket] = useState(null);

  const appointmentId = query.get('appointment');
  const userId = query.get('user');
  const specialistId = query.get('specialist');
  const logout = useLogout();

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_VIDEO_MICRO, { transports: ['websocket'] });
    setSocket(newSocket);

    console.log("socket", newSocket);
    window.scrollTo(0, 0);

    return () => {
      console.log('Disconnecting socket...');
      newSocket.disconnect();
    };
  }, []);

  const handleReserve = () => {
    window.location.href = process.env.REACT_APP_USER_RESERVE_URL;
  };

  const handleAppointments = () => {
    window.location.href = process.env.REACT_APP_USER_APPOINTMENTS_URL;
  };

  const handleLogout = () => {
    logout()
  };


  return (
    <div className="consultation-page">
      <Header onReserve={handleReserve} onAppointments={handleAppointments} onLogout={handleLogout} client="user user" />
      <ConsultationHeader specialty="Specialty" doctorName="Name Surname" />
      {socket && <ConsultationOptions userId={userId} specialistId={specialistId} appointmentId={appointmentId} socket={socket} />}
      <Footer />
    </div>
  );
};

export default SpecialistConsultationPage;
