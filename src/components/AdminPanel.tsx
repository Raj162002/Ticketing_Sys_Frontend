import React, { useState } from 'react';
import ConfigurationForm from './ConfigurationForm';
import ControlPanel from './ControlPanel';
import LogDisplay from './LogDisplay';
import TicketDisplay from './TicketDisplay';
import axios from 'axios';
import "./init.tsx"

interface ConfigurationData {
  totalTickets: number;
  eventName: string;
  ticketPrice: number;
  vendorCount: number;
  ticketRetrivalRate: number;
  customerRetrivalRate: number;
}

const AdminPanel: React.FC = () => {
  const [config, setConfig] = useState<ConfigurationData | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleConfigSubmit = (data: ConfigurationData) => {
    setConfig(data);
    setStatusMessage(null);  // Reset status message on new config submission
  };

  const handleStart = async () => {
    if (config) {
      if (config.totalTickets <= 0 || !config.eventName) {
        setStatusMessage('Configuration is invalid');
        return;
      }
      try {
        await axios.post('http://localhost:8080/ticket/start', config);
        setStatusMessage('Simulation started');
      } catch (err) {
        setStatusMessage('Error starting simulation');
        console.error('Error starting simulation:', err);
      }
    }
  };

  const handleStop = async () => {
    try {
      await axios.post('http://localhost:8080/ticket/stop');
      setStatusMessage('Simulation stopped');
    } catch (err) {
      setStatusMessage('Error stopping simulation');
      console.error('Error stopping simulation:', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Ticket Management System</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
          <ConfigurationForm onSubmit={handleConfigSubmit} />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Control Panel</h2>
          <ControlPanel 
            onStart={handleStart} 
            onStop={handleStop} 
            isDisabled={!config}  // Disable buttons if config is not set
          />
        </div>
      </div>

      {statusMessage && (
        <div className="text-center text-lg mt-4">
          <p>{statusMessage}</p>
        </div>
      )}

      {/* <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Logs</h2>
          <LogDisplay />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
          <TicketDisplay />
        </div>
      </div> */}
    </div>
  );
};

export default AdminPanel;
