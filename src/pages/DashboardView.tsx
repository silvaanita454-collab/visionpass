import React from 'react';
import { Card, Badge, Button } from '../components/UIComponents';
import { ViziMascot } from '../components/ViziMascot';
import { mockStudents, mockAccessLogs, mockTurnstiles, mockDelayLogs } from '../data/mockData';
import { 
  Users, 
  ArrowDownRight, 
  ArrowUpRight, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';

interface DashboardViewProps {
  onNavigateTo: (view: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigateTo }) => {
  const totalStudents = mockStudents.length;
  const entriesToday = mockAccessLogs.filter((l) => l.type === 'Entrada').length;
  const exitsToday = mockAccessLogs.filter((l) => l.type === 'Saída').length;
  const delaysToday = mockDelayLogs.length;

  return (
    <div className="space-y-8">
      
      {/* ========================================================
          1. CARDS DE INDICADORES PRINCIPAIS
          ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Alunos Cadastrados */}
        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Alunos Cadastrados
            </span>
            <div className="text-3xl font-extrabold text-[#F8F7FF]">{totalStudents * 142}</div>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              100% com cadastro escolar
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#7C3AED]/20 text-[#C084FC] border border-[#A855F7]/30 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </Card>

        {/* Card 2: Entradas Hoje */}
        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Entradas Hoje
            </span>
            <div className="text-3xl font-extrabold text-[#F8F7FF]">{entriesToday * 138}</div>
            <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <ArrowDownRight className="w-3.5 h-3.5" />
              Pico às 07:15 (Portaria)
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <ArrowDownRight className="w-6 h-6" />
          </div>
        </Card>

        {/* Card 3: Saídas Hoje */}
        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Saídas Hoje
            </span>
            <div className="text-3xl font-extrabold text-[#F8F7FF]">{exitsToday * 85 + 42}</div>
            <span className="text-[11px] text-[#B8B0C7] font-medium flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Fluxo vespertino ativo
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </Card>

        {/* Card 4: Atrasos Hoje */}
        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs font-semibold text-[#B8B0C7] uppercase tracking-wider block mb-1">
              Atrasos Hoje
            </span>
            <div className="text-3xl font-extrabold text-amber-400">{delaysToday * 7}</div>
            <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1 mt-1">
              <Clock className="w-3.5 h-3.5" />
              Tolerância de 15 min
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </Card>

      </div>

      {/* ========================================================
          2. GRÁFICOS VISUAIS: ENTRADAS POR HORA & PRESENÇA SEMANAL
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Gráfico 1: Fluxo Horário de Passagens nas Catracas */}
        <Card className="lg:col-span-8 p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#A855F7]/15">
            <div>
              <h3 className="text-base font-bold text-[#F8F7FF]">Fluxo de Passagens na Catraca por Horário</h3>
              <p className="text-xs text-[#B8B0C7]">Registros biométricos faciais processados ao longo do dia</p>
            </div>
            <Badge variant="primary">Tempo Real</Badge>
          </div>

          {/* Gráfico Estilizado em SVG com Barras */}
          <div className="space-y-4">
            <div className="grid grid-cols-8 gap-2 items-end h-48 pt-6 px-2">
              {[
                { time: '06:30', count: 45, height: '22%' },
                { time: '07:00', count: 180, height: '75%' },
                { time: '07:15', count: 240, height: '98%', highlight: true },
                { time: '07:30', count: 95, height: '40%' },
                { time: '08:00', count: 32, height: '18%' },
                { time: '11:45', count: 110, height: '52%' },
                { time: '12:15', count: 210, height: '88%' },
                { time: '13:00', count: 65, height: '30%' },
              ].map((bar) => (
                <div key={bar.time} className="flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-mono text-[#C084FC] opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.count}
                  </span>
                  <div
                    style={{ height: bar.height }}
                    className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                      bar.highlight
                        ? 'bg-gradient-to-t from-[#7C3AED] to-[#C084FC] shadow-lg shadow-[#7C3AED]/40'
                        : 'bg-[#110D18] border border-[#A855F7]/30 hover:border-[#A855F7]'
                    }`}
                  />
                  <span className="text-[10px] font-semibold text-[#B8B0C7]">{bar.time}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-[#B8B0C7] pt-2 border-t border-[#A855F7]/15">
              <span>Pico registrado: 07:15 (Entrada matutina)</span>
              <span className="font-semibold text-emerald-400">Tempo médio de passagem: 0.28s</span>
            </div>
          </div>
        </Card>

        {/* Gráfico 2: Painel de Alertas & Status com Vizi */}
        <Card className="lg:col-span-4 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#A855F7]/15">
              <h3 className="text-base font-bold text-[#F8F7FF] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A855F7]" />
                Painel do Vizi
              </h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full">
                Operação Normal
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <ViziMascot expression="happy" size="sm" animate={true} />
              <div className="text-xs">
                <span className="font-bold text-[#F8F7FF] block">Tudo em ordem!</span>
                <p className="text-[#B8B0C7]">3 catracas online e comunicando com a API sem perdas de pacotes.</p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="p-3 rounded-xl bg-[#110D18] border border-[#A855F7]/25 text-xs flex items-start gap-2.5">
                <Activity className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#F8F7FF] block">Catraca 01 e 02</span>
                  <span className="text-[#B8B0C7]">800 passagens registradas hoje sem falhas.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block">Catraca 04</span>
                  <span className="text-[#B8B0C7]">Manutenção preventiva programada.</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateTo('catracas')}
            className="w-full justify-center mt-4"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Gerenciar catracas
          </Button>
        </Card>

      </div>

      {/* ========================================================
          3. TABELA DE ÚLTIMOS REGISTROS DA CATRACA
          ======================================================== */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#A855F7]/15">
          <div>
            <h3 className="text-base font-bold text-[#F8F7FF]">Últimos Registros na Catraca</h3>
            <p className="text-xs text-[#B8B0C7]">Passagens biométricas faciais processadas nos últimos minutos</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateTo('entradas-saidas')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Ver histórico completo
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#A855F7]/15 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Aluno</th>
                <th className="pb-3 font-semibold">Matrícula</th>
                <th className="pb-3 font-semibold">Catraca</th>
                <th className="pb-3 font-semibold">Horário</th>
                <th className="pb-3 font-semibold">Tipo</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A855F7]/10">
              {mockAccessLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#110D18]/60 transition-colors">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={log.studentAvatar}
                        alt={log.studentName}
                        className="w-8 h-8 rounded-full border border-[#A855F7]/30 object-cover shrink-0"
                      />
                      <span className="font-semibold text-[#F8F7FF]">{log.studentName}</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-xs text-[#B8B0C7]">{log.registration}</td>
                  <td className="py-3 text-[#B8B0C7]">{log.turnstileName}</td>
                  <td className="py-3 font-mono text-xs text-[#F8F7FF]">{log.time}</td>
                  <td className="py-3">
                    <Badge variant={log.type === 'Entrada' ? 'primary' : 'outline'} size="sm">
                      {log.type}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant={log.status === 'Autorizado' ? 'success' : 'danger'} size="sm">
                      {log.status}
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
