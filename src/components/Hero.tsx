import React from 'react';
import { ArrowRight, ChevronDown, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { TurnstileIllustration } from './TurnstileIllustration';

interface HeroProps {
  onOpenAuth: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Detalhes sutis de gradiente de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-brand-50/60 via-slate-50/20 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Coluna da Esquerda: Textos e Chamadas para Ação */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tag / Badge Institucional */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-800 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-600"></span>
              <span>Reconhecimento Facial Integrado a Catracas</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Controle de acesso inteligente para instituições de ensino
            </h1>

            {/* Texto Descritivo */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              O VisionPass utiliza reconhecimento facial integrado a catracas inteligentes para automatizar a identificação, registrar entradas e saídas e facilitar a gestão escolar.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#como-funciona"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5"
              >
                <span>Conheça o VisionPass</span>
                <ChevronDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenAuth}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all hover:border-brand-300 hover:text-brand-700 cursor-pointer"
              >
                <span>Acessar sistema</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600" />
              </button>
            </div>

            {/* Micro-destaques de confiabilidade institucional */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-600">Identificação em milissegundos</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-600">Segurança de perímetro</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-slate-600">Fim das filas nos portões</span>
              </div>
            </div>

          </div>

          {/* Coluna da Direita: Ilustração Visual da Catraca Escolar com Reconhecimento Facial */}
          <div className="lg:col-span-5 flex justify-center">
            <TurnstileIllustration />
          </div>

        </div>
      </div>
    </section>
  );
};
