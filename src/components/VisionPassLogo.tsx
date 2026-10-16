import React from 'react';
import { VisionPassIcon } from './VisionPassIcon';

interface VisionPassLogoProps {
  variant?: 'horizontal' | 'icon-only' | 'stacked';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTrademark?: boolean;
  className?: string;
}

export const VisionPassLogo: React.FC<VisionPassLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  showTrademark = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 48,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconVariant = theme === 'dark' ? 'gradient' : 'purple';

  if (variant === 'icon-only') {
    return <VisionPassIcon size={iconSizes[size]} variant={iconVariant} className={className} />;
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative group">
        <VisionPassIcon size={iconSizes[size]} variant={iconVariant} />
        {/* Glow sutil roxo no hover */}
        <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-md -z-10 group-hover:bg-purple-500/40 transition-all pointer-events-none" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center leading-none">
          <span className={`font-extrabold tracking-tight ${textSizes[size]} ${
            theme === 'dark' ? 'text-[#F8F7FF]' : 'text-slate-900'
          }`}>
            Vision<span className="bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#7C3AED] bg-clip-text text-transparent">Pass</span>
          </span>

          {showTrademark && (
            <span className="text-[10px] sm:text-xs font-bold text-[#A855F7] ml-0.5 align-super">
              ™
            </span>
          )}
        </div>

        {size !== 'sm' && (
          <span className="text-[10px] tracking-wider uppercase font-semibold text-[#B8B0C7]/80 mt-1">
            Controle de Acesso Escolar
          </span>
        )}
      </div>
    </div>
  );
};
