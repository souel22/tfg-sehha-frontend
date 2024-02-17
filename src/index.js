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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/user/book",
    element: <AppointmentBookingPage />,
  },
  {
    path: "/user/appointments",
    element: <AppointmentsPage />,
  },
  {
    path: "/user/video",
    element: <ConsultationPage />,
  },
  {
    path: "/specialist/appointments",
    element: <SpecialistAppointmentsPage />,
  },
  {
    path: "/specialist/video",
    element: <SpecialistConsultationPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
