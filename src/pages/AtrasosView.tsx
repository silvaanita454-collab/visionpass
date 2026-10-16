import React from 'react';
import { Card, Badge } from '../components/UIComponents';
import { mockDelayLogs } from '../data/mockData';
import { Clock, AlertTriangle, TrendingDown } from 'lucide-react';

export const AtrasosView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Controle de Atrasos</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Monitoramento de alunos que cruzaram a catraca após o horário limite de tolerância (07:30)
          </p>
        </div>

        <Badge variant="warning">
          <Clock className="w-3.5 h-3.5" />
          <span>Tolerância: 15 min</span>
        </Badge>
      </div>

      {/* Gráfico de Atrasos por Período */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#A855F7]/15">
          <div>
            <h3 className="text-base font-bold text-[#F8F7FF]">Incidência de Atrasos por Dia da Semana</h3>
            <p className="text-xs text-[#B8B0C7]">Histórico dos últimos 30 dias de registros na catraca</p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            Redução de 22% este mês
          </span>
        </div>

        {/* Gráfico em Barras */}
        <div className="grid grid-cols-5 gap-3 items-end h-40 pt-4 px-4">
          {[
            { day: 'Segunda-feira', count: 18, height: '90%', alert: true },
            { day: 'Terça-feira', count: 9, height: '45%' },
            { day: 'Quarta-feira', count: 11, height: '55%' },
            { day: 'Quinta-feira', count: 7, height: '35%' },
            { day: 'Sexta-feira', count: 14, height: '70%' },
          ].map((bar) => (
            <div key={bar.day} className="flex flex-col items-center gap-2 group h-full justify-end">
              <span className="text-[11px] font-mono text-[#C084FC]">{bar.count} atrasos</span>
              <div
                style={{ height: bar.height }}
                className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 ${
                  bar.alert
                    ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-md shadow-amber-500/25'
                    : 'bg-[#110D18] border border-[#A855F7]/30 hover:border-[#A855F7]'
                }`}
              />
              <span className="text-xs font-semibold text-[#B8B0C7]">{bar.day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabela de Atrasos Registrados */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[#A855F7]/15 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#F8F7FF] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Registros de Impontualidade na Catraca</span>
          </h3>
          <span className="text-xs text-[#B8B0C7]">{mockDelayLogs.length} ocorrências registradas</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#110D18] border-b border-[#A855F7]/20 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Aluno</th>
                <th className="p-4 font-semibold">Turma</th>
                <th className="p-4 font-semibold">Horário Previsto</th>
                <th className="p-4 font-semibold">Horário na Catraca</th>
                <th className="p-4 font-semibold">Tempo de Atraso</th>
                <th className="p-4 font-semibold">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A855F7]/10">
              {mockDelayLogs.map((del) => (
                <tr key={del.id} className="hover:bg-[#110D18]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={del.studentAvatar}
                        alt={del.studentName}
                        className="w-8 h-8 rounded-full border border-[#A855F7]/30 object-cover shrink-0"
                      />
                      <span className="font-bold text-[#F8F7FF]">{del.studentName}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#F8F7FF]">{del.classGroup}</td>
                  <td className="p-4 font-mono text-[#B8B0C7]">{del.expectedTime}</td>
                  <td className="p-4 font-mono text-[#F8F7FF]">{del.registeredTime}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                      +{del.delayMinutes} min
                    </span>
                  </td>
                  <td className="p-4 text-[#B8B0C7]">{del.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
