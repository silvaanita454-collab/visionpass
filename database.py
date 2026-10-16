"""
VisionPass - Banco de Dados SQLite e Modelos
Gerenciamento de tabelas, migrações e seed data inicial completo para os Sprints 1 a 10.
"""

import sqlite3
import hashlib
import json
import os
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), "visionpass.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def hash_password(password: str) -> str:
    """Hash SHA-256 com salt fixo para segurança determinística."""
    salt = "visionpass_secure_salt_2026"
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

def validate_cpf(cpf: str) -> bool:
    """Valida CPF com algoritmo oficial dos dois dígitos verificadores."""
    digits = [int(c) for c in cpf if c.isdigit()]
    if len(digits) != 11:
        return False
    # CPFs com todos dígitos repetidos são inválidos
    if len(set(digits)) == 1:
        return False
    
    # 1º dígito verificador
    soma = sum(a * b for a, b in zip(digits[:9], range(10, 1, -1)))
    resto = (soma * 10) % 11
    d1 = 0 if resto == 10 else resto
    if digits[9] != d1:
        return False
        
    # 2º dígito verificador
    soma = sum(a * b for a, b in zip(digits[:10], range(11, 1, -1)))
    resto = (soma * 10) % 11
    d2 = 0 if resto == 10 else resto
    return digits[10] == d2

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # 1. Instituições
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS institutions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        code TEXT UNIQUE NOT NULL,
        cnpj TEXT,
        address TEXT,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # 2. Usuários (Admin, Direção, Coordenação, Professor, Responsável, Funcionário)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        institution_id INTEGER,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        cpf TEXT UNIQUE,
        phone TEXT,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL, -- 'admin', 'director', 'coordinator', 'teacher', 'parent', 'staff'
        status TEXT DEFAULT 'active', -- 'pending_approval', 'active', 'blocked'
        email_verified INTEGER DEFAULT 1,
        avatar_url TEXT,
        face_descriptor TEXT, -- JSON com características faciais / landmarks
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (institution_id) REFERENCES institutions(id)
    )
    """)

    # 3. Turmas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        institution_id INTEGER NOT NULL,
        name TEXT NOT NULL, -- ex: '1º Ano A', '2º Ano B', '3º Ano Terceirão'
        year_level TEXT NOT NULL,
        shift TEXT DEFAULT 'Manhã', -- 'Manhã', 'Tarde', 'Integral'
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (institution_id) REFERENCES institutions(id)
    )
    """)

    # 4. Alunos / Contas Kid (Sprint 2)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        institution_id INTEGER NOT NULL,
        class_id INTEGER,
        class_name TEXT NOT NULL,
        name TEXT NOT NULL,
        registration_number TEXT UNIQUE NOT NULL, -- Matrícula
        birth_date TEXT NOT NULL,
        password_hash TEXT, -- Para login próprio do aluno na Conta Kid
        status TEXT DEFAULT 'active', -- 'active', 'blocked', 'transferred'
        avatar_url TEXT,
        face_descriptor TEXT, -- JSON da biometria facial
        face_registered_at TIMESTAMP,
        total_classes_expected INTEGER DEFAULT 100,
        contact_emergency TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (institution_id) REFERENCES institutions(id),
        FOREIGN KEY (class_id) REFERENCES classes(id)
    )
    """)

    # 5. Vínculo Responsável <-> Aluno (Sprint 4)
    # Permite 1 responsável ter N alunos e 1 aluno ter N responsáveis
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS parent_student_relations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_id INTEGER NOT NULL,
        student_id INTEGER NOT NULL,
        relationship_type TEXT NOT NULL, -- 'Pai', 'Mãe', 'Tutor Legal', 'Responsável Financeiro'
        status TEXT DEFAULT 'approved', -- 'pending', 'approved', 'rejected'
        requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved_at TIMESTAMP,
        approved_by INTEGER,
        FOREIGN KEY (parent_id) REFERENCES users(id),
        FOREIGN KEY (student_id) REFERENCES students(id),
        UNIQUE(parent_id, student_id)
    )
    """)

    # 6. Catracas (Sprint 5)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS turnstiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        institution_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        direction TEXT DEFAULT 'bidirectional', -- 'entry', 'exit', 'bidirectional'
        status TEXT DEFAULT 'online', -- 'online', 'offline', 'maintenance'
        ip_address TEXT,
        liveness_enabled INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (institution_id) REFERENCES institutions(id)
    )
    """)

    # 7. Registros de Acesso da Catraca (Entrada / Saída / Tentativa)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS access_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        institution_id INTEGER NOT NULL,
        turnstile_id INTEGER,
        user_type TEXT NOT NULL, -- 'student', 'teacher', 'coordinator', 'director', 'staff', 'unknown'
        student_id INTEGER,
        user_id INTEGER, -- Para funcionários
        person_name TEXT NOT NULL,
        access_type TEXT NOT NULL, -- 'entry', 'exit'
        status TEXT NOT NULL, -- 'granted', 'denied'
        denial_reason TEXT, -- 'not_recognized', 'blocked', 'unauthorized', 'liveness_failed'
        confidence REAL DEFAULT 0.98,
        photo_snapshot TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (institution_id) REFERENCES institutions(id),
        FOREIGN KEY (turnstile_id) REFERENCES turnstiles(id),
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
    """)

    # 8. Histórico de Presença e Frequência do Aluno (Sprint 6)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS attendance_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        date TEXT NOT NULL, -- 'YYYY-MM-DD'
        period TEXT NOT NULL, -- '1_bimestre', '2_bimestre', etc.
        status TEXT NOT NULL, -- 'present', 'absent', 'late'
        entry_time TEXT,
        exit_time TEXT,
        turnstile_id INTEGER,
        recorded_by TEXT DEFAULT 'turnstile', -- 'turnstile', 'teacher_manual'
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (turnstile_id) REFERENCES turnstiles(id),
        UNIQUE(student_id, date)
    )
    """)

    # 9. Presença de Funcionários / Professores / Coordenação (Sprint 9)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS employee_attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL, -- 'YYYY-MM-DD'
        entry_time TEXT,
        exit_time TEXT,
        status TEXT DEFAULT 'present',
        turnstile_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (turnstile_id) REFERENCES turnstiles(id),
        UNIQUE(user_id, date)
    )
    """)

    # 10. Professores e suas Turmas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS teacher_classes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL,
        class_id INTEGER NOT NULL,
        subject TEXT NOT NULL,
        FOREIGN KEY (teacher_id) REFERENCES users(id),
        FOREIGN KEY (class_id) REFERENCES classes(id),
        UNIQUE(teacher_id, class_id, subject)
    )
    """)

    # 11. Notificações aos Pais / Usuários (Sprint 7)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        student_id INTEGER,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT NOT NULL, -- 'entry', 'exit', 'absence', 'late', 'access_denied', 'system'
        is_read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
    """)

    # 12. Logs de Auditoria do Sistema (Sprint 10)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        user_name TEXT,
        action TEXT NOT NULL,
        details TEXT,
        ip_address TEXT DEFAULT '127.0.0.1',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

def seed_data():
    """Popula o banco com uma escola completa e registros de teste para todos os perfis."""
    conn = get_db()
    cursor = conn.cursor()

    # Verifica se já foi populado
    cursor.execute("SELECT COUNT(*) FROM institutions")
    if cursor.fetchone()[0] > 0:
        conn.close()
        return

    # 1. Cria Instituição
    cursor.execute("""
    INSERT INTO institutions (name, code, cnpj, address, status)
    VALUES ('Colégio Inovação & Tecnologia VisionPass', 'ESC-2026-SP', '12.345.678/0001-90', 'Av. Paulista, 1500 - São Paulo, SP', 'active')
    """)
    inst_id = cursor.lastrowid

    # 2. Cria Turmas
    classes_data = [
        ('1º Ano Médio A', '1º EM', 'Manhã'),
        ('2º Ano Médio B', '2º EM', 'Manhã'),
        ('3º Ano Médio Terceirão', '3º EM', 'Manhã'),
        ('9º Ano Fundamental', '9º EF', 'Tarde')
    ]
    class_ids = {}
    for c_name, year, shift in classes_data:
        cursor.execute("INSERT INTO classes (institution_id, name, year_level, shift) VALUES (?, ?, ?, ?)",
                       (inst_id, c_name, year, shift))
        class_ids[c_name] = cursor.lastrowid

    # 3. Cria Usuários de Diversos Perfis (Sprint 1, 8, 9)
    # Senha padrão de teste: '123456'
    pwd_hash = hash_password("123456")

    # 3.1 Administrador / Diretor
    users_to_insert = [
        # (name, email, cpf, phone, role, status)
        ('Dr. Roberto Albuquerque', 'admin@visionpass.com', '11144477735', '(11) 98888-0001', 'admin', 'active'),
        ('Profa. Helena Bittencourt', 'diretoria@visionpass.com', '52998224725', '(11) 98888-0002', 'director', 'active'),
        ('Mariana Vasconcelos', 'coord@visionpass.com', '78912345600', '(11) 98888-0003', 'coordinator', 'active'),
        ('Prof. Carlos Mendes (Matemática)', 'prof.carlos@visionpass.com', '98765432100', '(11) 98888-0004', 'teacher', 'active'),
        ('Profa. Beatriz Lima (Física)', 'prof.beatriz@visionpass.com', '45678912300', '(11) 98888-0005', 'teacher', 'active'),
        ('Prof. Ricardo Rocha (Novo - Pendente)', 'prof.novo@visionpass.com', '33344455566', '(11) 98888-0006', 'teacher', 'pending_approval'),
        # Responsáveis (Sprint 3)
        ('Carlos Eduardo Silva (Pai do João)', 'pai.joao@gmail.com', '01234567890', '(11) 97777-1111', 'parent', 'active'),
        ('Ana Paula Silva (Mãe do João)', 'mae.joao@gmail.com', '09876543211', '(11) 97777-2222', 'parent', 'active'),
        ('Marcos Silveira (Pai da Sofia e Lucas)', 'marcos.silveira@uol.com.br', '23456789012', '(11) 97777-3333', 'parent', 'active'),
    ]

    user_ids = {}
    for name, email, cpf, phone, role, status in users_to_insert:
        cursor.execute("""
        INSERT INTO users (institution_id, name, email, cpf, phone, password_hash, role, status, email_verified)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
        """, (inst_id, name, email, cpf, phone, pwd_hash, role, status))
        user_ids[email] = cursor.lastrowid

    # 4. Associa Professores às Turmas
    prof_carlos_id = user_ids['prof.carlos@visionpass.com']
    prof_beatriz_id = user_ids['prof.beatriz@visionpass.com']
    cursor.execute("INSERT INTO teacher_classes (teacher_id, class_id, subject) VALUES (?, ?, ?)",
                   (prof_carlos_id, class_ids['3º Ano Médio Terceirão'], 'Matemática Avançada'))
    cursor.execute("INSERT INTO teacher_classes (teacher_id, class_id, subject) VALUES (?, ?, ?)",
                   (prof_carlos_id, class_ids['1º Ano Médio A'], 'Matemática Básica'))
    cursor.execute("INSERT INTO teacher_classes (teacher_id, class_id, subject) VALUES (?, ?, ?)",
                   (prof_beatriz_id, class_ids['2º Ano Médio B'], 'Física Quântica e Óptica'))

    # 5. Cria Alunos / Contas Kid (Sprint 2)
    students_data = [
        # (name, reg, birth, class_name, avatar_url)
        ('João Pedro Silva', 'MAT-2026-001', '2008-04-15', '3º Ano Médio Terceirão', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop'),
        ('Sofia Silveira', 'MAT-2026-002', '2009-08-20', '2º Ano Médio B', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop'),
        ('Lucas Silveira', 'MAT-2026-003', '2011-12-05', '9º Ano Fundamental', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'),
        ('Isabela Santos', 'MAT-2026-004', '2008-11-10', '3º Ano Médio Terceirão', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'),
        ('Gabriel Oliveira (Bloqueado)', 'MAT-2026-005', '2007-06-30', '3º Ano Médio Terceirão', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'),
    ]

    student_ids = {}
    for name, reg, birth, c_name, av in students_data:
        status = 'blocked' if 'Bloqueado' in name else 'active'
        cid = class_ids.get(c_name)
        # Face descriptor simulado (vetor de 128 valores em json)
        face_desc = json.dumps([round(0.12 + (i * 0.007) % 0.85, 4) for i in range(128)])
        cursor.execute("""
        INSERT INTO students (institution_id, class_id, class_name, name, registration_number, birth_date, password_hash, status, avatar_url, face_descriptor, face_registered_at, total_classes_expected)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 100)
        """, (inst_id, cid, c_name, name, reg, birth, pwd_hash, status, av, face_desc))
        student_ids[reg] = cursor.lastrowid

    # 6. Cria Vínculos Responsável <-> Aluno (Sprint 4)
    # Regra: João Pedro tem DOIS responsáveis vinculados (Pai Carlos e Mãe Ana Paula)
    # Sofia e Lucas têm Marcos Silveira como responsável
    pai_joao_id = user_ids['pai.joao@gmail.com']
    mae_joao_id = user_ids['mae.joao@gmail.com']
    pai_marcos_id = user_ids['marcos.silveira@uol.com.br']

    joao_id = student_ids['MAT-2026-001']
    sofia_id = student_ids['MAT-2026-002']
    lucas_id = student_ids['MAT-2026-003']

    cursor.execute("""
    INSERT INTO parent_student_relations (parent_id, student_id, relationship_type, status, approved_at)
    VALUES (?, ?, 'Pai', 'approved', CURRENT_TIMESTAMP)
    """, (pai_joao_id, joao_id))

    cursor.execute("""
    INSERT INTO parent_student_relations (parent_id, student_id, relationship_type, status, approved_at)
    VALUES (?, ?, 'Mãe', 'approved', CURRENT_TIMESTAMP)
    """, (mae_joao_id, joao_id))

    cursor.execute("""
    INSERT INTO parent_student_relations (parent_id, student_id, relationship_type, status, approved_at)
    VALUES (?, ?, 'Pai', 'approved', CURRENT_TIMESTAMP)
    """, (pai_marcos_id, sofia_id))

    cursor.execute("""
    INSERT INTO parent_student_relations (parent_id, student_id, relationship_type, status, approved_at)
    VALUES (?, ?, 'Pai', 'approved', CURRENT_TIMESTAMP)
    """, (pai_marcos_id, lucas_id))

    # 7. Cria Catracas (Sprint 5)
    turnstiles_data = [
        ('Catraca 01 - Portaria Principal (Entrada)', 'Entrada Principal - Rua Central', 'entry', '192.168.10.101'),
        ('Catraca 02 - Portaria Principal (Saída)', 'Entrada Principal - Rua Central', 'exit', '192.168.10.102'),
        ('Catraca 03 - Bloco B / Ensino Médio', 'Acesso Bloco B', 'bidirectional', '192.168.10.103'),
        ('Catraca 04 - Acesso Docentes / Coordenação', 'Portaria dos Professores', 'bidirectional', '192.168.10.104'),
    ]
    t_ids = []
    for name, loc, direction, ip in turnstiles_data:
        cursor.execute("""
        INSERT INTO turnstiles (institution_id, name, location, direction, status, ip_address, liveness_enabled)
        VALUES (?, ?, ?, ?, 'online', ?, 1)
        """, (inst_id, name, loc, direction, ip))
        t_ids.append(cursor.lastrowid)

    # 8. Gera Histórico de Presença e Faltas para João Pedro (Sprint 6: João com 92% de presença)
    # 100 dias simulados: 92 presenças, 8 faltas
    today = datetime.now()
    for i in range(100):
        record_date = (today - timedelta(days=100 - i)).strftime("%Y-%m-%d")
        # 8 dias de falta distribuídos
        if i in [12, 23, 37, 51, 64, 78, 85, 93]:
            cursor.execute("""
            INSERT INTO attendance_records (student_id, date, period, status, recorded_by, notes)
            VALUES (?, ?, '1_semestre', 'absent', 'turnstile', 'Ausência registrada por falta de passagem na catraca')
            """, (joao_id, record_date))
        else:
            entry_h = "07:15:32" if i % 7 != 0 else "07:48:10"  # Alguns atrasos
            status = 'late' if i % 7 == 0 else 'present'
            cursor.execute("""
            INSERT INTO attendance_records (student_id, date, period, status, entry_time, exit_time, turnstile_id, recorded_by)
            VALUES (?, ?, '1_semestre', ?, ?, '12:35:40', ?, 'turnstile')
            """, (joao_id, record_date, status, entry_h, t_ids[0]))

    # Gera registros para Sofia (96% de presença)
    for i in range(50):
        record_date = (today - timedelta(days=50 - i)).strftime("%Y-%m-%d")
        if i in [15, 33]:
            cursor.execute("""
            INSERT INTO attendance_records (student_id, date, period, status, recorded_by)
            VALUES (?, ?, '1_semestre', 'absent', 'turnstile')
            """, (sofia_id, record_date))
        else:
            cursor.execute("""
            INSERT INTO attendance_records (student_id, date, period, status, entry_time, exit_time, turnstile_id, recorded_by)
            VALUES (?, ?, '1_semestre', 'present', '07:18:05', '12:40:12', ?, 'turnstile')
            """, (sofia_id, record_date, t_ids[0]))

    # 9. Logs Recentes de Catraca (Hoje)
    recent_logs = [
        (inst_id, t_ids[0], 'student', joao_id, None, 'João Pedro Silva', 'entry', 'granted', None, 0.99, (today - timedelta(hours=3)).strftime("%Y-%m-%d 07:14:22")),
        (inst_id, t_ids[0], 'student', sofia_id, None, 'Sofia Silveira', 'entry', 'granted', None, 0.98, (today - timedelta(hours=3)).strftime("%Y-%m-%d 07:18:05")),
        (inst_id, t_ids[3], 'teacher', None, prof_carlos_id, 'Prof. Carlos Mendes', 'entry', 'granted', None, 0.97, (today - timedelta(hours=3)).strftime("%Y-%m-%d 07:22:15")),
        (inst_id, t_ids[3], 'coordinator', None, user_ids['coord@visionpass.com'], 'Mariana Vasconcelos', 'entry', 'granted', None, 0.99, (today - timedelta(hours=3)).strftime("%Y-%m-%d 07:05:00")),
        (inst_id, t_ids[0], 'student', student_ids['MAT-2026-005'], None, 'Gabriel Oliveira (Bloqueado)', 'entry', 'denied', 'blocked', 0.96, (today - timedelta(hours=2)).strftime("%Y-%m-%d 07:35:10")),
        (inst_id, t_ids[0], 'unknown', None, None, 'Indivíduo Não Reconhecido', 'entry', 'denied', 'not_recognized', 0.42, (today - timedelta(hours=1)).strftime("%Y-%m-%d 08:12:44")),
    ]
    for row in recent_logs:
        cursor.execute("""
        INSERT INTO access_logs (institution_id, turnstile_id, user_type, student_id, user_id, person_name, access_type, status, denial_reason, confidence, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, row)

    # 10. Notificações Iniciais para Pais (Sprint 7)
    notifs = [
        (pai_joao_id, joao_id, 'Entrada Confirmada', 'João Pedro Silva passou pela Catraca 01 às 07:14:22.', 'entry'),
        (mae_joao_id, joao_id, 'Entrada Confirmada', 'João Pedro Silva passou pela Catraca 01 às 07:14:22.', 'entry'),
        (pai_joao_id, joao_id, 'Aviso de Frequência', 'João atingiu 92% de presença no bimestre atual. Parabéns pelo comprometimento!', 'system'),
        (pai_marcos_id, sofia_id, 'Entrada Confirmada', 'Sofia Silveira passou pela Catraca 01 às 07:18:05.', 'entry')
    ]
    for uid, sid, title, msg, ntype in notifs:
        cursor.execute("""
        INSERT INTO notifications (user_id, student_id, title, message, type)
        VALUES (?, ?, ?, ?, ?)
        """, (uid, sid, title, msg, ntype))

    # 11. Logs de Auditoria Iniciais
    cursor.execute("""
    INSERT INTO audit_logs (user_id, user_name, action, details)
    VALUES (?, 'Dr. Roberto Albuquerque', 'SISTEMA_INICIALIZADO', 'Banco de dados inicializado com sucesso e catracas conectadas.')
    """, (user_ids['admin@visionpass.com'],))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    print("Inicializando banco de dados VisionPass...")
    init_db()
    seed_data()
    print("Banco de dados configurado e populado com sucesso!")
