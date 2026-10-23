# PRD — VisionPass

**Documento de Requisitos de Produto**  
**Versão:** 1.0  
**Data:** 16/10/2026  
**Projeto:** VisionPass — Sistema Inteligente de Monitoramento Escolar  
**Status:** Planejamento e prototipagem  
**Equipe:** Natasha Beatriz (Análise de Sistemas), Anita Almeida (Frontend/UI/UX) e Isaque Luck (Backend)  
**Professor responsável:** Elton

**Descrição:** O VisionPass é uma plataforma de gestão e acompanhamento escolar que busca solucionar a falta de integração entre o controle de acesso, o registro de frequência e a comunicação com as famílias, atendendo estudantes, responsáveis, professores e gestores escolares.

## 1. Visão geral e objetivo

O VisionPass propõe integrar uma catraca escolar com reconhecimento facial a uma plataforma digital composta por três portais: Responsáveis, Professores e Administradores.

**Objetivo principal:** modernizar o acompanhamento da rotina escolar, facilitando o registro de acessos, o controle de frequência e a comunicação entre escola e família.

**Objetivos específicos:**
- Registrar entradas e saídas dos estudantes.
- Permitir que professores confirmem a presença em cada aula.
- Disponibilizar informações escolares aos responsáveis autorizados.
- Centralizar justificativas, comunicados e notificações.
- Apoiar a gestão escolar com relatórios confiáveis.

**Impacto social esperado:** maior transparência na comunicação escolar, identificação mais rápida de situações que exigem acompanhamento e redução de processos administrativos manuais.

## 2. Público-alvo

| Público | Necessidade |
|---|---|
| Responsáveis | Acompanhar frequência, acessos e comunicados dos dependentes |
| Professores | Registrar e corrigir chamadas escolares |
| Administradores | Gerenciar estudantes, vínculos, acessos e relatórios |
| Estudantes | Utilizar um processo de acesso escolar organizado e seguro |
| Instituições de ensino | Integrar informações e modernizar a gestão |

## 3. Escopo

### Dentro do escopo

- Autenticação e autorização por perfil.
- Portal dos Responsáveis, Portal dos Professores e Portal dos Administradores.
- Registro de entradas e saídas por integração com catraca ou simulador.
- Frequência escolar por disciplina e aula.
- Calendário escolar.
- Solicitação e análise de justificativas.
- Notificações e comunicados.
- Solicitação e aprovação de vínculos entre responsáveis e estudantes.
- Histórico e auditoria de alterações.
- Interface responsiva com identidade visual Neon Tech.
- Mascote Orbi como assistente de navegação e orientação.

### Fora do escopo inicial

- Reconhecimento facial com dados biométricos reais durante a demonstração.
- Inteligência artificial conversacional autônoma.
- Aplicativos nativos para Android e iOS.
- Gestão financeira escolar.
- Matrículas, notas e boletins completos.
- Rastreamento da localização dos estudantes dentro ou fora da escola.
- Integração imediata com sistemas estaduais ou federais.

A implantação de reconhecimento facial real dependerá de avaliação jurídica, técnica, de privacidade e de alternativas adequadas para os estudantes.

## 4. Requisitos funcionais

| Código | Requisito | Prioridade |
|---|---|---|
| RF01 | Permitir autenticação de usuários conforme seu perfil. | Alta |
| RF02 | Disponibilizar portais específicos para responsáveis, professores e administradores. | Alta |
| RF03 | Permitir que administradores cadastrem e gerenciem estudantes e turmas. | Alta |
| RF04 | Registrar eventos de entrada e saída recebidos da catraca ou simulador. | Alta |
| RF05 | Exibir histórico de acessos com data, horário e situação de sincronização. | Alta |
| RF06 | Permitir que professores registrem presenças e faltas por aula. | Alta |
| RF07 | Calcular e apresentar frequência escolar por período e disciplina. | Alta |
| RF08 | Permitir a solicitação de vínculo entre responsável e estudante, mediante aprovação. | Alta |
| RF09 | Restringir o acesso do responsável aos estudantes autorizados. | Alta |
| RF10 | Exibir calendário escolar com registros de frequência. | Média |
| RF11 | Permitir o envio e acompanhamento de justificativas de ausência. | Média |
| RF12 | Permitir que administradores analisem justificativas. | Média |
| RF13 | Gerar notificações internas de eventos relevantes. | Média |
| RF14 | Permitir publicação e consulta de comunicados escolares. | Média |
| RF15 | Disponibilizar filtros de consulta por estudante, data e disciplina. | Média |
| RF16 | Registrar alterações relevantes para fins de auditoria. | Alta |
| RF17 | Permitir configurações de conta e preferências de notificações. | Média |
| RF18 | Exibir orientações do mascote Orbi, com opção de ocultar. | Baixa |
| RF19 | Gerar relatórios administrativos de frequência e acessos. | Média |
| RF20 | Permitir correções autorizadas de registros, preservando o histórico. | Alta |

## 5. Requisitos não funcionais

| Categoria | Requisito |
|---|---|
| Desempenho | Buscar carregamento das páginas principais em até 3 segundos, em condições normais de teste. |
| Disponibilidade | Definir meta inicial de disponibilidade de 99% para o ambiente de produção, sujeita à infraestrutura contratada. |
| Segurança | Utilizar conexões HTTPS, armazenamento seguro de senhas e autorização no backend. |
| Controle de acesso | Aplicar permissões por perfil e vínculo autorizado em todas as consultas e operações. |
| Integridade | Evitar duplicação de eventos e preservar registros de alterações. |
| Usabilidade | Disponibilizar interface clara, responsiva e acessível em computadores e celulares. |
| Acessibilidade | Buscar conformidade com WCAG 2.2 nível AA, incluindo navegação por teclado e indicadores não dependentes apenas de cores. |
| LGPD | Aplicar minimização de dados, finalidade definida, transparência e medidas de proteção adequadas. |
| Privacidade biométrica | Tratar dados biométricos como sensíveis e realizar avaliação jurídica e de riscos antes de qualquer implantação real. |
| Manutenibilidade | Organizar o código em componentes e módulos documentados. |
| Recuperação | Prever cópias de segurança e procedimentos de recuperação de dados. |

As metas quantitativas deverão ser validadas por testes antes de serem consideradas compromissos de produção.

## 6. Regras de negócio

| Código | Regra |
|---|---|
| RN01 | Somente usuários autenticados e autorizados podem acessar informações escolares restritas. |
| RN02 | Responsáveis visualizam exclusivamente estudantes com vínculo aprovado e ativo. |
| RN03 | Solicitações de vínculo precisam ser analisadas pela administração escolar. |
| RN04 | O registro de entrada na catraca não equivale à presença confirmada nas aulas. |
| RN05 | Somente professores ou funcionários autorizados podem registrar ou corrigir frequência. |
| RN06 | Chamadas pendentes não podem ser classificadas automaticamente como faltas. |
| RN07 | A frequência deve considerar as aulas com chamadas concluídas, respeitando as regras oficiais da instituição. |
| RN08 | Justificativas não alteram automaticamente uma falta para presença. |
| RN09 | Alterações relevantes devem registrar responsável, data e histórico da operação. |
| RN10 | Eventos recebidos com atraso devem preservar o horário original e o horário de sincronização. |
| RN11 | A revogação de um vínculo deve impedir novos acessos do responsável aos dados do estudante. |
| RN12 | O uso de reconhecimento facial real exige avaliação específica de necessidade, proporcionalidade, legalidade e alternativas não biométricas. |

## 7. Fluxos principais

### Fluxo 1 — Entrada e saída escolar

1. Estudante utiliza a catraca.
2. Equipamento ou simulador gera o evento.
3. Backend valida e registra a movimentação.
4. Sistema atualiza o histórico de acessos.
5. Responsável autorizado consulta o registro.

### Fluxo 2 — Frequência escolar

1. Professor acessa sua turma e seleciona a aula.
2. Registra presenças e faltas.
3. Confirma e finaliza a chamada.
4. Sistema atualiza os indicadores de frequência.
5. Responsável autorizado consulta as informações.

### Fluxo 3 — Justificativa de ausência

1. Responsável seleciona estudante e ausência.
2. Preenche o formulário e envia a solicitação.
3. Administração analisa os dados e eventuais documentos.
4. Escola aprova, não aprova ou solicita complementação.
5. Sistema atualiza o histórico e notifica o responsável.

### Fluxo 4 — Solicitação de vínculo

1. Responsável solicita associação com estudante.
2. Administração verifica a autorização.
3. Solicitação recebe uma decisão.
4. Em caso de aprovação, o dependente passa a aparecer no portal do responsável.

## 8. Critérios de aceitação

| Código | Critério verificável |
|---|---|
| CA01 | Usuários sem autenticação não conseguem acessar páginas protegidas. |
| CA02 | Um responsável não consegue consultar dados de estudantes sem vínculo autorizado. |
| CA03 | Um evento simulado de entrada aparece no histórico com data e horário corretos. |
| CA04 | Eventos duplicados não geram registros repetidos indevidamente. |
| CA05 | Professores conseguem finalizar chamadas das turmas autorizadas. |
| CA06 | Chamadas pendentes aparecem identificadas e não geram faltas automáticas. |
| CA07 | Os percentuais de frequência correspondem aos registros de teste. |
| CA08 | Uma justificativa enviada recebe protocolo e situação inicial de análise. |
| CA09 | Decisões administrativas atualizam a solicitação e preservam a auditoria. |
| CA10 | A interface funciona em telas de celular e computador. |
| CA11 | O usuário consegue navegar pelas principais funções usando teclado. |
| CA12 | O Orbi pode ser ocultado e reativado. |

**Condição geral de aceite:** todos os requisitos críticos de segurança e autorização devem passar nos testes antes de qualquer piloto com dados reais.

## 9. Priorização (MVP) e riscos

### MVP — Produto Mínimo Viável

O MVP deverá demonstrar o funcionamento essencial do VisionPass sem exigir uma catraca física nem utilizar biometria real.

| Fase | Entregas |
|---|---|
| P0 — Essencial | Autenticação, perfis, cadastro básico, vínculos autorizados, simulador de catraca, histórico de acessos, chamada escolar e frequência. |
| P1 — Complementar | Calendário, justificativas, notificações internas, comunicados e relatórios. |
| P2 — Evolução | Preferências avançadas, melhorias do Orbi, integrações externas e funcionalidades adicionais. |

### Riscos do projeto

| Risco | Impacto | Mitigação |
|---|---|---|
| Exposição de dados de estudantes | Alto | Autorização no backend, testes de segurança e minimização de dados. |
| Uso inadequado de biometria | Alto | Avaliação jurídica e de impacto, alternativas não biométricas e proibição de testes com dados reais sem autorização. |
| Falhas na catraca ou sincronização | Alto | Registro de estados, filas de processamento e procedimentos manuais. |
| Confusão entre acesso e presença | Alto | Separação entre registros de catraca e chamadas dos professores. |
| Atrasos no desenvolvimento | Médio | Entregas por etapas e divisão clara de responsabilidades. |
| Baixa adesão dos usuários | Médio | Testes de usabilidade, treinamento e interface acessível. |
| Dados escolares inconsistentes | Alto | Validação, auditoria e possibilidade de correção autorizada. |

### Resultado esperado

Ao final do MVP, a equipe deverá apresentar uma plataforma demonstrativa capaz de registrar acessos simulados, permitir chamadas escolares e disponibilizar informações aos responsáveis autorizados.

O VisionPass busca contribuir para uma gestão escolar mais integrada, transparente e eficiente, aproximando famílias e instituições de ensino por meio da tecnologia.

**Responsabilidades previstas:** Natasha Beatriz na análise e documentação; Anita Almeida no frontend e na experiência do usuário; Isaque Luck no backend e nas integrações; professor Elton na orientação e acompanhamento do projeto.

---

*Este PRD é uma proposta inicial de requisitos, baseada no planejamento do VisionPass. As tecnologias, regras institucionais, metas operacionais e condições de implantação ainda precisam de validação pela equipe e pela escola.*
