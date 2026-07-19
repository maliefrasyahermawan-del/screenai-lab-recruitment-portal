import { useParams, useNavigate, Navigate } from 'react-router-dom'
import {
  ArrowLeft, FileText, Eye, ShieldCheck, CheckCircle2, MessageSquareWarning,
  Sparkles, Award,
} from 'lucide-react'
import TopBar from '../components/TopBar'
import RadarChart from '../components/RadarChart'
import { findCandidateById, buildCandidateDetail } from '../data/mockData'

const Field = ({ label, value }) => (
  <div className="prof-field">
    <div className="prof-field__label">{label}</div>
    <div className="prof-field__value">{value}</div>
  </div>
)

export default function CandidateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const base = findCandidateById(id)
  if (!base) return <Navigate to="/candidates" replace />
  const c = buildCandidateDetail(base)
  const scoreClass = c.score >= 82 ? 'score--hi' : c.score >= 72 ? 'score--mid' : 'score--lo'
  const maxDim = Math.max(...c.dimensions.map((d) => d.score))

  return (
    <>
      <TopBar />

      {/* Header */}
      <div className="detail-head">
        <button className="editor-cancel" onClick={() => navigate('/candidates')}>
          <ArrowLeft size={18} /> Back to Candidates
        </button>
        <div className="detail-head__right">
          <code className="detail-anon">{c.anonymousId}</code>
          <span className="detail-score">scored <b className={`score ${scoreClass}`}>{c.score}</b> / 100</span>
        </div>
      </div>

      {/* Candidate profile */}
      <div className="card" style={{ padding: 28, marginBottom: 22 }}>
        <div className="detail-section-head">
          <h3><ShieldCheck size={20} color="var(--red-600)" /> Candidate Profile</h3>
          <p>Candidate identity is visible to recruiters for verification and decision-making. Personal identifiers are excluded from AI evaluation input.</p>
        </div>
        <div className="prof-grid">
          <Field label="Full Name" value={c.name} />
          <Field label="Email" value={c.email} />
          <Field label="WhatsApp" value={c.whatsapp} />
          <Field label="NIM" value={c.nim} />
          <Field label="Faculty" value={c.faculty} />
          <Field label="Major" value={c.major} />
          <Field label="Year" value={c.year} />
          <Field label="IPK" value={c.ipk} />
          <Field label="Division" value={<span className="badge-soft blue">Cyber Security</span>} />
          <Field label="Application Status" value={<span className="badge-soft green">{c.applicationStatus}</span>} />
          <Field label="Submitted At" value={c.submittedAt} />
          <Field label="Anonymous ID" value={c.anonymousId} />
        </div>
      </div>

      {/* Application documents */}
      <div className="card" style={{ padding: 28, marginBottom: 22 }}>
        <div className="detail-section-head">
          <h3><FileText size={20} color="var(--red-600)" /> Application Documents</h3>
          <p>Cyber Security · {c.applicationStatus} — the six documents uploaded by the candidate (6/6, 100%).</p>
        </div>
        <div className="doc-grid">
          {c.documents.map((d) => (
            <div className="doc-row" key={d.label}>
              <div className="doc-row__icon"><FileText size={18} /></div>
              <div className="doc-row__meta">
                <div className="doc-row__label">{d.label}</div>
                <div className="doc-row__file">{d.file} · {d.size}</div>
              </div>
              {d.verified && <span className="pill pill--green" style={{ fontSize: 11 }}>Verified</span>}
              <button className="btn btn--ghost btn--sm"><Eye size={14} /> Preview</button>
            </div>
          ))}
          <div className="doc-row doc-row--empty">
            <div className="doc-row__icon" style={{ background: '#f1eeef', color: 'var(--ink-400)' }}><FileText size={18} /></div>
            <div className="doc-row__meta">
              <div className="doc-row__label">Language Certificate</div>
              <div className="doc-row__file">No language certificate uploaded</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile summary */}
      <div className="card" style={{ padding: 28, marginBottom: 22 }}>
        <div className="detail-section-head">
          <h3><Sparkles size={20} color="var(--red-600)" /> Profile Summary</h3>
          <p>AI-generated summary based on anonymized document content.</p>
        </div>
        <p className="summary-text">{c.summary}</p>
      </div>

      {/* Radar + breakdown */}
      <div className="grid-2">
        <div className="card" style={{ padding: 28 }}>
          <div className="detail-section-head"><h3><Award size={20} color="var(--red-600)" /> Competency Radar</h3></div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <RadarChart dimensions={c.dimensions} />
          </div>
        </div>
        <div className="card" style={{ padding: 28 }}>
          <div className="detail-section-head"><h3>Score Breakdown</h3></div>
          <div className="funnel-list">
            {c.dimensions.map((d) => (
              <div className="funnel-row" key={d.key}>
                <div className="funnel-row__top">
                  <span className="funnel-row__label">{d.name}</span>
                  <span className="funnel-row__val">{d.score}</span>
                </div>
                <div className="funnel-row__bar"><div className="funnel-row__fill" style={{ width: `${(d.score / maxDim) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dimension scores & justifications */}
      <div className="section-title"><h3>Dimension Scores &amp; Justifications</h3></div>
      {c.dimensions.map((d) => (
        <div className="card dim-card" key={d.key}>
          <div className="dim-card__head">
            <h4>{d.name}</h4>
            <div className="dim-card__scores">
              <span className="dim-card__score">{d.score} <small>/100</small></span>
              <span className="dim-card__meta">Weight: {d.weight}% · Weighted: {d.weighted}</span>
            </div>
          </div>
          <div className="dim-card__body">
            <div className="dim-card__block">
              <div className="dim-card__label">Justification</div>
              <p>{d.justification}</p>
            </div>
            <div className="dim-card__block">
              <div className="dim-card__label">Evidence</div>
              <ul className="evidence-list">
                {d.evidence.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* AI evaluation validation */}
      <div className="card" style={{ padding: 28, marginTop: 22 }}>
        <div className="detail-section-head">
          <h3><CheckCircle2 size={20} color="var(--green-600)" /> AI Evaluation Validation</h3>
          <p>Internal checkpoint that a recruiter has reviewed the AI evaluation result. It does not change the score and is not a requirement for announcement.</p>
        </div>
        {c.validated && <span className="pill pill--green" style={{ marginBottom: 18 }}>Validated</span>}
        <div className="prof-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
          <Field label="Validated By" value={c.validatedBy} />
          <Field label="Validation Time" value={c.validationTime} />
          <Field label="Validation Note" value="—" />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn--primary btn--sm"><CheckCircle2 size={15} /> Mark as Validated</button>
          <button className="btn btn--ghost btn--sm"><MessageSquareWarning size={15} /> Needs Discussion</button>
        </div>
        <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>
          The validation note is separate from the score override reason. Overriding a score does not automatically mark the result as validated.
        </p>
      </div>

      <p className="muted" style={{ textAlign: 'center', fontSize: 13.5, marginTop: 28 }}>
        Found a bug or have feedback? Contact support@mbclaboratory.com
      </p>
    </>
  )
}
