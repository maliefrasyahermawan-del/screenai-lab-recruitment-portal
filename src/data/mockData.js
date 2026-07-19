// ============================================================
// Mock data — Cyber Security division only
// "Division" in the original UI == Cyber Security "tracks" here.
// ============================================================

export const RECRUITMENT = {
  title: 'Recruitment MBC Laboratory 2026/2027',
  phase: 'Evaluation',
  division: 'Cyber Security',
  currentFocus: 'Process verified Cyber Security candidates.',
  pendingEvaluation: 5,
  deadline: '6h 38m left',
}

export const RECRUITER = {
  name: 'Muhammad Alif Rasya Hermawan',
  email: 'maliefrasyahermawan@gmail.com',
  role: 'RECRUITER',
}

// ============================================================
// Accounts — used by the Admin console
// ============================================================
export const ACCOUNT_STATS = {
  total: 121,
  candidates: 115,
  recruiters: 4,
  admins: 2,
  active: 117,
  pending: 4,
  newThisWeek: 12,
}

export const ACCOUNTS_BY_ROLE = [
  { role: 'Candidate', count: 115, tone: 'sky' },
  { role: 'Recruiter', count: 4, tone: 'green' },
  { role: 'Admin', count: 2, tone: 'red' },
]

export const ACCOUNT_TREND = [
  { label: 'Feb', value: 14 },
  { label: 'Mar', value: 21 },
  { label: 'Apr', value: 33 },
  { label: 'May', value: 26 },
  { label: 'Jun', value: 27 },
]

// Focus tracks inside Cyber Security (the "divisions" of this portal)
export const TRACKS = [
  { key: 'redteam', name: 'Red Team / Offensive', applications: 41, evaluated: 38, pending: 3, recommended: 8, threshold: 10 },
  { key: 'blueteam', name: 'Blue Team / SOC', applications: 33, evaluated: 30, pending: 2, recommended: 7, threshold: 10 },
  { key: 'forensics', name: 'Digital Forensics', applications: 19, evaluated: 17, pending: 1, recommended: 4, threshold: 8 },
  { key: 'appsec', name: 'Application Security', applications: 22, evaluated: 20, pending: 2, recommended: 5, threshold: 8 },
]

export const DIVISION_OPTIONS = ['All tracks', ...TRACKS.map((t) => t.name)]
export const STATUS_OPTIONS = ['All statuses (non-draft)', 'Submitted', 'Document Review', 'Correction Requested', 'Verified', 'Evaluated']

export const STATS = {
  totalApplications: 115,
  pendingDocuments: 1,
  pendingEvaluation: 5,
  topScore: 94.6,
  topScoreNote: '9 candidates score in the recommend band',
}

// Aggregate figures per workspace (division-level, not just the visible sample)
export const APPLICATION_STATS = {
  inView: 115,
  inDocumentReview: 1,
  needsCorrection: 6,
  verified: 5,
}

export const CANDIDATE_STATS = {
  scored: 104,
  validated: 98,
  evaluatedInView: 104,
  topScore: 94.6,
}

export const DOC_STATS = {
  inReview: 1,
  correctionRequested: 6,
  verified: 98,
}

export const WORK_QUEUE = [
  { key: 'submitted', label: 'Applications submitted', count: 0, desc: 'New applications ready to enter document review.', icon: 'ClipboardList', tone: 'sky' },
  { key: 'docs', label: 'Documents pending review', count: 1, desc: 'Candidates waiting for document verification.', icon: 'FileText', tone: 'amber' },
  { key: 'correction', label: 'Correction requested', count: 6, desc: 'Candidates still blocked by document corrections.', icon: 'ShieldAlert', tone: 'red' },
  { key: 'ready', label: 'Ready for evaluation', count: 5, desc: 'Verified candidates eligible for evaluation.', icon: 'Sparkles', tone: 'green' },
  { key: 'pending', label: 'Pending evaluation', count: 5, desc: 'Verified candidates without evaluation scores.', icon: 'RefreshCw', tone: 'amber' },
  { key: 'announce', label: 'Ready for announcement', count: 104, desc: 'Evaluated candidates available for pass/fail publishing.', icon: 'Megaphone', tone: 'sky' },
]

const firstNames = ['Arya', 'Nadia', 'Rizky', 'Salsabila', 'Fajar', 'Kirana', 'Bagas', 'Zahra', 'Dimas', 'Aisyah', 'Reza', 'Putri', 'Yoga', 'Maura', 'Ilham', 'Gita', 'Hafiz', 'Nabila', 'Rendra', 'Tiara', 'Fikri', 'Salma', 'Alif', 'Kayla', 'Damar', 'Sekar', 'Fauzan', 'Anindya', 'Bimo', 'Larasati']
const lastNames = ['Pratama', 'Wijaya', 'Ramadhan', 'Anggraini', 'Nugroho', 'Maheswari', 'Saputra', 'Kusuma', 'Hidayat', 'Permata', 'Firmansyah', 'Lestari', 'Santoso', 'Andini', 'Setiawan', 'Cahyani', 'Ardiansyah', 'Puspita', 'Wibowo', 'Rahmawati', 'Hakim', 'Oktaviani', 'Nurhadi', 'Safitri', 'Prasetyo', 'Wulandari', 'Gunawan', 'Maharani', 'Kurniawan', 'Herlambang']
const tracks = ['Red Team / Offensive', 'Blue Team / SOC', 'Digital Forensics', 'Application Security']
const avatarColors = ['#b91c1c', '#dc2626', '#991b1b', '#ef4444', '#7f1d1d', '#c2410c', '#be123c']
const domains = ['student.telkomuniversity.ac.id', 'gmail.com', 'student.ac.id']

function pseudo(seed) { const x = Math.sin(seed) * 10000; return x - Math.floor(x) }

// docStatus per candidate: Complete / In Review / Incomplete
function docFor(status) {
  if (status === 'Document Review') return { label: 'In Review', progress: 60, tone: 'amber' }
  if (status === 'Correction Requested') return { label: 'Incomplete', progress: 35, tone: 'red' }
  return { label: 'Complete', progress: 100, tone: 'green' }
}

export const CANDIDATES = Array.from({ length: 32 }).map((_, i) => {
  const first = firstNames[i % firstNames.length]
  const last = lastNames[(i * 7) % lastNames.length]
  const name = `${first} ${last}`
  const track = tracks[i % tracks.length]
  const r = pseudo(i + 1)
  const score = Math.round((62 + r * 32.6) * 10) / 10
  let status
  if (i < 5) status = 'Pending Evaluation'
  else if (i === 5) status = 'Document Review'
  else if (i < 12) status = 'Correction Requested'
  else status = 'Evaluated'
  const isEval = status === 'Evaluated'
  const recommend = isEval && score >= 82
  return {
    id: `CS-${String(1024 + i)}`,
    name,
    email: `${first.toLowerCase()}${last.toLowerCase()}@${domains[i % domains.length]}`,
    nim: `1020124${String(100 + i * 3).padStart(5, '0')}`,
    track,
    status,
    phase: 'Screening',
    score,
    scored: isEval,
    recommend,
    validated: isEval || status === 'Pending Evaluation',
    doc: docFor(status),
    avatar: avatarColors[i % avatarColors.length],
    initials: (first[0] + last[0]).toUpperCase(),
    appliedAt: `2026-06-${String(10 + (i % 18)).padStart(2, '0')}`,
    ipk: (2.9 + r * 1.09).toFixed(2),
    semester: 3 + (i % 5),
  }
})

export const RANKED = [...CANDIDATES]
  .filter((c) => c.status === 'Evaluated')
  .sort((a, b) => b.score - a.score)
  .map((c, i) => ({ ...c, rank: i + 1 }))

// Account list for the Admin console (depends on CANDIDATES above)
const ADMIN_ACCOUNTS = [
  { id: 'ACC-0001', name: 'Muhammad Alif Rasya Hermawan', email: 'maliefrasyahermawan@gmail.com', role: 'Admin', status: 'Active', joined: '2026-01-12' },
  { id: 'ACC-0002', name: 'Akmal Yaasir Fauzaan', email: 'akmalyaasir@mbclaboratory.com', role: 'Admin', status: 'Active', joined: '2026-01-15' },
]
const RECRUITER_ACCOUNTS = [
  { id: 'ACC-0003', name: 'Rayhan Aditya Pratama', email: 'rayhan.aditya@mbclaboratory.com', role: 'Recruiter', status: 'Active', joined: '2026-02-02' },
  { id: 'ACC-0004', name: 'Salsabila Nur Aini', email: 'salsabila.nur@mbclaboratory.com', role: 'Recruiter', status: 'Active', joined: '2026-02-05' },
  { id: 'ACC-0005', name: 'Fadhil Rahman', email: 'fadhil.rahman@mbclaboratory.com', role: 'Recruiter', status: 'Active', joined: '2026-02-11' },
  { id: 'ACC-0006', name: 'Diah Ayu Lestari', email: 'diah.ayu@mbclaboratory.com', role: 'Recruiter', status: 'Pending', joined: '2026-06-30' },
]
const CANDIDATE_ACCOUNTS = CANDIDATES.slice(0, 14).map((c) => ({
  id: c.id, name: c.name, email: c.email, role: 'Candidate',
  status: c.status === 'Correction Requested' ? 'Pending' : 'Active',
  joined: c.appliedAt, division: c.track,
}))
export const ACCOUNTS = [...ADMIN_ACCOUNTS, ...RECRUITER_ACCOUNTS, ...CANDIDATE_ACCOUNTS]

// The ACCOUNTS array above only models a sample of the platform; the rest of the
// 121 total accounts (all candidates, all active) aren't individually listed.
// This lets live stats react to admin role/status changes while keeping the
// platform-wide total fixed.
const ACCOUNTS_BACKGROUND = {
  total: ACCOUNT_STATS.total - ACCOUNTS.length,
  role: { Candidate: ACCOUNT_STATS.total - ACCOUNTS.length, Recruiter: 0, Admin: 0 },
  status: { Active: ACCOUNT_STATS.total - ACCOUNTS.length, Pending: 0, Blocked: 0 },
}

export function computeAccountStats(accounts) {
  const byRole = { Candidate: ACCOUNTS_BACKGROUND.role.Candidate, Recruiter: 0, Admin: 0 }
  const byStatus = { Active: ACCOUNTS_BACKGROUND.status.Active, Pending: 0, Blocked: 0 }
  accounts.forEach((a) => {
    byRole[a.role] = (byRole[a.role] || 0) + 1
    byStatus[a.status] = (byStatus[a.status] || 0) + 1
  })
  return {
    total: ACCOUNT_STATS.total,
    candidates: byRole.Candidate,
    recruiters: byRole.Recruiter,
    admins: byRole.Admin,
    active: byStatus.Active,
    pending: byStatus.Pending,
    blocked: byStatus.Blocked,
    newThisWeek: ACCOUNT_STATS.newThisWeek,
  }
}

export function computeAccountsByRole(accounts) {
  const stats = computeAccountStats(accounts)
  return [
    { role: 'Candidate', count: stats.candidates, tone: 'sky' },
    { role: 'Recruiter', count: stats.recruiters, tone: 'green' },
    { role: 'Admin', count: stats.admins, tone: 'red' },
  ]
}

// Candidates that block evaluation
export const NOT_EVAL_READY = {
  documentReview: CANDIDATES.filter((c) => c.status === 'Document Review').length,
  correction: CANDIDATES.filter((c) => c.status === 'Correction Requested').length,
}

// Pending-evaluation queue (verified, no score yet)
export const PENDING_EVAL = CANDIDATES.filter((c) => c.status === 'Pending Evaluation')

export const EVAL_CRITERIA = [
  { name: 'Technical Skill', weight: 35 },
  { name: 'Practical Experience', weight: 25 },
  { name: 'Problem Solving', weight: 20 },
  { name: 'Communication', weight: 10 },
  { name: 'Motivation & Fit', weight: 10 },
]

export const EVAL_RUNS = TRACKS.map((t) => ({
  track: t.name,
  key: t.key,
  progress: Math.round((t.evaluated / t.applications) * 100),
  evaluated: t.evaluated,
  total: t.applications,
  criteria: EVAL_CRITERIA.map((c, idx) => ({
    ...c,
    avg: Math.round((70 + pseudo(idx + t.applications) * 25) * 10) / 10,
  })),
}))

export const DOCUMENTS = [
  { id: 'CS-1029', candidate: 'Aisyah Permata', track: 'Blue Team / SOC', doc: 'CV / Resume', status: 'Pending', uploaded: '2026-06-28' },
  { id: 'CS-1030', candidate: 'Reza Firmansyah', track: 'Red Team / Offensive', doc: 'Certificate — TryHackMe', status: 'Correction', uploaded: '2026-06-27' },
  { id: 'CS-1031', candidate: 'Putri Lestari', track: 'Digital Forensics', doc: 'Motivation Letter', status: 'Correction', uploaded: '2026-06-27' },
  { id: 'CS-1024', candidate: 'Arya Pratama', track: 'Red Team / Offensive', doc: 'Transcript (KHS)', status: 'Verified', uploaded: '2026-06-21' },
  { id: 'CS-1025', candidate: 'Nadia Wijaya', track: 'Blue Team / SOC', doc: 'Student Card (KTM)', status: 'Verified', uploaded: '2026-06-22' },
  { id: 'CS-1028', candidate: 'Fajar Nugroho', track: 'Application Security', doc: 'CTF Writeup Portfolio', status: 'Verified', uploaded: '2026-06-25' },
]

export const REQUIRED_DOCS = ['CV / Resume', 'Transcript (KHS)', 'Student Card (KTM)', 'Motivation Letter', 'Portfolio / Certificate']

export const ANNOUNCEMENTS = [
  {
    id: 1, type: 'info', title: 'Evaluation phase now open for Cyber Security',
    date: '2026-07-01',
    body: 'AI-assisted evaluation has started for all verified Cyber Security candidates. Rankings update automatically as scores are finalized. Recruiters may review evidence before publishing pass/fail results.',
  },
  {
    id: 2, type: 'pass', title: 'Document verification deadline — reminder',
    date: '2026-06-30',
    body: 'Candidates with a "Correction Requested" status must re-upload the flagged documents before the deadline. Applications with unresolved corrections will not enter the evaluation stage.',
  },
  {
    id: 3, type: 'default', title: 'Technical interview schedule (Red Team & Blue Team)',
    date: '2026-06-27',
    body: 'Shortlisted candidates for the Red Team and Blue Team tracks will receive interview invitations by email. Please confirm your slot within 2×24 hours of receiving the invitation.',
  },
]

export const ANALYTICS = {
  funnel: [
    { label: 'Applied', value: 115 },
    { label: 'Verified', value: 98 },
    { label: 'Evaluated', value: 92 },
    { label: 'Recommended', value: 24 },
    { label: 'Accepted', value: 12 },
  ],
  scoreBands: [
    { label: 'Recommend (85+)', value: 24, color: '#b91c1c' },
    { label: 'Consider (75–84)', value: 41, color: '#ef4444' },
    { label: 'Review (65–74)', value: 21, color: '#f87171' },
    { label: 'Below bar (<65)', value: 6, color: '#fca5a5' },
  ],
}

// ============================================================
// Announcements — pass/fail publish flow
// ============================================================
const _trackCounter = {}
export const READY_TO_ANNOUNCE = RANKED.map((c) => {
  _trackCounter[c.track] = (_trackCounter[c.track] || 0) + 1
  const trackRank = _trackCounter[c.track]
  const aiRecommended = trackRank <= 2 || c.score >= 88
  return {
    ...c,
    trackRank,
    aiRecommended,
    aiValidation: trackRank % 3 === 0 ? 'Pending' : 'Validated',
    defaultDecision: aiRecommended || c.score >= 80 ? 'Pass' : 'Fail',
  }
})

// ============================================================
// Analytics — extended metrics
// ============================================================
export const ACTIVE_PERIOD = {
  name: 'Recruitment MBC Laboratory 2026/2027',
  phase: 'EVALUATION',
  threshold: 10,
  applications: 115,
  submitted: 115,
  averageScore: 80.4,
}

export const ANALYTICS_STATS = {
  totalApplications: 115,
  verified: 5,
  evaluated: 104,
  averageScore: 80.4,
  reviewOrCorrection: 7,
}

export const FUNNEL_COUNTS = [
  { label: 'Draft', value: 0 },
  { label: 'Submitted', value: 0 },
  { label: 'Document Review', value: 1 },
  { label: 'Correction', value: 6 },
  { label: 'Verified', value: 5 },
  { label: 'Screening', value: 104 },
  { label: 'Pass', value: 0 },
  { label: 'Fail', value: 0 },
]

export const DOC_COMPLETENESS = [
  { label: 'Complete', value: 98, tone: 'green' },
  { label: 'In review', value: 1, tone: 'amber' },
  { label: 'Incomplete', value: 6, tone: 'red' },
]

export const MISSING_DOCS = [
  { doc: 'Motivation Letter', count: 4 },
  { doc: 'Certificate / CTF Portfolio', count: 3 },
  { doc: 'Transcript (KHS)', count: 2 },
  { doc: 'Student Card (KTM)', count: 1 },
]

export const SCORE_DISTRIBUTION = {
  scored: 104,
  min: 34.0,
  max: 94.6,
  buckets: [
    { label: '0-20', value: 0 },
    { label: '21-40', value: 2 },
    { label: '41-60', value: 20 },
    { label: '61-80', value: 58 },
    { label: '81-100', value: 24 },
  ],
}

const SCOPE = 115
const pct = (v) => `${((v / SCOPE) * 100).toFixed(1)}% of scope`

export const FACULTY_DIST = [
  { label: 'Fakultas Informatika', value: 58 },
  { label: 'Fakultas Teknik Elektro', value: 34 },
  { label: 'Fakultas Rekayasa Industri', value: 15 },
  { label: 'Fakultas Ilmu Terapan', value: 7 },
  { label: 'Fakultas Ekonomi dan Bisnis', value: 1 },
].map((d) => ({ ...d, sub: pct(d.value) }))

export const MAJOR_DIST = [
  { label: 'S1 Informatika', value: 34 },
  { label: 'S1 Teknik Komputer', value: 26 },
  { label: 'S1 Sistem Informasi', value: 20 },
  { label: 'S1 Teknologi Informasi', value: 18 },
  { label: 'S1 Teknik Telekomunikasi', value: 9 },
  { label: 'S1 Sains Data', value: 6 },
  { label: 'S1 Rekayasa Perangkat Lunak', value: 2 },
].map((d) => ({ ...d, sub: pct(d.value) }))

export const YEAR_DIST = [
  { label: '2025', value: 49 },
  { label: '2024', value: 66 },
].map((d) => ({ ...d, sub: pct(d.value) }))

export const IPK_DIST = [
  { label: '0.00 - 2.49', value: 0 },
  { label: '2.50 - 2.99', value: 4 },
  { label: '3.00 - 3.49', value: 46 },
  { label: '3.50 - 4.00', value: 65 },
  { label: 'Belum Diisi', value: 0 },
].map((d) => ({ ...d, sub: pct(d.value) }))

// ============================================================
// Candidate detail page
// ============================================================
const FACULTIES = ['Fakultas Informatika', 'Fakultas Teknik Elektro', 'Fakultas Rekayasa Industri', 'Fakultas Ilmu Terapan']
const MAJORS = ['S1 Informatika', 'S1 Teknik Komputer', 'S1 Sistem Informasi', 'S1 Teknologi Informasi', 'S1 Rekayasa Perangkat Lunak']

function hashId(id) { let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100000; return h }

// The 5 evaluation dimensions used on the detail page (matches the report layout)
const DETAIL_DIMS = [
  {
    key: 'akademik', name: 'Latar Belakang Akademik', weight: 25, base: 95,
    justification: 'Kandidat memiliki latar belakang akademik yang kuat. Jurusan termasuk bidang STEM yang relevan dengan keamanan siber. IPK melampaui batas minimal 3.0. Telah menyelesaikan mata kuliah inti seperti Jaringan Komputer, Sistem Operasi, Kriptografi, dan Pemrograman — semuanya mendukung fondasi keamanan siber sesuai rubrik.',
    evidence: [
      'Bachelor of Computer Science, relevant STEM major',
      'KEAMANAN JARINGAN / NETWORK SECURITY - 3 SKS - nilai A - 2024/2025 - GANJIL',
      'KRIPTOGRAFI / CRYPTOGRAPHY - 3 SKS - nilai A - 2024/2025 - GENAP',
      'SISTEM OPERASI / OPERATING SYSTEMS - 3 SKS - nilai A - 2024/2025 - GANJIL',
    ],
  },
  {
    key: 'teknis', name: 'Technical Skill Dasar', weight: 25, base: 92,
    justification: 'Kandidat menunjukkan penguasaan teknis yang meyakinkan. Menguasai tooling keamanan seperti Wireshark, Burp Suite, dan Nmap, didukung scripting Python/Bash. Pengalaman hands-on di lab CTF mencakup enumeration, exploitation, dan analisis log. Familiar dengan konsep OWASP Top 10.',
    evidence: [
      'Hard Skills: Python, Bash, Wireshark, Burp Suite, Nmap, Metasploit, Linux, Docker',
      'Menyelesaikan 20+ room di TryHackMe dan 10+ machine di HackTheBox',
      'Memahami OWASP Top 10 dan dasar-dasar network security',
    ],
  },
  {
    key: 'organisasi', name: 'Pengalaman Organisasi', weight: 15, base: 95,
    justification: 'Kandidat memiliki catatan organisasi yang aktif dan jelas. Peran mencakup anggota komunitas keamanan siber kampus, panitia divisi teknis CTF, dan mentor study group. Setiap peran disertai tanggung jawab konkret, menunjukkan partisipasi yang terstruktur dan berdampak.',
    evidence: [
      'Member of Cyber Security Community ... regular CTF training and knowledge sharing',
      'Committee - Capture The Flag 2025, Technical Division ... designed web & pwn challenges',
      'Academic Mentor ... delivering peer tutoring on security fundamentals',
    ],
  },
  {
    key: 'growth', name: 'Growth Mindset', weight: 20, base: 90,
    justification: 'Kandidat menunjukkan pola pikir bertumbuh yang kuat melalui deretan prestasi kompetitif dan pembelajaran mandiri yang konsisten di bidang keamanan siber.',
    evidence: [
      '1st place - National CTF Competition among 40+ teams',
      'Finalist - Cyber Security Bootcamp Hackathon 2025',
      'Holder of eJPT / Security+ learning path (in progress)',
    ],
  },
  {
    key: 'motivasi', name: 'Motivasi & Relevansi', weight: 15, base: 95,
    justification: 'Kandidat menunjukkan keselarasan motivasi yang sangat kuat. Surat motivasi secara eksplisit mengaitkan pengalaman teknis dan lomba dengan keamanan siber, serta menjelaskan keinginan berkontribusi di Divisi Cyber Security MBC Lab.',
    evidence: [
      'Profile Summary: A Computer Science student specializing in offensive & defensive security',
      'Surat motivasi: ... berkomitmen mendalami penetration testing dan incident response di MBC Lab.',
      'English Proficiency Test (EPrT ®) - Score : 580/677',
    ],
  },
]

const DETAIL_DOCS = [
  { label: 'Curriculum Vitae', file: 'CV.pdf', size: '126.8 KB', verified: true },
  { label: 'Motivation Letter', file: 'MOTIVATION_LETTER.pdf', size: '83.9 KB', verified: true },
  { label: 'KHS / Transcript', file: 'KHS.pdf', size: '226.3 KB', verified: true },
  { label: 'KTM / Student ID', file: 'KTM.jpg', size: '80.4 KB', verified: true },
  { label: 'SWOT Analysis', file: 'SWOT_ANALYSIS.pdf', size: '84.3 KB', verified: true },
  { label: 'Supporting Documents', file: 'Proof_MBC.pdf', size: '728.5 KB', verified: true },
]

export function findCandidateById(id) {
  return CANDIDATES.find((c) => c.id === id) || null
}

export function buildCandidateDetail(c) {
  const h = hashId(c.id)
  const ratio = c.score / 93.3
  const dimensions = DETAIL_DIMS.map((d) => {
    const score = Math.max(40, Math.min(100, Math.round(d.base * ratio)))
    return { ...d, score, weighted: Math.round((score * d.weight) / 100 * 10) / 10 }
  })
  const firstName = c.name.split(' ')[0]
  const lastName = c.name.split(' ').slice(-1)[0]
  return {
    ...c,
    anonymousId: `CAND-${10000000 + h * 7}`,
    whatsapp: `+62812${String(60000000 + h).slice(0, 8)}`,
    faculty: FACULTIES[h % FACULTIES.length],
    major: MAJORS[h % MAJORS.length],
    year: 2024 + (h % 2),
    submittedAt: `${6 + (h % 2)}/${10 + (h % 18)}/2026, ${1 + (h % 11)}:${String(h % 60).padStart(2, '0')}:12 PM`,
    applicationStatus: c.status === 'Evaluated' ? 'Screening' : c.status,
    validatedBy: 'Akmal Yaasir Fauzaan',
    validationTime: '7/4/2026, 2:26:47 PM',
    validated: c.status === 'Evaluated',
    documents: DETAIL_DOCS.map((d) => ({ ...d, file: `${d.label.split(' ')[0].toUpperCase()}_${lastName.toUpperCase()}${d.file.slice(d.file.lastIndexOf('.'))}` })),
    summary: `Kandidat adalah mahasiswa ${firstName} ${lastName} dengan IPK ${c.ipk} yang menonjol di bidang keamanan siber. Ia memiliki minat mendalam pada ${c.track}, didukung kemampuan teknis scripting (Python/Bash) dan pengalaman hands-on di lab CTF (TryHackMe, HackTheBox). Selain aktif di komunitas keamanan siber kampus, ia menjadi mentor akademik dan panitia divisi teknis CTF. Portofolionya diperkuat prestasi kompetitif termasuk juara CTF nasional. Surat motivasinya menyelaraskan pengalaman tersebut dengan keinginan berkontribusi pada penetration testing dan incident response di Divisi Cyber Security MBC Lab.`,
    dimensions,
  }
}

// ============================================================
// Rubrics — one rubric per Cyber Security track + the core rubric
// ============================================================
export const RUBRICS = [
  {
    key: 'core', name: 'Cyber Security Rubric', track: 'Cyber Security', tag: 'Cyber Security',
    position: 'Cyber Security Division', active: true,
    desc: 'Rubrikasi seleksi berkas kandidat Divisi Cybersecurity MBC Laboratory 2026/2027. Total bobot 5 dimensi harus genap 100%.',
    dimensions: [
      {
        name: 'Latar Belakang Akademik', weight: 20,
        description: 'Relevansi jurusan dan performa akademik kandidat.',
        indicators: [
          'Jurusan relevan: Informatika, Teknik Komputer, Sistem Informasi, Teknologi Informasi, atau bidang STEM relevan.',
          'Mencantumkan IPK atau nilai semester yang sudah ditempuh. Minimal 3.0.',
          'Pernah mengambil mata kuliah terkait: Keamanan Jaringan, Kriptografi, Sistem Operasi, Pemrograman.',
        ],
      },
      {
        name: 'Kemampuan Teknis', weight: 35,
        description: 'Penguasaan tools dan konsep keamanan.',
        indicators: [
          'Menguasai minimal satu area: Red Team, Blue Team/SOC, Digital Forensics, atau Application Security.',
          'Familiar dengan tools seperti Wireshark, Burp Suite, Nmap, atau Metasploit.',
          'Memahami konsep OWASP Top 10 dan dasar jaringan.',
        ],
      },
      {
        name: 'Pengalaman Praktik', weight: 25,
        description: 'Bukti pengalaman langsung di bidang keamanan.',
        indicators: [
          'Menyertakan writeup CTF, lab (TryHackMe/HackTheBox), atau bug bounty.',
          'Portofolio project keamanan atau kontribusi komunitas.',
        ],
      },
      {
        name: 'Komunikasi', weight: 10,
        description: 'Kualitas laporan dan dokumentasi.',
        indicators: ['Laporan dan dokumentasi ditulis jelas dan terstruktur.'],
      },
      {
        name: 'Motivasi & Kecocokan', weight: 10,
        description: 'Kesesuaian dengan fokus lab.',
        indicators: ['Motivation letter menunjukkan minat spesifik pada cyber security.'],
      },
    ],
  },
  {
    key: 'redteam', name: 'Red Team / Offensive Rubric', track: 'Red Team', tag: 'Red Team',
    active: false,
    desc: 'Default rubric for Red Team / Offensive track candidates. Recruiter: add dimensions before running evaluation.',
    dimensions: [
      { name: 'Exploitation & Tooling', weight: 35 },
      { name: 'Recon & Enumeration', weight: 20 },
      { name: 'Report / Writeup Quality', weight: 20 },
      { name: 'Problem Solving', weight: 15 },
      { name: 'Motivation & Fit', weight: 10 },
    ],
  },
  {
    key: 'blueteam', name: 'Blue Team / SOC Rubric', track: 'Blue Team / SOC', tag: 'Blue Team',
    active: false,
    desc: 'Default rubric for Blue Team / SOC track candidates. Recruiter: add dimensions before running evaluation.',
    dimensions: [
      { name: 'Detection & Monitoring', weight: 30 },
      { name: 'Incident Response', weight: 25 },
      { name: 'Log / Network Analysis', weight: 20 },
      { name: 'Communication', weight: 15 },
      { name: 'Motivation & Fit', weight: 10 },
    ],
  },
  {
    key: 'forensics', name: 'Digital Forensics Rubric', track: 'Digital Forensics', tag: 'Forensics',
    active: false,
    desc: 'Default rubric for Digital Forensics track candidates. Recruiter: add dimensions before running evaluation.',
    dimensions: [
      { name: 'Evidence Handling', weight: 30 },
      { name: 'Analysis & Recovery', weight: 25 },
      { name: 'Tooling (Autopsy/Volatility)', weight: 20 },
      { name: 'Documentation', weight: 15 },
      { name: 'Motivation & Fit', weight: 10 },
    ],
  },
  {
    key: 'appsec', name: 'Application Security Rubric', track: 'Application Security', tag: 'App Security',
    active: false,
    desc: 'Default rubric for Application Security track candidates. Recruiter: add dimensions before running evaluation.',
    dimensions: [
      { name: 'Secure Code Review', weight: 30 },
      { name: 'Vuln Assessment (OWASP)', weight: 25 },
      { name: 'Threat Modeling', weight: 20 },
      { name: 'Communication', weight: 15 },
      { name: 'Motivation & Fit', weight: 10 },
    ],
  },
]
