import React, { useState } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, UserCheck, Activity } from 'lucide-react';
import { ViziMascot } from './ViziMascot';

interface TurnstileInteractiveProps {
  onSimulateSuccess?: () => void;
  showVizi?: boolean;
}

export const TurnstileInteractive: React.FC<TurnstileInteractiveProps> = ({
  onSimulateSuccess,
  showVizi = true
}) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [accessState, setAccessState] = useState<'idle' | 'identifying' | 'granted'>('idle');

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAccessState('identifying');

    setTimeout(() => {
      setAccessState('granted');
      if (onSimulateSuccess) onSimulateSuccess();

      setTimeout(() => {
        setAccessState('idle');
        setIsSimulating(false);
      }, 2600);
    }, 1300);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Glow de fundo roxo elegante */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-[#7C3AED]/30 via-[#A855F7]/15 to-transparent rounded-3xl blur-2xl -z-10 pointer-events-none" />

      {/* Card principal com estilo Dark Purple */}
      <div className="relative bg-[#17121F] rounded-2xl border border-[#A855F7]/25 shadow-2xl p-6 sm:p-7 overflow-hidden">
        
        {/* Barra superior com status da catraca */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#A855F7]/15">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                accessState === 'granted' ? 'bg-emerald-400' : 'bg-[#A855F7]'
              } opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                accessState === 'granted' ? 'bg-emerald-500' : 'bg-[#7C3AED]'
              }`}></span>
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8B0C7]">
              Catraca Facial #01 • Portaria Principal
            </span>
          </div>

          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#7C3AED]/20 hover:bg-[#7C3AED]/35 text-[#C084FC] border border-[#A855F7]/30 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
            title="Simular leitura biométrica facial e liberação da catraca"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
            {isSimulating ? 'Validando...' : 'Simular Leitura'}
          </button>
        </div>

        {/* Área de Visualização Gráfica da Catraca com Reconhecimento Facial */}
        <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-[#110D18] rounded-xl border border-[#A855F7]/20 p-4 overflow-hidden">
          
          <svg viewBox="0 0 500 380" className="w-full h-full max-h-80 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradientes da estrutura metálica da catraca */}
              <linearGradient id="vpMetalBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E1927" />
                <stop offset="25%" stopColor="#2E243D" />
                <stop offset="60%" stopColor="#4A3865" />
                <stop offset="100%" stopColor="#1E1927" />
              </linearGradient>

              <linearGradient id="vpTurnstileArm" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#473A5C" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#2E243D" />
              </linearGradient>

              <linearGradient id="vpScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#09070D" />
                <stop offset="100%" stopColor="#17121F" />
              </linearGradient>

              <radialGradient id="vpFloorShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#09070D" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Sombra de chão */}
            <ellipse cx="250" cy="355" rx="190" ry="18" fill="url(#vpFloorShadow)" />

            {/* Gabinete da Catraca Inteligente */}
            <rect x="170" y="140" width="160" height="205" rx="14" fill="url(#vpMetalBody)" stroke="#7C3AED" strokeWidth="1.5" strokeOpacity="0.4" />
            <rect x="185" y="160" width="130" height="175" rx="8" fill="#17121F" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.25" />
            
            {/* LED Circular indicador de fluxo */}
            <circle 
              cx="250" 
              cy="185" 
              r="14" 
              fill={accessState === 'granted' ? '#10b981' : accessState === 'identifying' ? '#C084FC' : '#7C3AED'} 
              className="transition-colors duration-300"
            />
            {accessState === 'granted' ? (
              <path d="M243 185l5 5 10-10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M250 178v14M245 183l5-5 5 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}

            {/* Rotor Central e Braços Tripé da Catraca */}
            <g transform="translate(250, 260)">
              <circle cx="0" cy="0" r="22" fill="#110D18" stroke="#7C3AED" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="10" fill="#A855F7" />

              {/* Braço 1 */}
              <rect 
                x={accessState === 'granted' ? "-90" : "-120"} 
                y="-6" 
                width="120" 
                height="12" 
                rx="6" 
                fill="url(#vpTurnstileArm)" 
                stroke="#A855F7" 
                strokeWidth="1.5"
                transform={accessState === 'granted' ? "rotate(-40)" : "rotate(0)"}
                className="transition-transform duration-700 ease-out origin-center"
              />

              {/* Braço 2 */}
              <rect 
                x="0" 
                y="-6" 
                width="110" 
                height="12" 
                rx="6" 
                fill="url(#vpTurnstileArm)" 
                stroke="#A855F7" 
                strokeWidth="1.5"
                transform={accessState === 'granted' ? "rotate(80)" : "rotate(120)"}
                className="transition-transform duration-700 ease-out origin-center"
              />

              {/* Braço 3 */}
              <rect 
                x="0" 
                y="-6" 
                width="110" 
                height="12" 
                rx="6" 
                fill="url(#vpTurnstileArm)" 
                stroke="#A855F7" 
                strokeWidth="1.5"
                transform={accessState === 'granted' ? "rotate(200)" : "rotate(240)"}
                className="transition-transform duration-700 ease-out origin-center"
              />
            </g>

            {/* Haste de Fixação do Terminal de Reconhecimento Facial */}
            <rect x="244" y="92" width="12" height="50" rx="3" fill="#3B2A54" stroke="#7C3AED" strokeWidth="1" />
            <circle cx="250" cy="95" r="7" fill="#7C3AED" />

            {/* Módulo Terminal de Reconhecimento Facial */}
            <g transform="translate(195, 15)">
              <rect x="0" y="0" width="110" height="82" rx="12" fill="#09070D" stroke="#A855F7" strokeWidth="2" />
              <rect x="6" y="6" width="98" height="70" rx="8" fill="url(#vpScreenGrad)" />

              {/* Sensores de profundidade e biometria */}
              <circle cx="55" cy="14" r="3" fill="#C084FC" />
              <circle cx="45" cy="14" r="1.5" fill="#7C3AED" />
              <circle cx="65" cy="14" r="1.5" fill="#10B981" opacity="0.8" />

              {/* Rosto com malha biométrica */}
              <g transform="translate(55, 42)">
                <ellipse cx="0" cy="0" rx="14" ry="17" fill="none" stroke={accessState === 'granted' ? '#34d399' : '#C084FC'} strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="-5" cy="-3" r="1.5" fill={accessState === 'granted' ? '#34d399' : '#C084FC'} />
                <circle cx="5" cy="-3" r="1.5" fill={accessState === 'granted' ? '#34d399' : '#C084FC'} />
                <path d="M-4 6 Q0 9 4 6" stroke={accessState === 'granted' ? '#34d399' : '#C084FC'} strokeWidth="1.2" fill="none" />

                {/* Laser de Varredura Facial */}
                {accessState === 'identifying' && (
                  <line x1="-20" y1="-12" x2="20" y2="-12" stroke="#A855F7" strokeWidth="2.5" className="animate-scanlaser" />
                )}
              </g>

              {/* Faixa inferior da tela do terminal */}
              <rect x="6" y="62" width="98" height="14" fill={accessState === 'granted' ? '#065F46' : '#4C1D95'} rx="2" />
              <text x="55" y="72" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                {accessState === 'granted' 
                  ? 'ALUNO IDENTIFICADO' 
                  : accessState === 'identifying' 
                  ? 'IDENTIFICANDO...' 
                  : 'CATRACA PRONTA'}
              </text>
            </g>
          </svg>

          {/* Mascote Vizi ao lado da catraca */}
          {showVizi && (
            <div className="absolute -bottom-3 -right-2 transform scale-90 sm:scale-100 z-20 pointer-events-none">
              <ViziMascot
                expression={accessState === 'granted' ? 'success' : accessState === 'identifying' ? 'alert' : 'happy'}
                size="sm"
                animate={true}
              />
            </div>
          )}

          {/* Badges Flutuantes Informativos */}
          <div className="absolute top-3 left-3 bg-[#17121F]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-[#A855F7]/30 shadow-sm flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C084FC]" />
            <span className="text-[11px] font-semibold text-[#F8F7FF]">Catraca com Reconhecimento</span>
          </div>

          <div className="absolute bottom-3 left-3 bg-[#17121F]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-[#A855F7]/30 shadow-sm flex items-center gap-2">
            {accessState === 'granted' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                <div>
                  <div className="text-[11px] font-bold text-emerald-300 leading-tight">Passagem Liberada</div>
                  <div className="text-[10px] text-[#B8B0C7]">Giro destravado</div>
                </div>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-[#A855F7]" />
                <div>
                  <div className="text-[11px] font-bold text-[#F8F7FF] leading-tight">Terminal Integrado</div>
                  <div className="text-[10px] text-[#B8B0C7]">Validação em ~0.3s</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rodapé descritivo */}
        <div className="mt-4 pt-3 border-t border-[#A855F7]/15 flex items-center justify-between text-xs text-[#B8B0C7]">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fluxo contínuo sem crachá físico</span>
          </div>
          <div className="font-mono text-[11px] text-[#C084FC] bg-[#7C3AED]/15 px-2 py-0.5 rounded border border-[#A855F7]/25">
            Biometria + Catraca
          </div>
        </div>

      </div>
    </div>
  );
};
