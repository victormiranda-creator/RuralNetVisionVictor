import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, TabType, DeviceStatus, Alert, ProductionEvent, Ticket } from '../types';
import { INITIAL_DEVICES, INITIAL_ALERTS, INITIAL_EVENTS, MOCK_TICKETS } from '../services/mockData';

interface AppContextType {
  user: User | null;
  activeTab: TabType;
  devices: DeviceStatus[];
  alerts: Alert[];
  productionEvents: ProductionEvent[];
  tickets: Ticket[];
  login: (role: 'client' | 'admin') => void;
  logout: () => void;
  setActiveTab: (tab: TabType) => void;
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'userId' | 'userName' | 'status' | 'location'>) => void;
  updateTicketStatus: (ticketId: string, status: 'aberto' | 'em_progresso' | 'concluido') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [devices] = useState<DeviceStatus[]>(INITIAL_DEVICES);
  const [alerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [productionEvents] = useState<ProductionEvent[]>(INITIAL_EVENTS);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);

  const login = (role: 'client' | 'admin') => {
    setUser({
      uid: 'user-123',
      name: 'Fazenda Santa Inês',
      role,
    });
    setActiveTab(role === 'admin' ? 'admin' : 'dashboard');
  };

  const logout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  const addTicket = (data: Omit<Ticket, 'id' | 'createdAt' | 'userId' | 'userName' | 'status' | 'location'>) => {
    const newTicket: Ticket = {
      id: `t-${Date.now()}`,
      userId: user?.uid || 'unknown',
      userName: user?.name || 'Cliente',
      status: 'aberto',
      createdAt: { seconds: Date.now() / 1000 },
      location: 'Sede Administrativa', // Mock location
      ...data,
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const updateTicketStatus = (ticketId: string, status: 'aberto' | 'em_progresso' | 'concluido') => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  return (
    <AppContext.Provider value={{
      user,
      activeTab,
      devices,
      alerts,
      productionEvents,
      tickets,
      login,
      logout,
      setActiveTab,
      addTicket,
      updateTicketStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};