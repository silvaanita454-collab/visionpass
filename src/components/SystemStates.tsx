import React from 'react';
import { ViziMascot } from './ViziMascot';
import { RefreshCw, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Preparando seu painel...',
  size = 'md'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <ViziMascot expression="thinking" size={size} />
      <div className="flex items-center gap-2 text-[#C084FC] text-sm font-semibold">
        <RefreshCw className="w-4 h-4 animate-spin text-[#A855F7]" />
        <span>{message}</span>
      </div>
      <p className="text-xs text-[#B8B0C7]">O VisionPass está processando os dados com a catraca facial.</p>
    </div>
  );
};

interface SuccessStateProps {
  title?: string;
  message?: string;
  onAction?: () => void;
  actionText?: string;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  title = 'Registro realizado com sucesso!',
  message = 'A operação foi concluída e os registros foram atualizados.',
  onAction,
  actionText = 'Continuar'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <ViziMascot expression="success" size="md" />
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-[#F8F7FF] flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          {title}
        </h4>
        <p className="text-xs text-[#B8B0C7] max-w-sm">{message}</p>
      </div>
      {onAction && (
        <button
          onClick={onAction}
          className="vp-btn-primary px-5 py-2.5 text-xs font-semibold cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Ops! Não conseguimos concluir esta ação.',
  message = 'Houve uma instabilidade temporária na comunicação. Por favor, tente novamente.',
  onRetry,
  retryText = 'Tentar novamente'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <ViziMascot expression="error" size="md" />
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-rose-300">{title}</h4>
        <p className="text-xs text-[#B8B0C7] max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="vp-btn-secondary px-5 py-2 text-xs font-semibold flex items-center gap-2 cursor-pointer hover:border-rose-400"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{retryText}</span>
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nenhum registro encontrado.',
  message = 'Não há dados cadastrados ou eventos para este período.',
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
      <ViziMascot expression="alert" size="md" />
      <div className="space-y-1">
        <h4 className="text-base font-bold text-[#F8F7FF]">{title}</h4>
        <p className="text-xs text-[#B8B0C7] max-w-sm">{message}</p>
      </div>
      {onAction && actionText && (
        <button
          onClick={onAction}
          className="vp-btn-primary px-4 py-2 text-xs font-semibold cursor-pointer"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

interface NotFoundStateProps {
  onBackHome?: () => void;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  onBackHome
}) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-5">
      <ViziMascot expression="sleepy" size="lg" />
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-[#C084FC] uppercase tracking-widest px-3 py-1 rounded-full bg-[#7C3AED]/20 border border-[#A855F7]/30">
          Erro 404
        </span>
        <h3 className="text-2xl font-extrabold text-[#F8F7FF]">
          Ops! Essa página não foi encontrada.
        </h3>
        <p className="text-sm text-[#B8B0C7] max-w-md">
          O Vizi procurou por todas as catracas, mas o endereço solicitado não existe ou mudou de lugar.
        </p>
      </div>
      {onBackHome && (
        <button
          onClick={onBackHome}
          className="vp-btn-primary px-6 py-3 text-sm font-semibold flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao início</span>
        </button>
      )}
    </div>
  );
};
