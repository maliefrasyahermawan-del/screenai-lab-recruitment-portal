import { useMemo, useState } from 'react'
import {
  FileText, XCircle, CheckCircle2, AlertTriangle, ChevronDown, Filter,
  Check, X, RotateCcw, ShieldCheck,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import { DOCUMENTS, DOC_STATS, DIVISION_OPTIONS, REQUIRED_DOCS } from '../data/mockData'
import { statusPill } from '../utils/format'

const QUEUE_OPTIONS = ['All queues', 'Document review', 'Correction requested', 'Verified']

export default function DocumentVerification() {
  const [division, setDivision] = useState('All tracks')
  const [queue, setQueue] = useState('Document review')

  const rows = useMemo(() => {
    return DOCUMENTS.filter((d) => division === 'All tracks' || d.track === division)
      .filter((d) => {
        if (queue === 'All queues') return true
        if (queue === 'Document review') return d.status === 'Pending'
        if (queue === 'Correction requested') return d.status === 'Correction'
        if (queue === 'Verified') return d.status === 'Verified'
        return true
      })
  }, [division, queue])

  const reset = () => { setDivision('All tracks'); setQueue('All queues') }

  return (
    <>
      <TopBar />
      <div className="page-head">
        <div className="crumb">Recruiter <span>/</span> Documents</div>
        <h2>Document Verification</h2>
        <p>Queue-first workspace for reviewing candidate documents and finalizing document review decisions.</p>
      </div>

      {/* Stat cards (3) */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-card__icon ic-sky"><FileText size={22} /></div>
          <div className="stat-card__value">{DOC_STATS.inReview}</div>
          <div className="stat-card__label">In review</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-amber"><XCircle size={22} /></div>
          <div className="stat-card__value">{DOC_STATS.correctionRequested}</div>
          <div className="stat-card__label">Correction requested</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><CheckCircle2 size={22} /></div>
          <div className="stat-card__value">{DOC_STATS.verified}</div>
          <div className="stat-card__label">All verified</div>
        </div>
      </div>

      {/* Notice */}
      <div className="notice notice--warn">
        <div className="notice__icon"><AlertTriangle size={22} /></div>
        <div>
          <h4>Evaluation phase is active</h4>
          <p>Candidates still in document review or correction remain in this queue and will be skipped by evaluation.</p>
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
          <select value={queue} onChange={(e) => setQueue(e.target.value)}>
            {QUEUE_OPTIONS.map((q) => <option key={q}>{q}</option>)}
          </select>
          <ChevronDown size={17} />
        </div>
        <button className="reset-btn" onClick={reset}>Reset</button>
      </div>

      {/* Two panels: Verification Queue + Document Review */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.3fr 0.7fr' }}>
        <div className="card">
          <div style={{ padding: '20px 24px 4px' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>Verification Queue</h3>
            <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>Documents awaiting a verify / correct / reject decision.</p>
          </div>
          <table className="table" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Document</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Decision</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d, i) => (
                <tr key={i}>
                  <td>
                    <div className="cand__name">{d.candidate}</div>
                    <div className="cand__mail">{d.track} · {d.id}</div>
                  </td>
                  <td>{d.doc}</td>
                  <td><span className={`pill ${statusPill(d.status)}`}>{d.status}</span></td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-btn" title="Verify" style={{ color: 'var(--green-600)' }}><Check size={17} /></button>
                      <button className="icon-btn" title="Request correction" style={{ color: 'var(--amber-600)' }}><RotateCcw size={16} /></button>
                      <button className="icon-btn" title="Reject" style={{ color: 'var(--red-600)' }}><X size={17} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={4}><div className="empty"><ShieldCheck size={36} /><div>Queue is clear for this filter.</div></div></td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel__head">
            <h3 style={{ fontSize: 20 }}>Document Review</h3>
            <p>Required documents each candidate must submit before evaluation.</p>
          </div>
          <div className="division-list">
            {REQUIRED_DOCS.map((doc) => (
              <div className="weight-row" key={doc} style={{ padding: '12px 0' }}>
                <ShieldCheck size={18} color="var(--green-600)" />
                <span className="weight-row__desc" style={{ color: 'var(--ink-800)', fontWeight: 500 }}>{doc}</span>
                <span className="pill pill--green" style={{ fontSize: 11.5 }}>Required</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
