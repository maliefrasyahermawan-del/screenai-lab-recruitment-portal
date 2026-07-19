import { useMemo, useState } from 'react'
import {
  Search, Users, UserCog, Shield, UserCheck, UserPlus, ChevronDown, Ban, RotateCcw, Lock,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import { useAccounts } from '../context/AccountsContext'
import { useAuth } from '../context/AuthContext'
import { statusPill } from '../utils/format'

const ROLE_FILTERS = ['All', 'Candidate', 'Recruiter', 'Admin']
const ROLE_TONE = { Candidate: 'candidate', Recruiter: 'recruiter', Admin: 'admin' }
const AVA = ['#b91c1c', '#dc2626', '#991b1b', '#ef4444', '#7f1d1d', '#c2410c']

export default function Accounts() {
  const { accounts, setRole, toggleBlock, stats } = useAccounts()
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const rows = useMemo(() => {
    return accounts.filter((a) => {
      const mq = `${a.name} ${a.email} ${a.id}`.toLowerCase().includes(query.toLowerCase())
      const mr = roleFilter === 'All' || a.role === roleFilter
      return mq && mr
    })
  }, [accounts, query, roleFilter])

  return (
    <>
      <TopBar />
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="crumb">Administration <span>/</span> Accounts</div>
          <h2>Account Management</h2>
          <p>All accounts registered on the recruitment platform. Assign roles or block access — changes apply immediately.</p>
        </div>
        <button className="btn btn--primary"><UserPlus size={18} /> Add Account</button>
      </div>

      {/* Stat cards — live */}
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-card__icon ic-red"><UserCheck size={22} /></div><div className="stat-card__value">{stats.total}</div><div className="stat-card__label">Total accounts</div></div>
        <div className="stat-card"><div className="stat-card__icon ic-sky"><Users size={22} /></div><div className="stat-card__value">{stats.candidates}</div><div className="stat-card__label">Candidates</div></div>
        <div className="stat-card"><div className="stat-card__icon ic-green"><UserCog size={22} /></div><div className="stat-card__value">{stats.recruiters}</div><div className="stat-card__label">Recruiters</div></div>
        <div className="stat-card"><div className="stat-card__icon ic-amber"><Shield size={22} /></div><div className="stat-card__value">{stats.admins}</div><div className="stat-card__label">Admins</div></div>
      </div>

      {stats.blocked > 0 && (
        <div className="notice notice--warn">
          <div className="notice__icon"><Ban size={20} /></div>
          <div>
            <h4>{stats.blocked} account{stats.blocked > 1 ? 's' : ''} blocked</h4>
            <p>Blocked accounts cannot sign in. Unblock from the table below to restore access.</p>
          </div>
        </div>
      )}

      {/* Search + role chips */}
      <div className="toolbar">
        <div className="search">
          <Search size={18} />
          <input placeholder="Search by name, email, or account ID…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="seg">
          {ROLE_FILTERS.map((r) => (
            <button key={r} className={roleFilter === r ? 'active' : ''} onClick={() => setRoleFilter(r)}>{r}</button>
          ))}
        </div>
      </div>

      {/* Accounts table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Account ID</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((a, i) => {
              const isSelf = a.email === user?.email
              const blocked = a.status === 'Blocked'
              return (
                <tr key={a.id} className={blocked ? 'row-hl-fail' : ''}>
                  <td>
                    <div className="cand">
                      <div className="cand__avatar" style={{ background: AVA[i % AVA.length] }}>
                        {a.name.trim().split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="cand__name">
                          {a.name.trim()}
                          {isSelf && <span className="badge-soft gray" style={{ marginLeft: 8 }}>You</span>}
                        </div>
                        <div className="cand__mail">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><code style={{ color: 'var(--ink-600)' }}>{a.id}</code></td>
                  <td>
                    <div className={`role-select ${ROLE_TONE[a.role]}`}>
                      <select
                        value={a.role}
                        disabled={isSelf}
                        onChange={(e) => setRole(a.id, e.target.value)}
                        title={isSelf ? "You can't change your own role" : 'Change role'}
                      >
                        <option>Candidate</option>
                        <option>Recruiter</option>
                        <option>Admin</option>
                      </select>
                      <ChevronDown size={15} />
                    </div>
                  </td>
                  <td><span className={`pill ${statusPill(a.status)}`}>{a.status}</span></td>
                  <td>{new Date(a.joined).toLocaleDateString('en-US')}</td>
                  <td>
                    <div className="row-actions">
                      {isSelf ? (
                        <span className="icon-btn" title="You can't block your own account" style={{ opacity: 0.4, cursor: 'not-allowed' }}><Lock size={16} /></span>
                      ) : blocked ? (
                        <button className="btn btn--ghost btn--sm" onClick={() => toggleBlock(a.id)} style={{ color: 'var(--green-600)', borderColor: '#bbf7d0' }}>
                          <RotateCcw size={14} /> Unblock
                        </button>
                      ) : (
                        <button className="btn btn--ghost btn--sm" onClick={() => toggleBlock(a.id)} style={{ color: 'var(--red-600)', borderColor: 'var(--red-200)' }}>
                          <Ban size={14} /> Block
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr><td colSpan={6}><div className="empty"><Search size={36} /><div>No accounts match your filters.</div></div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
