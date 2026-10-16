import React from 'react';

interface VisionPassIconProps {
  size?: number | string;
  className?: string;
  variant?: 'purple' | 'white' | 'gradient';
}

export const VisionPassIcon: React.FC<VisionPassIconProps> = ({
  size = 32,
  className = '',
  variant = 'gradient'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="VisionPass Ícone"
    >
      <defs>
        <linearGradient id="vpGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        <linearGradient id="vpGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      {/* Escudo tecnológico de fundo */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="14"
        fill={variant === 'white' ? '#ffffff' : 'url(#vpGrad1)'}
        fillOpacity={variant === 'white' ? '0.12' : '0.2'}
        stroke={variant === 'white' ? '#ffffff' : 'url(#vpGlow)'}
        strokeWidth="2"
      />

      {/* Cantoneiras de Reconhecimento Facial (Targeting Brackets) */}
      <path
        d="M12 18V13C12 12.4477 12.4477 12 13 12H18"
        stroke={variant === 'white' ? '#ffffff' : '#C084FC'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 18V13C36 12.4477 35.5523 12 35 12H30"
        stroke={variant === 'white' ? '#ffffff' : '#C084FC'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 30V35C12 35.5523 12.4477 36 13 36H18"
        stroke={variant === 'white' ? '#ffffff' : '#C084FC'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 30V35C36 35.5523 35.5523 36 35 36H30"
        stroke={variant === 'white' ? '#ffffff' : '#C084FC'}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Silhueta Facial Biométrica Central */}
      <path
        d="M24 16C19.5817 16 16 19.5817 16 24C16 27.5 18.5 30.5 22 31.7V33H26V31.7C29.5 30.5 32 27.5 32 24C32 19.5817 28.4183 16 24 16Z"
        fill={variant === 'white' ? '#ffffff' : 'url(#vpGlow)'}
        fillOpacity="0.25"
        stroke={variant === 'white' ? '#ffffff' : '#F8F7FF'}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pontos Nodais de Biometria Facial */}
      <circle cx="21" cy="22" r="1.5" fill={variant === 'white' ? '#ffffff' : '#C084FC'} />
      <circle cx="27" cy="22" r="1.5" fill={variant === 'white' ? '#ffffff' : '#C084FC'} />
      <circle cx="24" cy="26" r="1.2" fill={variant === 'white' ? '#ffffff' : '#C084FC'} />

      {/* Feixe de escaneamento central */}
      <line
        x1="18"
        y1="24"
        x2="30"
        y2="24"
        stroke={variant === 'white' ? '#ffffff' : '#A855F7'}
        strokeWidth="1.2"
        strokeDasharray="2 2"
      />
    </svg>
  );
};
