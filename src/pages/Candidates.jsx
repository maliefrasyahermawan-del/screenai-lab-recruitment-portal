import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, CheckCircle2, BarChart3, Trophy, ChevronDown, Filter, ArrowRight, User,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import { RANKED, CANDIDATE_STATS, DIVISION_OPTIONS } from '../data/mockData'
import { scoreClass } from '../utils/format'

const STATUS_OPTIONS = ['All statuses (non-draft)', 'Validated', 'Recommended', 'Consider']

export default function Candidates() {
  const navigate = useNavigate()
  const [division, setDivision] = useState('All tracks')
  const [status, setStatus] = useState('All statuses (non-draft)')

  const rows = useMemo(() => {
    return RANKED
      .filter((c) => division === 'All tracks' || c.track === division)
      .filter((c) => {
        if (status.startsWith('All')) return true
        if (status === 'Validated') return c.validated
        if (status === 'Recommended') return c.recommend
        if (status === 'Consider') return !c.recommend
        return true
      })
      .map((c, i) => ({ ...c, viewRank: i + 1 }))
  }, [division, status])

  return (
    <>
      <TopBar />
      <div className="page-head">
        <div className="crumb">Recruiter <span>/</span> Candidates</div>
        <h2>Candidates</h2>
        <p>
          Ranked candidate review list with score, validation status, and detail access. AI scoring
          uses anonymized document content; recruiter-facing candidate data remains visible for operational review.
        </p>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon ic-sky"><Users size={22} /></div>
          <div className="stat-card__value">{CANDIDATE_STATS.scored}</div>
          <div className="stat-card__label">Scored candidates</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><CheckCircle2 size={22} /></div>
          <div className="stat-card__value">{CANDIDATE_STATS.validated}</div>
          <div className="stat-card__label">Validated</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><BarChart3 size={22} /></div>
          <div className="stat-card__value">{CANDIDATE_STATS.evaluatedInView}</div>
          <div className="stat-card__label">Evaluated in view</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-amber"><Trophy size={22} /></div>
          <div className="stat-card__value">{CANDIDATE_STATS.topScore}</div>
          <div className="stat-card__label">Top Score</div>
        </div>
      </div>

      {/* Filters */}
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

      {/* Ranked list */}
      <div className="rank-list">
        {rows.map((c) => (
          <div className="rank-card" key={c.id}>
            <div className={`rank-card__no ${c.viewRank <= 3 ? 'top' : ''}`}>#{c.viewRank}</div>
            <div className="rank-card__avatar" style={{ background: c.avatar }}>{c.initials}</div>
            <div className="rank-card__id">
              <div className="rank-card__name">{c.name}</div>
              <div className="rank-card__mail">{c.email}</div>
              <div className="rank-card__meta">NIM {c.nim} · IPK {c.ipk}</div>
            </div>
            <div className="rank-card__badges">
              <span className="badge-soft blue">Screening</span>
              {c.validated && <span className="badge-soft green">Validated</span>}
              <span className="muted" style={{ fontSize: 13.5 }}>{c.track}</span>
            </div>
            <div className="rank-card__score">
              <b className={scoreClass(c.score)}>{c.score}</b> <span>/ 100</span>
            </div>
            <button className="btn btn--ghost btn--sm" onClick={() => navigate(`/candidates/${c.id}`)}>Open Detail <ArrowRight size={15} /></button>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="card"><div className="empty"><User size={36} /><div>No candidates match your filters.</div></div></div>
        )}
      </div>
    </>
  )
}
