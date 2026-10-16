import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Input } from '../components/UIComponents';
import { mockClassGroups, mockStudents, mockAnnouncements } from '../data/mockData';
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  MessageSquarePlus, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export const ProfessoresView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'attendance' | 'announcements'>('classes');
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [isNewAnnModalOpen, setIsNewAnnModalOpen] = useState(false);
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTarget, setAnnTarget] = useState('3º Ano A - Ensino Médio');

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    const created = {
      id: `anc-${Date.now()}`,
      title: annTitle,
      content: annContent,
      date: 'Hoje, 08:30',
      author: 'Prof. Carlos Mendes',
      targetAudience: annTarget
    };

    setAnnouncements([created, ...announcements]);
    setIsNewAnnModalOpen(false);
    setAnnTitle('');
    setAnnContent('');
  };

  return (
    <div className="space-y-6">
      
      {/* Topo da Área do Docente */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Painel Docente</span>
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Área do Professor</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Gestão de presença sincronizada com a catraca física e comunicação direta com as turmas
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsNewAnnModalOpen(true)}
          leftIcon={<MessageSquarePlus className="w-4 h-4" />}
        >
          Novo comunicado
        </Button>
      </div>

      {/* Cards de Métricas Docentes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center justify-between p-5">
          <div>
            <span className="text-xs text-[#B8B0C7] font-semibold block mb-1">Minhas Turmas</span>
            <div className="text-2xl font-extrabold text-[#F8F7FF]">{mockClassGroups.length}</div>
            <span className="text-[11px] text-[#C084FC]">Ensino Médio & Fund.</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#C084FC] flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-5">
          <div>
            <span className="text-xs text-[#B8B0C7] font-semibold block mb-1">Alunos Presentes</span>
            <div className="text-2xl font-extrabold text-emerald-400">124</div>
            <span className="text-[11px] text-emerald-400">Identificados na catraca</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-5">
          <div>
            <span className="text-xs text-[#B8B0C7] font-semibold block mb-1">Ausências</span>
            <div className="text-2xl font-extrabold text-rose-400">7</div>
            <span className="text-[11px] text-rose-400">Falta registrada</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
            <UserX className="w-5 h-5" />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-5">
          <div>
            <span className="text-xs text-[#B8B0C7] font-semibold block mb-1">Atrasados</span>
            <div className="text-2xl font-extrabold text-amber-400">7</div>
            <span className="text-[11px] text-amber-400">Entrada pós-tolerância</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Navegação por Abas */}
      <div className="flex border-b border-[#A855F7]/20 gap-2 pb-1">
        {[
          { id: 'classes', label: 'Minhas Turmas' },
          { id: 'attendance', label: 'Diário de Presença Integrado' },
          { id: 'announcements', label: 'Comunicados Escolares' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer border ${
              activeTab === tab.id
                ? 'bg-[#7C3AED] text-white border-[#C084FC]'
                : 'bg-[#17121F] text-[#B8B0C7] border-transparent hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Aba Minhas Turmas */}
      {activeTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockClassGroups.map((cls) => (
            <Card key={cls.id} className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-[#F8F7FF]">{cls.name}</h3>
                  <Badge variant="primary">{cls.grade}</Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 my-4 p-3 bg-[#110D18] rounded-xl border border-[#A855F7]/20 text-center">
                  <div>
                    <span className="text-[10px] text-[#B8B0C7] uppercase font-bold block">Total</span>
                    <span className="text-base font-bold text-[#F8F7FF]">{cls.totalStudents}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">Presentes</span>
                    <span className="text-base font-bold text-emerald-400">{cls.presentToday}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-400 uppercase font-bold block">Ausentes</span>
                    <span className="text-base font-bold text-rose-400">{cls.absentToday}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#B8B0C7]">
                  <span>Frequência Média Bimestral:</span>
                  <strong className="text-emerald-400">{cls.averageAttendance}%</strong>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#A855F7]/15 flex justify-end">
                <Button variant="secondary" size="sm" onClick={() => setActiveTab('attendance')}>
                  Abrir chamada digital
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Aba Diário de Presença */}
      {activeTab === 'attendance' && (
        <Card className="p-0 overflow-hidden">
          <div className="p-4 border-b border-[#A855F7]/15 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#F8F7FF]">
              3º Ano A - Ensino Médio • Diário de Aula (Hoje)
            </h3>
            <span className="text-xs text-[#A855F7] font-semibold">Preenchido automaticamente via Catraca</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-[#110D18] border-b border-[#A855F7]/20 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Aluno</th>
                  <th className="p-4 font-semibold">Presença Catraca</th>
                  <th className="p-4 font-semibold">Horário Passagem</th>
                  <th className="p-4 font-semibold">Atraso</th>
                  <th className="p-4 font-semibold">Observações Docente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#A855F7]/10">
                {mockStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-[#110D18]/50 transition-colors">
                    <td className="p-4 font-bold text-[#F8F7FF] flex items-center gap-2.5">
                      <img src={st.avatar} alt={st.name} className="w-7 h-7 rounded-full object-cover border border-[#A855F7]/30" />
                      <span>{st.name}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="success" size="sm">Presente</Badge>
                    </td>
                    <td className="p-4 font-mono text-xs text-[#F8F7FF]">07:15:20</td>
                    <td className="p-4 text-xs text-[#B8B0C7]">Pontual</td>
                    <td className="p-4 text-xs text-[#B8B0C7]">Participação regular</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Aba Comunicados */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          {announcements.map((a) => (
            <Card key={a.id} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-base font-bold text-[#F8F7FF]">{a.title}</h4>
                <Badge variant="primary">{a.targetAudience}</Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#B8B0C7] mb-4 leading-relaxed">{a.content}</p>
              <div className="flex items-center justify-between text-xs text-[#A855F7] pt-3 border-t border-[#A855F7]/15">
                <span>Autor: {a.author}</span>
                <span>{a.date}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal Novo Comunicado */}
      <Modal
        isOpen={isNewAnnModalOpen}
        onClose={() => setIsNewAnnModalOpen(false)}
        title="Novo Comunicado para Turma"
        subtitle="O aviso será exibido no portal dos alunos e responsáveis"
      >
        <form onSubmit={handleCreateAnnouncement} className="space-y-4">
          <Input
            label="Título do Comunicado"
            value={annTitle}
            onChange={(e) => setAnnTitle(e.target.value)}
            placeholder="Ex: Trabalho Semestral e Material da Próxima Aula"
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Público-Alvo / Turma</label>
            <select
              value={annTarget}
              onChange={(e) => setAnnTarget(e.target.value)}
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
            >
              <option value="3º Ano A - Ensino Médio">3º Ano A - Ensino Médio</option>
              <option value="2º Ano B - Ensino Médio">2º Ano B - Ensino Médio</option>
              <option value="Todas as minhas turmas">Todas as minhas turmas</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Mensagem</label>
            <textarea
              rows={4}
              value={annContent}
              onChange={(e) => setAnnContent(e.target.value)}
              placeholder="Digite o texto do comunicado..."
              required
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsNewAnnModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" leftIcon={<Send className="w-4 h-4" />}>
              Publicar comunicado
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
