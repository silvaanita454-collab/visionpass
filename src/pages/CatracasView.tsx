import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Input } from '../components/UIComponents';
import { mockTurnstiles } from '../data/mockData';
import { Turnstile, TurnstileStatus } from '../types';
import { TurnstileInteractive } from '../components/TurnstileInteractive';
import { Plus, ShieldCheck, Activity, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export const CatracasView: React.FC = () => {
  const [turnstiles, setTurnstiles] = useState<Turnstile[]>(mockTurnstiles);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newStatus, setNewStatus] = useState<TurnstileStatus>('Online');
  const [selectedTurnstile, setSelectedTurnstile] = useState<Turnstile | null>(null);

  const handleAddTurnstile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newLocation) return;

    const created: Turnstile = {
      id: `trn-${Date.now()}`,
      name: newName,
      location: newLocation,
      status: newStatus,
      lastPing: 'Agora mesmo',
      totalPassagesToday: 0,
      firmwareVersion: 'v3.4.1-ai'
    };

    setTurnstiles([created, ...turnstiles]);
    setIsAddModalOpen(false);
    setNewName('');
    setNewLocation('');
  };

  const getStatusBadge = (status: TurnstileStatus) => {
    switch (status) {
      case 'Online':
        return <Badge variant="success">Online</Badge>;
      case 'Offline':
        return <Badge variant="danger">Offline</Badge>;
      case 'Manutenção':
        return <Badge variant="warning">Manutenção</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Catracas Inteligentes</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Monitoramento de status, firmware e fluxo biométrico dos terminais físicos da instituição
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Adicionar catraca
        </Button>
      </div>

      {/* Grid de Cards das Catracas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {turnstiles.map((trn) => (
          <Card key={trn.id} className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#C084FC] border border-[#A855F7]/30 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                {getStatusBadge(trn.status)}
              </div>

              <h3 className="text-base font-bold text-[#F8F7FF] mb-1">{trn.name}</h3>

              <div className="flex items-center gap-1.5 text-xs text-[#B8B0C7] mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                <span className="truncate">{trn.location}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#110D18] border border-[#A855F7]/20 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#B8B0C7]">
                  <span>Passagens hoje:</span>
                  <span className="font-bold text-[#F8F7FF]">{trn.totalPassagesToday}</span>
                </div>
                <div className="flex items-center justify-between text-[#B8B0C7]">
                  <span>Último ping:</span>
                  <span className="font-mono text-emerald-400">{trn.lastPing}</span>
                </div>
                <div className="flex items-center justify-between text-[#B8B0C7]">
                  <span>Firmware:</span>
                  <span className="font-mono text-[#C084FC]">{trn.firmwareVersion}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#A855F7]/15">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center text-xs"
                onClick={() => setSelectedTurnstile(trn)}
                leftIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                Simular leitura
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Destaque Interativo de Validação Facial da Catraca */}
      <Card className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <Badge variant="primary">Terminal Físico Integrado</Badge>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F8F7FF]">
              {selectedTurnstile ? selectedTurnstile.name : 'Terminal da Catraca Principal'}
            </h3>
            <p className="text-xs sm:text-sm text-[#B8B0C7] leading-relaxed">
              O módulo biométrico facial executa a detecção do contorno facial do estudante e a verificação de vivacidade antes de destravar o relé eletromecânico do rotor da catraca.
            </p>

            <div className="space-y-2 text-xs text-[#F8F7FF]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Bloqueio automático para rostos não cadastrados na instituição</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Anti-spoofing ativo contra reproduções fotográficas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Giro auditável gravado em milissegundos no banco de dados</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <TurnstileInteractive showVizi={true} />
          </div>
        </div>
      </Card>

      {/* Modal de Cadastro de Catraca */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Cadastrar Nova Catraca"
        subtitle="Adicione um novo ponto de controle de acesso físico escolar"
      >
        <form onSubmit={handleAddTurnstile} className="space-y-4">
          <Input
            label="Identificação da Catraca"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Ex: Catraca 05 - Entrada Biblioteca"
            required
          />

          <Input
            label="Local de Instalação Física"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Ex: Bloco Acadêmico C • Piso Térreo"
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Status Inicial</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as TurnstileStatus)}
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
            >
              <option value="Online">Online</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar catraca
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
