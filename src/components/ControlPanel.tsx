function ControlPanel() {
    return (
        <div className="flex justify-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <button
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Start
            </button>
            <button
                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
                Stop
            </button>
        </div>
    );
}

export default ControlPanel;
