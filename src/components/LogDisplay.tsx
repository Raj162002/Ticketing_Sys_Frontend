function LogDisplay() {
    return (
      <div className="log-display-container bg-gray-800 text-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Log Display</h2>
        <div className="log-table-container overflow-y-auto h-96 border border-gray-700 rounded-md p-2">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-gray-900">
              <tr>
                <th className="p-2">Timestamp</th>
                <th className="p-2">Message</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-700">
                <td className="p-2">2024-12-03 10:00:00</td>
                <td className="p-2">Sample log message</td>
              </tr>
              <tr className="hover:bg-gray-700">
                <td className="p-2">2024-12-03 10:01:00</td>
                <td className="p-2">Another sample log</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="controls mt-4 flex gap-2">
          <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
            Clear Logs
          </button>
          <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
            Pause Updates
          </button>
        </div>
      </div>
    );
  }
  
  export default LogDisplay;
  