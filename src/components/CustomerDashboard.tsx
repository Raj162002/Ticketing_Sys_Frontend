import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard: React.FC = () => {
  const [customer, setCustomer] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [availableTickets, setAvailableTickets] = useState<number | null>(null);

  // Retrieve customer data from localStorage on mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    } else {
      console.error("No customer data found");
    }
  }, []);

  // Fetch events after customer data is loaded
  useEffect(() => {
    if (customer) {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('http://localhost:8080/event/getAllEvents');
          setEvents(response.data); // Assuming response contains a list of events
        } catch (error) {
          console.error("Error fetching events", error);
        }
      };

      fetchEvents();
    }
  }, [customer]);

  const handleEventSelect = async (eventId: number) => {
    try {
      const response = await axios.get('http://localhost:8080/ticket/getAvailableTickets', {
        headers: {
          eventId: eventId.toString(), // Sending eventId in the request header
        },
      });

      if (response.data && response.data.length > 0) {
        setSelectedEvent(events.find((event) => event.eventId === eventId));
        setAvailableTickets(response.data.length);
      } else {
        setAvailableTickets(0);
        alert("No tickets available for this event.");
      }
    } catch (error) {
      console.error("Error fetching available tickets", error);
      setAvailableTickets(null);
    }
  };

  const handleBuyTicket = async () => {
    if (!selectedEvent || !customer) return;
  
    try {
      const response = await axios.post(
        `http://localhost:8080/ticket/buyTicket?eventId=${selectedEvent.eventId}`,
        customer,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      alert(response.data);
    } catch (error) {
      console.error("Error buying ticket", error);
      alert("An error occurred while buying the ticket.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {customer ? (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Welcome, {customer.customerName}</h2>

          <h3 className="text-lg font-semibold mb-2">Select an Event to Buy Tickets</h3>
          <ul className="space-y-2">
            {events.map((event) => (
              <li key={event.eventId} className="flex justify-between items-center">
                <span className="font-medium">
                  {event.eventName} - {event.eventLocation}
                </span>
                <button
                  onClick={() => handleEventSelect(event.eventId)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                >
                  Select
                </button>
              </li>
            ))}
          </ul>

          {selectedEvent && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">
                {selectedEvent.eventName} - {selectedEvent.eventLocation}
              </h4>
              <p className="text-gray-600">
                Available Tickets: {availableTickets !== null ? availableTickets : 'Loading...'}
              </p>
              <button
                onClick={handleBuyTicket}
                className={`mt-3 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 ${
                  availableTickets === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={availableTickets === 0}
              >
                Buy Ticket
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading customer data...</p>
      )}
    </div>
  );
};

export default CustomerDashboard;
