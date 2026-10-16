import React, { useState, useEffect } from 'react';
import { X, Lock, User, Mail, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'family' | 'staff'>('family');
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Bloqueia scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setMessage(null);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleQuickFill = (user: string, pass: string) => {
    setLoginInput(user);
    setPassword(pass);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginInput || !password) {
      setMessage({ type: 'error', text: 'Por favor, preencha todos os campos.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Tentativa de autenticação na API local existente
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: loginInput,
          password: password,
          role: activeTab === 'family' ? 'RESPONSIBLE' : undefined
        }),
      });

      const data = await response.json();

      if (response.ok && data.user) {
        setMessage({
          type: 'success',
          text: `Autenticado com sucesso como ${data.user.name} (${data.user.role || 'Usuário'}). Conexão estabelecida com a gestão escolar!`
        });
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Credenciais inválidas. Verifique seu login e senha.'
        });
      }
    } catch {
      // Fallback em caso de API offline ou demonstração frontend
      setMessage({
        type: 'info',
        text: `Modo de Demonstração: Estrutura de autenticação pronta para receber o backend. Entrada recebida para "${loginInput}".`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative animate-scaleUp">
        
        {/* Topo do Modal com Gradiente */}
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-500 px-6 py-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-brand-200" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-100">
              Portal VisionPass
            </span>
          </div>
          <h3 id="modal-title" className="text-xl font-bold">
            Acessar Sistema
          </h3>
          <p className="text-xs text-brand-100 mt-0.5">
            Acesso seguro para alunos, responsáveis e equipe escolar
          </p>
        </div>

        {/* Abas de Seleção de Perfil */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setActiveTab('family');
              setMessage(null);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center border-b-2 ${
              activeTab === 'family'
                ? 'border-brand-600 text-brand-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Alunos & Responsáveis
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('staff');
              setMessage(null);
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center border-b-2 ${
              activeTab === 'staff'
                ? 'border-brand-600 text-brand-700 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Equipe Escolar & Gestão
          </button>
        </div>

        {/* Corpo do Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {message && (
            <div
              className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                message.type === 'success'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : message.type === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              )}
              <span className="leading-relaxed">{message.text}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {activeTab === 'family' ? 'CPF ou Matrícula do Aluno' : 'E-mail Institucional'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                {activeTab === 'family' ? <User className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
              </div>
              <input
                type={activeTab === 'family' ? 'text' : 'email'}
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder={activeTab === 'family' ? 'Ex: MAT-2026-001 ou CPF' : 'nome@colegio.edu.br'}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Senha de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <span>{isLoading ? 'Autenticando...' : 'Entrar no Sistema'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Atalhos para Contas de Demonstração do Projeto */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              Acesso Rápido para Avaliação:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeTab === 'family' ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('MAT-2026-001', '123456')}
                    className="text-[10px] bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-2 py-1 rounded transition-colors"
                  >
                    Aluno (João Pedro)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('pai.joao@gmail.com', '123456')}
                    className="text-[10px] bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-2 py-1 rounded transition-colors"
                  >
                    Responsável (Carlos)
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('admin@visionpass.com', '123456')}
                    className="text-[10px] bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-2 py-1 rounded transition-colors"
                  >
                    Direção / ADM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('prof.carlos@visionpass.com', '123456')}
                    className="text-[10px] bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-2 py-1 rounded transition-colors"
                  >
                    Professor Carlos
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill('coord@visionpass.com', '123456')}
                    className="text-[10px] bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-600 px-2 py-1 rounded transition-colors"
                  >
                    Coordenação
                  </button>
                </>
              )}
            </div>
          </div>

        </form>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Ambiente acadêmico seguro • Protegido com criptografia e registro de auditoria
          </p>
        </div>

      </div>
    </div>
  );
};
