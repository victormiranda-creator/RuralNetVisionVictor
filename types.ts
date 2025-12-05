export type AppRole = 'client' | 'admin' | 'guest';
export type TabType = 'dashboard' | 'production' | 'alerts' | 'reports' | 'support' | 'products' | 'admin';

export interface Ticket {
  id: string;
  userId: string;
  userName: string;
  type: 'internet' | 'camera' | 'outros';
  description: string;
  status: 'aberto' | 'em_progresso' | 'concluido';
  createdAt: any;
  location: string;
}

export interface DeviceStatus {
  id: string;
  name: string;
  type: 'mesh' | 'camera';
  status: 'online' | 'offline' | 'warning';
  battery?: number; // %
  signal?: number; // %
  location: string;
  model: string;
  temperature: number; // Celsius
  lastActive: string;
  firmware: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface Alert {
    id: number;
    type: 'critical' | 'warning' | 'info';
    message: string;
    time: string;
    date: string;
    deviceId?: string;
    read: boolean;
}

export interface ProductionEvent {
    id: number;
    type: 'loss_prevention' | 'production' | 'efficiency';
    title: string;
    location: string;
    time: string;
    impact: string;
    value: string;
}

export interface User {
  uid: string;
  role: AppRole;
  name: string;
}