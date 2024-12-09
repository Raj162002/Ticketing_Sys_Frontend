import React, { useState } from 'react';

interface ConfigurationData {
  totalTickets: number;
  eventName: string;
  ticketPrice: number;
  vendorCount: number;
  ticketRetrivalRate: number;
  customerRetrivalRate: number;
}

interface ConfigurationFormProps {
  onSubmit: (data: ConfigurationData) => void;
}

const ConfigurationForm: React.FC<ConfigurationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ConfigurationData>({
    totalTickets: 0,
    eventName: '',
    ticketPrice: 0,
    vendorCount: 0,
    ticketRetrivalRate: 0,
    customerRetrivalRate: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Configuration Form</h2>

      <div className="mb-4">
        <label htmlFor="mticketc" className="block text-lg font-medium text-gray-700 mb-2">Maximum Ticket Count per Vendor:</label>
        <input
          type="number"
          id="mticketc"
          name="totalTickets"
          value={formData.totalTickets}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mticketc" className="block text-lg font-medium text-gray-700 mb-2">Enter the price per ticket :</label>
        <input
          type="number"
          id="ticketPrice"
          name="ticketPrice"
          value={formData.ticketPrice}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="eventN" className="block text-lg font-medium text-gray-700 mb-2">Enter the Event Name:</label>
        <input
          type="text"
          id="eventN"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="vendorNo" className="block text-lg font-medium text-gray-700 mb-2">Enter the Number of Vendors:</label>
        <input
          type="number"
          id="vendorNo"
          name="vendorCount"
          value={formData.vendorCount}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ticketRetrival" className="block text-lg font-medium text-gray-700 mb-2">Ticket Retrieval Rate per Second:</label>
        <input
          type="number"
          id="ticketRetrival"
          name="ticketRetrivalRate"
          value={formData.ticketRetrivalRate}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="customerRetrival" className="block text-lg font-medium text-gray-700 mb-2">Customer Retrieval Rate per Second:</label>
        <input
          type="number"
          id="customerRetrival"
          name="customerRetrivalRate"
          value={formData.customerRetrivalRate}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="text-center">
        <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ConfigurationForm;
