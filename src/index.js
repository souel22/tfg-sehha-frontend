import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import AppointmentBookingPage from "./UserPages/AppointmentBookingPage/AppointmentBookingPage";
import AppointmentsPage from "./UserPages/AppointmentsPage/AppointmentsPage";
import ConsultationPage from "./UserPages/ConsultationPage/ConsultationPage";
import SpecialistAppointmentsPage from "./SpecialistPages/SpecialistAppointmentsPage/SpecialistAppointmentsPage";
import SpecialistConsultationPage from "./SpecialistPages/SpecialistConsultationPage/SpecialistConsultationPage";
import Scheduler from "./SpecialistPages/Scheduler/Scheduler";
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
  {
    path: process.env.REACT_APP_HOMEPAGE,
    element: <HomePage />,
  },
  {
    path: process.env.REACT_APP_USER_RESERVE_URL,
    element: <AppointmentBookingPage />,
  },
  {
    path: process.env.REACT_APP_USER_APPOINTMENTS_URL,
    element: <AppointmentsPage />,
  },
  {
    path: process.env.REACT_APP_USER_VIDEO_URL,
    element: <ConsultationPage />,
  },
  {
    path: process.env.REACT_APP_SPECIALIST_APPOINTMENTS_URL,
    element: <SpecialistAppointmentsPage />,
  },
  {
    path: process.env.REACT_APP_SPECIALIST_VIDEO_URL,
    element: <SpecialistConsultationPage />,
  },
  {
    path: process.env.REACT_APP_SPECIALIST_SCHEDULE_APPOINTMENT_URL, 
    element: <Scheduler />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById(process.env.REACT_APP_ROOT_DIV));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
