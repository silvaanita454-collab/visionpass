export type UserRole = 'ADMIN' | 'TEACHER' | 'RESPONSIBLE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  institutionName?: string;
}

export type FacialRecognitionStatus = 'Cadastrado' | 'Não cadastrado' | 'Atualização necessária';

export interface Student {
  id: string;
  name: string;
  registration: string; // Matrícula
  classGroup: string;   // Turma
  birthDate: string;
  responsibleName: string;
  status: 'Ativo' | 'Inativo' | 'Trancado';
  facialStatus: FacialRecognitionStatus;
  avatar: string;
  attendanceRate: number; // Percentual de presença
  lastAccess?: string;
}

export type TurnstileStatus = 'Online' | 'Offline' | 'Manutenção';

export interface Turnstile {
  id: string;
  name: string;
  location: string;
  status: TurnstileStatus;
  lastPing: string;
  totalPassagesToday: number;
  firmwareVersion: string;
}

export type AccessType = 'Entrada' | 'Saída';
export type AccessStatus = 'Autorizado' | 'Negado';

export interface AccessLog {
  id: string;
  studentName: string;
  registration: string;
  studentAvatar: string;
  turnstileName: string;
  date: string;
  time: string;
  type: AccessType;
  status: AccessStatus;
  notes?: string;
}

export interface DelayLog {
  id: string;
  studentName: string;
  studentAvatar: string;
  classGroup: string;
  expectedTime: string;
  registeredTime: string;
  delayMinutes: number;
  date: string;
}

export type NotificationCategory = 'Entrada' | 'Saída' | 'Atraso' | 'Ausência' | 'Sistema' | 'Segurança';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  studentName?: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  delayedToday: number;
  averageAttendance: number;
  grade: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  targetAudience: string;
}
