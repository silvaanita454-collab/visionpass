import React, { useState } from 'react';
import { 
  ScanFace, 
  Server, 
  Database, 
  LayoutDashboard, 
  BellRing, 
  ChevronRight,
  Code2,
  Lock,
  Layers
} from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const techLayers = [
    {
      id: 'biometry',
      step: '01',
      title: 'Reconhecimento Facial',
      badge: 'Terminal Físico / Edge',
      icon: ScanFace,
      short: 'Processamento biométrico integrado à catraca.',
      techs: ['OpenCV / InsightFace', 'Liveness Anti-Spoofing', 'Validação < 0.4s'],
      details: 'O terminal instalado na catraca analisa os pontos nodais do rosto do estudante, compara com vetores locais ou em nuvem privada e efetua o acionamento do relé físico do rotor da catraca.'
    },
    {
      id: 'api',
      step: '02',
      title: 'API / Backend',
      badge: 'Camada de Aplicação',
      icon: Server,
      short: 'Serviço RESTful para orquestração de regras.',
      techs: ['Python / Flask REST', 'Criptografia SHA-256', 'Auditoria de Acesso'],
      details: 'Recebe as requisições autenticadas da catraca, valida horários de entrada e saída por turno, trata exceções e registra eventos nos logs de conformidade.'
    },
    {
      id: 'database',
      step: '03',
      title: 'Banco de Dados',
      badge: 'Persistência & Integridade',
      icon: Database,
      short: 'Estrutura relacional e histórico completo.',
      techs: ['SQLite / Relacional', 'Vínculos N:N', 'Índices Otimizados'],
      details: 'Garante integridade referencial com tabelas normalizadas para Alunos, Turmas, Instituição, Responsáveis, Registros de Catraca e Logs de Auditoria.'
    },
    {
      id: 'dashboard',
      step: '04',
      title: 'Dashboard',
      badge: 'Interface & Gestão',
      icon: LayoutDashboard,
      short: 'Painéis adaptados para cada nível de acesso.',
      techs: ['React + TypeScript', 'Tailwind CSS', 'Métricas em Tempo Real'],
      details: 'Apresenta relatórios de fluxo diário, visualização de frequência escolar, lista de chamadas para professores e controle administrativo da direção.'
    },
    {
      id: 'notifications',
      step: '05',
      title: 'Notificações',
      badge: 'Engajamento Familiar',
      icon: BellRing,
      short: 'Comunicação pontual e transparente.',
      techs: ['Alertas em Tempo Real', 'Histórico de Passagem', 'Confirmação de Acesso'],
      details: 'Gera alertas instantâneos de entrada e saída para que os responsáveis saibam o momento exato em que o aluno transpôs a catraca escolar.'
    }
  ];

  return (
    <section id="tecnologia" className="py-20 bg-white border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            Arquitetura do Sistema
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tecnologia de Ponta a Ponta
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Acompanhe o caminho percorrido pelos dados: do reconhecimento facial no hardware da catraca até as notificações aos responsáveis.
          </p>
        </div>

        {/* Diagrama Sequencial Visual (Horizontal Desktop / Vertical Mobile) */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {techLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isSelected = activeLayer === index;

              return (
                <div key={layer.id} className="relative">
                  <button
                    onClick={() => setActiveLayer(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between h-full cursor-pointer ${
                      isSelected
                        ? 'bg-brand-50/80 border-brand-500 shadow-md ring-2 ring-brand-500/20'
                        : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {layer.step}
                        </span>
                        <div className={`p-1.5 rounded-lg ${
                          isSelected ? 'text-brand-600 bg-white' : 'text-slate-500 bg-white/70'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm mb-1 leading-snug">
                        {layer.title}
                      </h3>

                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">
                        {layer.short}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-brand-700">Ver detalhes</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-brand-600' : 'text-slate-400'}`} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Painel de Destaque da Camada Selecionada */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-brand-500 text-white">
                  Camada {techLayers[activeLayer].step}
                </span>
                <span className="text-xs text-brand-300 font-medium">
                  {techLayers[activeLayer].badge}
                </span>
              </div>

              <h4 className="text-2xl font-extrabold text-white">
                {techLayers[activeLayer].title}
              </h4>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {techLayers[activeLayer].details}
              </p>

              {/* Tecnologias associadas */}
              <div className="pt-2 flex flex-wrap gap-2">
                {techLayers[activeLayer].techs.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700"
                  >
                    <Code2 className="w-3 h-3 text-cyan-400" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-600/20 text-brand-400 border border-brand-500/30 flex items-center justify-center mb-3">
                <Lock className="w-7 h-7" />
              </div>
              <div className="font-bold text-sm text-white mb-1">
                Segurança & Privacidade
              </div>
              <p className="text-xs text-slate-400">
                Dados biométricos protegidos e armazenados em conformidade com as melhores práticas de governança escolar.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
