import React, { useState } from 'react';
import { VisionPassLogo } from '../components/VisionPassLogo';
import { ViziMascot } from '../components/ViziMascot';
import { TurnstileInteractive } from '../components/TurnstileInteractive';
import { Card, Badge, Button } from '../components/UIComponents';
import { 
  ScanFace, 
  ShieldCheck, 
  Clock, 
  Users, 
  Activity, 
  MessageSquare, 
  LayoutDashboard,
  Server,
  Database,
  BellRing,
  ArrowRight,
  Sparkles,
  School,
  GraduationCap,
  HeartHandshake,
  DoorOpen,
  ClipboardList,
  BarChart3,
  Smartphone,
  Network,
  Bot,
  Info,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  ArrowUp
} from 'lucide-react';

interface HomeProps {
  onGoToLogin: () => void;
}

export const Home: React.FC<HomeProps> = ({ onGoToLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Benefícios', href: '#beneficios' },
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'IA', href: '#ia' },
    { label: 'Sobre', href: '#sobre' },
  ];

  return (
    <div className="min-h-screen bg-[#09070D] text-[#F8F7FF] selection:bg-[#7C3AED] selection:text-white">
      
      {/* ========================================================
          1. HEADER FIXO
          ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo com ícone e símbolo ™ */}
            <a href="#inicio" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] rounded-xl p-1">
              <VisionPassLogo size="md" showTrademark={true} />
            </a>

            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegação Principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-[#B8B0C7] hover:text-[#F8F7FF] hover:bg-[#17121F] rounded-xl transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Botão Acessar Sistema (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={onGoToLogin}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Acessar sistema
              </Button>
            </div>

            {/* Menu Mobile Hambúrguer */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="primary" size="sm" onClick={onGoToLogin}>
                Entrar
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-[#17121F] border border-[#A855F7]/30 text-[#B8B0C7] hover:text-white focus:outline-none"
                aria-label="Abrir menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`h-0.5 w-full bg-current transform transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`h-0.5 w-full bg-current transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-0.5 w-full bg-current transform transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Drawer Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#110D18] border-b border-[#A855F7]/25 px-4 pt-3 pb-6 animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-[#B8B0C7] hover:text-white hover:bg-[#17121F] rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#A855F7]/20">
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGoToLogin();
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Acessar sistema
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ========================================================
          2. HERO COM VIZI & CATRACA INTELIGENTE
          ======================================================== */}
      <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-[#7C3AED]/20 via-[#4C1D95]/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Lado Esquerdo: Mensagem e CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17121F] border border-[#A855F7]/40 text-[#C084FC] text-xs font-semibold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
                <span>Reconhecimento Facial Integrado a Catracas</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F8F7FF] leading-[1.12]">
                Controle de acesso inteligente para <span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#7C3AED] bg-clip-text text-transparent">instituições de ensino</span>
              </h1>

              <p className="text-base sm:text-lg text-[#B8B0C7] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                O VisionPass utiliza reconhecimento facial integrado a catracas inteligentes para automatizar a identificação, registrar entradas e saídas e facilitar a gestão escolar.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#como-funciona"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:brightness-110 shadow-lg shadow-[#7C3AED]/30 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Conheça o VisionPass</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onGoToLogin}
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#C084FC]" />}
                >
                  Acessar sistema
                </Button>
              </div>

              {/* Destaque com o mascote Vizi */}
              <div className="pt-6 border-t border-[#A855F7]/15 flex items-center justify-center lg:justify-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#17121F] border border-[#A855F7]/30 flex items-center justify-center p-1 shrink-0">
                  <ViziMascot expression="happy" size="sm" animate={false} />
                </div>
                <div className="text-left text-xs">
                  <span className="font-bold text-[#F8F7FF] block">Conheça o Vizi</span>
                  <span className="text-[#B8B0C7]">O mascote oficial do VisionPass: tecnologia que aproxima</span>
                </div>
              </div>

            </div>

            {/* Lado Direito: Ilustração da Catraca Inteligente + Vizi */}
            <div className="lg:col-span-5 flex justify-center">
              <TurnstileInteractive showVizi={true} />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. SEÇÃO COMO FUNCIONA (FLUXO 01 a 05)
          ======================================================== */}
      <section id="como-funciona" className="py-24 bg-[#110D18] border-y border-[#A855F7]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Fluxo Tecnológico</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              Como Funciona o VisionPass
            </h2>
            <p className="text-base text-[#B8B0C7]">
              Um fluxo contínuo e integrado: da validação facial no equipamento físico da catraca até a atualização dos relatórios e avisos aos responsáveis.
            </p>
          </div>

          {/* Grid dos 5 Passos Conectados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Catraca com Reconhecimento Facial',
                desc: 'A catraca identifica o aluno por meio do reconhecimento facial em milissegundos.',
                icon: ScanFace
              },
              {
                step: '02',
                title: 'Identificação',
                desc: 'O sistema compara a identificação facial com os dados biométricos cadastrados.',
                icon: ShieldCheck
              },
              {
                step: '03',
                title: 'API / Backend',
                desc: 'O registro é processado com validação de horários, tolerâncias e permissões.',
                icon: Server
              },
              {
                step: '04',
                title: 'Banco de Dados',
                desc: 'As informações de entrada/saída são armazenadas com integridade relacional.',
                icon: Database
              },
              {
                step: '05',
                title: 'Painéis e Notificações',
                desc: 'Os dados ficam disponíveis para gestores, professores e responsáveis em tempo real.',
                icon: BellRing
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="flex flex-col justify-between relative group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#09070D] border border-[#A855F7]/30 text-[#C084FC]">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/15 text-[#C084FC] flex items-center justify-center border border-[#A855F7]/30 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#F8F7FF] mb-2 leading-snug group-hover:text-[#C084FC] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#B8B0C7] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {index < 4 && (
                    <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-[#A855F7]/40 z-10">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Destaque Institucional sobre o Fluxo */}
          <div className="mt-12 p-5 rounded-2xl bg-[#17121F] border border-[#A855F7]/30 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center font-bold text-sm shrink-0">
                ✓
              </div>
              <p className="text-xs sm:text-sm text-[#F8F7FF]">
                <strong>Fluxo direto e sem atrito:</strong> Catraca com Reconhecimento Facial → API/Backend → Banco de Dados → Painéis e Notificações.
              </p>
            </div>
            <a href="#tecnologia" className="text-xs font-bold text-[#C084FC] hover:underline whitespace-nowrap">
              Ver representação técnica →
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. SEÇÃO BENEFÍCIOS ("POR QUE UTILIZAR O VISIONPASS?")
          ======================================================== */}
      <section id="beneficios" className="py-24 bg-[#09070D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Vantagens & Segurança</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              Por que utilizar o VisionPass?
            </h2>
            <p className="text-base text-[#B8B0C7]">
              Solução desenvolvida para erradicar filas nos portões, modernizar a conferência de presença e conectar a escola à família.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Mais segurança',
                desc: 'Controle de acesso automatizado que barra indivíduos não autorizados na catraca física.'
              },
              {
                icon: Clock,
                title: 'Registro automático',
                desc: 'Entradas e saídas registradas sem processos manuais, papéis ou cartões esquecidos.'
              },
              {
                icon: Users,
                title: 'Redução de filas',
                desc: 'Identificação mais rápida em ~0.3 segundos por aluno nos horários de pico escolar.'
              },
              {
                icon: Activity,
                title: 'Dados em tempo real',
                desc: 'Informações centralizadas e acessíveis imediatamente para coordenação e direção.'
              },
              {
                icon: MessageSquare,
                title: 'Comunicação',
                desc: 'Responsáveis podem receber notificações pontuais no momento da passagem pela catraca.'
              },
              {
                icon: LayoutDashboard,
                title: 'Gestão centralizada',
                desc: 'Instituição consegue acompanhar os registros de frequência e evasão num painel unificado.'
              }
            ].map((ben) => {
              const Icon = ben.icon;
              return (
                <Card key={ben.title} className="group">
                  <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/15 text-[#C084FC] border border-[#A855F7]/30 flex items-center justify-center mb-4 group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F8F7FF] mb-2 group-hover:text-[#C084FC] transition-colors">
                    {ben.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B8B0C7] leading-relaxed">
                    {ben.desc}
                  </p>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. SEÇÃO FUNCIONALIDADES (12 CARDS)
          ======================================================== */}
      <section id="funcionalidades" className="py-24 bg-[#110D18] border-y border-[#A855F7]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Recursos do Sistema</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              Funcionalidades Completas
            </h2>
            <p className="text-base text-[#B8B0C7]">
              Tudo o que sua instituição precisa para uma gestão escolar moderna e transparente.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: ScanFace, title: 'Reconhecimento facial', desc: 'Validação biométrica na catraca' },
              { icon: DoorOpen, title: 'Controle de acesso', desc: 'Permissões por turno e turma' },
              { icon: ArrowRight, title: 'Registro de entradas', desc: 'Timestamp exato no ingresso' },
              { icon: ArrowRight, title: 'Registro de saídas', desc: 'Conferência de liberação' },
              { icon: Clock, title: 'Controle de atrasos', desc: 'Tolerância e cálculo de minutos' },
              { icon: ClipboardList, title: 'Controle de presença', desc: 'Integração com sala de aula' },
              { icon: BellRing, title: 'Notificações', desc: 'Alertas para pais e gestores' },
              { icon: Activity, title: 'Histórico', desc: 'Trilhas de auditoria completas' },
              { icon: BarChart3, title: 'Relatórios', desc: 'Exportação em CSV e métricas' },
              { icon: LayoutDashboard, title: 'Dashboard', desc: 'Visão executiva e operacional' },
              { icon: Users, title: 'Gerenciamento de alunos', desc: 'Cadastro, turmas e vínculos' },
              { icon: ShieldCheck, title: 'Gerenciamento de catracas', desc: 'Monitoramento online/offline' }
            ].map((func) => {
              const Icon = func.icon;
              return (
                <div
                  key={func.title}
                  className="bg-[#17121F] border border-[#A855F7]/20 rounded-2xl p-5 hover:border-[#A855F7]/50 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#09070D] border border-[#A855F7]/30 text-[#C084FC] flex items-center justify-center mb-3 group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#F8F7FF] mb-1 group-hover:text-[#C084FC] transition-colors">
                    {func.title}
                  </h4>
                  <p className="text-[11px] text-[#B8B0C7]">
                    {func.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          6. SEÇÃO INTELIGÊNCIA ARTIFICIAL (PRESENTE VS FUTURO)
          ======================================================== */}
      <section id="ia" className="py-24 bg-[#09070D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Inteligência Artificial</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              Aplicação Ética e Transparente da IA
            </h2>
            <p className="text-base text-[#B8B0C7]">
              Conheça exatamente onde a Inteligência Artificial atua hoje e o que está planejado para o futuro.
            </p>
          </div>

          {/* Bloco Atual: Reconhecimento Facial */}
          <div className="mb-12 bg-gradient-to-br from-[#17121F] via-[#110D18] to-[#21192D] rounded-3xl p-8 border border-[#A855F7]/30 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Atualmente no VisionPass
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F8F7FF]">
                  Reconhecimento Facial Integrado à Catraca
                </h3>

                <p className="text-sm sm:text-base text-[#B8B0C7] leading-relaxed">
                  No presente, a IA é utilizada <strong>exclusivamente no reconhecimento facial</strong>: extração de vetores biométricos, comparação facial em milissegundos e algoritmos de vivacidade (anti-spoofing) diretamente no terminal acoplado à catraca física.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-mono bg-[#09070D] px-3 py-1 rounded-lg border border-[#A855F7]/30 text-[#C084FC]">
                    • Mapeamento de Pontos Nodais
                  </span>
                  <span className="text-xs font-mono bg-[#09070D] px-3 py-1 rounded-lg border border-[#A855F7]/30 text-[#C084FC]">
                    • Detecção de Vivacidade (Liveness)
                  </span>
                  <span className="text-xs font-mono bg-[#09070D] px-3 py-1 rounded-lg border border-[#A855F7]/30 text-[#C084FC]">
                    • Liberação em ~0.3s
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#09070D]/60 rounded-2xl border border-[#A855F7]/25 text-center">
                <ViziMascot expression="happy" size="md" animate={true} />
                <span className="text-xs font-bold text-[#F8F7FF] mt-2">Vizi certifica:</span>
                <span className="text-[11px] text-[#C084FC]">Biometria facial segura e rápida</span>
              </div>

            </div>
          </div>

          {/* Bloco Futuro: Possibilidades Futuras com Etiqueta */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#F8F7FF]">
                Possibilidades Futuras com Inteligência Artificial
              </h3>
              <Badge variant="warning">Possibilidade futura</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ClipboardList,
                  title: 'Chamada automática',
                  desc: 'Preenchimento automatizado da frequência escolar com base nas passagens pela catraca e presença.'
                },
                {
                  icon: TrendingUp,
                  title: 'Análise de frequência',
                  desc: 'Modelos estatísticos preditivos para identificar quedas no rendimento e sazonalidade de faltas.'
                },
                {
                  icon: Clock,
                  title: 'Padrões de atraso',
                  desc: 'Identificação de turmas ou dias da semana com maior propensão a atrasos para suporte da coordenação.'
                },
                {
                  icon: ShieldAlert,
                  title: 'Riscos de evasão',
                  desc: 'Alertas preventivos para que o corpo pedagógico acolha o estudante antes do abandono escolar.'
                },
                {
                  icon: ShieldCheck,
                  title: 'Tentativas de fraude',
                  desc: 'Modelos neurais aprofundados para detecção de deepfakes, máscaras 3D e fotos impressas.'
                },
                {
                  icon: BarChart3,
                  title: 'Relatórios inteligentes',
                  desc: 'Geração de sínteses analíticas automatizadas para reuniões de conselho e direção.'
                }
              ].map((fut) => {
                const Icon = fut.icon;
                return (
                  <Card key={fut.title} className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/20 text-[#C084FC] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                          Possibilidade futura
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-[#F8F7FF] mb-2">{fut.title}</h4>
                      <p className="text-xs sm:text-sm text-[#B8B0C7] leading-relaxed">{fut.desc}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-[#110D18] border border-[#A855F7]/25 text-xs text-[#B8B0C7] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
              <span>
                <strong>Nota de integridade acadêmica:</strong> Recursos de chamada preditiva e análise de evasão estão identificados como <em>possibilidade futura</em> e representam metas do projeto de pesquisa, não estando ativos na operação corrente.
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          7. SEÇÃO PARA QUEM É (3 CARDS)
          ======================================================== */}
      <section className="py-24 bg-[#110D18] border-y border-[#A855F7]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Público-Alvo</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              Para Quem É o VisionPass?
            </h2>
            <p className="text-base text-[#B8B0C7]">
              Benefícios diretos para toda a comunidade educacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: School,
                title: 'Instituição',
                subtitle: 'Diretoria e Coordenação',
                desc: 'Centralização dos registros de acesso, controle de perímetro rigoroso, redução de custos com crachás físicos e auditoria completa.',
                points: ['Gestão centralizada do campus', 'Controle de catracas em tempo real', 'Relatórios oficiais de frequência']
              },
              {
                icon: GraduationCap,
                title: 'Professores',
                subtitle: 'Corpo Docente',
                desc: 'Acompanhamento ágil de presença e frequência, eliminando o tempo perdido com chamadas manuais para focar no conteúdo pedagógico.',
                points: ['Fim da chamada no papel', 'Visão imediata dos presentes', 'Envio de comunicados às turmas']
              },
              {
                icon: HeartHandshake,
                title: 'Pais e Responsáveis',
                subtitle: 'Família do Aluno',
                desc: 'Acompanhamento em tempo real das entradas, saídas, atrasos e notificações, trazendo tranquilidade e aproximação contínua com a rotina do aluno.',
                points: ['Alertas de passagem na catraca', 'Histórico de assiduidade escolar', 'Acompanhamento de pontualidade']
              }
            ].map((aud) => {
              const Icon = aud.icon;
              return (
                <Card key={aud.title} className="flex flex-col justify-between p-8">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#7C3AED]/20 text-[#C084FC] border border-[#A855F7]/30 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-[#F8F7FF] mb-1">{aud.title}</h3>
                    <span className="text-xs font-semibold text-[#A855F7] block mb-4">{aud.subtitle}</span>

                    <p className="text-xs sm:text-sm text-[#B8B0C7] leading-relaxed mb-6">
                      {aud.desc}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#A855F7]/15">
                      {aud.points.map((pt, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#F8F7FF]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C084FC] shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          8. SEÇÃO TECNOLOGIA (PIPELINE VISUAL)
          ======================================================== */}
      <section id="tecnologia" className="py-24 bg-[#09070D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Arquitetura de Integração</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              Tecnologia do VisionPass
            </h2>
            <p className="text-base text-[#B8B0C7]">
              Representação visual da cadeia de dados da ponta física ao painel dos usuários:
            </p>
          </div>

          {/* Pipeline: Reconhecimento Facial → Catraca → API → Banco de Dados → Dashboard → Notificações */}
          <div className="p-8 rounded-3xl bg-[#17121F] border border-[#A855F7]/30 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
              {[
                { label: 'Reconhecimento Facial', sub: 'Biometria na ponta', icon: ScanFace },
                { label: 'Catraca', sub: 'Mecanismo físico', icon: ShieldCheck },
                { label: 'API', sub: 'Backend RESTful', icon: Server },
                { label: 'Banco de Dados', sub: 'Persistência segura', icon: Database },
                { label: 'Dashboard', sub: 'Painéis web modernos', icon: LayoutDashboard },
                { label: 'Notificações', sub: 'Alertas familiares', icon: BellRing }
              ].map((node, idx) => {
                const Icon = node.icon;
                return (
                  <div key={node.label} className="flex flex-col items-center text-center p-4 bg-[#110D18] rounded-2xl border border-[#A855F7]/25 relative">
                    <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/20 text-[#C084FC] border border-[#A855F7]/35 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#F8F7FF] leading-tight mb-1">{node.label}</span>
                    <span className="text-[10px] text-[#B8B0C7]">{node.sub}</span>

                    {idx < 5 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-[#A855F7] z-10">
                        →
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center text-xs text-[#B8B0C7]">
              Catraca com Reconhecimento Facial → API/Backend → Banco de Dados → Painéis e Notificações
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          9. SEÇÃO MELHORIAS FUTURAS ("O FUTURO DO VISIONPASS")
          ======================================================== */}
      <section className="py-24 bg-[#110D18] border-y border-[#A855F7]/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="primary">Roadmap de Inovação</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight">
              O Futuro do VisionPass
            </h2>
            <p className="text-base text-[#B8B0C7]">
              Melhorias e expansões planejadas para tornar o ecossistema educacional cada vez mais inteligente e acolhedor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: Smartphone, title: 'Aplicativo para responsáveis', desc: 'App nativo iOS/Android com notificações push instantâneas.' },
              { icon: LayoutDashboard, title: 'Dashboard avançado', desc: 'Métricas comparativas entre turnos e sazonalidades.' },
              { icon: BarChart3, title: 'Gráficos de frequência', desc: 'Visualização da evolução do comparecimento escolar.' },
              { icon: DoorOpen, title: 'Portões inteligentes', desc: 'Expansão para cancelas veiculares e acessos secundários.' },
              { icon: ClipboardList, title: 'Chamada automática', desc: 'Sincronização entre catraca e caderneta digital.' },
              { icon: BellRing, title: 'Alertas de ausência', desc: 'Disparo proativo quando o aluno não registra entrada.' },
              { icon: Network, title: 'Sistemas acadêmicos', desc: 'Conectores padronizados para os principais ERPs escolares.' },
              { icon: ShieldAlert, title: 'Detecção antifraude', desc: 'Modelos neurais contra tentativas avançadas de spoofing.' },
              { icon: BarChart3, title: 'Relatórios com IA', desc: 'Diagnósticos pedagógicos automatizados com insights.' },
              { icon: Bot, title: 'Assistente virtual', desc: 'O Vizi auxiliando pais e professores por inteligência conversacional.' }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#17121F] border border-[#A855F7]/20 rounded-2xl p-5 hover:border-[#A855F7]/50 hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#C084FC] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#F8F7FF] mb-1.5">{item.title}</h4>
                    <p className="text-xs text-[#B8B0C7] leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#A855F7] mt-3 block">Roadmap Futuro</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================
          10. SEÇÃO SOBRE O PROJETO
          ======================================================== */}
      <section id="sobre" className="py-24 bg-[#09070D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="primary">Origem & Propósito</Badge>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8F7FF] tracking-tight leading-tight">
                Sobre o VisionPass
              </h2>

              <p className="text-base sm:text-lg text-[#B8B0C7] leading-relaxed">
                O VisionPass foi desenvolvido para modernizar o controle de acesso e presença em instituições de ensino.
              </p>

              <p className="text-sm sm:text-base text-[#B8B0C7] leading-relaxed">
                O sistema busca reduzir processos manuais, melhorar a segurança, facilitar a gestão e aproximar a instituição dos responsáveis através de catracas físicas equipadas com reconhecimento facial biométrico.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#17121F] border border-[#A855F7]/25">
                  <h4 className="font-bold text-[#F8F7FF] text-sm mb-1">Tecnologia que Aproxima</h4>
                  <p className="text-xs text-[#B8B0C7]">O Vizi personifica o acolhimento e a transparência entre a escola e a família.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#17121F] border border-[#A855F7]/25">
                  <h4 className="font-bold text-[#F8F7FF] text-sm mb-1">Rigor & Segurança</h4>
                  <p className="text-xs text-[#B8B0C7]">Criptografia e integridade de dados para proteção integral de estudantes e docentes.</p>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="primary" onClick={onGoToLogin} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Acessar sistema agora
                </Button>
              </div>

            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#17121F] rounded-3xl border border-[#A855F7]/30 text-center relative overflow-hidden">
              <ViziMascot expression="thinking" size="lg" animate={true} showSpeechBubble="Olá! Eu sou o Vizi, o mascote oficial do VisionPass!" />
              <div className="mt-4">
                <span className="font-extrabold text-lg text-[#F8F7FF]">VisionPass™</span>
                <p className="text-xs text-[#B8B0C7] mt-1">Desenvolvimento Acadêmico 2026</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          11. RODAPÉ INSTITUCIONAL
          ======================================================== */}
      <footer className="bg-[#110D18] border-t border-[#A855F7]/25 text-[#B8B0C7] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#A855F7]/20">
            
            <div className="md:col-span-6 space-y-4">
              <VisionPassLogo size="md" showTrademark={true} />
              
              <p className="text-sm font-semibold text-[#F8F7FF]">
                Sistema Inteligente de Controle de Acesso com Reconhecimento Facial
              </p>

              <p className="text-xs text-[#B8B0C7] leading-relaxed max-w-lg">
                Projeto acadêmico desenvolvido para demonstrar a aplicação de Inteligência Artificial, reconhecimento facial e sistemas de informação no ambiente escolar.
              </p>
            </div>

            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold text-[#F8F7FF] uppercase tracking-wider">
                Navegação
              </div>
              <ul className="space-y-2 text-sm">
                <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a></li>
                <li><a href="#beneficios" className="hover:text-white transition-colors">Funcionalidades</a></li>
                <li><a href="#ia" className="hover:text-white transition-colors">IA</a></li>
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
                <li>
                  <button onClick={onGoToLogin} className="text-[#C084FC] hover:text-white font-semibold transition-colors cursor-pointer">
                    Acessar sistema →
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2 flex md:justify-end items-start">
              <button
                onClick={scrollToTop}
                className="p-3 rounded-xl bg-[#17121F] hover:bg-[#21192D] text-[#B8B0C7] hover:text-white border border-[#A855F7]/30 flex items-center gap-2 text-xs font-medium cursor-pointer transition-colors"
                title="Voltar ao início"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Ao topo</span>
              </button>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B0C7]">
            <div>
              © 2026 VisionPass. Todos os direitos reservados.
            </div>
            <div className="font-mono text-[11px] text-[#A855F7]">
              VisionPass™ • Tecnologia que aproxima
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
