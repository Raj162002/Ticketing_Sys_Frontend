import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import ConfigurationForm from './ConfigurationForm';
import ControlPanel from './ControlPanel';
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
  const navigate = useNavigate();
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
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
  {/* Header Section */}
  <div className="max-w-7xl mx-auto mb-12">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Ticket Management System
            </h1>
            <p className="text-gray-600 text-lg">
              Administrative Control Panel
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="absolute top-8 right-8 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>

  {/* Main Content Grid */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Configuration Card */}
    <div className="bg-white rounded-xl shadow-lg p-8 transition-shadow duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b">
        Configuration
      </h2>
      <ConfigurationForm onSubmit={handleConfigSubmit} />
    </div>

    {/* Control Panel Card */}
    <div className="bg-white rounded-xl shadow-lg p-8 transition-shadow duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-4 border-b">
        Control Panel
      </h2>
      <ControlPanel 
        onStart={handleStart} 
        onStop={handleStop} 
        isDisabled={!config}
      />
      
      {/* Status Message */}
      {statusMessage && (
        <div className={`mt-6 p-4 rounded-lg ${
          statusMessage.includes('success') 
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        } transition-all duration-300`}>
          <p className="flex items-center">
            {statusMessage.includes('success') ? (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            )}
            {statusMessage}
          </p>
        </div>
      )}
    </div>
  </div>
</div>
  
  );
};

export default AdminPanel;
