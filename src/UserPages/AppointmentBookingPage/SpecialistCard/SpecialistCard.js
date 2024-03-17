import Calendar from "../Calendar/Calendar";

// SpecialistCard Component
const SpecialistCard = ({ name, specialty, services }) => {
  return (
    <div className="specialistCard">
      <img src="placeholder-image-url" alt="Profile" />
      <div>
        <h3>{name}</h3>
        <p>Specialty: {specialty}</p>
        <p>Services: {services}</p>
      </div>
      <Calendar />
    </div>
  );
};

export default SpecialistCard;
