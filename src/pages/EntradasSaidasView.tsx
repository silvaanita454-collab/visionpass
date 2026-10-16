import React, { useState } from 'react';
import { Card, Badge } from '../components/UIComponents';
import { mockAccessLogs } from '../data/mockData';
import { AccessType, AccessStatus } from '../types';
import { Search, Filter, ArrowLeftRight, CheckCircle2, XCircle } from 'lucide-react';

export const EntradasSaidasView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | AccessType>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | AccessStatus>('ALL');
  const [turnstileFilter, setTurnstileFilter] = useState('ALL');

  const filteredLogs = mockAccessLogs.filter((log) => {
    const matchesSearch =
      log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.registration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'ALL' || log.type === typeFilter;
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    const matchesTurnstile = turnstileFilter === 'ALL' || log.turnstileName.includes(turnstileFilter);

    return matchesSearch && matchesType && matchesStatus && matchesTurnstile;
  });

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Entradas e Saídas</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Registro biométrico detalhado de todas as passagens nas catracas com reconhecimento facial
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="primary">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Auditoria em Tempo Real</span>
          </Badge>
        </div>
      </div>

      {/* Barra de Filtros Completos */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="relative">
            <Search className="w-4 h-4 text-[#B8B0C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar aluno ou matrícula..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] placeholder:text-[#B8B0C7]/50 focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            />
          </div>

          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="ALL">Todos os Tipos (Entrada / Saída)</option>
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="ALL">Todos os Status (Autorizado / Negado)</option>
              <option value="Autorizado">Autorizado</option>
              <option value="Negado">Negado</option>
            </select>
          </div>

          <div>
            <select
              value={turnstileFilter}
              onChange={(e) => setTurnstileFilter(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="ALL">Todas as Catracas</option>
              <option value="Catraca 01">Catraca 01</option>
              <option value="Catraca 02">Catraca 02</option>
              <option value="Catraca 03">Catraca 03</option>
            </select>
          </div>

        </div>
      </Card>

      {/* Tabela de Registros */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#110D18] border-b border-[#A855F7]/20 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Aluno</th>
                <th className="p-4 font-semibold">Matrícula</th>
                <th className="p-4 font-semibold">Catraca</th>
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold">Horário</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Observações do Reconhecimento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A855F7]/10">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#110D18]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={log.studentAvatar}
                        alt={log.studentName}
                        className="w-8 h-8 rounded-full border border-[#A855F7]/30 object-cover shrink-0"
                      />
                      <span className="font-bold text-[#F8F7FF]">{log.studentName}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-[#C084FC]">{log.registration}</td>
                  <td className="p-4 text-[#B8B0C7]">{log.turnstileName}</td>
                  <td className="p-4 text-[#F8F7FF]">{log.date}</td>
                  <td className="p-4 font-mono text-xs text-[#F8F7FF]">{log.time}</td>
                  <td className="p-4">
                    <Badge variant={log.type === 'Entrada' ? 'primary' : 'outline'} size="sm">
                      {log.type}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={log.status === 'Autorizado' ? 'success' : 'danger'} size="sm">
                      {log.status === 'Autorizado' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Autorizado</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" />
                          <span>Negado</span>
                        </>
                      )}
                    </Badge>
                  </td>
                  <td className="p-4 text-xs text-[#B8B0C7] max-w-xs">{log.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
