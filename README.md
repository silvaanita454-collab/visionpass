# VisionPass – Controle de Acesso Facial, Frequência e Gestão Escolar Integrada

O **VisionPass** é uma plataforma completa e moderna que une reconhecimento facial biométrico, controle físico de catracas, cálculo automatizado de frequência acadêmica e portal de acompanhamento escolar para pais, professores e gestores.

---

## 🚀 Como Executar o Sistema

O servidor backend e frontend unificado já está em execução localmente:
- **URL da Aplicação**: [http://127.0.0.1:5000](http://127.0.0.1:5000)

Caso deseje reiniciar o servidor em um terminal:
```bash
py server.py
```

---

## 👥 Contas de Teste Pré-Configuradas (Alternância em 1 Clique)

Na barra superior da aplicação, há botões rápidos para alternar instantaneamente entre os seguintes perfis:

| Perfil | Nome | Identificador / E-mail | Senha Padrão | Funcionalidade Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Responsável** | Carlos Silva (Pai do João) | `pai.joao@gmail.com` | `123456` | Acompanha João (92% presença), alertas de catraca e entradas/saídas |
| **Responsável** | Ana Paula Silva (Mãe do João) | `mae.joao@gmail.com` | `123456` | Demonstra a regra: **1 Aluno com múltiplos responsáveis** |
| **Conta Kid** | João Pedro Silva | `MAT-2026-001` | `123456` | Crachá digital, frequência própria e dados cadastrais |
| **Professor** | Prof. Carlos Mendes | `prof.carlos@visionpass.com` | `123456` | Minhas Turmas (3º EM, 1º EM), diário de classe e chamada manual |
| **Coordenação** | Mariana Vasconcelos | `coord@visionpass.com` | `123456` | Acompanhamento do fluxo de turmas, catraca e presença escolar |
| **Direção / ADM** | Dr. Roberto Albuquerque | `admin@visionpass.com` | `123456` | Gestão de alunos, aprovação de funcionários, bloqueio na catraca e auditoria |

---

## 📋 Cobertura dos Sprints (Plano de Desenvolvimento)

### Sprint 1 – Arquitetura e Sistema de Contas
- Banco de dados relacional SQLite (`visionpass.db`) estruturado com integridade referencial.
- Autenticação com senhas criptografadas em SHA-256 + salt fixo.
- Perfis e papéis: Responsável, Aluno/Kid, Administrador, Diretor, Coordenador, Professor e Funcionário.
- Relacionamento com Instituição escolar (`institutions`).

### Sprint 2 – Conta Kid / Aluno
- Cada aluno possui sua **Conta Kid individual** com Nome, Matrícula única, Data de Nascimento, Turma, Foto, Credencial Facial biométrica e histórico próprio.
- Regra de negócio: **A Conta Kid deve existir previamente na instituição antes de um responsável solicitar o vínculo**.

### Sprint 3 – Cadastro e Verificação dos Responsáveis
- Cadastro completo de Responsáveis: Nome completo, CPF, e-mail, telefone e senha.
- Validação algorítmica real do CPF pelos dois dígitos verificadores da Receita Federal.
- Proteção contra CPFs ou e-mails duplicados.

### Sprint 4 – Vínculo Responsável ↔ Aluno (Dependentes)
- Permite relacionamento **1 Responsável → N Alunos** e **1 Aluno → N Responsáveis** (ex: Pai e Mãe acompanhando simultaneamente o aluno João Pedro).
- Modal para solicitar vínculo informando Matrícula e Data de Nascimento do aluno.

### Sprint 5 & 9 – Catraca Facial e Controle de Acesso
- **Terminal de Catraca Interativo**:
  - Suporte à **Webcam Real** ou visor com biometria fotográfica.
  - Varredura com mira holográfica e linha de scanner laser.
  - **Detecção de Vivacidade (Anti-spoofing / Liveness Check)**: impede o uso de fotos impressas ou estáticas.
  - **Mecanismo Físico de Catraca**: simulação visual do rotor girando, display luminoso e LED de status.
  - **Efeitos Sonoros**: sintetizador dinâmico de áudio via Web Audio API e anúncios vocais em português ("Catraca liberada. Bom dia João Silva").
  - Suporte ao registro de acesso de **Alunos** e **Funcionários** (Docentes e Coordenação marcando presença diária).

### Sprint 6 – Presença, Faltas e Frequência Inteligente
- Cálculo automático de presenças, faltas, atrasos e percentual de frequência.
- Exemplo pré-carregado: João Pedro Silva com **100 aulas, 92 presenças, 8 faltas = 92% de frequência**.
- Filtros e relatórios por Dia, Semana, Mês, Bimestre e Semestre.

### Sprint 7 – Área dos Pais e Responsáveis
- Painel "Meus Dependentes" com cards individuais.
- Visualização de frequência (%), dias presentes, dias ausentes e horários exatos de entrada e saída.
- Central de notificações em tempo real disparadas instantaneamente a cada passagem na catraca.

### Sprint 8 – Login Institucional e Aprovação de Funcionários
- Fluxo de solicitação de acesso para novos funcionários.
- Contas de funcionários ficam no status `pending_approval` até que o Administrador/Diretor aprove ou recuse o acesso.

### Sprint 10 – Dashboard Geral, Segurança e Auditoria
- Painel administrativo com contadores em tempo real: alunos presentes/ausentes, docentes presentes, passagens totais e acessos negados.
- Bloqueio e desbloqueio imediato de alunos e usuários com 1 clique (bloqueia o giro da catraca).
- Logs detalhados de auditoria com IP, data/hora e ação registrada para conformidade com a LGPD.

---

## 🛡️ Regra Central do Sistema VisionPass

```
Reconhecimento Facial 
      ↓ 
Identificação Biometria 
      ↓ 
Vínculo com a Instituição 
      ↓ 
Verificação de Autorização (Status Ativo / Sem Bloqueios) 
      ↓ 
Liberação da Catraca (Giro mecânico + Som) 
      ↓ 
Registro em Log + Atualização da Frequência + Disparo de Notificação aos Pais
```
Dessa forma, a catraca não funciona apenas como um equipamento de entrada, mas como o **ponto físico de integração entre identidade, segurança, presença, frequência e controle de acesso**.
