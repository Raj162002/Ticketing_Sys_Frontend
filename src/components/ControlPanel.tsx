import React from 'react';

interface ControlPanelProps {
  onStart: () => Promise<void>;  // onStart is expected to be an async function
  onStop: () => Promise<void>;   // onStop is expected to be an async function
  isDisabled: boolean;           // isDisabled to disable/enable buttons
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onStart, onStop, isDisabled }) => {
  return (
    <div className="flex justify-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <button
        onClick={onStart}
        disabled={isDisabled}
        className={`px-6 py-2 ${isDisabled ? 'bg-gray-400' : 'bg-green-600'} text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        Start
      </button>
      <button
        onClick={onStop}
        disabled={isDisabled}
        className={`px-6 py-2 ${isDisabled ? 'bg-gray-400' : 'bg-red-600'} text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500`}
      >
        Stop
      </button>
    </div>
  );
};

export default ControlPanel;
