import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css'; // You can add specific styles for the calendar here

const localizer = momentLocalizer(moment);

const SpecialistCalendar = ({ specialistId, userId, selectedSpecialtyId }) => {
    const [events, setEvents] = useState([]);
    const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;
    const schedulePath = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_SCHEDULE_PATH.replace('<specialistId>', specialistId);

    useEffect(() => {
        const fetchSchedule = async () => {
            const url = `${baseUrl}${schedulePath}`;
            try {
                const response = await axios.get(url);
                const slots = response.data.slots.map(slot => {
                    const startDate = new Date(`${slot.date}T${slot.time}`);
                    const durationParts = slot.duration.split(':');
                    const durationMinutes = parseInt(durationParts[0], 10) * 60 + parseInt(durationParts[1], 10);
                    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    
                    return {
                        id: slot.id,
                        title: slot.appointment ? 'Booked' : 'Available',
                        start: startDate,
                        end: endDate,
                        allDay: false
                    };
                });
                setEvents(slots);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
    
        fetchSchedule();
    }, [specialistId, baseUrl, schedulePath]);

    const handleSlotSelect = async (slot) => {
        if (slot.title === 'Available') {
            const bookConfirmed = window.confirm(`Do you want to book the slot starting at ${slot.start.toLocaleString()}?`);
            if (bookConfirmed) {
                try {
                    const response = await axios.post(`${baseUrl}/appointments`, {
                        slotId: slot.id,
                        specialityId: selectedSpecialtyId,
                        specialistId,
                        userId
                    });
                    console.log('Appointment booked successfully:', response.data);
                    alert('Appointment booked successfully');
                } catch (error) {
                    console.error('Error booking appointment:', error);
                    alert('Failed to book the appointment.');
                }
            }
        } else {
            alert('This slot is already booked. Please select another slot.');
        }
    };

    return (
        <div className="specialist-calendar-container">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                onSelectEvent={handleSlotSelect}
            />
        </div>
    );
};

export default SpecialistCalendar;
