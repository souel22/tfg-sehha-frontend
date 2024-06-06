import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AppointmentBookingPage from "./pages/UserPages/AppointmentBookingPage/AppointmentBookingPage";
import AppointmentsPage from "./pages/UserPages/AppointmentsPage/AppointmentsPage";
import ConsultationPage from "./pages/UserPages/ConsultationPage/ConsultationPage";
import SpecialistAppointmentsPage from "./pages/SpecialistPages/SpecialistAppointmentsPage/SpecialistAppointmentsPage";
import SpecialistConsultationPage from "./pages/SpecialistPages/SpecialistConsultationPage/SpecialistConsultationPage";
import Scheduler from "./pages/SpecialistPages/Scheduler/Scheduler";
import LoginSelectionPage from "./pages/Login/LoginSelectionPage";
import LoginPage from "./pages/Login/LoginPage/LoginPage";
import SignUpPage from "./pages/Login/SignUpPage/SignUpPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from "./contexts/AuthContext"; // Import AuthContextProvider

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
  }, 
  {
    path:  process.env.REACT_APP_LOGIN_SIGNUP_SELECTION, 
    element: <LoginSelectionPage/>
  },
  {
    path: process.env.REACT_APP_LOGIN, 
    element: <LoginPage/>
  }, 
  {
    path: process.env.REACT_APP_SIGNUP,
    element: <SignUpPage/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById(process.env.REACT_APP_ROOT_DIV));
root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  // </React.StrictMode>
);
