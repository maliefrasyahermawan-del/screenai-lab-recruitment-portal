import { Link } from 'react-router-dom'
import {
  Users, UserCog, Shield, UserCheck, Cog, ArrowRight, TrendingUp, CheckCircle2, Clock, Ban,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import { useAccounts } from '../context/AccountsContext'
import { ACCOUNT_TREND } from '../data/mockData'
import { statusPill } from '../utils/format'

const ROLE_ICON = { Candidate: Users, Recruiter: UserCog, Admin: Shield }
const ROLE_TONE = { Candidate: 'ic-sky', Recruiter: 'ic-green', Admin: 'ic-red' }

export default function AdminDashboard() {
  const { accounts, stats, byRole } = useAccounts()
  const maxRole = Math.max(...byRole.map((r) => r.count))
  const maxTrend = Math.max(...ACCOUNT_TREND.map((t) => t.value))
  const recent = [...accounts].sort((a, b) => new Date(b.joined) - new Date(a.joined)).slice(0, 6)

  return (
    <>
      <TopBar variant="welcome" />

      <div className="page-head">
        <span className="eyebrow">Administrator Console</span>
        <h2>Admin Dashboard</h2>
        <p>Platform-wide account overview — registered users, role breakdown, and account activity across the MBC Laboratory portal.</p>
      </div>

      {/* Hero */}
      <div className="hero-banner">
        <div className="hero-banner__top">
          <div className="hero-tags">
            <span className="hero-tag">Administration</span>
            <span className="hero-tag">{stats.total} Accounts</span>
            <span className="hero-tag">Cyber Security</span>
          </div>
          <Link to="/accounts" className="btn btn--onhero"><Cog size={18} /> Manage accounts</Link>
        </div>
        <h2>Account Control Center</h2>
        <p className="hero-banner__lead">
          Monitor every account registered on the recruitment platform. Track how many candidates,
          recruiters, and admins are active, and manage access from one place.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat__label"><Users size={13} /> Total Accounts</div>
            <div className="hero-stat__value">{stats.total} registered users</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat__label"><CheckCircle2 size={13} /> Active</div>
            <div className="hero-stat__value">{stats.active} active accounts</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat__label"><TrendingUp size={13} /> New This Week</div>
            <div className="hero-stat__value">+{stats.newThisWeek} accounts</div>
          </div>
        </div>
      </div>

      {/* Account stat cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon ic-red"><UserCheck size={22} /></div>
          <div className="stat-card__value">{stats.total}</div>
          <div className="stat-card__label">Total accounts</div>
          <div className="stat-card__sub">All registered users</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-sky"><Users size={22} /></div>
          <div className="stat-card__value">{stats.candidates}</div>
          <div className="stat-card__label">Candidate accounts</div>
          <div className="stat-card__sub">Applicants registered</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><UserCog size={22} /></div>
          <div className="stat-card__value">{stats.recruiters}</div>
          <div className="stat-card__label">Recruiter accounts</div>
          <div className="stat-card__sub">Reviewing candidates</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-amber"><Shield size={22} /></div>
          <div className="stat-card__value">{stats.admins}</div>
          <div className="stat-card__label">Admin accounts</div>
          <div className="stat-card__sub">Full platform access</div>
        </div>
      </div>

      {stats.blocked > 0 && (
        <div className="notice notice--warn">
          <div className="notice__icon"><Ban size={20} /></div>
          <div>
            <h4>{stats.blocked} account{stats.blocked > 1 ? 's' : ''} currently blocked</h4>
            <p>Blocked accounts can't sign in to the portal. Review them in Accounts.</p>
          </div>
        </div>
      )}

      {/* Role breakdown + status */}
      <div className="grid-2">
        <div className="panel">
          <div className="panel__head">
            <h3>Accounts by Role</h3>
            <p>How registered accounts are distributed across roles.</p>
          </div>
          <div className="division-list">
            {byRole.map((r) => {
              const Icon = ROLE_ICON[r.role]
              return (
                <div className="division" key={r.role}>
                  <div className="division__top">
                    <span className="division__name" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className={`stat-card__icon ${ROLE_TONE[r.role]}`} style={{ width: 34, height: 34, marginBottom: 0 }}><Icon size={17} /></span>
                      {r.role}
                    </span>
                    <span className="division__value">{r.count}</span>
                  </div>
                  <div className="division__sub">{((r.count / stats.total) * 100).toFixed(1)}% of all accounts</div>
                  <div className="bar"><div className="bar__fill" style={{ width: `${(r.count / maxRole) * 100}%` }} /></div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel__head">
            <h3>Account Status</h3>
            <p>Active versus pending accounts and recent growth.</p>
          </div>
          <div className="stat-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', margin: '0 0 20px' }}>
            <div className="queue-item">
              <div className="queue-item__top">
                <div className="queue-item__icon ic-green"><CheckCircle2 size={20} /></div>
                <div className="queue-item__count">{stats.active}</div>
              </div>
              <h4>Active</h4>
              <p>Can sign in and use the portal.</p>
            </div>
            <div className="queue-item">
              <div className="queue-item__top">
                <div className="queue-item__icon ic-amber"><Clock size={20} /></div>
                <div className="queue-item__count">{stats.pending}</div>
              </div>
              <h4>Pending</h4>
              <p>Awaiting verification or activation.</p>
            </div>
            <div className="queue-item">
              <div className="queue-item__top">
                <div className="queue-item__icon ic-red"><Ban size={20} /></div>
                <div className="queue-item__count">{stats.blocked}</div>
              </div>
              <h4>Blocked</h4>
              <p>Access revoked by an administrator.</p>
            </div>
          </div>
          <div className="funnel-list">
            {ACCOUNT_TREND.map((t) => (
              <div className="funnel-row" key={t.label}>
                <div className="funnel-row__top">
                  <span className="funnel-row__label">New in {t.label}</span>
                  <span className="funnel-row__val">{t.value}</span>
                </div>
                <div className="funnel-row__bar"><div className="funnel-row__fill" style={{ width: `${(t.value / maxTrend) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent accounts */}
      <div className="section-title">
        <div>
          <span className="eyebrow">Administration</span>
          <h3>Recently registered accounts</h3>
        </div>
        <Link to="/accounts" className="btn btn--ghost btn--sm">View all accounts <ArrowRight size={16} /></Link>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>Account</th><th>Role</th><th>Status</th><th>Joined</th></tr>
          </thead>
          <tbody>
            {recent.map((a) => (
              <tr key={a.id}>
                <td>
                  <div className="cand__name">{a.name}</div>
                  <div className="cand__mail">{a.email}</div>
                </td>
                <td>
                  <span className={`badge-soft ${a.role === 'Admin' ? 'gray' : a.role === 'Recruiter' ? 'green' : 'blue'}`}>{a.role}</span>
                </td>
                <td><span className={`pill ${statusPill(a.status)}`}>{a.status}</span></td>
                <td>{new Date(a.joined).toLocaleDateString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
