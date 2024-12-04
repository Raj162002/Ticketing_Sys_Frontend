function TicketDisplay() {
    return (
      <div className="ticket-display-container bg-white shadow-md rounded-md p-4">
        <h2 className="text-xl font-bold mb-4">Ticket Display</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-2 border border-gray-300">Ticket ID</th>
                <th className="p-2 border border-gray-300">Event ID</th>
                <th className="p-2 border border-gray-300">Vendor ID</th>
                <th className="p-2 border border-gray-300">Customer ID</th>
                <th className="p-2 border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Rows */}
              <tr className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300 text-center">1</td>
                <td className="p-2 border border-gray-300 text-center">101</td>
                <td className="p-2 border border-gray-300 text-center">501</td>
                <td className="p-2 border border-gray-300 text-center">201</td>
                <td className="p-2 border border-gray-300 text-green-500 font-semibold text-center">
                  Sold
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="p-2 border border-gray-300 text-center">2</td>
                <td className="p-2 border border-gray-300 text-center">102</td>
                <td className="p-2 border border-gray-300 text-center">502</td>
                <td className="p-2 border border-gray-300 text-center text-gray-500 italic">
                  N/A
                </td>
                <td className="p-2 border border-gray-300 text-gray-500 font-semibold text-center">
                  Unsold
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
 export default TicketDisplay;
  