import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SpecialistCalendar from './SpecialistCalendar/SpecialistCalendar';
import axios from 'axios';
import './Scheduler.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const Scheduler = () => {
    const [specialistName, setSpecialistName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showError, setShowError] = useState(true);

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
                setSpecialistName(response.data.name)

            } catch (e) {
                console.error("There was an error fetching the specialist info", e);
            }
        }

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const { date, hour, duration, recurrenceType, numberOfSlots, recurrence } = data;

         // Define base URLs and paths
        const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;
        const schedulePath = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_SCHEDULE_PATH.replace('<specialistId>', specialistId);
        const scheduleUrl = `${baseUrl}${schedulePath}`;

        let slots = [];
        const startTime = new Date(`${date}T${hour}`);
        const endTime = new Date(startTime.getTime() + duration * 60000); // Convert duration from minutes to milliseconds

        // Handle the 'once' case separately for performance reasons
        if (recurrenceType === "once") {
            slots.push({ startTime: startTime.toISOString(), endTime: endTime.toISOString() });
        } else {
            // For other recurrence types, use a loop to generate slots
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
                }

                slots.push({ startTime: slotStartTime.toISOString(), endTime: slotEndTime.toISOString() });
            }
        }

        // Send the slots to the backend
        try {
            const response = await axios.post(scheduleUrl, slots);
            console.log('Slots created:', response.data);    
        } catch (error) {
            console.error('Error creating slots:', error);
            setErrorMessage(error.response?.data?.message || "An error occurred during slot creation.");
        }

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
                    <button onClick={() => handleAppointmentsSchedule()} >MY APPOINTMENTS</button>
                    <button>{specialistName}</button>
                    <button onClick={() => handleLogout()}>log out</button>
                </nav>
            </header>
            <SpecialistCalendar specialistId={specialistId} />
            <form onSubmit={handleSubmit(onSubmit)} className="appointment-form">
                <h2>Schedule your appointments slots</h2>
                <input type="date" {...register('date')} />
                <input type="time" {...register('hour')} />
                <input placeholder="Duration (in minutes)" type="number" {...register('duration')} />
                <label htmlFor="recurrenceType">Recurrence Type</label>
                <select id="recurrenceType" {...register('recurrenceType')}>
                    <option value="once">Once</option>
                    <option value="number">Every (X) days</option>
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
                {recurrenceType !== 'once' && <input type="number" placeholder="Number of slots" {...register('numberOfSlots')} />}
                <button type="submit">Create</button>
                <button type="button">Cancel</button>
            </form>
            {errorMessage && showError && (
            <div className="error-message dismissible" onClick={() => setShowError(false)}>
                {errorMessage}
            </div>
            )}

        </div>
    );
};

export default Scheduler;
