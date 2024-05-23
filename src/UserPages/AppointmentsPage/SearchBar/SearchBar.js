import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './SearchBar.css';  // Import the custom CSS

const SearchBar = ({ onFilter, specialities, specialists }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log("Form Submission Data: ", data);
    onFilter(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="search-bar p-3">
      <Row className="align-items-end">
        <Col md={3} className="mb-3">
          <Form.Group controlId="speciality">
            <Form.Label>Medical Specialty</Form.Label>
            <Form.Control as="select" {...register('speciality')}>
              <option value="">Select a Specialty</option>
              {specialities.map((speciality, index) => (
                <option key={index} value={speciality.id}>
                  {speciality.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3} className="mb-3">
          <Form.Group controlId="specialist">
            <Form.Label>Specialist</Form.Label>
            <Form.Control as="select" {...register('specialist')}>
              <option value="">Select a Specialist</option>
              {specialists.map((specialist, index) => (
                <option key={index} value={specialist.id}>
                  {`Dr. ${specialist.firstName} ${specialist.lastName}`}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={2} className="mb-3">
          <Form.Group controlId="from">
            <Form.Label>From</Form.Label>
            <Form.Control type="datetime-local" {...register('from')} />
          </Form.Group>
        </Col>
        <Col md={2} className="mb-3">
          <Form.Group controlId="to">
            <Form.Label>To</Form.Label>
            <Form.Control type="datetime-local" {...register('to')} />
          </Form.Group>
        </Col>
        <Col md={2} className="mb-3">
          <Button type="submit" variant="primary" className="search-button">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
