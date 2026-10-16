import React, { useState } from 'react';
import { VisionPassLogo } from '../components/VisionPassLogo';
import { User } from '../types';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  ClipboardCheck, 
  ArrowLeftRight, 
  Clock, 
  BellRing, 
  HeartHandshake, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Search,
  ChevronRight
} from 'lucide-react';

export type DashboardView = 
  | 'dashboard' 
  | 'alunos' 
  | 'catracas' 
  | 'presenca' 
  | 'entradas-saidas' 
  | 'atrasos' 
  | 'notificacoes' 
  | 'responsaveis' 
  | 'professores' 
  | 'relatorios' 
  | 'configuracoes';

interface DashboardLayoutProps {
  currentUser: User;
  currentView: DashboardView;
  onNavigate: (view: DashboardView) => void;
  onLogout: () => void;
  unreadNotificationsCount?: number;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentUser,
  currentView,
  onNavigate,
  onLogout,
  unreadNotificationsCount = 2,
  children
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { id: DashboardView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alunos', label: 'Alunos', icon: Users },
    { id: 'catracas', label: 'Catracas', icon: ShieldCheck },
    { id: 'presenca', label: 'Presença', icon: ClipboardCheck },
    { id: 'entradas-saidas', label: 'Entradas e Saídas', icon: ArrowLeftRight },
    { id: 'atrasos', label: 'Atrasos', icon: Clock },
    { id: 'notificacoes', label: 'Notificações', icon: BellRing },
    { id: 'responsaveis', label: 'Responsáveis', icon: HeartHandshake },
    { id: 'professores', label: 'Professores', icon: GraduationCap },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  const currentNavItem = navItems.find((item) => item.id === currentView) || navItems[0];

  const handleSelectNav = (view: DashboardView) => {
    onNavigate(view);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#09070D] text-[#F8F7FF] flex flex-col md:flex-row">
      
      {/* ========================================================
          SIDEBAR DESKTOP & MOBILE
          ======================================================== */}
      {/* Backdrop Mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 bottom-0 left-0 z-50 w-64 bg-[#110D18] border-r border-[#A855F7]/20 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Topo do Sidebar com Logo */}
          <div className="h-20 px-6 border-b border-[#A855F7]/15 flex items-center justify-between">
            <VisionPassLogo size="sm" showTrademark={true} />
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-[#B8B0C7] hover:text-white p-1"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tag de Instituição */}
          <div className="px-6 py-3 bg-[#17121F]/60 border-b border-[#A855F7]/10 flex items-center justify-between">
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-[#A855F7] tracking-wider block">
                Instituição Ativa
              </span>
              <span className="text-xs font-semibold text-[#F8F7FF] truncate block">
                {currentUser.institutionName || 'Colégio Inovação & Tecnologia'}
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Sistema Conectado" />
          </div>

          {/* Lista de Navegação */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]" aria-label="Menu do Sistema">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              const isNotif = item.id === 'notificacoes' && unreadNotificationsCount > 0;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md shadow-[#7C3AED]/25 font-bold'
                      : 'text-[#B8B0C7] hover:text-white hover:bg-[#17121F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#C084FC]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {isNotif && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Rodapé do Sidebar com Perfil e Logout */}
        <div className="p-4 border-t border-[#A855F7]/15 bg-[#17121F]/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 truncate">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full border border-[#A855F7]/40 object-cover shrink-0"
              />
              <div className="truncate">
                <span className="text-xs font-bold text-[#F8F7FF] block truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-[#A855F7] font-semibold uppercase">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-[#B8B0C7] hover:text-rose-400 hover:bg-[#21192D] transition-colors cursor-pointer"
              title="Encerrar Sessão"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-center text-[#B8B0C7]/60 font-mono">
            VisionPass™ v1.0.0
          </div>
        </div>
      </aside>

      {/* ========================================================
          CONTEÚDO PRINCIPAL (HEADER + BREADCRUMB + VIEW)
          ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Superior da Área Interna */}
        <header className="h-20 bg-[#110D18]/90 backdrop-blur-md border-b border-[#A855F7]/20 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-[#17121F] border border-[#A855F7]/30 text-[#B8B0C7] hover:text-white"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <span className="text-[#B8B0C7]">Sistema</span>
              <ChevronRight className="w-4 h-4 text-[#A855F7]" />
              <span className="text-[#F8F7FF] font-bold">{currentNavItem.label}</span>
            </div>
          </div>

          {/* Lado Direito do Header: Busca Rápida & Notificações */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center relative">
              <Search className="w-4 h-4 text-[#B8B0C7] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar aluno, turma ou catraca..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-[#17121F] border border-[#A855F7]/30 text-xs text-[#F8F7FF] placeholder:text-[#B8B0C7]/50 focus:outline-none focus:ring-1 focus:ring-[#A855F7] w-64"
              />
            </div>

            {/* Botão Centro de Notificações */}
            <button
              onClick={() => onNavigate('notificacoes')}
              className="relative p-2.5 rounded-xl bg-[#17121F] border border-[#A855F7]/30 text-[#B8B0C7] hover:text-white hover:border-[#A855F7] transition-colors cursor-pointer"
              title="Notificações"
            >
              <BellRing className="w-4 h-4 text-[#C084FC]" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          </div>

        </header>

        {/* View / Conteúdo Ativo */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          {children}
        </main>

      </div>

    </div>
  );
};
