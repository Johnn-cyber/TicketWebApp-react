import { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';

const TicketContext = createContext(null);

// Mock data for initial tickets
const initialTickets = [
  {
    id: '1',
    title: 'Server Down Issue',
    description: 'Production server is not responding to requests',
    status: 'open',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    title: 'Login Page Bug',
    description: 'Users unable to log in using social auth',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState(initialTickets);

  const createTicket = useCallback((ticketData) => {
    const newTicket = {
      ...ticketData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    setTickets((prev) => [...prev, newTicket]);
    toast.success('Ticket created successfully!');
    return newTicket;
  }, []);

  const updateTicket = useCallback((id, updates) => {
    setTickets((prev) => prev.map((ticket) => (
      ticket.id === id ? { ...ticket, ...updates } : ticket
    )));
    toast.success('Ticket updated successfully!');
  }, []);

  const deleteTicket = useCallback((id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    toast.success('Ticket deleted successfully!');
  }, []);

  const getTicket = useCallback((id) => {
    return tickets.find((ticket) => ticket.id === id);
  }, [tickets]);

  return (
    <TicketContext.Provider value={{
      tickets,
      createTicket,
      updateTicket,
      deleteTicket,
      getTicket,
    }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};