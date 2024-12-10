import React, { useState } from "react";
import axios from "axios";
import { Vendor, Event } from "../types";
import{useNavigate} from 'react-router-dom';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<Vendor>({
    vendorName: "",
    vendorEmail: "",
    vendorContactNumber: 0,
    vendorPassword: "",
  });

  const [event, setEvent] = useState<Event>({
    eventName: "",
    eventLocation: "",
    eventDate: "",
    eventTicketPrice: 0,
    eventTotalTickets: 0,
  });

  const [ticketCount, setTicketCount] = useState<number>(0);

  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]:
        name === "eventTicketPrice" || name === "eventTotalTickets"
          ? Number(value)
          : value,
    });
  };

  const handleTicketCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketCount(Number(e.target.value));
  };

  const createEvent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/event/addEvent",
        event
      );
      alert("Event created successfully: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event");
    }
  };

  const addTickets = async () => {
    try {
      const payload = {
        vendor,
        event,
        ticketCount,
      };

      const response = await axios.post(
        "http://localhost:8080/ticket/addTicket",
        payload
      );
      alert("Tickets added successfully: " + response.data);
    } catch (error) {
      console.error("Error adding tickets", error);
      alert("Failed to add tickets");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Event Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
              Create Event
            </h2>
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={event.eventName}
                    onChange={handleEventChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    value={event.eventLocation}
                    onChange={handleEventChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={event.eventDate}
                    onChange={handleEventChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ticket Price
                  </label>
                  <input
                    type="number"
                    name="eventTicketPrice"
                    value={event.eventTicketPrice}
                    onChange={handleEventChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Tickets
                  </label>
                  <input
                    type="number"
                    name="eventTotalTickets"
                    value={event.eventTotalTickets}
                    onChange={handleEventChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={createEvent}
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-sm font-medium"
              >
                Create Event
              </button>
            </form>
          </div>

          {/* Add Tickets Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-4">
              Add Tickets
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  value={ticketCount}
                  onChange={handleTicketCountChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  min="0"
                />
              </div>
              <button
                onClick={addTickets}
                className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-sm font-medium"
              >
                Add Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;