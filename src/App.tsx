import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { DashboardLayout, DashboardView } from './layouts/DashboardLayout';
import { DashboardView as DashboardMainView } from './pages/DashboardView';
import { AlunosView } from './pages/AlunosView';
import { CatracasView } from './pages/CatracasView';
import { PresencaView } from './pages/PresencaView';
import { EntradasSaidasView } from './pages/EntradasSaidasView';
import { AtrasosView } from './pages/AtrasosView';
import { ResponsaveisView } from './pages/ResponsaveisView';
import { ProfessoresView } from './pages/ProfessoresView';
import { RelatoriosView } from './pages/RelatoriosView';
import { ConfiguracoesView } from './pages/ConfiguracoesView';
import { NotificacoesView } from './pages/NotificacoesView';
import { User } from './types';
import { mockCurrentUser } from './data/mockData';

export const App: React.FC = () => {
  // Telas da aplicação: 'home' (Landing Page pública), 'login' (Autenticação), 'app' (Sistema Interno)
  const [currentScreen, setCurrentScreen] = useState<'home' | 'login' | 'app'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentDashboardView, setCurrentDashboardView] = useState<DashboardView>('dashboard');
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const handleGoToLogin = () => {
    setCurrentScreen('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    // Se for Responsável, já abre na visão de Responsáveis; se Professor, na visão de Professores; se Admin, no Dashboard
    if (user.role === 'RESPONSIBLE') {
      setCurrentDashboardView('responsaveis');
    } else if (user.role === 'TEACHER') {
      setCurrentDashboardView('professores');
    } else {
      setCurrentDashboardView('dashboard');
    }
    setCurrentScreen('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renderização da Visão Interna Ativa
  const renderDashboardContent = () => {
    switch (currentDashboardView) {
      case 'dashboard':
        return <DashboardMainView onNavigateTo={(v) => setCurrentDashboardView(v)} />;
      case 'alunos':
        return <AlunosView />;
      case 'catracas':
        return <CatracasView />;
      case 'presenca':
        return <PresencaView />;
      case 'entradas-saidas':
        return <EntradasSaidasView />;
      case 'atrasos':
        return <AtrasosView />;
      case 'responsaveis':
        return <ResponsaveisView />;
      case 'professores':
        return <ProfessoresView />;
      case 'relatorios':
        return <RelatoriosView />;
      case 'configuracoes':
        return <ConfiguracoesView />;
      case 'notificacoes':
        return (
          <NotificacoesView
            onNotificationReadChange={(count) => setUnreadNotifications(count)}
          />
        );
      default:
        return <DashboardMainView onNavigateTo={(v) => setCurrentDashboardView(v)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#09070D] text-[#F8F7FF] selection:bg-[#7C3AED] selection:text-white">
      
      {/* 1. Landing Page Pública do VisionPass */}
      {currentScreen === 'home' && (
        <Home onGoToLogin={handleGoToLogin} />
      )}

      {/* 2. Tela de Login com Vizi e Perfis */}
      {currentScreen === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={handleBackToHome}
        />
      )}

      {/* 3. Sistema Interno Administrativo / Escolar */}
      {currentScreen === 'app' && currentUser && (
        <DashboardLayout
          currentUser={currentUser}
          currentView={currentDashboardView}
          onNavigate={(view) => setCurrentDashboardView(view)}
          onLogout={handleLogout}
          unreadNotificationsCount={unreadNotifications}
        >
          {renderDashboardContent()}
        </DashboardLayout>
      )}

    </div>
  );
};

export default App;
