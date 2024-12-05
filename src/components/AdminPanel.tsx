import ConfigurationForm from "./ConfigurationForm";
import ControlPanel from "./ControlPanel";
import LogDisplay from "./LogDisplay";
import TicketDisplay from "./TicketDisplay";



const AdminPanel:React.FC =() => {
    return(
        <>
             <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Ticket Management System</h1>

      {/* Flex container for configuration and control panel */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left Side: Configuration Form */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
          <ConfigurationForm />
        </div>

        {/* Right Side: Control Panel */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Control Panel</h2>
          <ControlPanel />
        </div>
      </div>

      {/* Logs and Tickets Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Log Display */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Logs</h2>
          <LogDisplay />
        </div>

        {/* Ticket Display */}
        <div className="bg-white shadow-md rounded-lg p-6 flex-1">
          <h2 className="text-2xl font-semibold mb-4">Tickets</h2>
          <TicketDisplay />
        </div>
      </div>
    </div>
        </>
    )
}
export default AdminPanel;