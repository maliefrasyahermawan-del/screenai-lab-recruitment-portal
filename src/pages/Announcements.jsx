import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Megaphone, CheckCircle2, AlertTriangle, XCircle, HelpCircle, Sparkles,
  ChevronDown, Filter, ExternalLink,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import { READY_TO_ANNOUNCE, RECRUITMENT, DIVISION_OPTIONS } from '../data/mockData'

export default function Announcements() {
  const navigate = useNavigate()
  const [division, setDivision] = useState('All tracks')
  const [statusFilter, setStatusFilter] = useState('All statuses (non-draft)')
  const [decisions, setDecisions] = useState(() =>
    Object.fromEntries(READY_TO_ANNOUNCE.map((c) => [c.id, c.defaultDecision]))
  )

  const rows = useMemo(
    () => READY_TO_ANNOUNCE.filter((c) => division === 'All tracks' || c.track === division),
    [division]
  )

  const counts = useMemo(() => {
    let pass = 0, fail = 0, undecided = 0
    rows.forEach((c) => {
      const d = decisions[c.id]
      if (d === 'Pass') pass++
      else if (d === 'Fail') fail++
      else undecided++
    })
    return { pass, fail, undecided }
  }, [rows, decisions])

  const oneDivision = division !== 'All tracks'
  const allDecided = counts.undecided === 0
  const canPublish = oneDivision && allDecided

  const setDecision = (id, val) => setDecisions((d) => ({ ...d, [id]: val }))

  const checklist = [
    { ok: true, title: 'Active period available', desc: RECRUITMENT.title },
    { ok: oneDivision, title: 'One division selected', desc: oneDivision ? `${division} selected.` : 'Select one division before publishing.' },
    { ok: true, title: 'Candidates evaluated', desc: `${rows.length} evaluated candidates in current view.` },
    { ok: allDecided, title: 'All candidates decided', desc: `${counts.pass} Pass · ${counts.fail} Fail ready to publish.` },
    { ok: true, title: 'Phase allows publish', desc: 'Publish is only enabled during announcement phase.' },
  ]

  return (
    <>
      <TopBar />
      <div className="page-head">
        <div className="crumb">Recruiter <span>/</span> Announcements</div>
        <h2>Announcements</h2>
        <p>
          Select final pass/fail decisions before publishing. Only ready-to-announce candidates are part
          of the publish decision; already-announced candidates are shown read-only. AI recommendations
          are decision support and can be adjusted.
        </p>
      </div>

      {/* Pre-publish checklist */}
      <div className="control-panel">
        <div className="control-panel__head">
          <div>
            <div className="control-panel__eyebrow">Publish Safety</div>
            <div className="control-panel__title"><Megaphone size={22} color="var(--red-600)" /> Pre-publish Checklist</div>
          </div>
          <span className="control-badge">Evaluation</span>
        </div>
        <div className="checklist-grid">
          {checklist.map((c) => (
            <div className="check-item" key={c.title}>
              <div className={`check-item__icon ${c.ok ? 'ok' : 'warn'}`}>
                {c.ok ? <CheckCircle2 size={19} /> : <AlertTriangle size={17} />}
              </div>
              <div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
          <div className="check-item check-item--danger">
            Publishing results is irreversible. Review pass/fail counts before confirming.
          </div>
        </div>
      </div>

      {/* Pass / Fail / Undecided */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-card__icon ic-green"><CheckCircle2 size={22} /></div>
          <div className="stat-card__value">{counts.pass}</div>
          <div className="stat-card__label">Pass</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-red"><XCircle size={22} /></div>
          <div className="stat-card__value">{counts.fail}</div>
          <div className="stat-card__label">Fail</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon ic-orange"><HelpCircle size={22} /></div>
          <div className="stat-card__value">{counts.undecided}</div>
          <div className="stat-card__label">Undecided</div>
        </div>
      </div>

      {/* Filter + publish */}
      <div className="filter-bar">
        <span className="filter-bar__label"><Filter size={16} /> Filter:</span>
        <div className="select">
          <select value={division} onChange={(e) => setDivision(e.target.value)}>
            {DIVISION_OPTIONS.map((d) => <option key={d}>{d === 'All tracks' ? 'All divisions' : d}</option>)}
          </select>
          <ChevronDown size={17} />
        </div>
        <div className="select">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All statuses (non-draft)</option>
            <option>Pass</option>
            <option>Fail</option>
          </select>
          <ChevronDown size={17} />
        </div>
        <div className="publish-bar">
          {!canPublish && <span>{!oneDivision ? 'Select one division before publishing.' : 'Decide all candidates first.'}</span>}
          <button className={`btn ${canPublish ? 'btn--publish ready' : 'btn--publish'}`} disabled={!canPublish}>
            <Megaphone size={17} /> Publish Results
          </button>
        </div>
      </div>

      {/* Ready to announce */}
      <div className="section-title" style={{ marginBottom: 16 }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          Ready to Announce <span className="count-badge">{rows.length}</span>
          <span className="muted" style={{ fontSize: 14.5, fontWeight: 400 }}>
            Shows candidates who have completed AI Evaluation and are not yet announced.
          </span>
        </h3>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Division</th>
              <th style={{ textAlign: 'right' }}>Score / Rank</th>
              <th>AI Validation</th>
              <th>Decision</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => {
              const d = decisions[c.id]
              return (
                <tr key={c.id} className={d === 'Pass' ? 'row-hl-pass' : d === 'Fail' ? 'row-hl-fail' : ''}>
                  <td>
                    <div className="cand__name">
                      {c.name}
                      {c.aiRecommended && <span className="ai-badge"><Sparkles size={11} /> AI Recommended</span>}
                    </div>
                    <div className="cand__mail">{c.email}</div>
                  </td>
                  <td>{c.track}</td>
                  <td>
                    <div className="score-rank">
                      <span className="score-rank__hash">#{c.trackRank}</span>
                      <b className={c.score >= 82 ? 'score score--hi' : c.score >= 72 ? 'score score--mid' : 'score score--lo'}>{c.score}</b>
                    </div>
                  </td>
                  <td>
                    {c.aiValidation === 'Validated'
                      ? <span className="badge-soft green">Validated</span>
                      : <span className="badge-soft" style={{ background: 'var(--amber-50)', color: 'var(--amber-600)' }}>Pending</span>}
                  </td>
                  <td>
                    <div className={`decision-select ${d.toLowerCase()}`}>
                      <select value={d} onChange={(e) => setDecision(c.id, e.target.value)}>
                        <option>Pass</option>
                        <option>Fail</option>
                        <option>Undecided</option>
                      </select>
                      <ChevronDown size={15} />
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="link-cell" title="Open detail" onClick={() => navigate(`/candidates/${c.id}`)}><ExternalLink size={17} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
