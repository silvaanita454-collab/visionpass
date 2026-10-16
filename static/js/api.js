/**
 * VisionPass - Cliente API
 * Comunicação assíncrona com os endpoints do backend Flask
 */

const API = {
  baseUrl: window.location.origin.includes('5000') ? '' : 'http://localhost:5000',

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = localStorage.getItem('visionpass_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...(options.headers || {})
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Erro HTTP ${response.status}`);
      }
      return data;
    } catch (err) {
      console.error(`Falha na requisição API (${endpoint}):`, err);
      throw err;
    }
  },

  // Auth
  login(loginId, password, role) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ login: loginId, password, role })
    });
  },

  getQuickAccounts() {
    return this.request('/api/auth/quick-switch-accounts');
  },

  registerParent(formData) {
    return this.request('/api/auth/register-parent', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  registerStaff(formData) {
    return this.request('/api/auth/register-staff', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
  },

  // Alunos / Conta Kid
  getStudents(search = '', className = '') {
    const query = new URLSearchParams({ search, class_name: className }).toString();
    return this.request(`/api/students?${query}`);
  },

  getStudentDetails(studentId) {
    return this.request(`/api/students/${studentId}`);
  },

  createStudent(studentData) {
    return this.request('/api/students', {
      method: 'POST',
      body: JSON.stringify(studentData)
    });
  },

  // Responsáveis & Dependentes
  getParentDependents(parentId) {
    return this.request(`/api/parents/${parentId}/dependents`);
  },

  requestLinkDependent(parentId, registrationNumber, birthDate, relationshipType) {
    return this.request('/api/dependents/link-request', {
      method: 'POST',
      body: JSON.stringify({
        parent_id: parentId,
        registration_number: registrationNumber,
        birth_date: birthDate,
        relationship_type: relationshipType
      })
    });
  },

  getParentDashboard(parentId) {
    return this.request(`/api/parent/dashboard/${parentId}`);
  },

  // Catraca Facial
  getTurnstiles() {
    return this.request('/api/turnstiles');
  },

  recognizeTurnstile(payload) {
    return this.request('/api/turnstiles/recognize', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  getAccessLogs(limit = 20) {
    return this.request(`/api/access-logs?limit=${limit}`);
  },

  // Frequência
  getStudentAttendance(studentId, period = 'all') {
    return this.request(`/api/attendance/student/${studentId}?period=${period}`);
  },

  getClassAttendance(classId) {
    return this.request(`/api/attendance/classes/${classId}`);
  },

  markAttendanceManual(data) {
    return this.request('/api/attendance/mark-manual', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // Institucional & Staff
  getPendingStaff() {
    return this.request('/api/institution/pending-staff');
  },

  approveStaff(userId) {
    return this.request(`/api/institution/approve-staff/${userId}`, { method: 'POST' });
  },

  rejectStaff(userId) {
    return this.request(`/api/institution/reject-staff/${userId}`, { method: 'POST' });
  },

  getStaffList() {
    return this.request('/api/institution/staff');
  },

  getTeacherClasses(teacherId) {
    return this.request(`/api/teacher/classes/${teacherId}`);
  },

  // Admin & Auditoria
  getAdminStats() {
    return this.request('/api/admin/dashboard-stats');
  },

  toggleUserStatus(targetType, targetId, newStatus) {
    return this.request('/api/admin/toggle-user-status', {
      method: 'POST',
      body: JSON.stringify({ target_type: targetType, target_id: targetId, new_status: newStatus })
    });
  },

  getAuditLogs() {
    return this.request('/api/admin/audit-logs');
  },

  getClasses() {
    return this.request('/api/classes');
  },

  getNotifications(userId) {
    return this.request(`/api/notifications/${userId}`);
  }
};
