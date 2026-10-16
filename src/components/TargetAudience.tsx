import React from 'react';
import { School, GraduationCap, Users, CheckCircle2 } from 'lucide-react';

export const TargetAudience: React.FC = () => {
  const audiences = [
    {
      icon: School,
      title: 'Instituição de Ensino',
      subtitle: 'Diretoria, Coordenação e Administração Escolar',
      description: 'Eleva a segurança física das instalações e centraliza relatórios de entrada e saída com confiabilidade total.',
      benefits: [
        'Controle de perímetro rigoroso e auditável',
        'Fim de gastos recorrentes com crachás ou cartões magnéticos',
        'Relatórios de fluxo escolar consolidados para tomada de decisão',
        'Atendimento às diretrizes de proteção e segurança educacional'
      ],
      badge: 'Gestão Escolar',
      accentColor: 'border-brand-500'
    },
    {
      icon: GraduationCap,
      title: 'Professores',
      subtitle: 'Corpo Docente e Sala de Aula',
      description: 'Reduz o tempo despendido com a burocracia das listas de presença tradicionais e oferece suporte pedagógico.',
      benefits: [
        'Aproveitamento integral dos 50 minutos de aula sem interrupções',
        'Informação clara sobre quais alunos já ingressaram na escola',
        'Apoio no acompanhamento de pontualidade e engajamento da turma',
        'Menos sobrecarga de tarefas administrativas repetitivas'
      ],
      badge: 'Pedagógico',
      accentColor: 'border-indigo-500'
    },
    {
      icon: Users,
      title: 'Pais e Responsáveis',
      subtitle: 'Família e Comunidade Escolar',
      description: 'Proporciona a tranquilidade de saber com exatidão o momento em que o aluno chega e sai da instituição.',
      benefits: [
        'Notificação e histórico de passagem do dependente na catraca',
        'Certeza de que o aluno está seguro dentro do ambiente escolar',
        'Transparência e aproximação contínua com a rotina escolar',
        'Identificação de possíveis atrasos ou faltas não comunicadas'
      ],
      badge: 'Família',
      accentColor: 'border-cyan-500'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            Público-Alvo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Para Quem É o VisionPass?
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Uma plataforma unificada que conecta e beneficia diretamente cada membro da comunidade educacional.
          </p>
        </div>

        {/* Três Cards de Público-Alvo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.title}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-card-hover p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-brand-800 bg-brand-50/80 border border-brand-200 px-3 py-1 rounded-full">
                      {aud.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {aud.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-600 mb-4">
                    {aud.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {aud.description}
                  </p>

                  <div className="border-t border-slate-100 pt-5 space-y-3">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                      Principais Benefícios:
                    </span>
                    <ul className="space-y-2.5">
                      {aud.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <div className="text-[11px] text-slate-400 font-medium">
                    Experiência personalizada para o perfil
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
