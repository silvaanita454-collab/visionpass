/**
 * VisionPass - Aplicação Principal e Gerenciador de Estado
 * Coordena autenticação, navegação de abas, painéis por role e modais.
 */

const App = {
  currentUser: null,
  activeView: 'view-turnstile',

  async init() {
    console.log("Inicializando VisionPass 2.0...");
    TurnstileModule.init();

    // Carrega contas de teste para alternância rápida
    await this.loadQuickAccounts();

    // Restaura ou define usuário padrão inicial (Pai do João para demonstrar a área de pais, ou Admin)
    const savedUser = localStorage.getItem('visionpass_user');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = null;
      }
    }

    if (!this.currentUser) {
      // Padrão de demonstração: Carlos Pai do João
      this.switchRoleByEmail('pai.joao@gmail.com');
    } else {
      this.updateUserSessionUI();
    }

    // Inicializa abas e logs da catraca
    TurnstileModule.refreshRecentLogs();
    this.setupEventListeners();
  },

  setupEventListeners() {
    // Cliques em botões de navegação
    document.querySelectorAll('[data-view]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const viewId = btn.getAttribute('data-view');
        this.navigateTo(viewId);
      });
    });

    // Filtros de período de frequência no painel dos pais
    const periodSelect = document.getElementById('parent-period-filter');
    if (periodSelect) {
      periodSelect.addEventListener('change', () => {
        this.loadParentDashboard();
      });
    }

    // Busca de alunos no painel admin
    const searchInput = document.getElementById('admin-student-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.loadAdminStudents(e.target.value);
      });
    }
  },

  navigateTo(viewId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    const targetSec = document.getElementById(viewId);
    if (targetSec) targetSec.classList.add('active');

    const activeNavBtn = document.querySelector(`[data-view="${viewId}"]`);
    if (activeNavBtn) activeNavBtn.classList.add('active');

    this.activeView = viewId;

    // Atualiza dados específicos de cada tela
    if (viewId === 'view-parent') this.loadParentDashboard();
    if (viewId === 'view-admin') this.loadAdminDashboard();
    if (viewId === 'view-teacher') this.loadTeacherDashboard();
    if (viewId === 'view-coord') this.loadCoordDashboard();
    if (viewId === 'view-student') this.loadStudentDashboard();
    if (viewId === 'view-turnstile') TurnstileModule.refreshRecentLogs();
  },

  async loadQuickAccounts() {
    try {
      const data = await API.getQuickAccounts();
      const container = document.getElementById('role-chips-container');
      if (!container) return;

      container.innerHTML = data.accounts.map(acc => {
        const roleLabel = {
          'admin': 'Administrador',
          'director': 'Diretoria',
          'coordinator': 'Coordenação',
          'teacher': 'Professor',
          'parent': 'Responsável',
          'student': 'Conta Kid'
        }[acc.role] || acc.role;

        return `
          <button class="role-chip" onclick="App.switchAccountById('${acc.email || acc.registration_number}', '${acc.role}')">
            ${acc.name.split(' ')[0]} (${roleLabel})
          </button>
        `;
      }).join('');
    } catch (e) {
      console.warn("Erro ao carregar contas rápidas:", e);
    }
  },

  async switchRoleByEmail(identifier) {
    try {
      const res = await API.login(identifier, '123456');
      if (res.success) {
        this.currentUser = res.user;
        localStorage.setItem('visionpass_user', JSON.stringify(res.user));
        localStorage.setItem('visionpass_token', res.token);
        this.updateUserSessionUI();
        this.showToast(`Perfil alterado para: ${res.user.name} (${res.user.role})`, "info");

        // Direciona para o painel correspondente ao perfil
        if (res.user.role === 'parent') this.navigateTo('view-parent');
        else if (res.user.role === 'admin' || res.user.role === 'director') this.navigateTo('view-admin');
        else if (res.user.role === 'teacher') this.navigateTo('view-teacher');
        else if (res.user.role === 'coordinator') this.navigateTo('view-coord');
        else if (res.user.role === 'student') this.navigateTo('view-student');
      }
    } catch (e) {
      console.warn("Erro ao trocar conta:", e);
    }
  },

  switchAccountById(identifier, role) {
    this.switchRoleByEmail(identifier);
  },

  updateUserSessionUI() {
    if (!this.currentUser) return;
    const nameEl = document.getElementById('session-user-name');
    const roleEl = document.getElementById('session-user-role');
    const avatarEl = document.getElementById('session-user-avatar');

    if (nameEl) nameEl.innerText = this.currentUser.name;
    if (roleEl) roleEl.innerText = this.currentUser.role.toUpperCase();
    if (avatarEl) {
      avatarEl.src = this.currentUser.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';
    }

    // Exibe ou oculta abas da barra conforme as permissões da Matriz do VisionPass
    const r = this.currentUser.role;
    const btnParent = document.querySelector('[data-view="view-parent"]');
    const btnAdmin = document.querySelector('[data-view="view-admin"]');
    const btnTeacher = document.querySelector('[data-view="view-teacher"]');
    const btnCoord = document.querySelector('[data-view="view-coord"]');
    const btnStudent = document.querySelector('[data-view="view-student"]');

    if (btnParent) btnParent.style.display = (r === 'parent' || r === 'admin') ? 'flex' : 'none';
    if (btnAdmin) btnAdmin.style.display = (r === 'admin' || r === 'director') ? 'flex' : 'none';
    if (btnTeacher) btnTeacher.style.display = (r === 'teacher' || r === 'admin') ? 'flex' : 'none';
    if (btnCoord) btnCoord.style.display = (r === 'coordinator' || r === 'admin') ? 'flex' : 'none';
    if (btnStudent) btnStudent.style.display = (r === 'student' || r === 'admin') ? 'flex' : 'none';
  },

  // ==========================================================
  // SPRINT 7: PAINEL DOS PAIS E RESPONSÁVEIS
  // ==========================================================
  async loadParentDashboard() {
    if (!this.currentUser) return;
    const parentId = this.currentUser.id;

    try {
      const data = await API.getParentDashboard(parentId);
      const container = document.getElementById('parent-dependents-container');
      const notifsContainer = document.getElementById('parent-notifications-list');

      if (!data.dependents || data.dependents.length === 0) {
        container.innerHTML = `
          <div class="card" style="text-align: center; padding: 3rem;">
            <p style="color: var(--text-muted); margin-bottom: 1rem;">Nenhum dependente vinculado a esta conta no momento.</p>
            <button class="btn btn-primary" onclick="App.openLinkModal()">
              <span>+</span> Vincular Meu Filho (Conta Kid)
            </button>
          </div>
        `;
        return;
      }

      // Renderiza cartões dos dependentes com métricas de frequência calculadas
      container.innerHTML = data.dependents.map(dep => {
        const m = dep.metrics || { percentage: 92, presences: 92, absences: 8 };
        const isPresHigh = m.percentage >= 85;

        // Horários de entrada e saída
        const entryStr = dep.last_access && dep.last_access.access_type === 'entry'
          ? dep.last_access.timestamp.split(' ')[1] 
          : (dep.last_entry ? dep.last_entry.split(' ')[1] : 'Sem registro hoje');

        const exitStr = dep.last_exit ? dep.last_exit.split(' ')[1] : 'Ainda na escola';

        return `
          <div class="card" style="margin-bottom: 1.5rem; border-left: 4px solid var(--cyan-500);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="${dep.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop'}" 
                     style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid var(--cyan-400);">
                <div>
                  <h3 style="font-size: 1.2rem; font-weight: 800;">${dep.name}</h3>
                  <p style="font-size: 0.85rem; color: var(--text-secondary);">
                    Matrícula: <strong style="color: var(--cyan-400);">${dep.registration_number}</strong> • Turma: ${dep.class_name}
                  </p>
                  <p style="font-size: 0.75rem; color: var(--text-muted);">Vínculo: ${dep.relationship_type}</p>
                </div>
              </div>
              <span class="badge ${dep.status === 'active' ? 'badge-success' : 'badge-danger'}">
                ${dep.status === 'active' ? '● Aluno Regular' : '● Matrícula Suspensa'}
              </span>
            </div>

            <!-- Frequência e Métricas (Sprint 6 & 7) -->
            <div class="stats-grid" style="margin-bottom: 1.25rem;">
              <div class="stat-card ${isPresHigh ? 'stat-success' : 'stat-warning'}">
                <div class="stat-label">Taxa de Frequência</div>
                <div class="stat-value">${m.percentage}%</div>
                <div class="stat-desc">Aulas previstas cumpridas</div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill" style="width: ${m.percentage}%;"></div>
                </div>
              </div>

              <div class="stat-card stat-cyan">
                <div class="stat-label">Dias Presentes</div>
                <div class="stat-value">${m.presences}</div>
                <div class="stat-desc">Entradas registradas na catraca</div>
              </div>

              <div class="stat-card stat-danger">
                <div class="stat-label">Faltas Acumuladas</div>
                <div class="stat-value">${m.absences}</div>
                <div class="stat-desc">${m.absence_percentage}% de ausência</div>
              </div>

              <div class="stat-card stat-purple">
                <div class="stat-label">Movimentação Hoje</div>
                <div style="font-size: 0.95rem; font-weight: 700; margin-top: 0.5rem;">
                  <div>📥 Entrada: <span style="color: var(--cyan-400);">${entryStr}</span></div>
                  <div>📤 Saída: <span style="color: var(--amber-400);">${exitStr}</span></div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
              <button class="btn btn-secondary btn-sm" onclick="App.viewStudentFullHistory(${dep.id}, '${dep.name}')">
                <span>📋</span> Ver Histórico Completo de Aulas
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Notificações do Responsável
      if (notifsContainer) {
        if (data.notifications && data.notifications.length > 0) {
          notifsContainer.innerHTML = data.notifications.map(n => `
            <div style="display: flex; align-items: start; gap: 0.75rem; padding: 0.75rem; background: var(--bg-dark-700); border-radius: var(--radius-md); margin-bottom: 0.5rem; border-left: 3px solid ${n.type === 'entry' ? 'var(--emerald-500)' : (n.type === 'exit' ? 'var(--cyan-500)' : 'var(--amber-500)')};">
              <span style="font-size: 1.2rem;">${n.type === 'entry' ? '🔔' : (n.type === 'exit' ? '🚪' : '⚠️')}</span>
              <div>
                <div style="font-size: 0.88rem; font-weight: 700;">${n.title}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">${n.message}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">${n.created_at}</div>
              </div>
            </div>
          `).join('');
        } else {
          notifsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">Nenhum alerta recente.</p>`;
        }
      }

    } catch (e) {
      console.error("Erro ao carregar painel dos pais:", e);
    }
  },

  // ==========================================================
  // SPRINT 8 & 10: PAINEL DA ADMINISTRAÇÃO E DIREÇÃO
  // ==========================================================
  async loadAdminDashboard() {
    try {
      const stats = await API.getAdminStats();
      document.getElementById('stat-total-students').innerText = stats.students.total;
      document.getElementById('stat-present-today').innerText = stats.students.present_today;
      document.getElementById('stat-absent-today').innerText = stats.students.absent_today;
      document.getElementById('stat-teachers-present').innerText = stats.staff_present.teachers;
      document.getElementById('stat-coords-present').innerText = stats.staff_present.coordinators;
      document.getElementById('stat-entries-today').innerText = stats.turnstiles_activity.entries_today;
      document.getElementById('stat-denied-today').innerText = stats.turnstiles_activity.denied_today;

      // Carrega solicitações de aprovação pendentes (Sprint 8)
      this.loadPendingStaff();

      // Carrega lista de alunos para gestão (Sprint 2)
      this.loadAdminStudents();

      // Carrega logs de auditoria (Sprint 10)
      this.loadAuditLogs();

    } catch (e) {
      console.error("Erro ao carregar admin dashboard:", e);
    }
  },

  async loadPendingStaff() {
    try {
      const data = await API.getPendingStaff();
      const container = document.getElementById('admin-pending-staff-list');
      const badge = document.getElementById('pending-staff-badge');
      if (badge) badge.innerText = `${data.pending_staff.length} Pendentes`;

      if (!data.pending_staff || data.pending_staff.length === 0) {
        container.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Nenhuma solicitação de funcionário pendente de aprovação.</td></tr>`;
        return;
      }

      container.innerHTML = data.pending_staff.map(s => `
        <tr>
          <td><strong>${s.name}</strong></td>
          <td>${s.email}</td>
          <td><span class="badge badge-warning">${s.role}</span></td>
          <td>${s.created_at}</td>
          <td>
            <button class="btn btn-success btn-sm" onclick="App.approveStaff(${s.id})">✓ Aprovar</button>
            <button class="btn btn-danger btn-sm" onclick="App.rejectStaff(${s.id})">✕ Recusar</button>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn("Erro ao buscar funcionários pendentes:", e);
    }
  },

  async approveStaff(userId) {
    try {
      const res = await API.approveStaff(userId);
      this.showToast(res.message, "success");
      this.loadPendingStaff();
    } catch (e) {
      this.showToast(e.message, "danger");
    }
  },

  async rejectStaff(userId) {
    try {
      const res = await API.rejectStaff(userId);
      this.showToast(res.message, "info");
      this.loadPendingStaff();
    } catch (e) {
      this.showToast(e.message, "danger");
    }
  },

  async loadAdminStudents(search = '') {
    try {
      const data = await API.getStudents(search);
      const container = document.getElementById('admin-students-table-body');
      if (!container) return;

      container.innerHTML = data.students.map(st => `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <img src="${st.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop'}" 
                   style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover;">
              <strong>${st.name}</strong>
            </div>
          </td>
          <td><code style="color: var(--cyan-400);">${st.registration_number}</code></td>
          <td>${st.class_name}</td>
          <td>
            <strong style="color: ${st.attendance_rate >= 85 ? 'var(--emerald-400)' : 'var(--rose-400)'}">${st.attendance_rate}%</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted);">(${st.present_days || 0} presenças)</span>
          </td>
          <td>
            <span class="badge ${st.status === 'active' ? 'badge-success' : 'badge-danger'}">
              ${st.status === 'active' ? 'Ativo' : 'Bloqueado'}
            </span>
          </td>
          <td>
            <button class="btn btn-sm ${st.status === 'active' ? 'btn-danger' : 'btn-success'}" 
                    onclick="App.toggleStudentStatus(${st.id}, '${st.status === 'active' ? 'blocked' : 'active'}')">
              ${st.status === 'active' ? '🔒 Bloquear Catraca' : '🔓 Desbloquear'}
            </button>
            <button class="btn btn-secondary btn-sm" onclick="App.viewStudentFullHistory(${st.id}, '${st.name}')">
              Histórico
            </button>
          </td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn("Erro ao buscar alunos:", e);
    }
  },

  async toggleStudentStatus(studentId, newStatus) {
    try {
      await API.toggleUserStatus('student', studentId, newStatus);
      this.showToast(`Status do aluno alterado para ${newStatus.toUpperCase()}`, "info");
      this.loadAdminStudents();
    } catch (e) {
      this.showToast(e.message, "danger");
    }
  },

  async loadAuditLogs() {
    try {
      const data = await API.getAuditLogs();
      const container = document.getElementById('admin-audit-logs-table');
      if (!container) return;

      container.innerHTML = data.logs.slice(0, 10).map(l => `
        <tr>
          <td><span class="badge badge-info">${l.action}</span></td>
          <td>${l.user_name || 'Sistema'}</td>
          <td style="font-size: 0.8rem; color: var(--text-secondary);">${l.details}</td>
          <td style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${l.created_at}</td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn("Erro ao carregar auditoria:", e);
    }
  },

  // ==========================================================
  // SPRINT 9: PAINEL DO PROFESSOR
  // ==========================================================
  async loadTeacherDashboard() {
    const teacherId = this.currentUser ? this.currentUser.id : 4;
    try {
      const data = await API.getTeacherClasses(teacherId);
      const container = document.getElementById('teacher-classes-container');
      if (!container) return;

      if (!data.classes || data.classes.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted);">Nenhuma turma associada no momento.</p>`;
        return;
      }

      container.innerHTML = data.classes.map(c => `
        <div class="card" style="margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800;">${c.name}</h3>
              <p style="font-size: 0.85rem; color: var(--cyan-400); font-weight: 600;">Disciplina: ${c.subject}</p>
            </div>
            <span class="badge badge-info">${c.students_count} Alunos Matriculados</span>
          </div>
          <button class="btn btn-primary btn-sm" onclick="App.openClassRollCall(${c.id}, '${c.name}', '${c.subject}')">
            <span>📝</span> Abrir Diário de Chamada
          </button>
        </div>
      `).join('');
    } catch (e) {
      console.warn("Erro ao carregar painel professor:", e);
    }
  },

  async openClassRollCall(classId, className, subject) {
    try {
      const data = await API.getClassAttendance(classId);
      const modal = document.getElementById('modal-rollcall');
      const title = document.getElementById('rollcall-modal-title');
      const body = document.getElementById('rollcall-students-list');

      title.innerText = `Chamada - ${className} (${subject})`;
      body.innerHTML = data.students.map(st => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid var(--border-subtle);">
          <div>
            <strong>${st.name}</strong>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${st.registration_number} • Freq: ${st.attendance_rate}%</div>
          </div>
          <div style="display: flex; gap: 0.35rem;">
            <button class="btn btn-success btn-sm" onclick="App.submitAttendanceManual(${st.id}, 'present')">✓ Presente</button>
            <button class="btn btn-danger btn-sm" onclick="App.submitAttendanceManual(${st.id}, 'absent')">✕ Falta</button>
          </div>
        </div>
      `).join('');

      modal.classList.add('active');
    } catch (e) {
      this.showToast(e.message, "danger");
    }
  },

  async submitAttendanceManual(studentId, status) {
    try {
      await API.markAttendanceManual({
        student_id: studentId,
        status: status,
        teacher_name: this.currentUser ? this.currentUser.name : 'Professor'
      });
      this.showToast(`Presença registrada: ${status === 'present' ? 'Presente' : 'Falta'}`, "success");
    } catch (e) {
      this.showToast(e.message, "danger");
    }
  },

  // ==========================================================
  // SPRINT 9: PAINEL DA COORDENAÇÃO
  // ==========================================================
  async loadCoordDashboard() {
    try {
      const stats = await API.getAdminStats();
      document.getElementById('coord-stat-students').innerText = stats.students.total;
      document.getElementById('coord-stat-present').innerText = stats.students.present_today;
      document.getElementById('coord-stat-absent').innerText = stats.students.absent_today;
      document.getElementById('coord-stat-rate').innerText = `${stats.students.attendance_rate_today}%`;

      // Lista turmas
      const classesData = await API.getClasses();
      const list = document.getElementById('coord-classes-list');
      if (list) {
        list.innerHTML = classesData.classes.map(c => `
          <div class="card" style="padding: 1rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>${c.name}</strong>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">${c.year_level} • Turno: ${c.shift}</div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="App.openClassRollCall(${c.id}, '${c.name}', 'Geral')">
              Consultar Frequência
            </button>
          </div>
        `).join('');
      }
    } catch (e) {
      console.warn("Erro ao carregar coordenação:", e);
    }
  },

  // ==========================================================
  // SPRINT 2: PAINEL DO ALUNO / CONTA KID
  // ==========================================================
  async loadStudentDashboard() {
    // Aluno padrão João Pedro Silva (ID: 1)
    const studentId = (this.currentUser && this.currentUser.role === 'student') ? this.currentUser.id : 1;
    try {
      const data = await API.getStudentDetails(studentId);
      const st = data.student;

      document.getElementById('kid-name').innerText = st.name;
      document.getElementById('kid-reg').innerText = st.registration_number;
      document.getElementById('kid-class').innerText = st.class_name;
      document.getElementById('kid-avatar').src = st.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop';
      document.getElementById('kid-freq-rate').innerText = `${st.metrics.attendance_percentage}%`;
      document.getElementById('kid-present-days').innerText = st.metrics.present_days;
      document.getElementById('kid-absent-days').innerText = st.metrics.absent_days;

      const parentBadges = document.getElementById('kid-parents-list');
      if (parentBadges) {
        parentBadges.innerHTML = st.linked_parents.map(p => `
          <span class="badge badge-info">${p.name} (${p.relationship_type})</span>
        `).join(' ');
      }
    } catch (e) {
      console.warn("Erro ao carregar conta kid:", e);
    }
  },

  // ==========================================================
  // SPRINT 6: MODAL DE HISTÓRICO COMPLETO
  // ==========================================================
  async viewStudentFullHistory(studentId, studentName) {
    try {
      const data = await API.getStudentAttendance(studentId, 'all');
      const modal = document.getElementById('modal-student-history');
      const title = document.getElementById('history-modal-title');
      const summaryBox = document.getElementById('history-summary-box');
      const tableBody = document.getElementById('history-table-body');

      title.innerText = `Histórico de Frequência & Catraca: ${studentName}`;
      summaryBox.innerHTML = `
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <div>Aulas Previstas: <strong>${data.summary.total_classes_scheduled}</strong></div>
          <div>Presenças: <strong style="color: var(--emerald-400);">${data.summary.present_days}</strong></div>
          <div>Faltas: <strong style="color: var(--rose-400);">${data.summary.absent_days}</strong></div>
          <div>Frequência Acumulada: <strong style="color: var(--cyan-400);">${data.summary.attendance_percentage}%</strong></div>
        </div>
      `;

      tableBody.innerHTML = data.records.map(r => `
        <tr>
          <td>${r.date}</td>
          <td>
            <span class="badge ${r.status === 'present' ? 'badge-success' : (r.status === 'late' ? 'badge-warning' : 'badge-danger')}">
              ${r.status === 'present' ? 'Presente' : (r.status === 'late' ? 'Atraso' : 'Falta')}
            </span>
          </td>
          <td>${r.entry_time || '--:--:--'}</td>
          <td>${r.exit_time || '--:--:--'}</td>
          <td style="font-size: 0.75rem; color: var(--text-muted);">${r.recorded_by === 'turnstile' ? 'Catraca Facial' : 'Chamada Docente'}</td>
        </tr>
      `).join('');

      modal.classList.add('active');
    } catch (e) {
      this.showToast(e.message, "danger");
    }
  },

  // ==========================================================
  // MODAIS E FORMULÁRIOS
  // ==========================================================
  openLinkModal() {
    document.getElementById('modal-link-dependent').classList.add('active');
  },

  async handleLinkDependentSubmit(e) {
    e.preventDefault();
    if (!this.currentUser) return;
    const reg = document.getElementById('link-student-reg').value.trim();
    const birth = document.getElementById('link-student-birth').value;
    const rel = document.getElementById('link-relationship').value;

    try {
      const res = await API.requestLinkDependent(this.currentUser.id, reg, birth, rel);
      this.showToast(res.message, "success");
      this.closeModal('modal-link-dependent');
      this.loadParentDashboard();
    } catch (err) {
      this.showToast(err.message, "danger");
    }
  },

  openNewStudentModal() {
    document.getElementById('modal-new-student').classList.add('active');
  },

  async handleCreateStudentSubmit(e) {
    e.preventDefault();
    const payload = {
      name: document.getElementById('new-st-name').value.trim(),
      registration_number: document.getElementById('new-st-reg').value.trim(),
      birth_date: document.getElementById('new-st-birth').value,
      class_name: document.getElementById('new-st-class').value,
      contact_emergency: document.getElementById('new-st-contact').value.trim()
    };

    try {
      const res = await API.createStudent(payload);
      this.showToast(res.message, "success");
      this.closeModal('modal-new-student');
      this.loadAdminStudents();
    } catch (err) {
      this.showToast(err.message, "danger");
    }
  },

  openRegisterStaffModal() {
    document.getElementById('modal-register-staff').classList.add('active');
  },

  async handleRegisterStaffSubmit(e) {
    e.preventDefault();
    const payload = {
      name: document.getElementById('staff-name').value.trim(),
      email: document.getElementById('staff-email').value.trim(),
      cpf: document.getElementById('staff-cpf').value.trim(),
      phone: document.getElementById('staff-phone').value.trim(),
      password: document.getElementById('staff-pwd').value,
      role: document.getElementById('staff-role').value
    };

    try {
      const res = await API.registerStaff(payload);
      this.showToast(res.message, "success");
      this.closeModal('modal-register-staff');
    } catch (err) {
      this.showToast(err.message, "danger");
    }
  },

  openRegisterParentModal() {
    document.getElementById('modal-register-parent').classList.add('active');
  },

  async handleRegisterParentSubmit(e) {
    e.preventDefault();
    const payload = {
      name: document.getElementById('parent-name').value.trim(),
      cpf: document.getElementById('parent-cpf').value.trim(),
      email: document.getElementById('parent-email').value.trim(),
      phone: document.getElementById('parent-phone').value.trim(),
      password: document.getElementById('parent-pwd').value
    };

    try {
      const res = await API.registerParent(payload);
      this.showToast(res.message, "success");
      this.closeModal('modal-register-parent');
    } catch (err) {
      this.showToast(err.message, "danger");
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : (type === 'danger' ? '✕' : (type === 'warning' ? '⚠️' : 'ℹ️'));
    toast.innerHTML = `<span style="font-weight: 800;">${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};

window.addEventListener('DOMContentLoaded', () => App.init());
