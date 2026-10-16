import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Identidade do Projeto */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Vision<span className="text-brand-400">Pass</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-200">
              VisionPass – Sistema Inteligente de Controle de Acesso com Reconhecimento Facial
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
              Projeto acadêmico desenvolvido para demonstrar a aplicação de Inteligência Artificial, reconhecimento facial e sistemas de informação no ambiente escolar.
            </p>
          </div>

          {/* Links Rápidos de Navegação */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navegação
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="text-slate-400 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="text-slate-400 hover:text-white transition-colors">
                  Como funciona
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="text-slate-400 hover:text-white transition-colors">
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#ia" className="text-slate-400 hover:text-white transition-colors">
                  Inteligência Artificial
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-slate-400 hover:text-white transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAuth}
                  className="text-brand-400 hover:text-brand-300 font-semibold transition-colors cursor-pointer text-left"
                >
                  Acessar sistema →
                </button>
              </li>
            </ul>
          </div>

          {/* Botão Retornar ao Topo */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 flex items-center gap-2 text-xs font-medium cursor-pointer"
              title="Voltar ao início da página"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Ao topo</span>
            </button>
          </div>

        </div>

        {/* Linha Final de Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 VisionPass. Todos os direitos reservados.
          </div>
          <div className="text-[11px] text-slate-400">
            Catracas inteligentes com biometria facial para instituições de ensino.
          </div>
        </div>

      </div>
    </footer>
  );
};
