import { useState } from 'react'
import {
  Users, ShieldCheck, Sparkles, Gauge, AlertTriangle, ChevronDown, Filter,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import {
  ACTIVE_PERIOD, ANALYTICS_STATS, TRACKS, FUNNEL_COUNTS, DOC_COMPLETENESS, MISSING_DOCS, DIVISION_OPTIONS,
  SCORE_DISTRIBUTION, FACULTY_DIST, MAJOR_DIST, YEAR_DIST, IPK_DIST,
} from '../data/mockData'

function DistPanel({ title, data }) {
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className="panel">
      <div className="panel__head"><h3>{title}</h3></div>
      <div className="dist-list">
        {data.map((d) => (
          <div className="dist-row" key={d.label}>
            <div className="dist-row__top">
              <div>
                <div className="dist-row__label">{d.label}</div>
                {d.sub && <div className="dist-row__sub">{d.sub}</div>}
              </div>
              <div className="dist-row__val">{d.value}</div>
            </div>
            <div className="dist-bar"><div className="dist-bar__fill" style={{ width: `${(d.value / max) * 100}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Analytics() {
  const [division, setDivision] = useState('All tracks')
  const maxTrack = Math.max(...TRACKS.map((t) => t.applications))
  const maxFunnel = Math.max(...FUNNEL_COUNTS.map((f) => f.value), 1)
  const totalDocs = DOC_COMPLETENESS.reduce((s, d) => s + d.value, 0)

  return (
    <>
      <TopBar />
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="crumb">Recruiter <span>/</span> Analytics</div>
          <h2>Analytics</h2>
          <p>Active-period recruitment metrics for the Cyber Security division.</p>
        </div>
        <div className="filter-bar" style={{ margin: 0, padding: '12px 16px' }}>
          <span className="filter-bar__label"><Filter size={16} /></span>
          <div className="select">
            <select value={division} onChange={(e) => setDivision(e.target.value)}>
              {DIVISION_OPTIONS.map((d) => <option key={d}>{d === 'All tracks' ? 'All divisions' : d}</option>)}
            </select>
            <ChevronDown size={17} />
          </div>
        </div>
      </div>

      {/* Active period */}
      <div className="active-period">
        <div>
          <div className="active-period__eyebrow">Active Period</div>
          <div className="active-period__name">
            {ACTIVE_PERIOD.name} <span className="control-badge">{ACTIVE_PERIOD.phase}</span>
          </div>
        </div>
        <div className="active-period__metrics">
          <div><div className="ap-metric__label">Threshold</div><div className="ap-metric__value">{ACTIVE_PERIOD.threshold}</div></div>
          <div><div className="ap-metric__label">Applications</div><div className="ap-metric__value">{ACTIVE_PERIOD.applications}</div></div>
          <div><div className="ap-metric__label">Submitted</div><div className="ap-metric__value">{ACTIVE_PERIOD.submitted}</div></div>
          <div><div className="ap-metric__label">Average score</div><div className="ap-metric__value">{ACTIVE_PERIOD.averageScore}</div></div>
        </div>
      </div>

      {/* 5 stat cards */}
      <div className="stat-grid stat-grid--5">
        <div className="stat-card"><div className="stat-card__icon ic-sky"><Users size={22} /></div><div className="stat-card__value">{ANALYTICS_STATS.totalApplications}</div><div className="stat-card__label">Total applications</div></div>
        <div className="stat-card"><div className="stat-card__icon ic-green"><ShieldCheck size={22} /></div><div className="stat-card__value">{ANALYTICS_STATS.verified}</div><div className="stat-card__label">Verified</div></div>
        <div className="stat-card"><div className="stat-card__icon ic-green"><Sparkles size={22} /></div><div className="stat-card__value">{ANALYTICS_STATS.evaluated}</div><div className="stat-card__label">Evaluated</div></div>
        <div className="stat-card"><div className="stat-card__icon ic-orange"><Gauge size={22} /></div><div className="stat-card__value">{ANALYTICS_STATS.averageScore}</div><div className="stat-card__label">Average score</div></div>
        <div className="stat-card"><div className="stat-card__icon ic-red"><AlertTriangle size={22} /></div><div className="stat-card__value">{ANALYTICS_STATS.reviewOrCorrection}</div><div className="stat-card__label">Review or correction</div></div>
      </div>

      {/* Applicants per track + Funnel */}
      <div className="grid-2">
        <div className="panel">
          <div className="panel__head"><h3>Applicants Per Division</h3></div>
          <div className="division-list">
            {TRACKS.map((t) => (
              <div className="division" key={t.key} style={{ background: '#fff', border: 'none', padding: '10px 0' }}>
                <div className="division__top">
                  <span className="division__name">{t.name}</span>
                  <span className="division__value" style={{ fontSize: 22 }}>{t.applications}</span>
                </div>
                <div className="division__sub">{t.applications} submitted or later</div>
                <div className="bar"><div className="bar__fill" style={{ width: `${(t.applications / maxTrack) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel__head"><h3>Funnel Counts</h3></div>
          <div className="funnel-list">
            {FUNNEL_COUNTS.map((f) => (
              <div className="funnel-row" key={f.label}>
                <div className="funnel-row__top">
                  <span className="funnel-row__label">{f.label}</span>
                  <span className="funnel-row__val">{f.value}</span>
                </div>
                <div className="funnel-row__bar"><div className="funnel-row__fill" style={{ width: `${(f.value / maxFunnel) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document completeness + Missing documents */}
      <div className="grid-2">
        <div className="panel">
          <div className="panel__head"><h3>Document Completeness</h3><p>Share of candidates by document readiness.</p></div>
          <div className="completeness">
            {DOC_COMPLETENESS.map((d) => (
              <div className="completeness__row" key={d.label}>
                <div className="funnel-row__top">
                  <span className="funnel-row__label">{d.label}</span>
                  <span className="funnel-row__val">{Math.round((d.value / totalDocs) * 100)}%</span>
                </div>
                <div className="funnel-row__bar"><div className={`funnel-row__fill ${d.tone}`} style={{ width: `${(d.value / totalDocs) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel__head"><h3>Missing Documents</h3><p>Most common documents still outstanding.</p></div>
          <div className="missing-list">
            {MISSING_DOCS.map((m) => (
              <div className="missing-row" key={m.doc}>
                <span className="missing-row__doc">{m.doc}</span>
                <span className="missing-row__count">{m.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score distribution */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="panel__head"><h3>Score Distribution</h3></div>
        <div className="mini-stats mini-stats--3">
          <div className="mini-stat mini-stat--lg"><div className="mini-stat__value">{SCORE_DISTRIBUTION.scored}</div><div className="mini-stat__label">Scored</div></div>
          <div className="mini-stat mini-stat--lg"><div className="mini-stat__value">{SCORE_DISTRIBUTION.min}</div><div className="mini-stat__label">Min</div></div>
          <div className="mini-stat mini-stat--lg"><div className="mini-stat__value">{SCORE_DISTRIBUTION.max}</div><div className="mini-stat__label">Max</div></div>
        </div>
        <div className="dist-list">
          {(() => {
            const max = Math.max(...SCORE_DISTRIBUTION.buckets.map((b) => b.value), 1)
            return SCORE_DISTRIBUTION.buckets.map((b) => (
              <div className="dist-row" key={b.label}>
                <div className="dist-row__top">
                  <div className="dist-row__label">{b.label}</div>
                  <div className="dist-row__val">{b.value}</div>
                </div>
                <div className="dist-bar"><div className="dist-bar__fill" style={{ width: `${(b.value / max) * 100}%` }} /></div>
              </div>
            ))
          })()}
        </div>
      </div>

      {/* Faculty + Major */}
      <div className="grid-2">
        <DistPanel title="Faculty Distribution" data={FACULTY_DIST} />
        <DistPanel title="Major Distribution" data={MAJOR_DIST} />
      </div>

      {/* Year + IPK */}
      <div className="grid-2">
        <DistPanel title="Year Distribution" data={YEAR_DIST} />
        <DistPanel title="IPK Distribution" data={IPK_DIST} />
      </div>
    </>
  )
}
