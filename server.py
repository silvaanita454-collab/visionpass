"""
VisionPass - Backend API Server (Flask + SQLite)
Implementa toda a API RESTful cobrindo os Sprints 1 a 10:
Autenticação, Gestão de Contas, Conta Kid, Responsáveis, Catraca Facial, Frequência, Dashboards e Auditoria.
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import sqlite3
import json
import os
from datetime import datetime, date, timedelta
from database import get_db, init_db, seed_data, hash_password, validate_cpf

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)

# Inicializa banco de dados ao subir
init_db()
seed_data()

# Helper para converter sqlite3.Row em dicionário
def dict_from_row(row):
    return dict(row) if row else None

def dict_list_from_rows(rows):
    return [dict(r) for r in rows]

def log_audit(user_id, user_name, action, details):
    """Registra ação no log de auditoria para conformidade e segurança."""
    try:
        conn = get_db()
        conn.execute("""
        INSERT INTO audit_logs (user_id, user_name, action, details, ip_address)
        VALUES (?, ?, ?, ?, ?)
        """, (user_id, user_name or 'Sistema', action, details, request.remote_addr or '127.0.0.1'))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Erro ao registrar auditoria: {e}")

# ============================================================
# ROTAS ESTÁTICAS E HOME
# ============================================================
@app.route('/')
def serve_index():
    return send_from_directory('static', 'index.html')

# ============================================================
# SPRINT 1, 3 & 8: AUTENTICAÇÃO E GESTÃO DE CONTAS
# ============================================================
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    login_id = data.get('login', '').strip() # pode ser email, CPF ou matrícula
    password = data.get('password', '')
    requested_role = data.get('role', None) # opcional para filtrar contexto

    if not login_id or not password:
        return jsonify({'error': 'Login e senha são obrigatórios'}), 400

    conn = get_db()
    pwd_hash = hash_password(password)

    # 1. Tenta buscar em usuários (Admin, Diretor, Coordenação, Professor, Responsável)
    # Limpa pontuação se for CPF
    clean_cpf = ''.join(c for c in login_id if c.isdigit())
    
    query = """
    SELECT u.*, i.name as institution_name 
    FROM users u 
    LEFT JOIN institutions i ON u.institution_id = i.id
    WHERE (u.email = ? OR u.cpf = ? OR u.cpf = ?) AND u.password_hash = ?
    """
    user = conn.execute(query, (login_id, login_id, clean_cpf, pwd_hash)).fetchone()

    if user:
        user_dict = dict(user)
        # Verifica status da conta
        if user_dict['status'] == 'pending_approval':
            conn.close()
            return jsonify({
                'error': 'Sua conta institucional está aguardando aprovação pela administração da escola.',
                'status': 'pending_approval'
            }), 403

        if user_dict['status'] == 'blocked':
            conn.close()
            return jsonify({'error': 'Sua conta foi bloqueada pela instituição. Contate a direção.'}), 403

        # Remove dados sensíveis
        del user_dict['password_hash']
        
        log_audit(user_dict['id'], user_dict['name'], 'LOGIN_REALIZADO', f"Login efetuado com perfil: {user_dict['role']}")
        conn.close()
        return jsonify({
            'success': True,
            'user_type': 'user',
            'user': user_dict,
            'token': f"session_tk_{user_dict['id']}_{int(datetime.now().timestamp())}"
        })

    # 2. Tenta buscar em alunos (Conta Kid pelo número de matrícula)
    student = conn.execute("""
    SELECT s.*, i.name as institution_name
    FROM students s
    LEFT JOIN institutions i ON s.institution_id = i.id
    WHERE s.registration_number = ? AND s.password_hash = ?
    """, (login_id, pwd_hash)).fetchone()

    if student:
        st_dict = dict(student)
        if st_dict['status'] == 'blocked':
            conn.close()
            return jsonify({'error': 'Acesso da Conta Kid suspenso pela instituição.'}), 403

        del st_dict['password_hash']
        st_dict['role'] = 'student'
        log_audit(st_dict['id'], st_dict['name'], 'LOGIN_ALUNO', f"Aluno acessou Conta Kid: {st_dict['registration_number']}")
        conn.close()
        return jsonify({
            'success': True,
            'user_type': 'student',
            'user': st_dict,
            'token': f"session_kid_{st_dict['id']}_{int(datetime.now().timestamp())}"
        })

    conn.close()
    return jsonify({'error': 'Credenciais incorretas ou usuário não encontrado'}), 401

@app.route('/api/auth/quick-switch-accounts', methods=['GET'])
def get_quick_accounts():
    """Retorna contas de demonstração para troca rápida com 1 clique."""
    conn = get_db()
    users = conn.execute("""
    SELECT id, name, email, cpf, role, status, avatar_url 
    FROM users 
    WHERE email IN (
        'admin@visionpass.com', 
        'diretoria@visionpass.com', 
        'coord@visionpass.com', 
        'prof.carlos@visionpass.com', 
        'pai.joao@gmail.com',
        'mae.joao@gmail.com'
    )
    """).fetchall()

    student = conn.execute("""
    SELECT id, name, registration_number, class_name, 'student' as role, avatar_url, 'active' as status
    FROM students 
    WHERE registration_number = 'MAT-2026-001'
    """).fetchone()

    conn.close()
    accounts = [dict(u) for u in users]
    if student:
        accounts.append(dict(student))
    return jsonify({'accounts': accounts})

@app.route('/api/auth/register-parent', methods=['POST'])
def register_parent():
    """Cadastro de novos Responsáveis (Sprint 3)."""
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    cpf = data.get('cpf', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '')

    if not name or not cpf or not email or not password:
        return jsonify({'error': 'Nome, CPF, e-mail e senha são obrigatórios'}), 400

    clean_cpf = ''.join(c for c in cpf if c.isdigit())
    if not validate_cpf(clean_cpf):
        return jsonify({'error': 'CPF inválido de acordo com o algoritmo de verificação da Receita Federal'}), 400

    conn = get_db()
    # Verifica duplicidade de CPF ou e-mail
    existing = conn.execute("SELECT id FROM users WHERE email = ? OR cpf = ?", (email, clean_cpf)).fetchone()
    if existing:
        conn.close()
        return jsonify({'error': 'Já existe uma conta cadastrada com este CPF ou e-mail'}), 409

    # Busca primeira instituição padrão
    inst = conn.execute("SELECT id FROM institutions LIMIT 1").fetchone()
    inst_id = inst['id'] if inst else 1

    pwd_hash = hash_password(password)
    cursor = conn.execute("""
    INSERT INTO users (institution_id, name, email, cpf, phone, password_hash, role, status, email_verified)
    VALUES (?, ?, ?, ?, ?, ?, 'parent', 'active', 1)
    """, (inst_id, name, email, clean_cpf, phone, pwd_hash))
    user_id = cursor.lastrowid
    conn.commit()

    log_audit(user_id, name, 'CADASTRO_RESPONSAVEL', f"Novo responsável cadastrado com CPF: {clean_cpf}")
    conn.close()

    return jsonify({
        'success': True,
        'message': 'Conta de Responsável criada com sucesso e validada!',
        'user_id': user_id
    })

@app.route('/api/auth/register-staff', methods=['POST'])
def register_staff():
    """Solicitação de cadastro de funcionário institucional (Sprint 8: aguarda aprovação de ADM)."""
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    cpf = data.get('cpf', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '')
    role = data.get('role', 'teacher') # 'teacher', 'coordinator', 'director', 'staff'

    if not name or not email or not password or not cpf:
        return jsonify({'error': 'Preencha todos os campos obrigatórios'}), 400

    clean_cpf = ''.join(c for c in cpf if c.isdigit())
    if not validate_cpf(clean_cpf):
        return jsonify({'error': 'CPF informado é inválido'}), 400

    conn = get_db()
    existing = conn.execute("SELECT id FROM users WHERE email = ? OR cpf = ?", (email, clean_cpf)).fetchone()
    if existing:
        conn.close()
        return jsonify({'error': 'E-mail ou CPF já cadastrado no sistema'}), 409

    inst = conn.execute("SELECT id FROM institutions LIMIT 1").fetchone()
    inst_id = inst['id'] if inst else 1

    pwd_hash = hash_password(password)
    cursor = conn.execute("""
    INSERT INTO users (institution_id, name, email, cpf, phone, password_hash, role, status, email_verified)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending_approval', 1)
    """, (inst_id, name, email, clean_cpf, phone, pwd_hash, role))
    user_id = cursor.lastrowid
    conn.commit()

    log_audit(user_id, name, 'SOLICITACAO_ACESSO_STAFF', f"Funcionário ({role}) solicitou acesso. Aguarda aprovação.")
    conn.close()

    return jsonify({
        'success': True,
        'message': 'Solicitação enviada! Sua conta será liberada após análise e aprovação da Direção.',
        'status': 'pending_approval'
    })

# ============================================================
# SPRINT 2: CONTA KID / ALUNO
# ============================================================
@app.route('/api/students', methods=['GET'])
def list_students():
    """Lista todos os alunos da instituição com opções de filtro."""
    search = request.args.get('search', '').strip()
    class_name = request.args.get('class_name', '').strip()

    conn = get_db()
    query = """
    SELECT s.*, 
        (SELECT COUNT(*) FROM attendance_records ar WHERE ar.student_id = s.id AND ar.status = 'present') as present_days,
        (SELECT COUNT(*) FROM attendance_records ar WHERE ar.student_id = s.id AND ar.status = 'absent') as absent_days,
        (SELECT COUNT(*) FROM parent_student_relations psr WHERE psr.student_id = s.id AND psr.status = 'approved') as linked_parents_count
    FROM students s
    WHERE 1=1
    """
    params = []
    if search:
        query += " AND (s.name LIKE ? OR s.registration_number LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%"])
    if class_name:
        query += " AND s.class_name = ?"
        params.append(class_name)

    query += " ORDER BY s.name ASC"
    rows = conn.execute(query, params).fetchall()
    
    result = []
    for r in rows:
        d = dict(r)
        # Calcula percentual dinâmico
        total_days = d['present_days'] + d['absent_days']
        d['attendance_rate'] = round((d['present_days'] / total_days * 100), 1) if total_days > 0 else 100.0
        result.append(d)

    conn.close()
    return jsonify({'students': result})

@app.route('/api/students', methods=['POST'])
def create_student():
    """Cadastra um novo aluno na Conta Kid (Sprint 2)."""
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    registration = data.get('registration_number', '').strip().upper()
    birth_date = data.get('birth_date', '').strip()
    class_name = data.get('class_name', '').strip()
    contact = data.get('contact_emergency', '').strip()
    avatar_url = data.get('avatar_url', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop')

    if not name or not registration or not birth_date or not class_name:
        return jsonify({'error': 'Nome, Matrícula, Data de Nascimento e Turma são obrigatórios'}), 400

    conn = get_db()
    existing = conn.execute("SELECT id FROM students WHERE registration_number = ?", (registration,)).fetchone()
    if existing:
        conn.close()
        return jsonify({'error': 'Já existe um aluno com esta matrícula'}), 409

    inst = conn.execute("SELECT id FROM institutions LIMIT 1").fetchone()
    inst_id = inst['id'] if inst else 1

    # Senha padrão inicial para a Conta Kid do aluno (6 primeiros dígitos da matrícula ou 123456)
    pwd_hash = hash_password("123456")

    # Gera descriptor facial biométrico inicial
    face_desc = json.dumps([round(0.15 + (i * 0.005) % 0.8, 4) for i in range(128)])

    cursor = conn.execute("""
    INSERT INTO students (institution_id, class_name, name, registration_number, birth_date, password_hash, status, avatar_url, face_descriptor, face_registered_at, total_classes_expected, contact_emergency)
    VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, CURRENT_TIMESTAMP, 100, ?)
    """, (inst_id, class_name, name, registration, birth_date, pwd_hash, avatar_url, face_desc, contact))
    new_id = cursor.lastrowid
    conn.commit()

    log_audit(None, 'Admin', 'CADASTRO_CONTA_KID', f"Novo aluno cadastrado: {name} (Matrícula: {registration})")
    conn.close()

    return jsonify({
        'success': True,
        'message': f'Aluno {name} cadastrado com sucesso!',
        'student_id': new_id
    })

@app.route('/api/students/<int:student_id>', methods=['GET'])
def get_student_details(student_id):
    """Retorna dados completos do aluno, incluindo histórico e responsáveis vinculados."""
    conn = get_db()
    student = conn.execute("SELECT * FROM students WHERE id = ?", (student_id,)).fetchone()
    if not student:
        conn.close()
        return jsonify({'error': 'Aluno não encontrado'}), 404

    st_dict = dict(student)
    if 'password_hash' in st_dict:
        del st_dict['password_hash']

    # Busca responsáveis vinculados (Sprint 4)
    parents = conn.execute("""
    SELECT u.id, u.name, u.email, u.phone, psr.relationship_type, psr.status, psr.approved_at
    FROM parent_student_relations psr
    JOIN users u ON psr.parent_id = u.id
    WHERE psr.student_id = ?
    """, (student_id,)).fetchall()
    st_dict['linked_parents'] = [dict(p) for p in parents]

    # Busca métricas de presença
    records = conn.execute("""
    SELECT status, COUNT(*) as count 
    FROM attendance_records 
    WHERE student_id = ? 
    GROUP BY status
    """, (student_id,)).fetchall()
    stats = {r['status']: r['count'] for r in records}
    present = stats.get('present', 0) + stats.get('late', 0)
    absent = stats.get('absent', 0)
    total = present + absent
    st_dict['metrics'] = {
        'total_recorded_days': total,
        'present_days': present,
        'absent_days': absent,
        'late_days': stats.get('late', 0),
        'attendance_percentage': round((present / total * 100), 1) if total > 0 else 100.0,
        'absence_percentage': round((absent / total * 100), 1) if total > 0 else 0.0
    }

    # Últimos acessos na catraca
    recent_access = conn.execute("""
    SELECT al.*, t.name as turnstile_name 
    FROM access_logs al
    LEFT JOIN turnstiles t ON al.turnstile_id = t.id
    WHERE al.student_id = ?
    ORDER BY al.timestamp DESC LIMIT 10
    """, (student_id,)).fetchall()
    st_dict['recent_access'] = [dict(a) for a in recent_access]

    conn.close()
    return jsonify({'student': st_dict})

# ============================================================
# SPRINT 4: VÍNCULO RESPONSÁVEL <-> ALUNO
# ============================================================
@app.route('/api/parents/<int:parent_id>/dependents', methods=['GET'])
def get_parent_dependents(parent_id):
    """Lista todos os dependentes de um responsável (Sprint 4 & 7)."""
    conn = get_db()
    rows = conn.execute("""
    SELECT s.*, psr.relationship_type, psr.status as link_status, psr.requested_at, psr.approved_at
    FROM parent_student_relations psr
    JOIN students s ON psr.student_id = s.id
    WHERE psr.parent_id = ?
    """, (parent_id,)).fetchall()

    dependents = []
    for r in rows:
        d = dict(r)
        sid = d['id']
        # Calcula presença
        stats = conn.execute("""
        SELECT 
            SUM(CASE WHEN status IN ('present', 'late') THEN 1 ELSE 0 END) as presences,
            SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absences,
            SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as lates,
            COUNT(*) as total
        FROM attendance_records WHERE student_id = ?
        """, (sid,)).fetchone()

        pres = stats['presences'] or 0
        absn = stats['absences'] or 0
        tot = stats['total'] or 0
        d['attendance_rate'] = round((pres / tot * 100), 1) if tot > 0 else 100.0
        d['absence_rate'] = round((absn / tot * 100), 1) if tot > 0 else 0.0
        d['present_days'] = pres
        d['absent_days'] = absn
        d['late_days'] = stats['lates'] or 0

        # Última entrada e saída na catraca
        last_entry = conn.execute("""
        SELECT timestamp FROM access_logs 
        WHERE student_id = ? AND access_type = 'entry' AND status = 'granted' 
        ORDER BY timestamp DESC LIMIT 1
        """, (sid,)).fetchone()
        
        last_exit = conn.execute("""
        SELECT timestamp FROM access_logs 
        WHERE student_id = ? AND access_type = 'exit' AND status = 'granted' 
        ORDER BY timestamp DESC LIMIT 1
        """, (sid,)).fetchone()

        d['last_entry'] = last_entry['timestamp'] if last_entry else None
        d['last_exit'] = last_exit['timestamp'] if last_exit else None

        # Outros responsáveis vinculados a este mesmo filho (Regra 1 aluno -> N responsáveis)
        other_parents = conn.execute("""
        SELECT u.name, psr2.relationship_type 
        FROM parent_student_relations psr2
        JOIN users u ON psr2.parent_id = u.id
        WHERE psr2.student_id = ? AND psr2.parent_id != ?
        """, (sid, parent_id)).fetchall()
        d['co_parents'] = [f"{op['name']} ({op['relationship_type']})" for op in other_parents]

        dependents.append(d)

    conn.close()
    return jsonify({'dependents': dependents})

@app.route('/api/dependents/link-request', methods=['POST'])
def request_dependent_link():
    """Responsável solicita vínculo com uma Conta Kid existente (Sprint 4)."""
    data = request.get_json() or {}
    parent_id = data.get('parent_id')
    registration = data.get('registration_number', '').strip().upper()
    birth_date = data.get('birth_date', '').strip()
    relationship = data.get('relationship_type', 'Pai')

    if not parent_id or not registration:
        return jsonify({'error': 'ID do responsável e Matrícula são obrigatórios'}), 400

    conn = get_db()
    # 1. Regra central: A Conta Kid DEVE existir previamente no sistema
    student = conn.execute("SELECT * FROM students WHERE registration_number = ?", (registration,)).fetchone()
    if not student:
        conn.close()
        return jsonify({
            'error': f'Nenhuma Conta Kid encontrada com a matrícula {registration}. O aluno precisa estar previamente cadastrado pela instituição.'
        }), 404

    student_id = student['id']

    # Validação de data de nascimento para segurança
    if birth_date and student['birth_date'] != birth_date:
        conn.close()
        return jsonify({'error': 'A data de nascimento informada não coincide com os registros do aluno.'}), 400

    # Verifica se o vínculo já existe
    existing = conn.execute("""
    SELECT * FROM parent_student_relations 
    WHERE parent_id = ? AND student_id = ?
    """, (parent_id, student_id)).fetchone()

    if existing:
        conn.close()
        return jsonify({'error': 'Você já possui uma solicitação ou vínculo com este aluno'}), 409

    # Cria o vínculo automaticamente aprovado com verificação de dados
    cursor = conn.execute("""
    INSERT INTO parent_student_relations (parent_id, student_id, relationship_type, status, approved_at)
    VALUES (?, ?, ?, 'approved', CURRENT_TIMESTAMP)
    """, (parent_id, student_id, relationship))
    conn.commit()

    # Cria notificação para o pai
    conn.execute("""
    INSERT INTO notifications (user_id, student_id, title, message, type)
    VALUES (?, ?, 'Vínculo Estabelecido', ?, 'system')
    """, (parent_id, student_id, f"Seu perfil foi vinculado com sucesso à Conta Kid de {student['name']}."))
    conn.commit()

    log_audit(parent_id, 'Responsável', 'VINCULO_DEPENDENTE', f"Vínculo aprovado para o aluno {student['name']} (Matrícula: {registration})")
    conn.close()

    return jsonify({
        'success': True,
        'message': f"Aluno {student['name']} vinculado com sucesso à sua conta!",
        'student': dict(student)
    })

# ============================================================
# SPRINT 5 & 9: CATRACA FACIAL E CONTROLE DE ACESSO
# ============================================================
@app.route('/api/turnstiles', methods=['GET'])
def list_turnstiles():
    """Lista todas as catracas cadastradas e seu status atual."""
    conn = get_db()
    rows = conn.execute("SELECT * FROM turnstiles ORDER BY id ASC").fetchall()
    conn.close()
    return jsonify({'turnstiles': dict_list_from_rows(rows)})

@app.route('/api/turnstiles/recognize', methods=['POST'])
def turnstile_recognize():
    """
    ENDPOINT CENTRAL DO RECONHECIMENTO FACIAL (Sprints 5, 6, 9)
    Fluxo:
    1. Captura facial & Validação de vivacidade (Liveness)
    2. Identificação biométrica
    3. Verificação de autorização e status ativo
    4. Liberação ou bloqueio da catraca
    5. Registro de log de acesso
    6. Atualização de frequência do aluno ou presença do funcionário
    7. Envio imediato de notificação aos pais/responsáveis!
    """
    data = request.get_json() or {}
    turnstile_id = data.get('turnstile_id', 1)
    access_type = data.get('access_type', 'entry') # 'entry' ou 'exit'
    subject_type = data.get('subject_type') # 'student', 'staff', 'unknown'
    subject_id = data.get('subject_id') # ID do aluno ou funcionário
    liveness_ok = data.get('liveness_passed', True)
    custom_name = data.get('custom_name', None)

    conn = get_db()

    # Busca a catraca
    turnstile = conn.execute("SELECT * FROM turnstiles WHERE id = ?", (turnstile_id,)).fetchone()
    turnstile_name = turnstile['name'] if turnstile else f"Catraca #{turnstile_id}"
    inst_id = turnstile['institution_id'] if turnstile else 1

    # 1. Checagem de Vivacidade (Anti-spoofing / Liveness)
    if not liveness_ok:
        # Bloqueio imediato por falha de vivacidade
        conn.execute("""
        INSERT INTO access_logs (institution_id, turnstile_id, user_type, person_name, access_type, status, denial_reason, confidence)
        VALUES (?, ?, 'unknown', 'Falha de Vivacidade Facial (Foto Estática)', ?, 'denied', 'liveness_failed', 0.25)
        """, (inst_id, turnstile_id, access_type))
        conn.commit()
        conn.close()
        return jsonify({
            'status': 'denied',
            'reason': 'liveness_failed',
            'message': 'ACESSO NEGADO: Detecção de vivacidade reprovada. Movimente o rosto em frente à câmera.',
            'voice_alert': 'Atenção. Falha na detecção de vivacidade facial. Acesso bloqueado.'
        }), 403

    # 2. Se for pessoa desconhecida / não cadastrada
    if subject_type == 'unknown' or (not subject_id and not custom_name):
        conn.execute("""
        INSERT INTO access_logs (institution_id, turnstile_id, user_type, person_name, access_type, status, denial_reason, confidence)
        VALUES (?, ?, 'unknown', 'Pessoa Não Identificada', ?, 'denied', 'not_recognized', 0.38)
        """, (inst_id, turnstile_id, access_type))
        conn.commit()
        conn.close()
        return jsonify({
            'status': 'denied',
            'reason': 'not_recognized',
            'message': 'CATRACA BLOQUEADA: Rosto não reconhecido na base de dados da instituição.',
            'voice_alert': 'Acesso negado. Usuário não reconhecido.'
        }), 403

    now = datetime.now()
    today_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M:%S")

    # 3. Se o usuário identificado for ALUNO
    if subject_type == 'student':
        student = conn.execute("SELECT * FROM students WHERE id = ?", (subject_id,)).fetchone()
        if not student:
            conn.close()
            return jsonify({'status': 'denied', 'reason': 'not_found', 'message': 'Aluno não localizado.'}), 404

        # Regra de Aluno Bloqueado (Ex: Gabriel Oliveira)
        if student['status'] == 'blocked':
            conn.execute("""
            INSERT INTO access_logs (institution_id, turnstile_id, user_type, student_id, person_name, access_type, status, denial_reason, confidence)
            VALUES (?, ?, 'student', ?, ?, ?, 'denied', 'blocked', 0.98)
            """, (inst_id, turnstile_id, student['id'], student['name'], access_type))
            conn.commit()
            conn.close()
            return jsonify({
                'status': 'denied',
                'reason': 'blocked',
                'person_name': student['name'],
                'message': f'CATRACA BLOQUEADA: Matrícula de {student["name"]} está suspensa/bloqueada.',
                'voice_alert': f'Acesso suspenso para {student["name"]}. Favor procurar a coordenação.'
            }), 403

        # ALUNO AUTORIZADO -> CATRACA LIBERADA!
        conn.execute("""
        INSERT INTO access_logs (institution_id, turnstile_id, user_type, student_id, person_name, access_type, status, confidence)
        VALUES (?, ?, 'student', ?, ?, ?, 'granted', 0.99)
        """, (inst_id, turnstile_id, student['id'], student['name'], access_type))

        # Atualiza ou cria registro de presença hoje
        att = conn.execute("SELECT * FROM attendance_records WHERE student_id = ? AND date = ?", (student['id'], today_str)).fetchone()
        if not att:
            # Novo registro de entrada
            conn.execute("""
            INSERT INTO attendance_records (student_id, date, period, status, entry_time, turnstile_id, recorded_by)
            VALUES (?, ?, '1_semestre', 'present', ?, ?, 'turnstile')
            """, (student['id'], today_str, time_str, turnstile_id))
        else:
            if access_type == 'exit':
                conn.execute("""
                UPDATE attendance_records SET exit_time = ? WHERE id = ?
                """, (time_str, att['id']))

        # Dispara notificação em tempo real a todos os pais/responsáveis vinculados!
        parents = conn.execute("""
        SELECT parent_id FROM parent_student_relations WHERE student_id = ? AND status = 'approved'
        """, (student['id'],)).fetchall()

        tipo_acao = "Entrada" if access_type == 'entry' else "Saída"
        for p in parents:
            conn.execute("""
            INSERT INTO notifications (user_id, student_id, title, message, type)
            VALUES (?, ?, ?, ?, ?)
            """, (
                p['parent_id'], 
                student['id'], 
                f"{tipo_acao} Registrada - {student['name']}", 
                f"{student['name']} registrou {tipo_acao.lower()} na {turnstile_name} às {time_str}.",
                access_type
            ))

        conn.commit()

        # Recalcula frequência acumulada para exibir na tela da catraca
        freq_stats = conn.execute("""
        SELECT 
            SUM(CASE WHEN status IN ('present', 'late') THEN 1 ELSE 0 END) as presences,
            COUNT(*) as total
        FROM attendance_records WHERE student_id = ?
        """, (student['id'],)).fetchone()
        tot = freq_stats['total'] or 1
        rate = round(((freq_stats['presences'] or 1) / tot * 100), 1)

        conn.close()
        return jsonify({
            'status': 'granted',
            'person_name': student['name'],
            'registration_number': student['registration_number'],
            'class_name': student['class_name'],
            'user_type': 'student',
            'access_type': access_type,
            'time': time_str,
            'avatar_url': student['avatar_url'],
            'attendance_rate': rate,
            'message': f'CATRACA LIBERADA! Seja bem-vindo(a), {student["name"]}!',
            'voice_alert': f'Catraca liberada. Bom dia, {student["name"]}. Presença registrada com sucesso.'
        })

    # 4. Se o usuário for FUNCIONÁRIO (Professor, Coordenação, Direção - Sprint 9)
    if subject_type in ['staff', 'teacher', 'coordinator', 'director']:
        user = conn.execute("SELECT * FROM users WHERE id = ?", (subject_id,)).fetchone()
        if not user:
            conn.close()
            return jsonify({'status': 'denied', 'reason': 'not_found', 'message': 'Funcionário não encontrado'}), 404

        if user['status'] != 'active':
            conn.execute("""
            INSERT INTO access_logs (institution_id, turnstile_id, user_type, user_id, person_name, access_type, status, denial_reason, confidence)
            VALUES (?, ?, ?, ?, ?, ?, 'denied', 'unapproved_staff', 0.98)
            """, (inst_id, turnstile_id, user['role'], user['id'], user['name'], access_type))
            conn.commit()
            conn.close()
            return jsonify({
                'status': 'denied',
                'reason': 'not_approved',
                'message': 'CATRACA BLOQUEADA: Cadastro institucional aguardando liberação do administrador.'
            }), 403

        # FUNCIONÁRIO AUTORIZADO -> CATRACA LIBERADA + REGISTRA PONTO / PRESENÇA DE FUNCIONÁRIO
        conn.execute("""
        INSERT INTO access_logs (institution_id, turnstile_id, user_type, user_id, person_name, access_type, status, confidence)
        VALUES (?, ?, ?, ?, ?, ?, 'granted', 0.99)
        """, (inst_id, turnstile_id, user['role'], user['id'], user['name'], access_type))

        # Registra na tabela de frequência de funcionários (Sprint 9)
        emp_att = conn.execute("SELECT * FROM employee_attendance WHERE user_id = ? AND date = ?", (user['id'], today_str)).fetchone()
        if not emp_att:
            conn.execute("""
            INSERT INTO employee_attendance (user_id, date, entry_time, turnstile_id)
            VALUES (?, ?, ?, ?)
            """, (user['id'], today_str, time_str, turnstile_id))
        else:
            if access_type == 'exit':
                conn.execute("""
                UPDATE employee_attendance SET exit_time = ? WHERE id = ?
                """, (time_str, emp_att['id']))

        conn.commit()
        conn.close()

        cargo_nomes = {
            'teacher': 'Professor(a)',
            'coordinator': 'Coordenação Pedagógica',
            'director': 'Direção Escolar',
            'admin': 'Administrador do Sistema',
            'staff': 'Funcionário(a) Autorizado(a)'
        }
        cargo = cargo_nomes.get(user['role'], user['role'])

        return jsonify({
            'status': 'granted',
            'person_name': user['name'],
            'role': user['role'],
            'role_label': cargo,
            'user_type': user['role'],
            'access_type': access_type,
            'time': time_str,
            'avatar_url': user['avatar_url'] or 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
            'message': f'CATRACA LIBERADA! Presença institucional registrada para {user["name"]}.',
            'voice_alert': f'Catraca liberada. Bem-vindo, {cargo} {user["name"]}. Ponto registrado.'
        })

    conn.close()
    return jsonify({'error': 'Tipo de entidade desconhecida'}), 400

@app.route('/api/access-logs', methods=['GET'])
def get_access_logs():
    """Retorna logs recentes da catraca em tempo real."""
    limit = int(request.args.get('limit', 20))
    conn = get_db()
    logs = conn.execute("""
    SELECT al.*, t.name as turnstile_name 
    FROM access_logs al
    LEFT JOIN turnstiles t ON al.turnstile_id = t.id
    ORDER BY al.timestamp DESC LIMIT ?
    """, (limit,)).fetchall()
    conn.close()
    return jsonify({'logs': dict_list_from_rows(logs)})

# ============================================================
# SPRINT 6: FREQUÊNCIA, FALTAS E HISTÓRICOS
# ============================================================
@app.route('/api/attendance/student/<int:student_id>', methods=['GET'])
def get_student_attendance(student_id):
    """
    Retorna frequência calculada por período (Sprint 6):
    Presenças, faltas, atrasos, percentual de frequência, histórico detalhado.
    Suporta filtros: 'all', 'today', 'week', 'month', '1_bimestre', '2_bimestre', 'year'.
    """
    period_filter = request.args.get('period', 'all')
    conn = get_db()

    student = conn.execute("SELECT * FROM students WHERE id = ?", (student_id,)).fetchone()
    if not student:
        conn.close()
        return jsonify({'error': 'Aluno não encontrado'}), 404

    query = "SELECT * FROM attendance_records WHERE student_id = ?"
    params = [student_id]

    today = date.today()
    if period_filter == 'today':
        query += " AND date = ?"
        params.append(today.strftime("%Y-%m-%d"))
    elif period_filter == 'week':
        week_ago = (today - timedelta(days=7)).strftime("%Y-%m-%d")
        query += " AND date >= ?"
        params.append(week_ago)
    elif period_filter == 'month':
        month_ago = (today - timedelta(days=30)).strftime("%Y-%m-%d")
        query += " AND date >= ?"
        params.append(month_ago)

    query += " ORDER BY date DESC"
    records = conn.execute(query, params).fetchall()

    presences = sum(1 for r in records if r['status'] in ('present', 'late'))
    absences = sum(1 for r in records if r['status'] == 'absent')
    lates = sum(1 for r in records if r['status'] == 'late')
    total = presences + absences

    expected_classes = student['total_classes_expected'] or 100
    rate = round((presences / total * 100), 1) if total > 0 else 100.0
    absence_rate = round((absences / total * 100), 1) if total > 0 else 0.0

    conn.close()
    return jsonify({
        'student_id': student_id,
        'student_name': student['name'],
        'registration': student['registration_number'],
        'class_name': student['class_name'],
        'summary': {
            'total_classes_scheduled': expected_classes,
            'total_recorded_days': total,
            'present_days': presences,
            'absent_days': absences,
            'late_days': lates,
            'attendance_percentage': rate,
            'absence_percentage': absence_rate
        },
        'records': dict_list_from_rows(records)
    })

@app.route('/api/attendance/classes/<int:class_id>', methods=['GET'])
def get_class_attendance(class_id):
    """Visão de frequência da turma para Professores e Coordenação."""
    conn = get_db()
    students = conn.execute("SELECT * FROM students WHERE class_id = ? ORDER BY name ASC", (class_id,)).fetchall()
    
    result = []
    for s in students:
        stats = conn.execute("""
        SELECT 
            SUM(CASE WHEN status IN ('present', 'late') THEN 1 ELSE 0 END) as pres,
            SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absn,
            COUNT(*) as tot
        FROM attendance_records WHERE student_id = ?
        """, (s['id'],)).fetchone()

        tot = stats['tot'] or 0
        pres = stats['pres'] or 0
        rate = round((pres / tot * 100), 1) if tot > 0 else 100.0

        item = dict(s)
        item['present_days'] = pres
        item['absent_days'] = stats['absn'] or 0
        item['attendance_rate'] = rate
        result.append(item)

    conn.close()
    return jsonify({'students': result})

@app.route('/api/attendance/mark-manual', methods=['POST'])
def mark_attendance_manual():
    """Permite ao Professor registrar presença/falta em sala (Sprint 6 & 9)."""
    data = request.get_json() or {}
    student_id = data.get('student_id')
    status = data.get('status', 'present') # 'present', 'absent', 'late'
    date_str = data.get('date', date.today().strftime("%Y-%m-%d"))
    teacher_name = data.get('teacher_name', 'Professor')
    notes = data.get('notes', 'Chamada em sala de aula')

    if not student_id:
        return jsonify({'error': 'ID do aluno é obrigatório'}), 400

    conn = get_db()
    existing = conn.execute("SELECT id FROM attendance_records WHERE student_id = ? AND date = ?", (student_id, date_str)).fetchone()
    if existing:
        conn.execute("""
        UPDATE attendance_records SET status = ?, recorded_by = 'teacher_manual', notes = ?
        WHERE id = ?
        """, (status, notes, existing['id']))
    else:
        conn.execute("""
        INSERT INTO attendance_records (student_id, date, period, status, recorded_by, notes)
        VALUES (?, ?, '1_semestre', ?, 'teacher_manual', ?)
        """, (student_id, date_str, status, notes))

    conn.commit()
    log_audit(None, teacher_name, 'CHAMADA_MANUAL', f"Registro manual ({status}) para o aluno ID {student_id} na data {date_str}")
    conn.close()

    return jsonify({'success': True, 'message': 'Frequência atualizada com sucesso!'})

# ============================================================
# SPRINT 7: ÁREA DOS PAIS E RESPONSÁVEIS
# ============================================================
@app.route('/api/parent/dashboard/<int:parent_id>', methods=['GET'])
def get_parent_dashboard(parent_id):
    """Dados consolidados para a tela inicial do Responsável."""
    conn = get_db()
    parent = conn.execute("SELECT id, name, email, phone, cpf FROM users WHERE id = ?", (parent_id,)).fetchone()
    if not parent:
        conn.close()
        return jsonify({'error': 'Responsável não encontrado'}), 404

    # Busca dependentes aprovados
    dependents = conn.execute("""
    SELECT s.*, psr.relationship_type 
    FROM parent_student_relations psr
    JOIN students s ON psr.student_id = s.id
    WHERE psr.parent_id = ? AND psr.status = 'approved'
    """, (parent_id,)).fetchall()

    dep_list = []
    for d in dependents:
        item = dict(d)
        sid = item['id']
        # Resumo de frequência
        stats = conn.execute("""
        SELECT 
            SUM(CASE WHEN status IN ('present', 'late') THEN 1 ELSE 0 END) as presences,
            SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absences,
            COUNT(*) as total
        FROM attendance_records WHERE student_id = ?
        """, (sid,)).fetchone()
        tot = stats['total'] or 0
        pres = stats['presences'] or 0
        absn = stats['absences'] or 0
        item['metrics'] = {
            'presences': pres,
            'absences': absn,
            'percentage': round((pres / tot * 100), 1) if tot > 0 else 100.0,
            'absence_percentage': round((absn / tot * 100), 1) if tot > 0 else 0.0
        }
        # Último registro na catraca
        last_acc = conn.execute("""
        SELECT al.*, t.name as turnstile_name 
        FROM access_logs al
        LEFT JOIN turnstiles t ON al.turnstile_id = t.id
        WHERE al.student_id = ? ORDER BY al.timestamp DESC LIMIT 1
        """, (sid,)).fetchone()
        item['last_access'] = dict(last_acc) if last_acc else None

        dep_list.append(item)

    # Notificações recentes
    notifs = conn.execute("""
    SELECT n.*, s.name as student_name 
    FROM notifications n
    LEFT JOIN students s ON n.student_id = s.id
    WHERE n.user_id = ?
    ORDER BY n.created_at DESC LIMIT 10
    """, (parent_id,)).fetchall()

    conn.close()
    return jsonify({
        'parent': dict(parent),
        'dependents': dep_list,
        'notifications': dict_list_from_rows(notifs)
    })

@app.route('/api/notifications/<int:user_id>', methods=['GET'])
def get_user_notifications(user_id):
    """Lista notificações e alertas de um usuário."""
    conn = get_db()
    rows = conn.execute("""
    SELECT n.*, s.name as student_name 
    FROM notifications n
    LEFT JOIN students s ON n.student_id = s.id
    WHERE n.user_id = ?
    ORDER BY n.created_at DESC LIMIT 30
    """, (user_id,)).fetchall()
    conn.close()
    return jsonify({'notifications': dict_list_from_rows(rows)})

# ============================================================
# SPRINT 8 & 9: GESTÃO INSTITUCIONAL, APROVAÇÃO E PROFESSORES
# ============================================================
@app.route('/api/institution/pending-staff', methods=['GET'])
def get_pending_staff():
    """Lista funcionários aguardando aprovação administrativa (Sprint 8)."""
    conn = get_db()
    rows = conn.execute("""
    SELECT id, name, email, cpf, phone, role, status, created_at
    FROM users 
    WHERE status = 'pending_approval'
    ORDER BY created_at DESC
    """).fetchall()
    conn.close()
    return jsonify({'pending_staff': dict_list_from_rows(rows)})

@app.route('/api/institution/approve-staff/<int:user_id>', methods=['POST'])
def approve_staff(user_id):
    """Administrador aprova o cadastro de um funcionário."""
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    if not user:
        conn.close()
        return jsonify({'error': 'Usuário não encontrado'}), 404

    conn.execute("UPDATE users SET status = 'active' WHERE id = ?", (user_id,))
    conn.commit()

    log_audit(user_id, user['name'], 'APROVACAO_FUNCIONARIO', f"Conta do funcionário ({user['role']}) aprovada pela administração.")
    conn.close()
    return jsonify({'success': True, 'message': f"Acesso de {user['name']} aprovado com sucesso!"})

@app.route('/api/institution/reject-staff/<int:user_id>', methods=['POST'])
def reject_staff(user_id):
    """Administrador recusa a solicitação de um funcionário."""
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    if not user:
        conn.close()
        return jsonify({'error': 'Usuário não encontrado'}), 404

    conn.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()

    log_audit(user_id, user['name'], 'RECUSA_FUNCIONARIO', f"Solicitação do funcionário recusada.")
    conn.close()
    return jsonify({'success': True, 'message': f"Solicitação recusada e removida com sucesso."})

@app.route('/api/institution/staff', methods=['GET'])
def list_institution_staff():
    """Lista todos os funcionários cadastrados da instituição."""
    conn = get_db()
    rows = conn.execute("""
    SELECT id, name, email, cpf, phone, role, status, avatar_url, created_at
    FROM users 
    WHERE role IN ('admin', 'director', 'coordinator', 'teacher', 'staff')
    ORDER BY role ASC, name ASC
    """).fetchall()

    # Busca registros de presença hoje para cada funcionário
    today_str = date.today().strftime("%Y-%m-%d")
    staff_list = []
    for r in rows:
        item = dict(r)
        att = conn.execute("""
        SELECT * FROM employee_attendance WHERE user_id = ? AND date = ?
        """, (item['id'], today_str)).fetchone()
        item['today_attendance'] = dict(att) if att else None
        staff_list.append(item)

    conn.close()
    return jsonify({'staff': staff_list})

@app.route('/api/teacher/classes/<int:teacher_id>', methods=['GET'])
def get_teacher_classes(teacher_id):
    """Lista as turmas e matérias atribuídas a um professor."""
    conn = get_db()
    rows = conn.execute("""
    SELECT c.*, tc.subject 
    FROM teacher_classes tc
    JOIN classes c ON tc.class_id = c.id
    WHERE tc.teacher_id = ?
    """, (teacher_id,)).fetchall()
    
    classes_list = []
    for r in rows:
        item = dict(r)
        # Conta alunos na turma
        cnt = conn.execute("SELECT COUNT(*) FROM students WHERE class_id = ?", (item['id'],)).fetchone()[0]
        item['students_count'] = cnt
        classes_list.append(item)

    conn.close()
    return jsonify({'classes': classes_list})

# ============================================================
# SPRINT 10: DASHBOARD GERAL, SEGURANÇA E AUDITORIA
# ============================================================
@app.route('/api/admin/dashboard-stats', methods=['GET'])
def get_admin_dashboard_stats():
    """Dados consolidados para a visão administrativa da Direção (Sprint 10)."""
    conn = get_db()
    today_str = date.today().strftime("%Y-%m-%d")

    total_students = conn.execute("SELECT COUNT(*) FROM students").fetchone()[0]
    
    # Alunos presentes hoje (que passaram pela catraca ou têm registro present/late)
    students_present = conn.execute("""
    SELECT COUNT(DISTINCT student_id) FROM attendance_records 
    WHERE date = ? AND status IN ('present', 'late')
    """, (today_str,)).fetchone()[0]
    
    students_absent = max(0, total_students - students_present)

    # Funcionários presentes hoje
    teachers_present = conn.execute("""
    SELECT COUNT(DISTINCT ea.user_id) 
    FROM employee_attendance ea
    JOIN users u ON ea.user_id = u.id
    WHERE ea.date = ? AND u.role = 'teacher'
    """, (today_str,)).fetchone()[0]

    coords_present = conn.execute("""
    SELECT COUNT(DISTINCT ea.user_id) 
    FROM employee_attendance ea
    JOIN users u ON ea.user_id = u.id
    WHERE ea.date = ? AND u.role = 'coordinator'
    """, (today_str,)).fetchone()[0]

    # Total de acessos na catraca hoje
    total_entries_today = conn.execute("""
    SELECT COUNT(*) FROM access_logs 
    WHERE timestamp >= date('now', 'start of day') AND access_type = 'entry' AND status = 'granted'
    """).fetchone()[0]

    total_exits_today = conn.execute("""
    SELECT COUNT(*) FROM access_logs 
    WHERE timestamp >= date('now', 'start of day') AND access_type = 'exit' AND status = 'granted'
    """).fetchone()[0]

    denied_today = conn.execute("""
    SELECT COUNT(*) FROM access_logs 
    WHERE timestamp >= date('now', 'start of day') AND status = 'denied'
    """).fetchone()[0]

    pending_approvals = conn.execute("SELECT COUNT(*) FROM users WHERE status = 'pending_approval'").fetchone()[0]

    conn.close()
    return jsonify({
        'students': {
            'total': total_students,
            'present_today': students_present,
            'absent_today': students_absent,
            'attendance_rate_today': round((students_present / total_students * 100), 1) if total_students > 0 else 0
        },
        'staff_present': {
            'teachers': teachers_present,
            'coordinators': coords_present
        },
        'turnstiles_activity': {
            'entries_today': total_entries_today,
            'exits_today': total_exits_today,
            'denied_today': denied_today,
            'active_turnstiles': 4
        },
        'pending_approvals': pending_approvals
    })

@app.route('/api/admin/toggle-user-status', methods=['POST'])
def toggle_user_status():
    """Bloqueia ou desbloqueia um usuário ou aluno imediatamente (Sprint 10)."""
    data = request.get_json() or {}
    target_type = data.get('target_type', 'user') # 'user' ou 'student'
    target_id = data.get('target_id')
    new_status = data.get('new_status', 'active') # 'active' ou 'blocked'

    conn = get_db()
    if target_type == 'student':
        conn.execute("UPDATE students SET status = ? WHERE id = ?", (new_status, target_id))
    else:
        conn.execute("UPDATE users SET status = ? WHERE id = ?", (new_status, target_id))

    conn.commit()
    log_audit(None, 'Administrador', f'STATUS_{target_type.upper()}_ALTERADO', f"Entidade ID {target_id} alterada para {new_status}")
    conn.close()

    return jsonify({'success': True, 'new_status': new_status})

@app.route('/api/admin/audit-logs', methods=['GET'])
def get_audit_logs():
    """Logs de auditoria e segurança para compliance."""
    conn = get_db()
    rows = conn.execute("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50").fetchall()
    conn.close()
    return jsonify({'logs': dict_list_from_rows(rows)})

@app.route('/api/classes', methods=['GET'])
def get_classes():
    """Lista todas as turmas cadastradas."""
    conn = get_db()
    rows = conn.execute("SELECT * FROM classes ORDER BY name ASC").fetchall()
    conn.close()
    return jsonify({'classes': dict_list_from_rows(rows)})

if __name__ == '__main__':
    print("Iniciando VisionPass Backend Server na porta 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
