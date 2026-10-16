import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  Activity, 
  MessageSquare, 
  LayoutDashboard 
} from 'lucide-react';

export const WhyVisionPass: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Mais segurança',
      description: 'Garante que apenas estudantes e colaboradores autorizados atravessem a catraca, inibindo acessos indevidos e aumentando a proteção de todo o campus escolar.',
      highlight: 'Controle de perímetro rigoroso'
    },
    {
      icon: Clock,
      title: 'Registro automático',
      description: 'Substitui anotações manuais e pranchetas. Toda passagem na catraca tem data e horário precisos gravados sem margem para erros humanos ou esquecimentos.',
      highlight: 'Precisão em milissegundos'
    },
    {
      icon: Users,
      title: 'Redução de filas',
      description: 'O reconhecimento facial no terminal da catraca é instantâneo e contínuo, acabando com as lentidões e aglomerações típicas nos horários de entrada e saída.',
      highlight: 'Fluxo contínuo sem crachá'
    },
    {
      icon: Activity,
      title: 'Informações em tempo real',
      description: 'Direção, coordenação e professores visualizam imediatamente os dados atualizados de frequência e evasão através de dashboards acessíveis.',
      highlight: 'Visibilidade instantânea'
    },
    {
      icon: MessageSquare,
      title: 'Comunicação com responsáveis',
      description: 'Mantém os pais informados sobre o momento exato de entrada e saída de seus filhos na escola, gerando transparência e confiança institucional.',
      highlight: 'Acompanhamento familiar'
    },
    {
      icon: LayoutDashboard,
      title: 'Gestão escolar centralizada',
      description: 'Consolida relatórios de frequência escolar em um único ambiente, poupando tempo administrativo e permitindo intervenções pedagógicas ágeis.',
      highlight: 'Menos burocracia diária'
    }
  ];

  return (
    <section id="funcionalidades" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            Vantagens & Benefícios
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Por Que Escolher o VisionPass?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Uma solução moderna projetada para elevar os padrões de segurança e simplificar o cotidiano de toda a comunidade escolar.
          </p>
        </div>

        {/* Grade de 6 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 group-hover:bg-brand-50 group-hover:text-brand-700 px-2.5 py-1 rounded-full transition-colors">
                    {benefit.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-brand-700 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
