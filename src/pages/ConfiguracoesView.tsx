import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '../components/UIComponents';
import { 
  Settings, 
  School, 
  Clock, 
  BellRing, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Save 
} from 'lucide-react';

export const ConfiguracoesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'institution' | 'schedules' | 'delays' | 'users' | 'permissions'>('institution');

  // Estados Institucionais
  const [instName, setInstName] = useState('Colégio Inovação & Tecnologia');
  const [instCnpj, setInstCnpj] = useState('12.345.678/0001-90');
  const [entryTime, setEntryTime] = useState('07:15');
  const [limitTime, setLimitTime] = useState('07:30');
  const [exitTime, setExitTime] = useState('12:40');
  const [delayTolerance, setDelayTolerance] = useState('15');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Topo de Configurações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Configurações do Sistema</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Definições de parâmetros escolares, horários de turnos, regras de tolerância e perfis de acesso
          </p>
        </div>

        {savedSuccess && (
          <Badge variant="success">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Configurações salvas com sucesso!</span>
          </Badge>
        )}
      </div>

      {/* Abas */}
      <div className="flex border-b border-[#A855F7]/20 gap-2 pb-1 overflow-x-auto">
        {[
          { id: 'institution', label: 'Instituição', icon: School },
          { id: 'schedules', label: 'Horários & Turnos', icon: Clock },
          { id: 'delays', label: 'Regras de Atraso', icon: Clock },
          { id: 'users', label: 'Usuários do Sistema', icon: Users },
          { id: 'permissions', label: 'Permissões & Papéis', icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                activeTab === tab.id
                  ? 'bg-[#7C3AED] text-white border-[#C084FC] shadow-md shadow-[#7C3AED]/25'
                  : 'bg-[#17121F] text-[#B8B0C7] border-transparent hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo Aba Instituição */}
      {activeTab === 'institution' && (
        <Card className="p-6 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-base font-bold text-[#F8F7FF] pb-2 border-b border-[#A855F7]/15">
              Dados da Instituição Escolar
            </h3>

            <Input
              label="Nome da Instituição"
              value={instName}
              onChange={(e) => setInstName(e.target.value)}
              required
            />

            <Input
              label="CNPJ Institucional"
              value={instCnpj}
              onChange={(e) => setInstCnpj(e.target.value)}
              required
            />

            <Input
              label="E-mail Administrativo Oficial"
              defaultValue="diretoria@inovacao.edu.br"
              type="email"
              required
            />

            <div className="pt-2 flex justify-end">
              <Button variant="primary" type="submit" leftIcon={<Save className="w-4 h-4" />}>
                Salvar alterações
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Conteúdo Aba Horários */}
      {activeTab === 'schedules' && (
        <Card className="p-6 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-base font-bold text-[#F8F7FF] pb-2 border-b border-[#A855F7]/15">
              Grade de Horários para Liberação nas Catracas
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Abertura das Catracas (Entrada)"
                type="time"
                value={entryTime}
                onChange={(e) => setEntryTime(e.target.value)}
              />
              <Input
                label="Horário Oficial de Início das Aulas"
                type="time"
                value={limitTime}
                onChange={(e) => setLimitTime(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Horário Padrão de Saída"
                type="time"
                value={exitTime}
                onChange={(e) => setExitTime(e.target.value)}
              />
              <Input
                label="Fechamento dos Portões"
                type="time"
                defaultValue="18:30"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" type="submit" leftIcon={<Save className="w-4 h-4" />}>
                Salvar horários
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Conteúdo Aba Regras de Atraso */}
      {activeTab === 'delays' && (
        <Card className="p-6 max-w-2xl">
          <form onSubmit={handleSave} className="space-y-4">
            <h3 className="text-base font-bold text-[#F8F7FF] pb-2 border-b border-[#A855F7]/15">
              Parâmetros de Tolerância e Disparo de Alertas
            </h3>

            <Input
              label="Tolerância de Atraso na Catraca (Minutos)"
              type="number"
              value={delayTolerance}
              onChange={(e) => setDelayTolerance(e.target.value)}
            />

            <div className="p-4 rounded-xl bg-[#110D18] border border-[#A855F7]/25 space-y-2 text-xs text-[#B8B0C7]">
              <span className="font-bold text-[#F8F7FF] block">Regra Ativa:</span>
              <p>
                Qualquer aluno que cruzar a catraca com reconhecimento facial entre <strong>07:31</strong> e <strong>07:45</strong> será registrado como <em>Atraso Tolerado</em> e notificado ao responsável.
              </p>
              <p>
                Passagens após <strong>07:46</strong> exigem justificativa com a coordenação pedagógica.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="primary" type="submit" leftIcon={<Save className="w-4 h-4" />}>
                Salvar parâmetros
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Conteúdo Aba Usuários e Permissões */}
      {(activeTab === 'users' || activeTab === 'permissions') && (
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-[#F8F7FF] pb-2 border-b border-[#A855F7]/15">
            Perfis de Acesso no VisionPass
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#110D18] border border-[#A855F7]/30 space-y-2">
              <Badge variant="primary">Administrador</Badge>
              <p className="text-xs text-[#B8B0C7]">Acesso total a todas as catracas, cadastro biométrico de alunos, relatórios financeiros e de frequência.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#110D18] border border-[#A855F7]/30 space-y-2">
              <Badge variant="primary">Professor</Badge>
              <p className="text-xs text-[#B8B0C7]">Acesso ao diário digital de suas turmas, conferência de presença facial e criação de comunicados.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#110D18] border border-[#A855F7]/30 space-y-2">
              <Badge variant="primary">Responsável</Badge>
              <p className="text-xs text-[#B8B0C7]">Acesso estrito e seguro aos registros, horários de entrada/saída e alertas do próprio dependente.</p>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
};
