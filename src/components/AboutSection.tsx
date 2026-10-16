import React from 'react';
import { Target, CheckCircle2, Award, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-white border-t border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Coluna de Conteúdo */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              Sobre o Projeto
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Origem do VisionPass: Transformando a Gestão de Acesso Escolar
            </h2>

            <div className="space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                O <strong>VisionPass</strong> nasceu para solucionar problemas crônicos enfrentados por escolas e faculdades: o <strong>controle manual de acesso</strong> através de pranchetas, cartões que são esquecidos ou emprestados entre colegas, lentidão nos portões de entrada e falta de comunicação imediata com as famílias.
              </p>
              <p>
                Ao aliar <strong>catracas físicas com reconhecimento facial inteligente</strong> a uma arquitetura de software moderna e segura, o sistema transforma a rotina da comunidade escolar: alunos entram com rapidez, a escola mantém seu perímetro rigorosamente protegido e os responsáveis acompanham a presença com total confiança.
              </p>
              <p>
                O projeto é concebido como uma iniciativa acadêmica orientada à inovação prática, demonstrando na prática como a visão computacional, sistemas distribuídos e o design centrado no usuário resolvem desafios reais de segurança e gestão educacional.
              </p>
            </div>

            {/* Três Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-brand-600" />
                  Missão
                </div>
                <p className="text-xs text-slate-500">
                  Eliminar atritos na portaria escolar por meio de catracas biométricas inteligentes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-brand-600" />
                  Rigor Técnico
                </div>
                <p className="text-xs text-slate-500">
                  Arquitetura relacional, criptografia e validação instantânea de vivacidade facial.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  Impacto Real
                </div>
                <p className="text-xs text-slate-500">
                  Tranquilidade para os pais, precisão para os gestores e foco pedagógico para os professores.
                </p>
              </div>
            </div>

          </div>

          {/* Coluna Visual de Destaque Institucional */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-brand-50 to-slate-100 rounded-3xl p-8 border border-brand-200/60 shadow-card text-center relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-600/25">
                <svg viewBox="0 0 24 24" className="w-9 h-9 stroke-current fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                VisionPass Escolar
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Sistema Inteligente de Controle de Acesso com Reconhecimento Facial integrado a Catracas Físicas.
              </p>

              <div className="bg-white rounded-xl p-4 border border-slate-200 text-left space-y-2.5 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Equipamento Central:</span>
                  <span className="font-bold text-slate-900">Catraca Biométrica Facial</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Público Atendido:</span>
                  <span className="font-bold text-slate-900">Instituições de Ensino</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Segurança de Dados:</span>
                  <span className="font-bold text-brand-700">Hash SHA-256 + Auditoria</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Ambiente:</span>
                  <span className="font-bold text-emerald-700">Físico e Digital Integrados</span>
                </div>
              </div>

              <div className="mt-6 text-[11px] text-slate-500 font-medium">
                Desenvolvimento Acadêmico • 2026
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
