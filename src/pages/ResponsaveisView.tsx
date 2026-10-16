import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/UIComponents';
import { mockStudents, mockAccessLogs, mockNotifications } from '../data/mockData';
import { 
  HeartHandshake, 
  CheckCircle2, 
  Clock, 
  ArrowDownRight, 
  ArrowUpRight, 
  BellRing, 
  Settings, 
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export const ResponsaveisView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'history' | 'notifications' | 'settings'>('summary');
  
  // Dependente associado ao responsável conectado (João Pedro Silva)
  const dependent = mockStudents[0];
  const dependentLogs = mockAccessLogs.filter((l) => l.registration === dependent.registration);
  const dependentNotifs = mockNotifications.filter((n) => n.studentName === dependent.name || n.category === 'Entrada');

  // Configurações do Responsável
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [delayNotice, setDelayNotice] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* Topo do Portal da Família */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Portal da Família</span>
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Área dos Responsáveis</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Acompanhe em tempo real as passagens de seu filho na catraca facial da instituição
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#17121F] border border-[#A855F7]/30 px-3 py-2 rounded-xl text-[#F8F7FF]">
          <Smartphone className="w-4 h-4 text-[#A855F7]" />
          <span>Notificações push ativas</span>
        </div>
      </div>

      {/* Card do Aluno Dependente */}
      <Card className="p-6 bg-gradient-to-r from-[#17121F] via-[#21192D] to-[#17121F]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <img
            src={dependent.avatar}
            alt={dependent.name}
            className="w-20 h-20 rounded-2xl border-2 border-[#A855F7] object-cover shadow-lg shadow-purple-950/40"
          />
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-extrabold text-[#F8F7FF]">{dependent.name}</h3>
              <Badge variant="success">Presença Confirmada Hoje</Badge>
            </div>
            <p className="text-xs text-[#C084FC] font-semibold">{dependent.classGroup}</p>
            <p className="text-xs text-[#B8B0C7]">
              Matrícula: <span className="font-mono text-[#F8F7FF]">{dependent.registration}</span> • Frequência Anual: <strong className="text-emerald-400">{dependent.attendanceRate}%</strong>
            </p>
          </div>

          <div className="p-3 bg-[#110D18]/80 rounded-xl border border-[#A855F7]/30 text-center sm:text-right text-xs">
            <span className="text-[#B8B0C7] block">Última leitura facial:</span>
            <span className="font-bold text-[#F8F7FF] block mt-0.5">Catraca 01 às 07:12:44</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Entrada autorizada</span>
          </div>
        </div>
      </Card>

      {/* Abas do Portal do Responsável */}
      <div className="flex border-b border-[#A855F7]/20 gap-2 overflow-x-auto pb-1">
        {[
          { id: 'summary', label: 'Resumo Diário' },
          { id: 'history', label: 'Histórico de Passagens' },
          { id: 'notifications', label: 'Notificações Recebidas' },
          { id: 'settings', label: 'Configurações' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap border ${
              activeTab === tab.id
                ? 'bg-[#7C3AED] text-white border-[#C084FC] shadow-md shadow-[#7C3AED]/25'
                : 'bg-[#17121F] text-[#B8B0C7] border-transparent hover:border-[#A855F7]/30 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo da Aba Resumo */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5">
            <span className="text-xs text-[#B8B0C7] uppercase font-bold block mb-1">Presença Hoje</span>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirmada</span>
            </div>
            <span className="text-[11px] text-[#B8B0C7] mt-1 block">Entrada no turno matutino</span>
          </Card>

          <Card className="p-5">
            <span className="text-xs text-[#B8B0C7] uppercase font-bold block mb-1">Última Entrada</span>
            <div className="text-xl font-bold text-[#F8F7FF] flex items-center gap-1.5">
              <ArrowDownRight className="w-5 h-5 text-emerald-400" />
              <span>07:12:44</span>
            </div>
            <span className="text-[11px] text-[#B8B0C7] mt-1 block">Catraca 01 - Portaria</span>
          </Card>

          <Card className="p-5">
            <span className="text-xs text-[#B8B0C7] uppercase font-bold block mb-1">Última Saída</span>
            <div className="text-xl font-bold text-[#B8B0C7] flex items-center gap-1.5">
              <ArrowUpRight className="w-5 h-5 text-blue-400" />
              <span>Aguardando</span>
            </div>
            <span className="text-[11px] text-[#B8B0C7] mt-1 block">Previsão: 12:40</span>
          </Card>

          <Card className="p-5">
            <span className="text-xs text-[#B8B0C7] uppercase font-bold block mb-1">Atrasos Recentes</span>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-5 h-5" />
              <span>Nenhum</span>
            </div>
            <span className="text-[11px] text-[#B8B0C7] mt-1 block">100% de pontualidade no mês</span>
          </Card>
        </div>
      )}

      {/* Conteúdo da Aba Histórico */}
      {activeTab === 'history' && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-[#110D18] border-b border-[#A855F7]/20 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Data</th>
                  <th className="p-4 font-semibold">Horário</th>
                  <th className="p-4 font-semibold">Catraca</th>
                  <th className="p-4 font-semibold">Sentido</th>
                  <th className="p-4 font-semibold text-right">Resultado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A855F7]/10">
                {dependentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#110D18]/50 transition-colors">
                    <td className="p-4 text-[#F8F7FF]">{log.date}</td>
                    <td className="p-4 font-mono text-[#F8F7FF]">{log.time}</td>
                    <td className="p-4 text-[#B8B0C7]">{log.turnstileName}</td>
                    <td className="p-4">
                      <Badge variant={log.type === 'Entrada' ? 'primary' : 'outline'} size="sm">
                        {log.type}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Badge variant="success" size="sm">
                        Autorizado
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Conteúdo da Aba Notificações */}
      {activeTab === 'notifications' && (
        <div className="space-y-3">
          {dependentNotifs.map((n) => (
            <Card key={n.id} className="p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#C084FC] flex items-center justify-center shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-bold text-[#F8F7FF]">{n.title}</h4>
                  <span className="text-[11px] font-mono text-[#B8B0C7]">{n.timestamp}</span>
                </div>
                <p className="text-xs text-[#B8B0C7]">{n.message}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Conteúdo da Aba Configurações */}
      {activeTab === 'settings' && (
        <Card className="p-6 max-w-2xl space-y-6">
          <h3 className="text-base font-bold text-[#F8F7FF] pb-3 border-b border-[#A855F7]/15">
            Preferências de Comunicação e Segurança
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#110D18] border border-[#A855F7]/20 cursor-pointer">
              <div>
                <span className="text-sm font-semibold text-[#F8F7FF] block">Alertas Instantâneos de Entrada</span>
                <span className="text-xs text-[#B8B0C7]">Receber notificação assim que o aluno passar pela catraca</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#7C3AED]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#110D18] border border-[#A855F7]/20 cursor-pointer">
              <div>
                <span className="text-sm font-semibold text-[#F8F7FF] block">Alerta de Saída do Campus</span>
                <span className="text-xs text-[#B8B0C7]">Receber aviso no momento em que o aluno deixar a escola</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#7C3AED]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#110D18] border border-[#A855F7]/20 cursor-pointer">
              <div>
                <span className="text-sm font-semibold text-[#F8F7FF] block">Aviso Preventivo de Atraso ou Ausência</span>
                <span className="text-xs text-[#B8B0C7]">Notificar se o aluno não passar na catraca até 07:45</span>
              </div>
              <input
                type="checkbox"
                checked={delayNotice}
                onChange={(e) => setDelayNotice(e.target.checked)}
                className="w-4 h-4 accent-[#7C3AED]"
              />
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => alert('Preferências salvas com sucesso!')}>
              Salvar preferências
            </Button>
          </div>
        </Card>
      )}

    </div>
  );
};
