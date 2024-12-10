import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header with Logout */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
        >
          Logout
        </button>
      </div>

      {customer ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
            Welcome, {customer.customerName}
          </h2>

          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Available Events
              </h3>
              <ul className="divide-y divide-gray-100">
                {events.map((event) => (
                  <li 
                    key={event.eventId} 
                    className="flex justify-between items-center py-4 hover:bg-gray-50 px-4 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{event.eventName}</h4>
                      <p className="text-gray-600 text-sm">{event.eventLocation}</p>
                    </div>
                    <button
                      onClick={() => handleEventSelect(event.eventId)}
                      className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                    >
                      Select Event
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {selectedEvent && (
              <section className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Selected Event Details
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <span className="font-medium">Event:</span> {selectedEvent.eventName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {selectedEvent.eventLocation}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Available Tickets:</span>{' '}
                    {availableTickets !== null ? availableTickets : 'Loading...'}
                  </p>
                  <button
                    onClick={handleBuyTicket}
                    disabled={availableTickets === 0}
                    className={`
                      w-full mt-4 py-3 px-6 rounded-lg text-white font-medium
                      transition-all duration-200 shadow-sm
                      ${availableTickets === 0 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 hover:shadow-md'}
                    `}
                  >
                    {availableTickets === 0 ? 'Sold Out' : 'Buy Ticket'}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600 font-medium">Loading customer data...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
