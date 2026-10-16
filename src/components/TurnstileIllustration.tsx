import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

export const TurnstileIllustration: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [accessState, setAccessState] = useState<'idle' | 'identifying' | 'granted'>('idle');

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAccessState('identifying');

    setTimeout(() => {
      setAccessState('granted');
      setTimeout(() => {
        setAccessState('idle');
        setIsSimulating(false);
      }, 2500);
    }, 1200);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Glow de fundo */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-brand-200/40 via-brand-400/20 to-indigo-200/30 rounded-3xl blur-2xl -z-10" />

      {/* Card principal que emoldura a catraca */}
      <div className="relative bg-white/95 rounded-2xl border border-slate-200/80 shadow-card p-6 md:p-8 overflow-hidden">
        
        {/* Barra superior de status da catraca */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${accessState === 'granted' ? 'bg-emerald-400' : 'bg-brand-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${accessState === 'granted' ? 'bg-emerald-500' : 'bg-brand-500'}`}></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Terminal Catraca #01 • Entrada Principal
            </span>
          </div>

          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 transition-colors flex items-center gap-1.5 disabled:opacity-60 cursor-pointer"
            title="Clique para simular identificação facial e giro da catraca"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            {isSimulating ? 'Validando...' : 'Simular Leitura'}
          </button>
        </div>

        {/* Ilustração SVG de Alta Fidelidade da Catraca com Reconhecimento Facial Integrado */}
        <div className="relative aspect-[4/3] w-full flex items-center justify-center bg-gradient-to-b from-slate-50/80 to-slate-100/60 rounded-xl border border-slate-200/60 p-4 overflow-hidden">
          
          <svg viewBox="0 0 500 380" className="w-full h-full max-h-80 drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Gradientes da estrutura metálica */}
              <linearGradient id="metalBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="25%" stopColor="#cbd5e1" />
                <stop offset="60%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              <linearGradient id="turnstileArm" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              {/* Sombra suave de chão */}
              <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Sombra no chão */}
            <ellipse cx="250" cy="355" rx="190" ry="18" fill="url(#floorShadow)" />

            {/* Gabinete Principal da Catraca (Corpo em Aço Inox) */}
            <rect x="170" y="140" width="160" height="205" rx="14" fill="url(#metalBody)" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Detalhe frontal do gabinete */}
            <rect x="185" y="160" width="130" height="175" rx="8" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
            
            {/* LED de orientação de fluxo no gabinete */}
            <circle 
              cx="250" 
              cy="185" 
              r="14" 
              fill={accessState === 'granted' ? '#10b981' : accessState === 'identifying' ? '#0ea5e9' : '#0284c7'} 
              className="transition-colors duration-300"
            />
            {accessState === 'granted' ? (
              <path d="M243 185l5 5 10-10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M250 178v14M245 183l5-5 5 5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}

            {/* Rotor Central e Braços Tripé da Catraca */}
            <g transform="translate(250, 260)">
              {/* Eixo central giratório */}
              <circle cx="0" cy="0" r="22" fill="#334155" stroke="#64748b" strokeWidth="3" />
              <circle cx="0" cy="0" r="10" fill="#94a3b8" />

              {/* Braço 1 (Horizontal / Bloqueio ou passagem) */}
              <rect 
                x={accessState === 'granted' ? "-90" : "-120"} 
                y="-6" 
                width="120" 
                height="12" 
                rx="6" 
                fill="url(#turnstileArm)" 
                stroke="#334155" 
                strokeWidth="1.5"
                transform={accessState === 'granted' ? "rotate(-40)" : "rotate(0)"}
                className="transition-transform duration-700 ease-out origin-center"
              />

              {/* Braço 2 (Inferior direito) */}
              <rect 
                x="0" 
                y="-6" 
                width="110" 
                height="12" 
                rx="6" 
                fill="url(#turnstileArm)" 
                stroke="#334155" 
                strokeWidth="1.5"
                transform={accessState === 'granted' ? "rotate(80)" : "rotate(120)"}
                className="transition-transform duration-700 ease-out origin-center"
              />

              {/* Braço 3 (Inferior esquerdo) */}
              <rect 
                x="0" 
                y="-6" 
                width="110" 
                height="12" 
                rx="6" 
                fill="url(#turnstileArm)" 
                stroke="#334155" 
                strokeWidth="1.5"
                transform={accessState === 'granted' ? "rotate(200)" : "rotate(240)"}
                className="transition-transform duration-700 ease-out origin-center"
              />
            </g>

            {/* Suporte / Haste de Fixação do Terminal Facial na Catraca */}
            <rect x="244" y="92" width="12" height="50" rx="3" fill="#64748b" />
            
            {/* Articulação angular */}
            <circle cx="250" cy="95" r="7" fill="#475569" />

            {/* Módulo Terminal de Reconhecimento Facial (Acoplado à Catraca) */}
            <g transform="translate(195, 15)">
              {/* Caixa exterior do terminal biométrico */}
              <rect x="0" y="0" width="110" height="82" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              
              {/* Tela digital interna */}
              <rect x="6" y="6" width="98" height="70" rx="6" fill="url(#screenGrad)" />

              {/* Sensores superiores de biometria facial e profundidade */}
              <circle cx="55" cy="14" r="3" fill="#38bdf8" />
              <circle cx="45" cy="14" r="1.5" fill="#0284c7" />
              <circle cx="65" cy="14" r="1.5" fill="#ef4444" opacity="0.7" />

              {/* Grade / Silhueta facial com malha de reconhecimento */}
              <g transform="translate(55, 42)">
                {/* Rosto estilizado */}
                <ellipse cx="0" cy="0" rx="14" ry="17" fill="none" stroke={accessState === 'granted' ? '#34d399' : '#38bdf8'} strokeWidth="1.5" strokeDasharray="3 2" />
                
                {/* Olhos e sorriso */}
                <circle cx="-5" cy="-3" r="1.5" fill={accessState === 'granted' ? '#34d399' : '#38bdf8'} />
                <circle cx="5" cy="-3" r="1.5" fill={accessState === 'granted' ? '#34d399' : '#38bdf8'} />
                <path d="M-4 6 Q0 9 4 6" stroke={accessState === 'granted' ? '#34d399' : '#38bdf8'} strokeWidth="1.2" fill="none" />

                {/* Marcadores biométricos (pontos de malha facial) */}
                <circle cx="-10" cy="-6" r="1" fill="#67e8f9" />
                <circle cx="10" cy="-6" r="1" fill="#67e8f9" />
                <circle cx="-9" cy="8" r="1" fill="#67e8f9" />
                <circle cx="9" cy="8" r="1" fill="#67e8f9" />
                <circle cx="0" cy="2" r="1" fill="#67e8f9" />

                {/* Linha laser de escaneamento facial da catraca */}
                {accessState === 'identifying' && (
                  <line x1="-20" y1="-12" x2="20" y2="-12" stroke="#38bdf8" strokeWidth="2" className="animate-scanline" />
                )}
              </g>

              {/* Faixa inferior da tela do terminal com resultado */}
              <rect x="6" y="62" width="98" height="14" fill={accessState === 'granted' ? '#065f46' : '#0369a1'} rx="2" />
              <text x="55" y="72" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                {accessState === 'granted' 
                  ? 'ALUNO IDENTIFICADO' 
                  : accessState === 'identifying' 
                  ? 'IDENTIFICANDO...' 
                  : 'CATRACA PRONTA'}
              </text>
            </g>

            {/* Sinalizador LED Superior da Catraca */}
            <rect 
              x="220" 
              y="136" 
              width="60" 
              height="4" 
              rx="2" 
              fill={accessState === 'granted' ? '#10b981' : '#0284c7'} 
              className="transition-colors duration-300"
            />
          </svg>

          {/* Badges Flutuantes Informativos */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-200 shadow-sm flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span className="text-[11px] font-semibold text-slate-700">Reconhecimento na Catraca</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            {accessState === 'granted' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" />
                <div>
                  <div className="text-[11px] font-bold text-emerald-700 leading-tight">Passagem Liberada</div>
                  <div className="text-[10px] text-slate-500">Giro destravado</div>
                </div>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4 text-brand-600" />
                <div>
                  <div className="text-[11px] font-bold text-slate-800 leading-tight">Terminal Integrado</div>
                  <div className="text-[10px] text-slate-500">Identificação instantânea</div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rodapé descritivo do componente visual */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Fluxo contínuo sem crachá físico</span>
          </div>
          <div className="font-mono text-[11px] text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
            Catraca com biometria facial
          </div>
        </div>

      </div>
    </div>
  );
};
