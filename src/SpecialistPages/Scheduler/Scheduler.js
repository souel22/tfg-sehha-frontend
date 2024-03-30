import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import './Scheduler.css';

const Scheduler = () => {
    const [specialities, setSpecialities] = useState([]);
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const recurrenceType = watch('recurrenceType');

    const specialistId = "65e642d785477a61386469a0"
    const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL


    useEffect(() => {

        const fetchData = async () => {
            try {
                const path = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_PATH.replace("<specialistId>", specialistId);
                const url = baseUrl + path;

                const response = await axios.get(url)
                console.log(response.data.specialities)
                setSpecialities(response.data.specialities)
            } catch (e) {
                console.error("There was an error fetching the specialities", e);
            }
        }

        fetchData();
    }, []);

    const onSubmit = data => {
        console.log(data);
        // API call to submit form data
    };

      // Handler for reserving an appointment
  const handleAppointmentsSchedule = () => {
    // Redirect or perform action to reserve an appointment
    window.location.href = process.env.REACT_APP_SPECIALIST_APPOINTMENTS_URL; // Update with your actual URL
  };

  // Handler for logging out
  const handleLogout = () => {
    // Perform logout operations such as clearing session storage, etc.
    // Then redirect or adjust application state as needed
    window.location.href = process.env.REACT_APP_SPECIALIST_LOGOUT_URL; // Update with your actual URL
  };


    return (
        <div className="scheduler">
            <header className="scheduler-header">
                <img src="path-to-sahha-logo.png" alt="SAHHA Logo" className="logo" />
                <nav>
                    <button onClick={()=>handleAppointmentsSchedule()} >MY APPOINTMENTS</button>
                    <button>SURNAME, NAME</button>
                    <button onClick={()=>handleLogout()}>log out</button>
                </nav>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
                <h2>Schedule your appointments</h2>
                <input placeholder="Patient's name (optional)" {...register('patientName')} />
                <select {...register('speciality')}>
                    {specialities.map((speciality, index) => (
                        <option key={index} value={speciality.id}>{speciality.name}</option>
                    ))}
                </select>

                <input type="date" {...register('date')} />
                <input type="time" {...register('hour')} />
                <input placeholder="Duration (in minutes)" type="number" {...register('duration')} />
                <label htmlFor="recurrenceType">Recurrence Type</label>
                <select id="recurrenceType" {...register('recurrenceType')}>
                    <option value="number">Number</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                {recurrenceType === 'number' ? (
                    <Controller
                        name="recurrence"
                        control={control}
                        rules={{ required: true, min: 1 }}
                        render={({ field }) => <input type="number" placeholder="Enter number of days" {...field} />}
                    />
                ) : (
                    <input type="hidden" {...register('recurrence')} value={recurrenceType} />
                )}
                <textarea placeholder="Description" {...register('description')} />
                <button type="submit">Create</button>
                <button type="button">Cancel</button>
            </form>
        </div>
    );
};

export default Scheduler;
