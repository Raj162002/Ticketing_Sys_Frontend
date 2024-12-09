import React, { useState } from "react";
import axios from "axios";
import { Vendor, Event } from "../types";

const VendorDashboard = () => {
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

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: name === "eventTicketPrice" || name === "eventTotalTickets" ? Number(value) : value,
    });
  };

  const handleTicketCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketCount(Number(e.target.value));
  };

  const createEvent = async () => {
    try {
      const response = await axios.post("http://localhost:8080/event/addEvent", event);
      alert("Event created successfully: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error creating event", error);
      alert("Failed to create event");
    }
  };

  const addTickets = async () => {
    try {
      // Create the payload with vendor, event, and ticketCount
      const payload = {
        vendor,
        event,
        ticketCount,
      };

      const response = await axios.post("http://localhost:8080/ticket/addTicket", payload);
      alert("Tickets added successfully: " + response.data);
    } catch (error) {
      console.error("Error adding tickets", error);
      alert("Failed to add tickets");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create Event</h2>
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={event.eventName}
          onChange={handleEventChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="eventLocation"
          placeholder="Event Location"
          value={event.eventLocation}
          onChange={handleEventChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="date"
          name="eventDate"
          value={event.eventDate}
          onChange={handleEventChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="eventTicketPrice"
          placeholder="Ticket Price"
          value={event.eventTicketPrice}
          onChange={handleEventChange}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="eventTotalTickets"
          placeholder="Total Tickets"
          value={event.eventTotalTickets}
          onChange={handleEventChange}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={createEvent}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Create Event
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Add Tickets</h2>
        <input
          type="number"
          placeholder="Ticket Count"
          value={ticketCount}
          onChange={handleTicketCountChange}
          className="border p-2 mb-2 w-full"
        />
        <button
          onClick={addTickets}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Tickets
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard;
