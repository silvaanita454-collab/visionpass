import React, { useState } from 'react';
import { Card, Badge, Button } from '../components/UIComponents';
import { mockAccessLogs, mockStudents } from '../data/mockData';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  Filter, 
  CheckCircle2 
} from 'lucide-react';

export const RelatoriosView: React.FC = () => {
  const [reportType, setReportType] = useState('attendance_student');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isExporting, setIsExporting] = useState(false);

  // Exportação CSV real no navegador
  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        ['Aluno,Matrícula,Turma,Data,Horário,Catraca,Tipo,Status']
          .concat(
            mockAccessLogs.map(
              (l) => `${l.studentName},${l.registration},3º Ano A,${l.date},${l.time},${l.turnstileName},${l.type},${l.status}`
            )
          )
          .join('\n');

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `relatorio_visionpass_${reportType}_2026.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Topo da Página de Relatórios */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Relatórios e Auditoria</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Consolidação estatística de frequência, passagens em catracas e auditoria institucional
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            isLoading={isExporting}
            leftIcon={<Download className="w-4 h-4 text-[#C084FC]" />}
          >
            Exportar CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => alert('Relatório analítico gerado e preparado para impressão!')}
            leftIcon={<FileSpreadsheet className="w-4 h-4" />}
          >
            Exportar relatório
          </Button>
        </div>
      </div>

      {/* Seleção de Relatórios e Filtros */}
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Tipo de Relatório</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="attendance_student">Frequência por Aluno</option>
              <option value="attendance_class">Frequência por Turma</option>
              <option value="delays">Relatório de Atrasos</option>
              <option value="turnstiles">Registros das Catracas</option>
              <option value="entries_exits">Entradas e Saídas</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="today">Hoje (02/10/2026)</option>
              <option value="weekly">Esta Semana</option>
              <option value="monthly">Este Mês (Outubro/2026)</option>
              <option value="bimester">3º Bimestre</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Turma</label>
            <select
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option>Todas as Turmas</option>
              <option>3º Ano A - Ensino Médio</option>
              <option>2º Ano B - Ensino Médio</option>
              <option>1º Ano A - Ensino Médio</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Catraca Física</label>
            <select
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option>Todos os Terminais</option>
              <option>Catraca 01 - Portaria</option>
              <option>Catraca 02 - Portaria</option>
              <option>Catraca 03 - Pátio/Ginásio</option>
            </select>
          </div>

        </div>
      </Card>

      {/* Gráfico Analítico de Comparação Bimestral */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#A855F7]/15">
          <div>
            <h3 className="text-base font-bold text-[#F8F7FF]">Visão Comparativa de Frequência Bimestral</h3>
            <p className="text-xs text-[#B8B0C7]">Média ponderada calculada pelas validações biométricas</p>
          </div>
          <Badge variant="success">96.8% Média Atual</Badge>
        </div>

        <div className="grid grid-cols-4 gap-4 items-end h-44 pt-6 px-4">
          {[
            { label: '1º Bimestre', rate: 94.2, height: '82%' },
            { label: '2º Bimestre', rate: 95.8, height: '88%' },
            { label: '3º Bimestre (Atual)', rate: 96.8, height: '94%', current: true },
            { label: 'Meta Anual', rate: 90.0, height: '75%', meta: true },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 group h-full justify-end">
              <span className="text-xs font-mono font-bold text-[#F8F7FF]">{item.rate}%</span>
              <div
                style={{ height: item.height }}
                className={`w-full max-w-[56px] rounded-t-xl transition-all ${
                  item.current
                    ? 'bg-gradient-to-t from-[#7C3AED] to-[#C084FC] shadow-lg shadow-[#7C3AED]/40'
                    : item.meta
                    ? 'bg-emerald-500/30 border border-emerald-400'
                    : 'bg-[#110D18] border border-[#A855F7]/30'
                }`}
              />
              <span className="text-xs font-semibold text-[#B8B0C7] text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabela do Relatório Selecionado */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[#A855F7]/15 flex items-center justify-between">
          <span className="text-xs font-bold text-[#F8F7FF] uppercase tracking-wider">
            Prévia de Dados do Relatório
          </span>
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Integridade de banco validada
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#110D18] border-b border-[#A855F7]/20 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Aluno</th>
                <th className="p-4 font-semibold">Matrícula</th>
                <th className="p-4 font-semibold">Turma</th>
                <th className="p-4 font-semibold">Total Presenças</th>
                <th className="p-4 font-semibold">Atrasos</th>
                <th className="p-4 font-semibold text-right">Taxa Assiduidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A855F7]/10">
              {mockStudents.map((st) => (
                <tr key={st.id} className="hover:bg-[#110D18]/50 transition-colors">
                  <td className="p-4 font-bold text-[#F8F7FF]">{st.name}</td>
                  <td className="p-4 font-mono text-[#C084FC]">{st.registration}</td>
                  <td className="p-4 text-[#B8B0C7]">{st.classGroup}</td>
                  <td className="p-4 text-[#F8F7FF]">178 dias</td>
                  <td className="p-4 text-amber-300">1 ocorrência</td>
                  <td className="p-4 text-right font-mono font-bold text-emerald-400">
                    {st.attendanceRate}%
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
