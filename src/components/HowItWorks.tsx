import React from 'react';
import { 
  ScanFace, 
  UserCheck, 
  Server, 
  Database, 
  BellRing, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: ScanFace,
      title: 'Catraca com reconhecimento facial',
      description: 'O aluno aproxima-se da catraca inteligente, cujo terminal biométrico realiza a leitura facial instantânea no ponto de entrada ou saída.',
      tag: 'Ponto Físico'
    },
    {
      step: '02',
      icon: UserCheck,
      title: 'Identificação do aluno',
      description: 'O algoritmo biométrico valida os traços faciais do estudante em milissegundos, checando vivacidade e permissão de acesso escolar.',
      tag: 'Validação Biométrica'
    },
    {
      step: '03',
      icon: Server,
      title: 'API / Backend',
      description: 'A catraca se comunica de forma criptografada com a API central, processando as regras de negócio, horários e autorizações da instituição.',
      tag: 'Comunicação Segura'
    },
    {
      step: '04',
      icon: Database,
      title: 'Banco de dados',
      description: 'Armazena com integridade o registro de passagem: matrícula, data, horário exato, sentido (entrada ou saída) e histórico acadêmico.',
      tag: 'Registro Confiável'
    },
    {
      step: '05',
      icon: BellRing,
      title: 'Painéis e notificações',
      description: 'Atualização imediata dos dashboards da direção e professores, além de envio de notificações de confirmação aos responsáveis.',
      tag: 'Gestão em Tempo Real'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white border-y border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
            Fluxo Operacional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Como Funciona o VisionPass
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Entenda como a catraca com reconhecimento facial orquestra todo o ciclo de acesso de forma automatizada e segura para a instituição.
          </p>
        </div>

        {/* Grade de Cards do Fluxo Sequencial */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === steps.length - 1;

            return (
              <div 
                key={item.step} 
                className="group relative flex flex-col bg-slate-50/80 hover:bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-brand-300 shadow-sm hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                {/* Linha de conexão desktop entre cards */}
                {!isLast && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 group-hover:text-brand-400 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                {/* Linha indicadora mobile entre cards */}
                {!isLast && (
                  <div className="lg:hidden flex justify-center py-2 text-slate-300">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                )}

                {/* Topo do card com número do passo e tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-500 group-hover:border-brand-200 group-hover:text-brand-600 transition-colors">
                    Etapa {item.step}
                  </span>
                  <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                    {item.tag}
                  </span>
                </div>

                {/* Ícone com fundo com contraste adequado */}
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Título da etapa */}
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-700 transition-colors">
                  {item.title}
                </h3>

                {/* Descrição objetiva */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-auto">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

        {/* Rodapé explicativo do fluxo */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-brand-50/60 border border-brand-100 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
              ✓
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              <strong className="text-brand-900">Operação sem cartões ou crachás perdidos:</strong> todo o processo na catraca ocorre em menos de 1 segundo por aluno, eliminando gargalos na entrada da escola.
            </p>
          </div>
          <a
            href="#tecnologia"
            className="text-xs font-bold text-brand-700 hover:text-brand-900 whitespace-nowrap inline-flex items-center gap-1 hover:underline"
          >
            Ver arquitetura técnica →
          </a>
        </div>

      </div>
    </section>
  );
};
