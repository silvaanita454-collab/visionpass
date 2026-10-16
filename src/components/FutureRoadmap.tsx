import React from 'react';
import { 
  Smartphone, 
  BarChart3, 
  DoorClosed, 
  ClipboardCheck, 
  BellRing, 
  Network, 
  BrainCircuit,
  Compass
} from 'lucide-react';

export const FutureRoadmap: React.FC = () => {
  const futureItems = [
    {
      icon: Smartphone,
      title: 'Aplicativo para responsáveis',
      description: 'App mobile nativo para iOS e Android com notificações push em tempo real, visualização de crachá virtual e histórico de frequência escolar do dependente.'
    },
    {
      icon: BarChart3,
      title: 'Dashboards avançados',
      description: 'Painéis analíticos com gráficos de fluxo por horário de pico, sazonalidade de atrasos e indicadores de retenção para a equipe de direção.'
    },
    {
      icon: DoorClosed,
      title: 'Integração com portões inteligentes',
      description: 'Expansão do ecossistema de catracas faciais para cancelas veiculares de embarque/desembarque e portões de áreas restritas (laboratórios e biblioteca).'
    },
    {
      icon: ClipboardCheck,
      title: 'Chamada automática',
      description: 'Sincronização inteligente entre a validação facial da catraca e o diário de classe digital dos professores, minimizando conferências manuais.'
    },
    {
      icon: BellRing,
      title: 'Alertas de ausência',
      description: 'Disparo proativo de notificações aos responsáveis quando o estudante não registrar entrada após a tolerância do início das aulas.'
    },
    {
      icon: Network,
      title: 'Integração com sistemas acadêmicos',
      description: 'Conectores padronizados via webhooks e APIs para interligação com os principais ERPs e softwares de gestão escolar do mercado.'
    },
    {
      icon: BrainCircuit,
      title: 'Relatórios com IA',
      description: 'Diagnósticos automatizados gerados por inteligência analítica com recomendações pedagógicas para mitigação de evasão escolar.'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Evolução Contínua
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            O Futuro do VisionPass
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Conheça as próximas etapas e inovações planejadas no roadmap para expandir a inteligência e comodidade da gestão escolar.
          </p>
        </div>

        {/* Grade de 7 Melhorias Futuras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {futureItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group ${
                  idx === futureItems.length - 1 ? 'md:col-span-2 lg:col-span-3 xl:col-span-1 bg-gradient-to-br from-brand-50/40 to-white' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                      Roadmap
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-medium text-slate-400 group-hover:text-brand-600 transition-colors">
                  Planejado para sprints futuras
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
