import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const SpecialistCalendar = ({ specialistId }) => {
    const [events, setEvents] = useState([]);
    // Define base URLs and paths
    const baseUrl = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_URL;
    const schedulePath = process.env.REACT_APP_APPOINTMENT_MANAGEMENT_API_SPECIALIST_SCHEDULE_PATH.replace('<specialistId>', specialistId);

    useEffect(() => {
        const fetchSchedule = async () => {
            const url = `${baseUrl}${schedulePath}`;
    
            try {
                const response = await axios.get(url);
                const slots = response.data.slots.map(slot => {
                    const startDate = new Date(`${slot.date}T${slot.time}`);
                    // Calculate end date based on start date and duration
                    const durationParts = slot.duration.split(':');
                    const durationMinutes = parseInt(durationParts[0], 10) * 60 + parseInt(durationParts[1], 10);
                    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    
                    return {
                        id: slot.id, // Make sure to include the id here, it's crucial for deletion
                        title: slot.appointment ? 'Booked' : 'Available',
                        start: startDate,
                        end: endDate,
                        allDay: false
                    };
                });
                setEvents(slots);
            } catch (error) {
                console.error('Error fetching schedule:', error);
                // Handle error, possibly setting an error state to display in the UI
            }
        };
    
        fetchSchedule();
    }, [specialistId, baseUrl, schedulePath]);

    // Function to handle slot deletion
    const deleteSlot = async (slotId) => {
        try {
            await axios.delete(`${baseUrl}/specialists/${specialistId}/schedule/`, {
                data: { slotId } // Axios DELETE requests send data in the `data` key
            });
            alert('Slot deleted successfully');
            // Optionally refresh calendar data here
        } catch (error) {
            console.error('Error deleting slot:', error);
            alert('Failed to delete the slot.');
        }
    };

    // Handler for selecting a slot (either for updating or deleting)
    const handleSlotSelect = (slot) => {
        const deleteConfirmed = window.confirm(`Do you want to delete the slot starting at ${slot.start.toLocaleString()}?`);
        if (deleteConfirmed) {
            deleteSlot(slot.id); // Make sure slot has an `id` property
        }
    };

    return (
        <div style={{ height: 700 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                onSelectEvent={handleSlotSelect} // Use this prop to handle slot selection
            />
        </div>
    );
};

export default SpecialistCalendar;
