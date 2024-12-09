import React, { useEffect, useState } from 'react';

const TicketDisplay: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Use the native WebSocket API with the appropriate protocol
    const wsUrl = 'ws://localhost:8080/ws';  // Change this to wss:// in production if using HTTPS

    // Establish the WebSocket connection
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket Connected');
      setConnected(true);
    };

    socket.onmessage = (event) => {
      console.log('Message from server: ', event.data);
      const ticketData = JSON.parse(event.data); // Assuming the data is JSON
      setTickets((prevTickets) => [...prevTickets, ticketData]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
      setConnected(false);
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
      setConnected(false);
    };

    // Set the WebSocket client for later disconnection
    setWsClient(socket);

    // Cleanup on component unmount
    return () => {
      if (socket) {
        socket.close(); // Properly close the WebSocket connection when the component unmounts
      }
    };
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <div>
      <h2>Tickets</h2>
      {connected ? (
        <p>Connected to WebSocket</p>
      ) : (
        <p>Connecting to WebSocket...</p>
      )}
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>{ticket.name} - {ticket.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketDisplay;
