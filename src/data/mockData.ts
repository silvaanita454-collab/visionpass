import { Student, Turnstile, AccessLog, DelayLog, NotificationItem, ClassGroup, Announcement, User } from '../types';

export const mockCurrentUser: Record<string, User> = {
  ADMIN: {
    id: 'u-1',
    name: 'Dr. Roberto Albuquerque',
    email: 'admin@visionpass.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    institutionName: 'Colégio Inovação & Tecnologia'
  },
  TEACHER: {
    id: 'u-2',
    name: 'Prof. Carlos Mendes',
    email: 'prof.carlos@visionpass.com',
    role: 'TEACHER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    institutionName: 'Colégio Inovação & Tecnologia'
  },
  RESPONSIBLE: {
    id: 'u-3',
    name: 'Carlos Silva',
    email: 'pai.joao@gmail.com',
    role: 'RESPONSIBLE',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    institutionName: 'Colégio Inovação & Tecnologia'
  }
};

export const mockStudents: Student[] = [
  {
    id: 'st-1',
    name: 'João Pedro Silva',
    registration: 'MAT-2026-001',
    classGroup: '3º Ano A (Ensino Médio)',
    birthDate: '15/04/2008',
    responsibleName: 'Carlos Silva / Ana Paula Silva',
    status: 'Ativo',
    facialStatus: 'Cadastrado',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    attendanceRate: 96.5,
    lastAccess: 'Hoje, 07:12 • Catraca 01 (Entrada)'
  },
  {
    id: 'st-2',
    name: 'Beatriz Vasconcelos',
    registration: 'MAT-2026-002',
    classGroup: '3º Ano A (Ensino Médio)',
    birthDate: '22/09/2008',
    responsibleName: 'Mariana Vasconcelos',
    status: 'Ativo',
    facialStatus: 'Cadastrado',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    attendanceRate: 98.2,
    lastAccess: 'Hoje, 07:15 • Catraca 02 (Entrada)'
  },
  {
    id: 'st-3',
    name: 'Lucas Ferreira Mendes',
    registration: 'MAT-2026-003',
    classGroup: '2º Ano B',
    birthDate: '10/01/2009',
    responsibleName: 'Juliana Ferreira',
    status: 'Ativo',
    facialStatus: 'Cadastrado',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face',
    attendanceRate: 89.0,
    lastAccess: 'Hoje, 07:44 • Catraca 01 (Entrada - Atraso)'
  },
  {
    id: 'st-4',
    name: 'Mariana Costa Lima',
    registration: 'MAT-2026-004',
    classGroup: '1º Ano A',
    birthDate: '05/11/2010',
    responsibleName: 'Ricardo Lima',
    status: 'Ativo',
    facialStatus: 'Atualização necessária',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    attendanceRate: 94.0,
    lastAccess: 'Hoje, 07:08 • Catraca 03 (Entrada)'
  },
  {
    id: 'st-5',
    name: 'Gabriel Santos Ramos',
    registration: 'MAT-2026-005',
    classGroup: '3º Ano B',
    birthDate: '18/06/2008',
    responsibleName: 'Fernanda Ramos',
    status: 'Ativo',
    facialStatus: 'Cadastrado',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face',
    attendanceRate: 91.5,
    lastAccess: 'Hoje, 07:20 • Catraca 01 (Entrada)'
  },
  {
    id: 'st-6',
    name: 'Camila Nogueira Rocha',
    registration: 'MAT-2026-006',
    classGroup: '2º Ano A',
    birthDate: '30/03/2009',
    responsibleName: 'Eduardo Rocha',
    status: 'Ativo',
    facialStatus: 'Não cadastrado',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    attendanceRate: 85.0,
    lastAccess: 'Ontem, 17:30 • Catraca 02 (Saída)'
  }
];

export const mockTurnstiles: Turnstile[] = [
  {
    id: 'trn-1',
    name: 'Catraca 01 - Portaria Principal',
    location: 'Acesso A (Alunos Ensino Médio)',
    status: 'Online',
    lastPing: 'Há 5 segundos',
    totalPassagesToday: 412,
    firmwareVersion: 'v3.4.1-ai'
  },
  {
    id: 'trn-2',
    name: 'Catraca 02 - Portaria Principal',
    location: 'Acesso B (Alunos Fundamental)',
    status: 'Online',
    lastPing: 'Há 3 segundos',
    totalPassagesToday: 388,
    firmwareVersion: 'v3.4.1-ai'
  },
  {
    id: 'trn-3',
    name: 'Catraca 03 - Pátio & Ginásio',
    location: 'Complexo Esportivo / Fundos',
    status: 'Online',
    lastPing: 'Há 12 segundos',
    totalPassagesToday: 194,
    firmwareVersion: 'v3.4.0-ai'
  },
  {
    id: 'trn-4',
    name: 'Catraca 04 - Bloco Laboratórios',
    location: 'Área Tecnológica',
    status: 'Manutenção',
    lastPing: 'Há 45 minutos',
    totalPassagesToday: 0,
    firmwareVersion: 'v3.3.8-ai'
  }
];

export const mockAccessLogs: AccessLog[] = [
  {
    id: 'log-1',
    studentName: 'João Pedro Silva',
    registration: 'MAT-2026-001',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    turnstileName: 'Catraca 01 - Portaria Principal',
    date: '02/10/2026',
    time: '07:12:44',
    type: 'Entrada',
    status: 'Autorizado',
    notes: 'Identificado em 0.28s • Liveness aprovado'
  },
  {
    id: 'log-2',
    studentName: 'Beatriz Vasconcelos',
    registration: 'MAT-2026-002',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    turnstileName: 'Catraca 02 - Portaria Principal',
    date: '02/10/2026',
    time: '07:15:10',
    type: 'Entrada',
    status: 'Autorizado',
    notes: 'Identificado em 0.31s'
  },
  {
    id: 'log-3',
    studentName: 'Lucas Ferreira Mendes',
    registration: 'MAT-2026-003',
    studentAvatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face',
    turnstileName: 'Catraca 01 - Portaria Principal',
    date: '02/10/2026',
    time: '07:44:19',
    type: 'Entrada',
    status: 'Autorizado',
    notes: 'Atraso de 14 min registrado automaticamente'
  },
  {
    id: 'log-4',
    studentName: 'Mariana Costa Lima',
    registration: 'MAT-2026-004',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    turnstileName: 'Catraca 03 - Pátio & Ginásio',
    date: '02/10/2026',
    time: '07:08:02',
    type: 'Entrada',
    status: 'Autorizado',
    notes: 'Biometria facial validada'
  },
  {
    id: 'log-5',
    studentName: 'Pessoa Não Identificada',
    registration: 'N/A',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
    turnstileName: 'Catraca 02 - Portaria Principal',
    date: '02/10/2026',
    time: '07:31:05',
    type: 'Entrada',
    status: 'Negado',
    notes: 'Rosto sem registro na base • Catraca permaneceu travada'
  },
  {
    id: 'log-6',
    studentName: 'Gabriel Santos Ramos',
    registration: 'MAT-2026-005',
    studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face',
    turnstileName: 'Catraca 01 - Portaria Principal',
    date: '02/10/2026',
    time: '07:20:55',
    type: 'Entrada',
    status: 'Autorizado',
    notes: 'Entrada regular'
  }
];

export const mockDelayLogs: DelayLog[] = [
  {
    id: 'del-1',
    studentName: 'Lucas Ferreira Mendes',
    studentAvatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&h=150&fit=crop&crop=face',
    classGroup: '2º Ano B',
    expectedTime: '07:30',
    registeredTime: '07:44',
    delayMinutes: 14,
    date: '02/10/2026'
  },
  {
    id: 'del-2',
    studentName: 'Enzo Gabriel Castro',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    classGroup: '1º Ano C',
    expectedTime: '07:30',
    registeredTime: '07:49',
    delayMinutes: 19,
    date: '02/10/2026'
  },
  {
    id: 'del-3',
    studentName: 'Larissa Alencar',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    classGroup: '3º Ano A',
    expectedTime: '07:30',
    registeredTime: '07:38',
    delayMinutes: 8,
    date: '01/10/2026'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Entrada Registrada na Catraca',
    message: 'João Pedro Silva passou pela Catraca 01 às 07:12:44.',
    category: 'Entrada',
    timestamp: 'Hoje, 07:12',
    read: false,
    studentName: 'João Pedro Silva'
  },
  {
    id: 'notif-2',
    title: 'Atraso Identificado',
    message: 'Lucas Ferreira Mendes registrou entrada com 14 minutos de tolerância ultrapassada.',
    category: 'Atraso',
    timestamp: 'Hoje, 07:44',
    read: false,
    studentName: 'Lucas Ferreira Mendes'
  },
  {
    id: 'notif-3',
    title: 'Tentativa de Acesso Negada',
    message: 'Rosto não cadastrado tentou passar pela Catraca 02. Rotor mantido bloqueado.',
    category: 'Segurança',
    timestamp: 'Hoje, 07:31',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Atualização de Firmware da Catraca',
    message: 'Catraca 01 e 02 atualizadas para o algoritmo de liveness v3.4.1 com sucesso.',
    category: 'Sistema',
    timestamp: 'Ontem, 22:15',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Ausência Registrada no Turno',
    message: 'Camila Nogueira não registrou entrada até as 08:00 no sistema escolar.',
    category: 'Ausência',
    timestamp: 'Ontem, 08:05',
    read: true,
    studentName: 'Camila Nogueira'
  }
];

export const mockClassGroups: ClassGroup[] = [
  {
    id: 'cls-1',
    name: '3º Ano A - Ensino Médio',
    totalStudents: 34,
    presentToday: 33,
    absentToday: 1,
    delayedToday: 2,
    averageAttendance: 97.4,
    grade: 'Ensino Médio'
  },
  {
    id: 'cls-2',
    name: '2º Ano B - Ensino Médio',
    totalStudents: 32,
    presentToday: 29,
    absentToday: 3,
    delayedToday: 4,
    averageAttendance: 91.2,
    grade: 'Ensino Médio'
  },
  {
    id: 'cls-3',
    name: '1º Ano A - Ensino Médio',
    totalStudents: 35,
    presentToday: 34,
    absentToday: 1,
    delayedToday: 1,
    averageAttendance: 96.8,
    grade: 'Ensino Médio'
  },
  {
    id: 'cls-4',
    name: '9º Ano A - Ensino Fundamental',
    totalStudents: 30,
    presentToday: 28,
    absentToday: 2,
    delayedToday: 0,
    averageAttendance: 94.5,
    grade: 'Fundamental II'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Manutenção Preventiva das Catracas do Bloco B',
    content: 'Informamos que a Catraca 04 passará por alinhamento eletromecânico nesta sexta-feira às 18h.',
    date: '02/10/2026',
    author: 'Coordenação de Infraestrutura',
    targetAudience: 'Todos os Colaboradores'
  },
  {
    id: 'anc-2',
    title: 'Cadastro Biométrico de Novos Alunos Transferidos',
    content: 'A secretaria escolar estará realizando a captura fotográfica biométrica para novos alunos no terminal de homologação.',
    date: '01/10/2026',
    author: 'Direção Geral',
    targetAudience: 'Professores e Pais'
  }
];
