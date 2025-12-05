import { DeviceStatus, Alert, ProductionEvent, Ticket } from '../types';

export const INITIAL_DEVICES: DeviceStatus[] = [
  { id: '1', name: 'Torre Central', type: 'mesh', status: 'online', signal: 100, location: 'Sede Administrativa', model: 'RuralMesh Pro V2', temperature: 42, lastActive: 'Agora', firmware: 'v2.4.1' },
  { id: '2', name: 'Repetidor 01', type: 'mesh', status: 'online', signal: 88, location: 'Curral Principal', model: 'RuralMesh Repeater', temperature: 38, lastActive: 'Agora', firmware: 'v2.4.1' },
  { id: '3', name: 'Repetidor 02', type: 'mesh', status: 'warning', signal: 45, location: 'Casa de Máquinas', model: 'RuralMesh Repeater', temperature: 45, lastActive: 'Há 5 min', firmware: 'v2.3.0' },
  { id: '4', name: 'Repetidor 03', type: 'mesh', status: 'online', signal: 72, location: 'Silo de Grãos', model: 'RuralMesh Repeater', temperature: 36, lastActive: 'Agora', firmware: 'v2.4.1' },
  { id: 'cam1', name: 'Câmera-Entrada', type: 'camera', status: 'online', battery: 92, location: 'Portão Principal', model: 'VisionSat Solar 360', temperature: 35, lastActive: 'Agora', firmware: 'v1.2.0' },
  { id: 'cam2', name: 'Câmera-Pasto-Norte', type: 'camera', status: 'warning', battery: 15, location: 'Pasto Norte (Setor B)', model: 'VisionSat Fixed', temperature: 39, lastActive: 'Há 2 min', firmware: 'v1.1.8' },
  { id: 'cam3', name: 'Câmera-Paiol', type: 'camera', status: 'online', battery: 78, location: 'Paiol de Ferramentas', model: 'VisionSat Night', temperature: 31, lastActive: 'Agora', firmware: 'v1.2.0' },
  { id: 'cam4', name: 'Câmera-Açude', type: 'camera', status: 'offline', battery: 0, location: 'Açude Principal', model: 'VisionSat Solar 360', temperature: 0, lastActive: 'Há 4 horas', firmware: 'v1.1.5' },
  { id: 'cam5', name: 'Câmera-Curral-Int', type: 'camera', status: 'online', battery: 100, location: 'Interior do Curral', model: 'VisionSat AI', temperature: 28, lastActive: 'Agora', firmware: 'v1.3.0' },
];

export const INITIAL_ALERTS: Alert[] = [
  { id: 1, type: 'critical', message: 'Câmera Açude Offline - Verifique a conexão', time: '14:30', date: 'Hoje', deviceId: 'cam4', read: false },
  { id: 2, type: 'warning', message: 'Bateria Fraca - Câmera Pasto Norte (15%)', time: '10:15', date: 'Hoje', deviceId: 'cam2', read: false },
  { id: 3, type: 'info', message: 'Backup do Sistema Vision Realizado', time: '03:00', date: 'Hoje', deviceId: 'sys', read: true },
  { id: 4, type: 'warning', message: 'Sinal Instável - Repetidor Casa de Máquinas', time: '18:45', date: 'Ontem', deviceId: '3', read: true },
  { id: 5, type: 'info', message: 'Atualização de Firmware Disponível (v2.5.0)', time: '09:00', date: 'Ontem', deviceId: 'sys', read: true },
];

export const INITIAL_EVENTS: ProductionEvent[] = [
  { id: 1, type: 'loss_prevention', title: 'Gado fora do piquete', location: 'Câmera Pasto Norte', time: '08:30', impact: 'Alto Risco', value: 'R$ 12.000' },
  { id: 2, type: 'production', title: 'Contagem de Rebanho', location: 'Câmera Curral Int', time: '06:00', impact: 'Contagem: 342', value: '-' },
  { id: 3, type: 'loss_prevention', title: 'Invasão de Animais Silvestres', location: 'Câmera Milharal', time: 'Ontem', impact: 'Dano à Lavoura', value: 'R$ 2.500' },
  { id: 4, type: 'efficiency', title: 'Trator Parado > 1h', location: 'Câmera Galpão', time: 'Ontem', impact: 'Atraso Operacional', value: '-' },
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 't-101',
    userId: 'user-demo',
    userName: 'Fazenda Santa Inês',
    type: 'internet',
    description: 'Sinal fraco perto do galpão de máquinas.',
    status: 'em_progresso',
    createdAt: { seconds: Date.now() / 1000 - 86400 },
    location: 'Setor Sul',
  },
  {
    id: 't-102',
    userId: 'user-demo',
    userName: 'Fazenda Santa Inês',
    type: 'camera',
    description: 'Câmera 4 não está gravando à noite.',
    status: 'aberto',
    createdAt: { seconds: Date.now() / 1000 - 10000 },
    location: 'Setor Norte',
  }
];