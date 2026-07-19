import { useState } from 'react'
import {
  Sparkles, Play, RotateCw, ChevronDown, AlertTriangle, Users, BarChart3, ShieldAlert, User,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import { TRACKS, NOT_EVAL_READY, PENDING_EVAL } from '../data/mockData'
import { statusPill } from '../utils/format'

export default function Evaluation() {
  const [trackKey, setTrackKey] = useState(TRACKS[0].key)
  const t = TRACKS.find((x) => x.key === trackKey)
  const blocked = NOT_EVAL_READY.documentReview + NOT_EVAL_READY.correction

  return (
    <>
      <TopBar />
      <div className="page-head">
        <div className="crumb">Recruiter <span>/</span> Evaluation</div>
        <h2>Evaluation</h2>
        <p>
          Run AI-anonymized evaluation and validate AI results per track. Personal identifiers are
          excluded from AI evaluation input, while recruiter-facing candidate data stays visible.
          Evaluation runs as a background job — you can keep working and a page refresh resumes live progress.
        </p>
      </div>

      {/* Warning */}
      <div className="notice notice--warn">
        <div className="notice__icon"><AlertTriangle size={22} /></div>
        <div>
          <h4>Some candidates are not evaluation-ready</h4>
          <p>{NOT_EVAL_READY.documentReview} in document review and {NOT_EVAL_READY.correction} in correction will be skipped by evaluation.</p>
        </div>
      </div>

      {/* Control panel */}
      <div className="control-panel">
        <div className="control-panel__head">
          <div>
            <div className="control-panel__eyebrow">Evaluation Control</div>
            <div className="control-panel__title"><Sparkles size={22} color="var(--red-600)" /> Run by Division</div>
          </div>
          <span className="control-badge">Evaluation</span>
        </div>

        <div className="control-row">
          <div>
            <div className="control-row__label">Division</div>
            <div className="select">
              <select value={trackKey} onChange={(e) => setTrackKey(e.target.value)}>
                {TRACKS.map((x) => <option key={x.key} value={x.key}>{x.name}</option>)}
              </select>
              <ChevronDown size={17} />
            </div>
          </div>
          <div className="control-actions">
            <button className="btn btn--primary"><Play size={17} /> Run Evaluation</button>
            <button className="btn btn--ghost"><RotateCw size={16} /> Re-evaluate All</button>
          </div>
        </div>

        <div className="mini-stats">
          <div className="mini-stat"><div className="mini-stat__label">Applications</div><div className="mini-stat__value">{t.applications}</div></div>
          <div className="mini-stat"><div className="mini-stat__label">Evaluated</div><div className="mini-stat__value">{t.evaluated}</div></div>
          <div className="mini-stat"><div className="mini-stat__label">Pending</div><div className="mini-stat__value">{t.pending}</div></div>
          <div className="mini-stat"><div className="mini-stat__label">Threshold N</div><div className="mini-stat__value">{t.threshold}</div></div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card__icon ic-sky"><Users size={22} /></div>
          <div className="stat-card__value">{t.applications}</div>
          <div className="stat-card__label">Applications in division</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><BarChart3 size={22} /></div>
          <div className="stat-card__value">{t.evaluated}</div>
          <div className="stat-card__label">Already evaluated</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-amber"><Sparkles size={22} /></div>
          <div className="stat-card__value">{t.pending}</div>
          <div className="stat-card__label">Pending evaluation</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-red"><ShieldAlert size={22} /></div>
          <div className="stat-card__value">{blocked}</div>
          <div className="stat-card__label">Review/correction blocked</div>
        </div>
      </div>

      {/* Pending evaluation list */}
      <div className="section-title" style={{ marginBottom: 18 }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          Pending Evaluation <span className="count-badge">{PENDING_EVAL.length}</span>
          <span className="muted" style={{ fontSize: 15, fontWeight: 400 }}>No AI score yet.</span>
        </h3>
      </div>

      {PENDING_EVAL.map((c) => (
        <div className="pending-row" key={c.id}>
          <div className="pending-row__avatar"><User size={22} /></div>
          <div className="pending-row__id">
            <div className="pending-row__name">{c.name}</div>
            <div className="pending-row__mail">{c.email}</div>
          </div>
          <span className={`pill ${statusPill('Verified')}`}>Verified</span>
          <span className="muted" style={{ minWidth: 130 }}>{c.track}</span>
          <div className="pending-row__right">
            <span>Not scored</span>
            <span>Not available</span>
          </div>
        </div>
      ))}
    </>
  )
}
