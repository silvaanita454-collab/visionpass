import React from 'react';
import { 
  Cpu, 
  ScanFace, 
  TrendingUp, 
  ClockAlert, 
  ShieldAlert, 
  CheckSquare, 
  FileSpreadsheet, 
  Sparkles,
  Info
} from 'lucide-react';

export const ArtificialIntelligence: React.FC = () => {
  const futureCapabilities = [
    {
      icon: TrendingUp,
      title: 'Análise de frequência',
      description: 'Modelos estatísticos preditivos para identificar tendências de queda na presença de alunos ao longo dos bimestres.'
    },
    {
      icon: ClockAlert,
      title: 'Identificação de padrões de atraso',
      description: 'Mapeamento de dias ou disciplinas em que ocorrem maiores índices de impontualidade para suporte pedagógico preventivo.'
    },
    {
      icon: ShieldAlert,
      title: 'Detecção de tentativas de fraude',
      description: 'Evolução contínua de algoritmos de anti-spoofing e vivacidade profunda para coibir tentativas de burla no acesso.'
    },
    {
      icon: CheckSquare,
      title: 'Chamadas automáticas',
      description: 'Preenchimento automatizado da caderneta de chamada dos professores com base na validação facial na catraca e na sala.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Geração de relatórios inteligentes',
      description: 'Sínteses analíticas geradas por IA para auxiliar a direção e conselhos de classe com métricas de engajamento escolar.'
    }
  ];

  return (
    <section id="ia" className="py-20 bg-white border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Inteligência Artificial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            A Inteligência Artificial no VisionPass
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Transparência e rigor técnico: compreenda como a IA atua no presente e onde ela poderá agregar valor nos próximos estágios do projeto.
          </p>
        </div>

        {/* Bloco 1: Aplicação Atual da IA */}
        <div className="mb-14 bg-gradient-to-br from-brand-950 via-slate-900 to-brand-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Funcionalidade Atual do Sistema
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Reconhecimento Facial de Alta Precisão na Catraca
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                No VisionPass, a Inteligência Artificial é empregada <strong>principalmente no reconhecimento facial biométrico</strong> diretamente acoplado à catraca física. Ao posicionar-se diante do terminal:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
                  <div className="text-brand-300 font-bold text-sm mb-1 flex items-center gap-1.5">
                    <ScanFace className="w-4 h-4" />
                    Vetorização Facial
                  </div>
                  <p className="text-xs text-slate-300">
                    Mapeamento de dezenas de pontos nodais e proporções ósseas do rosto do aluno.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
                  <div className="text-brand-300 font-bold text-sm mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Validação Instantânea
                  </div>
                  <p className="text-xs text-slate-300">
                    Comparação veloz com a base cadastral escolar criptografada em fração de segundo.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15">
                  <div className="text-brand-300 font-bold text-sm mb-1 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    Liveness / Vivacidade
                  </div>
                  <p className="text-xs text-slate-300">
                    Checagem de profundidade física que impede o uso de fotos ou telas estáticas.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/20 border border-brand-400/30 text-brand-300 flex items-center justify-center mx-auto mb-4">
                <ScanFace className="w-8 h-8" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Terminal de Catraca</div>
              <div className="text-xs text-slate-300 mb-4">Módulo de Leitura e Liberação Física</div>
              <div className="inline-block text-[11px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-md">
                Status: Operação Ativa
              </div>
            </div>

          </div>
        </div>

        {/* Bloco 2: Possibilidades Futuras com IA */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                Planejamento de Pesquisa & Futuro
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Como a IA Poderá Auxiliar Futuramente no VisionPass
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg shrink-0">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Funcionalidades em estudo e pesquisa</span>
            </div>
          </div>

          {/* Cards de Futuras Aplicações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureCapabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:border-brand-300 hover:bg-white transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white text-brand-600 border border-slate-200 flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded">
                        Em Estudo
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500 font-medium">
                    → Aplicação futura de inteligência analítica
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nota Ética de Honestidade Intelectual */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>
              <strong>Compromisso de Transparência:</strong> As funcionalidades analíticas listadas acima representam o plano de evolução futura da pesquisa e <strong>não</strong> estão implementadas na versão atual do sistema, que tem seu foco integral no reconhecimento facial e controle de acesso nas catracas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
