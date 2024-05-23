import React, { useState } from "react";
import { Card, Image, Form, Row, Col } from "react-bootstrap";
import SpecialistCalendar from "../Calendar/Calendar";
import "./SpecialistCard.css";

const SpecialistCard = ({ name, specialities, specialistId, userId, profileImage }) => {
  // State to keep track of the selected specialty
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(specialities[0]?.id);

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialtyId(event.target.value);
    console.log("Selected Specialty ID:", event.target.value);
  };

  return (
    <Card className="specialist-card mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <Image src={profileImage} roundedCircle width={100} height={100} />
          </Col>
          <Col md={8}>
            <Card.Title className="specialist-name">{name}</Card.Title>
            <Form.Select
              className="specialty-select"
              value={selectedSpecialtyId}
              onChange={handleSpecialtyChange}
            >
              {specialities.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-end">
        <SpecialistCalendar
          specialistId={specialistId}
          userId={userId}
          selectedSpecialtyId={selectedSpecialtyId}
          className="specialist-calendar"
        />
      </Card.Footer>
    </Card>
  );
};

export default SpecialistCard;
