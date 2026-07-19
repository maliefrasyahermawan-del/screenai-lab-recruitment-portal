import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Users, FileText, AlertTriangle, CheckCircle2, ChevronDown, ExternalLink, Filter,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import { CANDIDATES, APPLICATION_STATS, DIVISION_OPTIONS, STATUS_OPTIONS } from '../data/mockData'
import { statusPill } from '../utils/format'

const CHIPS = ['All', 'Submitted', 'Document Review', 'Correction Requested', 'Verified', 'Evaluated']

export default function Applications() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [chip, setChip] = useState('All')
  const [division, setDivision] = useState('All tracks')
  const [status, setStatus] = useState('All statuses (non-draft)')

  const rows = useMemo(() => {
    return CANDIDATES.filter((c) => {
      const matchQ = `${c.name} ${c.email} ${c.nim} ${c.track}`.toLowerCase().includes(query.toLowerCase())
      const chipStatus = chip === 'Verified' ? 'Pending Evaluation' : chip
      const matchChip = chip === 'All' || c.status === chip || (chip === 'Verified' && c.status === 'Pending Evaluation')
      const matchDiv = division === 'All tracks' || c.track === division
      const matchStatus = status.startsWith('All') || c.status === status
      return matchQ && matchChip && matchDiv && matchStatus
    })
  }, [query, chip, division, status])

  return (
    <>
      <TopBar />
      <div className="page-head">
        <div className="crumb">Recruiter <span>/</span> Applications</div>
        <h2>Applications</h2>
        <p>Track submitted applications, document readiness, and administrative status.</p>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon ic-sky"><Users size={22} /></div>
          <div className="stat-card__value">{APPLICATION_STATS.inView}</div>
          <div className="stat-card__label">Applications in view</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-sky"><FileText size={22} /></div>
          <div className="stat-card__value">{APPLICATION_STATS.inDocumentReview}</div>
          <div className="stat-card__label">In document review</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-amber"><AlertTriangle size={22} /></div>
          <div className="stat-card__value">{APPLICATION_STATS.needsCorrection}</div>
          <div className="stat-card__label">Needs correction</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><CheckCircle2 size={22} /></div>
          <div className="stat-card__value">{APPLICATION_STATS.verified}</div>
          <div className="stat-card__label">Verified</div>
        </div>
      </div>

      {/* Search + chips */}
      <div className="card" style={{ padding: 22, marginBottom: 22 }}>
        <div className="search" style={{ marginBottom: 18 }}>
          <Search size={18} />
          <input placeholder="Search by name, email, or NIM" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="seg" style={{ background: 'transparent', padding: 0 }}>
          {CHIPS.map((c) => (
            <button
              key={c}
              className={chip === c ? 'active' : ''}
              onClick={() => setChip(c)}
              style={chip === c ? { background: 'linear-gradient(135deg,var(--red-700),var(--red-600))', color: '#fff' } : { background: 'var(--surface-soft)' }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Filter dropdowns */}
      <div className="filter-bar">
        <span className="filter-bar__label"><Filter size={16} /> Filter:</span>
        <div className="select">
          <select value={division} onChange={(e) => setDivision(e.target.value)}>
            {DIVISION_OPTIONS.map((d) => <option key={d}>{d === 'All tracks' ? 'All divisions' : d}</option>)}
          </select>
          <ChevronDown size={17} />
        </div>
        <div className="select">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <ChevronDown size={17} />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Division</th>
              <th>Status</th>
              <th>Documents</th>
              <th>Submitted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="cand">
                    <div className="cand__avatar" style={{ background: c.avatar }}>{c.initials}</div>
                    <div>
                      <div className="cand__name">{c.name}</div>
                      <div className="cand__mail">{c.email} · NIM {c.nim}</div>
                    </div>
                  </div>
                </td>
                <td>{c.track}</td>
                <td><span className={`pill ${statusPill(c.status)}`}>{c.status === 'Pending Evaluation' ? 'Screening' : c.status}</span></td>
                <td>
                  <div className="doc-cell">
                    <div className="doc-cell__bar"><div className={`doc-cell__fill ${c.doc.tone}`} style={{ width: `${c.doc.progress}%` }} /></div>
                    <span className={`doc-cell__label ${c.doc.tone}`}>{c.doc.label}</span>
                  </div>
                </td>
                <td>{new Date(c.appliedAt).toLocaleDateString('en-US')}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="link-cell" title="Open detail" onClick={() => navigate(`/candidates/${c.id}`)}><ExternalLink size={17} /></button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6}><div className="empty"><Search size={36} /><div>No applications match your filters.</div></div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
