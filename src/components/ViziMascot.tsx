import React from 'react';

export type ViziExpression = 'happy' | 'thinking' | 'alert' | 'success' | 'error' | 'sleepy';

interface ViziMascotProps {
  expression?: ViziExpression;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  showSpeechBubble?: string;
}

export const ViziMascot: React.FC<ViziMascotProps> = ({
  expression = 'happy',
  size = 'md',
  className = '',
  animate = true,
  showSpeechBubble
}) => {
  const sizeMap = {
    sm: { width: 72, height: 78 },
    md: { width: 140, height: 152 },
    lg: { width: 220, height: 240 },
    xl: { width: 300, height: 325 }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      
      {/* Balão de Fala Opcional do Vizi */}
      {showSpeechBubble && (
        <div className="mb-3 px-3.5 py-2 rounded-2xl bg-[#17121F] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] shadow-lg shadow-purple-950/40 relative animate-fadeIn max-w-xs text-center font-medium">
          {showSpeechBubble}
          {/* Ponta do balão apontando para o Vizi */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#17121F] border-r border-b border-[#A855F7]/30 rotate-45" />
        </div>
      )}

      {/* SVG Original do Vizi - O Monstrinho Roxo Fofo do VisionPass */}
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 200 216"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${animate ? 'animate-vizi-float' : ''} filter drop-shadow-md`}
        role="img"
        aria-label={`Mascote Vizi do VisionPass com expressão ${expression}`}
      >
        <defs>
          {/* Gradiente do Corpo Peludo Roxo */}
          <linearGradient id="viziBodyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="55%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>

          {/* Gradiente das Orelhas / Antenas */}
          <linearGradient id="viziHornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Glow das pontas das antenas */}
          <radialGradient id="viziTipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F8F7FF" />
            <stop offset="60%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>

          {/* Sombra de chão */}
          <radialGradient id="viziShadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#09070D" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sombra suave abaixo do Vizi */}
        <ellipse cx="100" cy="204" rx="55" ry="8" fill="url(#viziShadowGrad)" />

        {/* --- ANTENAS / CHIFRINHOS FOFOS --- */}
        {/* Antena Esquerda */}
        <g className={expression === 'error' ? 'translate-y-2 rotate-[-10deg] origin-bottom' : ''}>
          <path
            d="M62 48C52 24 38 18 40 10C42 2 54 12 70 36"
            stroke="url(#viziHornGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Ponta brilhante da antena */}
          <circle cx="40" cy="10" r="7" fill="url(#viziTipGlow)" />
          <circle cx="40" cy="10" r="3.5" fill="#FFFFFF" />
        </g>

        {/* Antena Direita */}
        <g className={expression === 'error' ? 'translate-y-2 rotate-[10deg] origin-bottom' : ''}>
          <path
            d="M138 48C148 24 162 18 160 10C158 2 146 12 130 36"
            stroke="url(#viziHornGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Ponta brilhante da antena */}
          <circle cx="160" cy="10" r="7" fill="url(#viziTipGlow)" />
          <circle cx="160" cy="10" r="3.5" fill="#FFFFFF" />
        </g>

        {/* --- CORPO PRINCIPAL E CABEÇA MACIA --- */}
        {/* Silhueta monstrinho arredondado com mechas de pelos nas laterais e topo */}
        <path
          d="M100 36
             C142 36 172 65 174 105
             C176 122 184 128 178 142
             C172 156 166 162 160 178
             C152 195 130 200 100 200
             C70 200 48 195 40 178
             C34 162 28 156 22 142
             C16 128 24 122 26 105
             C28 65 58 36 100 36Z"
          fill="url(#viziBodyGrad)"
          stroke="#C084FC"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Mecha de cabelinho / pelinhos fofos no topo */}
        <path
          d="M93 36C95 24 105 24 107 36"
          stroke="#C084FC"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M101 36C103 20 114 22 112 36"
          stroke="#A855F7"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Patinhas / Bracinhos do Vizi */}
        {expression === 'success' ? (
          // Bracinhos levantados em festa
          <>
            <ellipse cx="25" cy="100" rx="12" ry="9" fill="#7C3AED" stroke="#C084FC" strokeWidth="2" transform="rotate(-30 25 100)" />
            <ellipse cx="175" cy="100" rx="12" ry="9" fill="#7C3AED" stroke="#C084FC" strokeWidth="2" transform="rotate(30 175 100)" />
          </>
        ) : expression === 'thinking' ? (
          // Mãozinha no queixo
          <>
            <ellipse cx="32" cy="138" rx="11" ry="8" fill="#7C3AED" stroke="#C084FC" strokeWidth="1.5" />
            <ellipse cx="120" cy="132" rx="10" ry="8" fill="#7C3AED" stroke="#C084FC" strokeWidth="1.5" transform="rotate(-20 120 132)" />
          </>
        ) : (
          // Patinhas normais fofas ao lado
          <>
            <ellipse cx="32" cy="144" rx="11" ry="8" fill="#7C3AED" stroke="#C084FC" strokeWidth="1.5" />
            <ellipse cx="168" cy="144" rx="11" ry="8" fill="#7C3AED" stroke="#C084FC" strokeWidth="1.5" />
          </>
        )}

        {/* Patinhas inferiores (pezinhos) */}
        <ellipse cx="76" cy="196" rx="14" ry="7" fill="#4C1D95" stroke="#C084FC" strokeWidth="1.5" />
        <ellipse cx="124" cy="196" rx="14" ry="7" fill="#4C1D95" stroke="#C084FC" strokeWidth="1.5" />

        {/* Barriguinha com tom roxo mais suave */}
        <ellipse cx="100" cy="148" rx="42" ry="34" fill="#6D28D9" fillOpacity="0.4" />

        {/* --- SÍMBOLO BIOMÉTRICO FACIAL NO PEITO --- */}
        {/* Representa "Tecnologia que aproxima" */}
        <g transform="translate(86, 142)">
          {/* Cantoneiras de reconhecimento no peito */}
          <path d="M4 8V5C4 4.4 4.4 4 5 4H8" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 8V5C24 4.4 23.6 4 23 4H20" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 18V21C4 21.6 4.4 22 5 22H8" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M24 18V21C24 21.6 23.6 22 23 22H20" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
          {/* Coraçãozinho / rosto biométrico pulsante no peito */}
          <circle cx="14" cy="13" r="4" fill="#A855F7" />
          <circle cx="14" cy="13" r="2" fill="#F8F7FF" />
        </g>

        {/* Bochechas rosadas fofas */}
        <ellipse cx="56" cy="116" rx="8" ry="5" fill="#F472B6" fillOpacity="0.5" />
        <ellipse cx="144" cy="116" rx="8" ry="5" fill="#F472B6" fillOpacity="0.5" />

        {/* --- OLHOS EXPRESSIVOS BASEADOS NA EXPRESSÃO --- */}
        {expression === 'happy' && (
          // Olhos Grandes e Felizes com Brilho
          <g>
            {/* Olho Esquerdo */}
            <ellipse cx="72" cy="95" rx="14" ry="17" fill="#09070D" />
            <circle cx="76" cy="90" r="6" fill="#FFFFFF" />
            <circle cx="68" cy="100" r="2.5" fill="#C084FC" />

            {/* Olho Direito */}
            <ellipse cx="128" cy="95" rx="14" ry="17" fill="#09070D" />
            <circle cx="132" cy="90" r="6" fill="#FFFFFF" />
            <circle cx="124" cy="100" r="2.5" fill="#C084FC" />
          </g>
        )}

        {expression === 'thinking' && (
          // Olhos curiosos olhando para cima/lado
          <g>
            <ellipse cx="72" cy="94" rx="13" ry="16" fill="#09070D" />
            <circle cx="70" cy="88" r="5.5" fill="#FFFFFF" />
            <circle cx="75" cy="98" r="2" fill="#C084FC" />

            <ellipse cx="128" cy="94" rx="14" ry="14" fill="#09070D" />
            <circle cx="126" cy="88" r="5.5" fill="#FFFFFF" />
            <circle cx="131" cy="98" r="2" fill="#C084FC" />
            {/* Sobrancelha curiosa */}
            <path d="M64 74 Q72 70 80 73" stroke="#F8F7FF" strokeWidth="2" strokeLinecap="round" />
            <path d="M120 72 Q128 66 136 70" stroke="#F8F7FF" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {expression === 'alert' && (
          // Olhos bem arregalados e atentos
          <g>
            <circle cx="72" cy="94" r="16" fill="#09070D" stroke="#C084FC" strokeWidth="2" />
            <circle cx="72" cy="94" r="7" fill="#A855F7" />
            <circle cx="72" cy="94" r="4" fill="#FFFFFF" />

            <circle cx="128" cy="94" r="16" fill="#09070D" stroke="#C084FC" strokeWidth="2" />
            <circle cx="128" cy="94" r="7" fill="#A855F7" />
            <circle cx="128" cy="94" r="4" fill="#FFFFFF" />
          </g>
        )}

        {expression === 'success' && (
          // Olhos fechados em arco de felicidade extrema (^ ^)
          <g>
            <path d="M60 96 C64 85 78 85 84 96" stroke="#09070D" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M116 96 C120 85 134 85 140 96" stroke="#09070D" strokeWidth="4.5" strokeLinecap="round" />
            {/* Estrelinhas de sucesso */}
            <path d="M30 65L32 60L37 62L33 66L35 71L30 68L25 71L27 66L23 62L28 60Z" fill="#FBBF24" />
            <path d="M170 65L172 60L177 62L173 66L175 71L170 68L165 71L167 66L163 62L168 60Z" fill="#FBBF24" />
          </g>
        )}

        {expression === 'error' && (
          // Olhos preocupados com sobrancelhas caídas
          <g>
            <path d="M62 76 Q72 82 82 78" stroke="#F8F7FF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M118 78 Q128 82 138 76" stroke="#F8F7FF" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="72" cy="97" rx="12" ry="14" fill="#09070D" />
            <circle cx="70" cy="94" r="4" fill="#FFFFFF" />
            <ellipse cx="128" cy="97" rx="12" ry="14" fill="#09070D" />
            <circle cx="126" cy="94" r="4" fill="#FFFFFF" />
          </g>
        )}

        {expression === 'sleepy' && (
          // Olhinhos dorminhocos tranquilos (u u)
          <g>
            <path d="M62 95 C66 102 78 102 82 95" stroke="#09070D" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M118 95 C122 102 134 102 138 95" stroke="#09070D" strokeWidth="3.5" strokeLinecap="round" />
            {/* Letras Zz flutuantes */}
            <text x="145" y="70" fill="#C084FC" fontSize="14" fontWeight="bold" fontFamily="monospace">z</text>
            <text x="156" y="56" fill="#A855F7" fontSize="18" fontWeight="bold" fontFamily="monospace">Z</text>
          </g>
        )}

        {/* --- BOCA AMIGÁVEL COM PEQUENAS PRESAS FOFAS --- */}
        {expression === 'happy' || expression === 'success' ? (
          // Sorriso largo com 2 presinhas brancas fofas apontando
          <g>
            {/* Abertura da boca */}
            <path
              d="M84 116 Q100 134 116 116 Z"
              fill="#09070D"
              stroke="#09070D"
              strokeWidth="1.5"
            />
            {/* Língua rosada */}
            <path
              d="M93 125 Q100 133 107 125 Z"
              fill="#F472B6"
            />
            {/* Presa Esquerda */}
            <polygon points="87,116 91,116 89,122" fill="#FFFFFF" />
            {/* Presa Direita */}
            <polygon points="109,116 113,116 111,122" fill="#FFFFFF" />
          </g>
        ) : expression === 'thinking' ? (
          // Boquinha de lado curiosa
          <g>
            <path d="M92 120 Q104 123 112 118" stroke="#09070D" strokeWidth="3" strokeLinecap="round" fill="none" />
            <polygon points="108,118 112,118 110,123" fill="#FFFFFF" />
          </g>
        ) : expression === 'alert' ? (
          // Boquinha em pequeno 'o' espantado com mini presinha
          <g>
            <ellipse cx="100" cy="120" rx="6" ry="7" fill="#09070D" />
            <polygon points="97,115 100,115 98.5,118" fill="#FFFFFF" />
          </g>
        ) : expression === 'error' ? (
          // Boquinha tristonha/ondulada
          <g>
            <path d="M88 122 Q100 115 112 122" stroke="#09070D" strokeWidth="3" strokeLinecap="round" fill="none" />
            <polygon points="90,121 93,121 91.5,125" fill="#FFFFFF" />
            <polygon points="107,121 110,121 108.5,125" fill="#FFFFFF" />
          </g>
        ) : (
          // Boquinha dormindo calma
          <path d="M94 118 Q100 121 106 118" stroke="#09070D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        )}

      </svg>
    </div>
  );
};
