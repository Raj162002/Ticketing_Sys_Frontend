import ControlPanel from "./ControlPanel";

function ConfigurationForm() {
    return (
        <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Configuration Form</h2>

            <div className="mb-4">
                <label htmlFor="mticketc" className="block text-lg font-medium text-gray-700 mb-2">Maximum Ticket Count per Vendor:</label>
                <input
                    type="number"
                    id="mticketc"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="eventN" className="block text-lg font-medium text-gray-700 mb-2">Enter the Event Name:</label>
                <input
                    type="text"
                    id="eventN"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="vendorNo" className="block text-lg font-medium text-gray-700 mb-2">Enter the Number of Vendors:</label>
                <input
                    type="number"
                    id="vendorNo"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="ticketRetrival" className="block text-lg font-medium text-gray-700 mb-2">Enter the Ticket Retrieval Rate per Second:</label>
                <input
                    type="number"
                    id="ticketRetrival"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="customerRetrival" className="block text-lg font-medium text-gray-700 mb-2">Enter the Customer Retrieval Rate per Second:</label>
                <input
                    type="number"
                    id="customerRetrival"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div className="text-center">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Submit</button>
            </div>
        </form>
    );
}

export default ConfigurationForm;
