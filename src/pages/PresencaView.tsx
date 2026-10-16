import React, { useState } from 'react';
import { Card, Badge } from '../components/UIComponents';
import { mockStudents } from '../data/mockData';
import { 
  ClipboardCheck, 
  Users, 
  UserX, 
  Clock, 
  Search, 
  TrendingUp, 
  Calendar 
} from 'lucide-react';

export const PresencaView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('02/10/2026');

  const filteredStudents = mockStudents.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.registration.includes(searchTerm);
    const matchesClass = selectedClass === 'ALL' || s.classGroup.includes(selectedClass);
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      
      {/* Topo da Página */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Frequência e Presença</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Índice de comparecimento automatizado por meio da passagem nas catracas com reconhecimento facial
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-[#17121F] border border-[#A855F7]/30 px-3 py-2 rounded-xl text-[#F8F7FF]">
          <Calendar className="w-4 h-4 text-[#A855F7]" />
          <span>Data: {selectedDate}</span>
        </div>
      </div>

      {/* Cards de Métricas de Presença */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Frequência Geral
            </span>
            <div className="text-3xl font-extrabold text-emerald-400">96.8%</div>
            <span className="text-[11px] text-[#B8B0C7] mt-1 block">Meta escolar: 90%</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Presentes Hoje
            </span>
            <div className="text-3xl font-extrabold text-[#F8F7FF]">548</div>
            <span className="text-[11px] text-emerald-400 mt-1 block">Registrados na catraca</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 text-[#C084FC] border border-[#A855F7]/30 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Ausências
            </span>
            <div className="text-3xl font-extrabold text-rose-400">18</div>
            <span className="text-[11px] text-rose-400 mt-1 block">Sem registro de entrada</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center">
            <UserX className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Atrasos Registrados
            </span>
            <div className="text-3xl font-extrabold text-amber-400">14</div>
            <span className="text-[11px] text-amber-400 mt-1 block">Após as 07:30</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="ALL">Todas as Turmas</option>
              <option value="3º Ano">3º Ano (Ensino Médio)</option>
              <option value="2º Ano">2º Ano (Ensino Médio)</option>
              <option value="1º Ano">1º Ano (Ensino Médio)</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value="2026-10-02"
              className="w-full py-2 px-3 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            />
          </div>
        </div>
      </Card>

      {/* Tabela de Presença por Aluno */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#110D18] border-b border-[#A855F7]/20 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Aluno</th>
                <th className="p-4 font-semibold">Matrícula</th>
                <th className="p-4 font-semibold">Turma</th>
                <th className="p-4 font-semibold">Assiduidade</th>
                <th className="p-4 font-semibold">Último Acesso na Catraca</th>
                <th className="p-4 font-semibold text-right">Status do Dia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A855F7]/10">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-[#110D18]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-8 h-8 rounded-full border border-[#A855F7]/30 object-cover shrink-0"
                      />
                      <span className="font-bold text-[#F8F7FF]">{st.name}</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-[#C084FC]">{st.registration}</td>
                  <td className="p-4 text-[#F8F7FF]">{st.classGroup}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-[#110D18] rounded-full overflow-hidden border border-[#A855F7]/30">
                        <div
                          style={{ width: `${st.attendanceRate}%` }}
                          className={`h-full ${st.attendanceRate >= 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                        />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#F8F7FF]">
                        {st.attendanceRate}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-[#B8B0C7]">{st.lastAccess}</td>
                  <td className="p-4 text-right">
                    <Badge variant={st.attendanceRate >= 90 ? 'success' : 'warning'} size="sm">
                      {st.attendanceRate >= 90 ? 'Presente' : 'Alerta Frequência'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

    </div>
  );
};
