import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketCard from '../components/TicketCard';

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const agentId = 'YOUR_AGENT_ID'; // Replace with auth context or localStorage

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await axios.get(`/api/tickets`);
    const assigned = res.data.filter(t => t.assignedTo && t.assignedTo._id === agentId);
    setTickets(assigned);
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    await axios.put(`/api/tickets/${ticketId}`, { status: newStatus });
    fetchTickets();
  };

  return (
    <div className="container mt-4">
      <h2>My Tickets</h2>
      {tickets.map(ticket => (
        <TicketCard key={ticket._id} ticket={ticket} onStatusChange={handleStatusChange} />
      ))}
    </div>
  );
};

export default AgentDashboard;
