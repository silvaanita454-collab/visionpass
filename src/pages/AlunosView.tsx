import React, { useState } from 'react';
import { Card, Badge, Button, Modal, Input } from '../components/UIComponents';
import { mockStudents } from '../data/mockData';
import { Student, FacialRecognitionStatus } from '../types';
import { ViziMascot } from '../components/ViziMascot';
import { 
  Plus, 
  Search, 
  ScanFace, 
  Eye, 
  Edit3, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Camera,
  Check
} from 'lucide-react';

export const AlunosView: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  
  // Modais
  const [isNewStudentModalOpen, setIsNewStudentModalOpen] = useState(false);
  const [isFacialModalOpen, setIsFacialModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [facialStep, setFacialStep] = useState<'idle' | 'capturing' | 'success'>('idle');

  // Formulário Novo Aluno
  const [name, setName] = useState('');
  const [registration, setRegistration] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [classGroup, setClassGroup] = useState('3º Ano A (Ensino Médio)');
  const [responsibleName, setResponsibleName] = useState('');

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !registration) return;

    const newSt: Student = {
      id: `st-${Date.now()}`,
      name,
      registration,
      classGroup,
      birthDate: birthDate || '01/01/2008',
      responsibleName: responsibleName || 'Responsável Legal',
      status: 'Ativo',
      facialStatus: 'Cadastrado',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      attendanceRate: 100.0,
      lastAccess: 'Nunca acessou a catraca'
    };

    setStudents([newSt, ...students]);
    setIsNewStudentModalOpen(false);
    setName('');
    setRegistration('');
    setBirthDate('');
    setResponsibleName('');
  };

  const handleOpenFacialModal = (st: Student) => {
    setSelectedStudent(st);
    setFacialStep('idle');
    setIsFacialModalOpen(true);
  };

  const handleSimulateFacialEnrollment = () => {
    setFacialStep('capturing');
    setTimeout(() => {
      setFacialStep('success');
      if (selectedStudent) {
        setStudents(
          students.map((s) =>
            s.id === selectedStudent.id ? { ...s, facialStatus: 'Cadastrado' as FacialRecognitionStatus } : s
          )
        );
      }
    }, 1500);
  };

  const getFacialStatusBadge = (status: FacialRecognitionStatus) => {
    switch (status) {
      case 'Cadastrado':
        return <Badge variant="success">Cadastrado</Badge>;
      case 'Não cadastrado':
        return <Badge variant="danger">Não cadastrado</Badge>;
      case 'Atualização necessária':
        return <Badge variant="warning">Atualização necessária</Badge>;
    }
  };

  // Filtros
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.registration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'ALL' || s.classGroup.includes(filterClass);
    const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Topo com Título e Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#A855F7]/15">
        <div>
          <h2 className="text-2xl font-extrabold text-[#F8F7FF]">Gerenciamento de Alunos</h2>
          <p className="text-xs sm:text-sm text-[#B8B0C7]">
            Cadastre dependentes, consulte vínculos de responsáveis e gerencie o reconhecimento facial para catracas
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsNewStudentModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Novo aluno
        </Button>
      </div>

      {/* Barra de Filtros e Busca */}
      <Card className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="relative">
            <Search className="w-4 h-4 text-[#B8B0C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome ou matrícula..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] placeholder:text-[#B8B0C7]/50 focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            />
          </div>

          <div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="ALL">Todas as Turmas</option>
              <option value="3º Ano">3º Ano (Ensino Médio)</option>
              <option value="2º Ano">2º Ano (Ensino Médio)</option>
              <option value="1º Ano">1º Ano (Ensino Médio)</option>
            </select>
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-[#110D18] border border-[#A855F7]/30 text-xs sm:text-sm text-[#F8F7FF] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            >
              <option value="ALL">Todos os Status</option>
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
              <option value="Trancado">Trancado</option>
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-[#B8B0C7] px-1">
            <Filter className="w-4 h-4 text-[#A855F7]" />
            <span>{filteredStudents.length} alunos listados</span>
          </div>

        </div>
      </Card>

      {/* Tabela de Alunos */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#110D18] border-b border-[#A855F7]/20 text-[#B8B0C7] text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold">Aluno</th>
                <th className="p-4 font-semibold">Matrícula</th>
                <th className="p-4 font-semibold">Turma</th>
                <th className="p-4 font-semibold">Responsável</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Reconhecimento Facial</th>
                <th className="p-4 font-semibold text-right">Ações</th>
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
                        className="w-9 h-9 rounded-full border border-[#A855F7]/30 object-cover shrink-0"
                      />
                      <div>
                        <span className="font-bold text-[#F8F7FF] block">{st.name}</span>
                        <span className="text-[10px] text-[#B8B0C7]">{st.birthDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs text-[#C084FC]">{st.registration}</td>
                  <td className="p-4 text-[#F8F7FF]">{st.classGroup}</td>
                  <td className="p-4 text-[#B8B0C7] max-w-[160px] truncate">{st.responsibleName}</td>
                  <td className="p-4">
                    <Badge variant={st.status === 'Ativo' ? 'success' : 'neutral'} size="sm">
                      {st.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {getFacialStatusBadge(st.facialStatus)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenFacialModal(st)}
                        className="p-1.5 rounded-lg bg-[#7C3AED]/20 text-[#C084FC] hover:bg-[#7C3AED] hover:text-white transition-colors cursor-pointer"
                        title="Cadastrar / Atualizar Reconhecimento Facial"
                      >
                        <ScanFace className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Visualizando dados de ${st.name}`)}
                        className="p-1.5 rounded-lg text-[#B8B0C7] hover:text-white hover:bg-[#21192D] transition-colors cursor-pointer"
                        title="Visualizar Detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Editar cadastro de ${st.name}`)}
                        className="p-1.5 rounded-lg text-[#B8B0C7] hover:text-white hover:bg-[#21192D] transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: Novo Aluno */}
      <Modal
        isOpen={isNewStudentModalOpen}
        onClose={() => setIsNewStudentModalOpen(false)}
        title="Cadastrar Novo Aluno"
        subtitle="Adicione o aluno com dados acadêmicos e prepare o vínculo facial"
      >
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <Input
            label="Nome Completo do Aluno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Gabriel Albuquerque"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Matrícula"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              placeholder="Ex: MAT-2026-007"
              required
            />
            <Input
              label="Data de Nascimento"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="DD/MM/AAAA"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#B8B0C7]">Turma</label>
            <select
              value={classGroup}
              onChange={(e) => setClassGroup(e.target.value)}
              className="w-full bg-[#110D18] border border-[#A855F7]/30 text-[#F8F7FF] text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#A855F7]"
            >
              <option value="3º Ano A (Ensino Médio)">3º Ano A (Ensino Médio)</option>
              <option value="2º Ano B (Ensino Médio)">2º Ano B (Ensino Médio)</option>
              <option value="1º Ano A (Ensino Médio)">1º Ano A (Ensino Médio)</option>
              <option value="9º Ano A (Fundamental)">9º Ano A (Fundamental)</option>
            </select>
          </div>

          <Input
            label="Nome do Responsável Legal"
            value={responsibleName}
            onChange={(e) => setResponsibleName(e.target.value)}
            placeholder="Ex: Mariana Albuquerque"
          />

          <div className="p-3 rounded-xl bg-[#110D18] border border-[#A855F7]/25 text-xs text-[#B8B0C7] flex items-start gap-2">
            <ScanFace className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
            <span>O reconhecimento facial poderá ser homologado após salvar os dados ou no terminal da catraca.</span>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => setIsNewStudentModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar aluno
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Cadastro de Reconhecimento Facial */}
      <Modal
        isOpen={isFacialModalOpen}
        onClose={() => setIsFacialModalOpen(false)}
        title="Cadastro de Reconhecimento Facial"
        subtitle={selectedStudent ? `Aluno: ${selectedStudent.name} (${selectedStudent.registration})` : ''}
      >
        <div className="space-y-5 text-center">
          
          {facialStep === 'idle' && (
            <div className="space-y-4">
              <div className="w-28 h-28 mx-auto rounded-2xl bg-[#110D18] border-2 border-dashed border-[#A855F7]/50 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                {selectedStudent?.avatar ? (
                  <img src={selectedStudent.avatar} alt="Foto Aluno" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <Camera className="w-8 h-8 text-[#A855F7]" />
                )}
              </div>

              <div className="text-xs text-[#B8B0C7] space-y-1">
                <p>Status atual: <strong>{selectedStudent?.facialStatus}</strong></p>
                <p>A captura de biometria facial gera o vetor matemático de pontos nodais compatível com o terminal da catraca.</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-300 text-left">
                <strong>Aviso de Arquitetura:</strong> A extração biométrica real ocorre na API conectada à catraca física com proteção criptográfica de dados.
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsFacialModalOpen(false)}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleSimulateFacialEnrollment} leftIcon={<ScanFace className="w-4 h-4" />}>
                  Iniciar Captura Biométrica
                </Button>
              </div>
            </div>
          )}

          {facialStep === 'capturing' && (
            <div className="py-8 space-y-4">
              <ViziMascot expression="thinking" size="md" animate={true} />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#F8F7FF]">Mapeando biometria facial...</h4>
                <p className="text-xs text-[#B8B0C7]">Analisando proporções faciais e teste de vivacidade.</p>
              </div>
            </div>
          )}

          {facialStep === 'success' && (
            <div className="py-6 space-y-4">
              <ViziMascot expression="success" size="md" animate={true} />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Biometria Facial Cadastrada!
                </h4>
                <p className="text-xs text-[#B8B0C7]">
                  O perfil facial de {selectedStudent?.name} foi sincronizado com as catracas escolares com sucesso.
                </p>
              </div>

              <Button variant="primary" onClick={() => setIsFacialModalOpen(false)} className="w-full justify-center">
                Concluir
              </Button>
            </div>
          )}

        </div>
      </Modal>

    </div>
  );
};
