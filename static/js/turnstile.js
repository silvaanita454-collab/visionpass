/**
 * VisionPass - Módulo de Terminal e Catraca Facial (Sprints 5 & 9)
 * Gerencia webcam real com canvas, simulação de biometria facial, detecção de vivacidade,
 * efeitos visuais e sonoros no totem da catraca.
 */

const TurnstileModule = {
  videoElement: null,
  canvasElement: null,
  mediaStream: null,
  isScanning: false,
  selectedTurnstileId: 1,
  accessDirection: 'entry',
  livenessPassed: true,

  init() {
    this.videoElement = document.getElementById('kiosk-video');
    this.canvasElement = document.getElementById('kiosk-canvas');

    // Bind botões de controle
    const startCamBtn = document.getElementById('btn-start-camera');
    if (startCamBtn) {
      startCamBtn.addEventListener('click', () => this.toggleCamera());
    }

    const directionSelect = document.getElementById('turnstile-direction');
    if (directionSelect) {
      directionSelect.addEventListener('change', (e) => {
        this.accessDirection = e.target.value;
      });
    }

    const livenessCheckbox = document.getElementById('chk-liveness');
    if (livenessCheckbox) {
      livenessCheckbox.addEventListener('change', (e) => {
        this.livenessPassed = e.target.checked;
      });
    }
  },

  async toggleCamera() {
    const btn = document.getElementById('btn-start-camera');
    if (this.mediaStream) {
      // Para câmera
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
      if (this.videoElement) {
        this.videoElement.srcObject = null;
        this.videoElement.style.display = 'none';
      }
      document.getElementById('camera-fallback-display').style.display = 'block';
      if (btn) btn.innerHTML = `<span>📹</span> Ligar Webcam Real`;
      App.showToast("Câmera desligada", "info");
      return;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" }
      });
      if (this.videoElement) {
        this.videoElement.srcObject = this.mediaStream;
        this.videoElement.style.display = 'block';
        await this.videoElement.play();
      }
      document.getElementById('camera-fallback-display').style.display = 'none';
      if (btn) btn.innerHTML = `<span>⏹</span> Desligar Câmera`;
      App.showToast("Webcam ativada com sucesso!", "success");
    } catch (err) {
      console.warn("Não foi possível acessar a webcam:", err);
      App.showToast("Webcam não detectada ou permissão negada. O modo de simulação facial está ativo!", "warning");
    }
  },

  // Simula captura instantânea ou reconhecimento de cenário
  async simulatePass(scenario) {
    if (this.isScanning) return;
    this.isScanning = true;

    const viewport = document.getElementById('camera-viewport');
    const gateContainer = document.getElementById('physical-gate');
    const gateRotor = document.getElementById('gate-rotor');
    const gateScreen = document.getElementById('gate-screen');
    const resultCard = document.getElementById('access-result-card');

    // Reseta estados visuais
    viewport.classList.remove('granted', 'denied');
    gateContainer.classList.remove('unlocked', 'locked');
    resultCard.classList.remove('active');

    // Efeito de escaneamento facial
    gateScreen.innerHTML = `<span>ESCANEANDO</span><span style="color:#06b6d4;">BIOMETRIA...</span>`;
    SoundFX.playScanPing();

    // Se tiver imagem na webcam ou imagem simulada
    let avatarFallback = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';
    let subjectType = 'student';
    let subjectId = 1;

    if (scenario === 'joao') {
      subjectType = 'student';
      subjectId = 1; // João Pedro Silva
      avatarFallback = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop';
    } else if (scenario === 'sofia') {
      subjectType = 'student';
      subjectId = 2; // Sofia Silveira
      avatarFallback = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop';
    } else if (scenario === 'gabriel_blocked') {
      subjectType = 'student';
      subjectId = 5; // Gabriel Oliveira (Bloqueado)
      avatarFallback = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop';
    } else if (scenario === 'prof_carlos') {
      subjectType = 'teacher';
      subjectId = 4; // Prof. Carlos Mendes
      avatarFallback = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop';
    } else if (scenario === 'coord_mariana') {
      subjectType = 'coordinator';
      subjectId = 3; // Mariana Vasconcelos
      avatarFallback = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop';
    } else if (scenario === 'unknown') {
      subjectType = 'unknown';
      subjectId = null;
      avatarFallback = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop';
    }

    // Exibe avatar no fallback caso a webcam esteja desligada
    const fbImg = document.getElementById('camera-fallback-display');
    if (fbImg && !this.mediaStream) {
      fbImg.src = avatarFallback;
    }

    try {
      const payload = {
        turnstile_id: this.selectedTurnstileId,
        access_type: this.accessDirection,
        subject_type: subjectType,
        subject_id: subjectId,
        liveness_passed: scenario === 'liveness_failed' ? false : this.livenessPassed
      };

      // Pequeno delay de análise facial realista (800ms)
      await new Promise(r => setTimeout(r, 800));

      const res = await API.recognizeTurnstile(payload);

      // SUCESSO: CATRACA LIBERADA!
      viewport.classList.add('granted');
      gateContainer.classList.add('unlocked');
      gateRotor.classList.add('spinning');
      gateScreen.innerHTML = `<span style="color:#10b981;">LIBERADO</span><span>BEM-VINDO</span>`;

      SoundFX.playGranted();
      if (res.voice_alert) {
        SoundFX.speak(res.voice_alert);
      }

      this.displayResult(res, true);
      App.showToast(`Catraca Liberada: ${res.person_name} (${this.accessDirection.toUpperCase()})`, "success");

      // Atualiza logs recentes na tela
      this.refreshRecentLogs();

      // Se o usuário atual for o pai do aluno, atualiza os dados em segundo plano
      if (App.currentUser && App.currentUser.role === 'parent') {
        App.loadParentDashboard();
      }

    } catch (err) {
      // NEGADO: CATRACA BLOQUEADA!
      viewport.classList.add('denied');
      gateContainer.classList.add('locked');
      gateScreen.innerHTML = `<span style="color:#f43f5e;">BLOQUEADO</span><span>ACESSO NEGADO</span>`;

      SoundFX.playDenied();
      SoundFX.speak("Acesso negado. Catraca bloqueada.");

      this.displayResult({
        person_name: scenario === 'unknown' ? 'Pessoa Não Identificada' : 'Acesso Suspenso',
        message: err.message,
        time: new Date().toLocaleTimeString('pt-BR')
      }, false);

      App.showToast(err.message, "danger");
      this.refreshRecentLogs();
    } finally {
      setTimeout(() => {
        gateRotor.classList.remove('spinning');
        this.isScanning = false;
      }, 2500);
    }
  },

  displayResult(data, isGranted) {
    const card = document.getElementById('access-result-card');
    const avatar = document.getElementById('result-avatar');
    const name = document.getElementById('result-name');
    const meta = document.getElementById('result-meta');
    const badge = document.getElementById('result-badge');
    const msg = document.getElementById('result-msg');

    if (avatar) avatar.src = data.avatar_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop';
    if (name) name.innerText = data.person_name || 'Desconhecido';
    
    let metaText = `Horário: ${data.time || new Date().toLocaleTimeString('pt-BR')}`;
    if (data.class_name) metaText += ` • Turma: ${data.class_name}`;
    if (data.role_label) metaText += ` • Cargo: ${data.role_label}`;
    if (data.attendance_rate) metaText += ` • Frequência: ${data.attendance_rate}%`;
    if (meta) meta.innerText = metaText;

    if (badge) {
      badge.className = isGranted ? 'badge badge-success' : 'badge badge-danger';
      badge.innerText = isGranted ? 'LIBERADO' : 'BLOQUEADO';
    }

    if (msg) msg.innerText = data.message || '';
    card.classList.add('active');
  },

  async refreshRecentLogs() {
    try {
      const data = await API.getAccessLogs(8);
      const container = document.getElementById('kiosk-recent-logs');
      if (!container) return;

      container.innerHTML = data.logs.map(log => `
        <tr>
          <td><strong style="color: ${log.status === 'granted' ? 'var(--emerald-400)' : 'var(--rose-400)'}">${log.status === 'granted' ? '✓ LIBERADO' : '✕ NEGADO'}</strong></td>
          <td>${log.person_name}</td>
          <td><span class="badge ${log.access_type === 'entry' ? 'badge-info' : 'badge-warning'}">${log.access_type === 'entry' ? 'Entrada' : 'Saída'}</span></td>
          <td style="font-family: monospace; font-size: 0.75rem;">${log.timestamp.split(' ')[1] || log.timestamp}</td>
        </tr>
      `).join('');
    } catch (e) {
      console.warn("Erro ao atualizar logs:", e);
    }
  }
};
