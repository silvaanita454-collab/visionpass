import React, { useState } from 'react';
import { VisionPassLogo } from '../components/VisionPassLogo';
import { ViziMascot } from '../components/ViziMascot';
import { Card, Button, Input } from '../components/UIComponents';
import { UserRole, User } from '../types';
import { mockCurrentUser } from '../data/mockData';
import { ArrowLeft, Mail, Lock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: User) => void;
  onBackToHome: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');
  const [email, setEmail] = useState('admin@visionpass.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMsg('');
    if (role === 'ADMIN') {
      setEmail('admin@visionpass.com');
      setPassword('123456');
    } else if (role === 'TEACHER') {
      setEmail('prof.carlos@visionpass.com');
      setPassword('123456');
    } else {
      setEmail('pai.joao@gmail.com');
      setPassword('123456');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Preencha seu e-mail e sua senha.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Simulação da autenticação com delay realista
    setTimeout(() => {
      setIsLoading(false);
      const user = mockCurrentUser[selectedRole];
      onLoginSuccess(user);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#09070D] flex flex-col justify-center relative overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Glow de fundo */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C084FC]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Botão de retorno à home */}
      <div className="max-w-6xl w-full mx-auto mb-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#B8B0C7] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#A855F7]" />
          <span>Voltar à página inicial</span>
        </button>
      </div>

      {/* Grid com Layout Dividido */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* ========================================================
            LADO ESQUERDO: VIZI, LOGO & MENSAGEM
            ======================================================== */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <VisionPassLogo size="lg" showTrademark={true} />

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              Bem-vindo ao VisionPass
            </h1>
            <p className="text-base sm:text-lg text-[#C084FC] font-medium">
              "Seu acesso inteligente começa aqui."
            </p>
          </div>

          <p className="text-sm text-[#B8B0C7] max-w-md leading-relaxed">
            Acesse os registros em tempo real da catraca com reconhecimento facial, frequência escolar e notificações institucionais.
          </p>

          {/* Vizi animado fofo recebendo o usuário */}
          <div className="pt-4 flex flex-col items-center lg:items-start">
            <ViziMascot
              expression="happy"
              size="lg"
              animate={true}
              showSpeechBubble="Pronto para entrar? Escolha seu perfil!"
            />
          </div>
        </div>

        {/* ========================================================
            LADO DIREITO: CARD DE LOGIN & SELEÇÃO DE PERFIL
            ======================================================== */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto">
          <Card className="p-8 sm:p-9 border-[#A855F7]/35 shadow-2xl shadow-purple-950/40">
            
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#A855F7]/20">
              <ShieldCheck className="w-5 h-5 text-[#C084FC]" />
              <span className="text-xs font-bold text-[#F8F7FF] uppercase tracking-wider">
                Autenticação no Sistema
              </span>
            </div>

            {/* Seleção de Perfil (Administrador, Professor, Responsável) */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs font-semibold text-[#B8B0C7]">
                Selecione o seu perfil de acesso:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { role: 'ADMIN' as UserRole, label: 'Administrador' },
                  { role: 'TEACHER' as UserRole, label: 'Professor' },
                  { role: 'RESPONSIBLE' as UserRole, label: 'Responsável' }
                ].map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleChange(item.role)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      selectedRole === item.role
                        ? 'bg-[#7C3AED] text-white border-[#C084FC] shadow-md shadow-[#7C3AED]/30'
                        : 'bg-[#110D18] text-[#B8B0C7] border-[#A855F7]/25 hover:border-[#A855F7]/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Formulário de Login */}
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              <Input
                label="E-mail ou Identificador"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@escola.edu.br"
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />

              <div className="space-y-1">
                <Input
                  label="Senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  leftIcon={<Lock className="w-4 h-4" />}
                  required
                />
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => alert('Em ambiente acadêmico demonstrativo, utilize a senha padrão 123456.')}
                    className="text-xs text-[#A855F7] hover:text-[#C084FC] transition-colors cursor-pointer"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Entrar
                </Button>
              </div>

              {/* Dica de demonstração para os avaliadores */}
              <div className="pt-4 border-t border-[#A855F7]/15">
                <div className="flex items-center gap-2 text-xs text-[#B8B0C7]">
                  <UserCheck className="w-4 h-4 text-[#A855F7]" />
                  <span>Acesso demonstrativo pré-preenchido por perfil</span>
                </div>
              </div>

            </form>

          </Card>
        </div>

      </div>
    </div>
  );
};
