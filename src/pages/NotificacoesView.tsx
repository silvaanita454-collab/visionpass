import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/UIComponents';
import { mockNotifications } from '../data/mockData';
import { NotificationItem, NotificationCategory } from '../types';
import { 
  BellRing, 
  CheckCheck, 
  ArrowDownRight, 
  ArrowUpRight, 
  Clock, 
  UserX, 
  ShieldAlert, 
  Cpu 
} from 'lucide-react';

interface NotificacoesViewProps {
  onNotificationReadChange?: (unreadCount: number) => void;
}

export const NotificacoesView: React.FC<NotificacoesViewProps> = ({ onNotificationReadChange }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | NotificationCategory>('ALL');

  const handleMarkAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    if (onNotificationReadChange) onNotificationReadChange(0);
  };

  const handleToggleRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: !n.read } : n));
    setNotifications(updated);
    const unread = updated.filter((n) => !n.read).length;
    if (onNotificationReadChange) onNotificationReadChange(unread);
  };

  const getCategoryIcon = (cat: NotificationCategory) => {
    switch (cat) {
      case 'Entrada':
        return <ArrowDownRight className="w-4 h-4 text-emerald-400" />;
      case 'Saída':
        return <ArrowUpRight className="w-4 h-4 text-blue-400" />;
      case 'Atraso':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'Ausência':
        return <UserX className="w-4 h-4 text-rose-400" />;
      case 'Segurança':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      case 'Sistema':
        return <Cpu className="w-4 h-4 text-[#C084FC]" />;
    }
  };

  const filteredNotifs = notifications.filter(
    (n) => selectedCategory === 'ALL' || n.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      
      {/* Topo do Centro de Notificações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Centro de Notificações</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Histórico completo de alertas de acesso, atrasos e eventos de segurança das catracas
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleMarkAllAsRead}
          leftIcon={<CheckCheck className="w-4 h-4 text-[#C084FC]" />}
        >
          Marcar todas como lidas
        </Button>
      </div>

      {/* Filtro por Categorias */}
      <div className="flex flex-wrap gap-2 pb-2">
        {(['ALL', 'Entrada', 'Saída', 'Atraso', 'Ausência', 'Sistema', 'Segurança'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#7C3AED] text-white border-[#C084FC]'
                : 'bg-[#17121F] text-[#B8B0C7] border-[#A855F7]/20 hover:text-white'
            }`}
          >
            {cat === 'ALL' ? 'Todas' : cat}
          </button>
        ))}
      </div>

      {/* Lista de Notificações */}
      <div className="space-y-3">
        {filteredNotifs.map((n) => (
          <Card
            key={n.id}
            onClick={() => handleToggleRead(n.id)}
            className={`p-5 flex items-start gap-4 transition-all ${
              !n.read ? 'border-[#A855F7] bg-[#17121F]' : 'border-[#A855F7]/15 bg-[#110D18]'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#09070D] border border-[#A855F7]/30 flex items-center justify-center shrink-0">
              {getCategoryIcon(n.category)}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold ${!n.read ? 'text-[#F8F7FF]' : 'text-[#B8B0C7]'}`}>
                    {n.title}
                  </h4>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-rose-500" title="Não lida" />
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#B8B0C7]">{n.timestamp}</span>
              </div>

              <p className="text-xs text-[#B8B0C7] leading-relaxed">{n.message}</p>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
