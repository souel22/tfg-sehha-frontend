import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Row, Col, Form, Button, Alert, Collapse } from 'react-bootstrap';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SpecialistCalendar from './SpecialistCalendar/SpecialistCalendar';
import axios from 'axios';
import './Scheduler.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const Scheduler = () => {
  const [specialistName, setSpecialistName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(true);
  const [open, setOpen] = useState(false); // State for the collapsible calendar

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
  const recurrenceType = watch('recurrenceType');

  const specialistId = "65e642d785477a61386469a0";
  const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_PATH.replace("<specialistId>", specialistId);
        const url = baseUrl + path;

        const response = await axios.get(url);
        setSpecialistName(response.data.name);
      } catch (e) {
        console.error("There was an error fetching the specialist info", e);
      }
    };

    fetchData();
  }, [specialistId, baseUrl]);

  const onSubmit = async (data) => {
    const { date, hour, duration, recurrenceType, numberOfSlots, recurrence } = data;
    const schedulePath = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_SCHEDULE_PATH.replace('<specialistId>', specialistId);
    const scheduleUrl = `${baseUrl}${schedulePath}`;

    let slots = [];
    const startTime = new Date(`${date}T${hour}`);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    if (recurrenceType === "once") {
      slots.push({ startTime: startTime.toISOString(), endTime: endTime.toISOString() });
    } else {
      for (let i = 0; i < numberOfSlots; i++) {
        let slotStartTime = new Date(startTime);
        let slotEndTime = new Date(endTime);

        switch (recurrenceType) {
          case "number":
            slotStartTime.setDate(startTime.getDate() + i * recurrence);
            slotEndTime.setDate(endTime.getDate() + i * recurrence);
            break;
          case "daily":
            slotStartTime.setDate(startTime.getDate() + i);
            slotEndTime.setDate(endTime.getDate() + i);
            break;
          case "weekly":
            slotStartTime.setDate(startTime.getDate() + i * 7);
            slotEndTime.setDate(endTime.getDate() + i * 7);
            break;
          case "monthly":
            slotStartTime.setMonth(startTime.getMonth() + i);
            slotEndTime.setMonth(endTime.getMonth() + i);
            break;
          case "yearly":
            slotStartTime.setFullYear(startTime.getFullYear() + i);
            slotEndTime.setFullYear(endTime.getFullYear() + i);
            break;
          default:
            break;
        }

        slots.push({ startTime: slotStartTime.toISOString(), endTime: slotEndTime.toISOString() });
      }
    }

    try {
      const response = await axios.post(scheduleUrl, slots);
      console.log('Slots created:', response.data);
    } catch (error) {
      console.error('Error creating slots:', error);
      setErrorMessage(error.response?.data?.message || "An error occurred during slot creation.");
    }
  };

  const handleAppointmentsSchedule = () => {
    window.location.href = process.env.REACT_APP_SPECIALIST_APPOINTMENTS_URL; // Update with your actual URL
  };

  const handleLogout = () => {
    window.location.href = process.env.REACT_APP_SPECIALIST_LOGOUT_URL; // Update with your actual URL
  };

  return (
    <div className="scheduler">
      <Header onReserve={handleAppointmentsSchedule} onLogout={handleLogout} client={`Dr. ${specialistName}`} />
      <Container className="my-4">
        <Form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
          <h2 className="form-title">Schedule Your Appointment Slots</h2>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" {...register('date', { required: true })} />
                {errors.date && <Form.Text className="text-danger">This field is required</Form.Text>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="hour">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" {...register('hour', { required: true })} />
                {errors.hour && <Form.Text className="text-danger">This field is required</Form.Text>}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="duration">
                <Form.Label>Duration (in minutes)</Form.Label>
                <Form.Control type="number" {...register('duration', { required: true })} />
                {errors.duration && <Form.Text className="text-danger">This field is required</Form.Text>}
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="recurrenceType">
                <Form.Label>Recurrence Type</Form.Label>
                <Form.Control as="select" {...register('recurrenceType')}>
                  <option value="once">Once</option>
                  <option value="number">Every (X) days</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </Form.Control>
              </Form.Group>
            </Col>
            {recurrenceType === 'number' && (
              <Col md={4}>
                <Form.Group controlId="recurrence">
                  <Form.Label>Enter Number of Days</Form.Label>
                  <Controller
                    name="recurrence"
                    control={control}
                    rules={{ required: true, min: 1 }}
                    render={({ field }) => <Form.Control type="number" {...field} />}
                  />
                  {errors.recurrence && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
              </Col>
            )}
            {recurrenceType !== 'once' && (
              <Col md={4}>
                <Form.Group controlId="numberOfSlots">
                  <Form.Label>Number of Slots</Form.Label>
                  <Form.Control type="number" {...register('numberOfSlots', { required: true })} />
                  {errors.numberOfSlots && <Form.Text className="text-danger">This field is required</Form.Text>}
                </Form.Group>
              </Col>
            )}
          </Row>
          {errorMessage && showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              {errorMessage}
            </Alert>
          )}
          <div className="d-flex justify-content-between">
            <Button type="submit" variant="primary" className="px-4">Create</Button>
            <Button type="button" variant="secondary" className="px-4">Cancel</Button>
          </div>
        </Form>
        <div className="mt-4">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="calendar-collapse-text"
            aria-expanded={open}
            variant="outline-primary"
          >
            {open ? 'Hide Calendar' : 'Show Calendar'}
          </Button>
          <Collapse in={open}>
            <div id="calendar-collapse-text">
              <SpecialistCalendar specialistId={specialistId} />
            </div>
          </Collapse>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Scheduler;
