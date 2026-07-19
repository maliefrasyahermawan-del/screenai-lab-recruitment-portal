import { Link } from 'react-router-dom'
import {
  Sparkles, Users, ShieldCheck, RefreshCw, Trophy, ClipboardList, FileText,
  ShieldAlert, Megaphone, ArrowRight, Bell, BarChart3,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import {
  RECRUITMENT, STATS, WORK_QUEUE, TRACKS,
} from '../data/mockData'

const ICONS = { ClipboardList, FileText, ShieldAlert, Sparkles, RefreshCw, Megaphone }
const TONE = { sky: 'ic-sky', amber: 'ic-amber', red: 'ic-red', green: 'ic-green' }

const TOOLS = [
  { to: '/applications', icon: ClipboardList, title: 'Applications', desc: 'Review submitted applications and open evaluated candidate detail.', tone: 'ic-sky', filled: true },
  { to: '/documents', icon: ShieldCheck, title: 'Document Verification', desc: 'Verify or reject required documents before evaluation.', tone: 'ic-amber' },
  { to: '/evaluation', icon: Sparkles, title: 'Evaluation', desc: 'Run AI evaluation per track with safety controls.', tone: 'ic-red', filled: true },
  { to: '/candidates', icon: Users, title: 'Candidates', desc: 'Inspect ranked scores, evidence, and recommendations.', tone: 'ic-green' },
  { to: '/announcements', icon: Bell, title: 'Announcements', desc: 'Prepare pass/fail selections and publish results safely.', tone: 'ic-amber' },
  { to: '/rubrics', icon: FileText, title: 'Rubrics', desc: 'Maintain scoring rubrics used by evaluation.', tone: 'ic-sky' },
  { to: '/analytics', icon: BarChart3, title: 'Analytics', desc: 'Monitor active-period recruitment throughput and outcomes.', tone: 'ic-sky' },
]

const maxTrack = Math.max(...TRACKS.map((t) => t.applications))

export default function Dashboard() {
  return (
    <>
      <TopBar variant="welcome" />

      <div className="page-head">
        <span className="eyebrow">Recruiter Workspace</span>
        <h2>Recruiter Dashboard</h2>
        <p>Operational work queue for application review, document verification, evaluation, ranking, and announcements.</p>
      </div>

      {/* Hero banner */}
      <div className="hero-banner">
        <div className="hero-banner__top">
          <div className="hero-tags">
            <span className="hero-tag">Evaluation</span>
            <span className="hero-tag">{STATS.totalApplications} Applications</span>
            <span className="hero-tag">Cyber Security</span>
          </div>
          <button className="btn btn--onhero"><Sparkles size={18} /> Run Evaluation</button>
        </div>
        <h2>Recruitment MBC Laboratory 2026/2027</h2>
        <p className="hero-banner__lead">
          Operational command center for reviewing applications, verifying documents, running
          evaluation, and preparing announcements — focused on the Cyber Security division.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat__label"><Sparkles size={13} /> Current Focus</div>
            <div className="hero-stat__value">{RECRUITMENT.currentFocus}</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat__label"><RefreshCw size={13} /> Pending Evaluation</div>
            <div className="hero-stat__value">{RECRUITMENT.pendingEvaluation} candidates</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat__label"><Trophy size={13} /> Deadline</div>
            <div className="hero-stat__value">{RECRUITMENT.deadline}</div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon ic-sky"><Users size={22} /></div>
          <div className="stat-card__value">{STATS.totalApplications}</div>
          <div className="stat-card__label">Applications</div>
          <div className="stat-card__sub">Total applications in Cyber Security</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-amber"><ShieldCheck size={22} /></div>
          <div className="stat-card__value">{STATS.pendingDocuments}</div>
          <div className="stat-card__label">Pending document review</div>
          <div className="stat-card__sub">Awaiting verification</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-red"><Sparkles size={22} /></div>
          <div className="stat-card__value">{STATS.pendingEvaluation}</div>
          <div className="stat-card__label">Pending evaluation</div>
          <div className="stat-card__sub">Verified candidates</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><Trophy size={22} /></div>
          <div className="stat-card__value">{STATS.topScore}</div>
          <div className="stat-card__label">Top score</div>
          <div className="stat-card__sub">{STATS.topScoreNote}</div>
        </div>
      </div>

      {/* Work queue + track breakdown */}
      <div className="grid-2">
        <div className="panel">
          <div className="panel__head">
            <h3>Work Queue</h3>
            <p>Prioritized recruiter work across document review, evaluation, and announcements.</p>
          </div>
          <div className="queue-grid">
            {WORK_QUEUE.map((q) => {
              const Icon = ICONS[q.icon]
              return (
                <div className="queue-item" key={q.key}>
                  <div className="queue-item__top">
                    <div className={`queue-item__icon ${TONE[q.tone]}`}><Icon size={20} /></div>
                    <div className="queue-item__count">{q.count}</div>
                  </div>
                  <h4>{q.label}</h4>
                  <p>{q.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="panel__foot">
            <Link to="/applications" className="btn btn--ghost btn--sm">
              Open full application list <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="panel">
          <div className="panel__head">
            <h3><BarChart3 size={22} /> Track Breakdown</h3>
            <p>Application volume, evaluated count, and recommendations per Cyber Security track.</p>
          </div>
          <div className="division-list">
            {TRACKS.map((t) => (
              <div className="division" key={t.key}>
                <div className="division__top">
                  <span className="division__name">{t.name}</span>
                  <span className="division__value">{t.applications}</span>
                </div>
                <div className="division__sub">{t.evaluated} evaluated · {t.recommended} recommended</div>
                <div className="bar">
                  <div className="bar__fill" style={{ width: `${(t.applications / maxTrack) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Focused tools */}
      <div className="section-title">
        <div>
          <span className="eyebrow">Secondary Workspaces</span>
          <h3>Focused recruiter tools</h3>
        </div>
      </div>
      <div className="tools-grid">
        {TOOLS.map((t) => (
          <div className="tool-card" key={t.to}>
            <div className={`tool-card__icon ${t.tone}`}><t.icon size={24} /></div>
            <h3>{t.title}</h3>
            <p>{t.desc}</p>
            <Link to={t.to} className={`tool-link ${t.filled ? 'filled' : ''}`}>
              Open <ArrowRight size={16} />
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
