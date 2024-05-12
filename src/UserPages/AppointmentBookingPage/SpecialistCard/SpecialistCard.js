import React, { useState } from "react";
import SpecialistCalendar from "../Calendar/Calendar";
import "./SpecialistCard.css";

// SpecialistCard Component
const SpecialistCard = ({ name, specialities, specialistId, userId }) => {
  // State to keep track of the selected specialty
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(specialities[0]?.id);

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialtyId(event.target.value);
    console.log("Selected Specialty ID:", event.target.value);
  };

  return (
    <div className="specialistCard">
      <img src="placeholder-image-url" alt="Profile" />
      <div>
        <h3>{name}</h3>
        <select
          className="specialtySelect"
          value={selectedSpecialtyId}
          onChange={handleSpecialtyChange}
        >
          {specialities.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </select>
      </div>
      <SpecialistCalendar
        specialistId={specialistId}
        userId={userId}
        selectedSpecialtyId={selectedSpecialtyId}
      />
    </div>
  );
};

export default SpecialistCard;
