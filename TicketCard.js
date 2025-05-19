import React from 'react';

const TicketCard = ({ ticket, onStatusChange }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{ticket.title}</h5>
        <p>{ticket.description}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <select
          value={ticket.status}
          onChange={(e) => onStatusChange(ticket._id, e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
    </div>
  );
};

export default TicketCard;
