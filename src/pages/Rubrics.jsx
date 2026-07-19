import { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronRight, ChevronDown, X, Save } from 'lucide-react'
import TopBar from '../components/TopBar'
import { RUBRICS, TRACKS } from '../data/mockData'

const DIV_OPTS = ['Cyber Security', ...TRACKS.map((t) => t.name)]

function blankDimension() {
  return { name: '', weight: 0, description: '', indicators: [''] }
}

function RubricEditor({ rubric, onCancel }) {
  const [form, setForm] = useState(() => ({
    name: rubric.name,
    position: rubric.position || `${rubric.track} Division`,
    division: rubric.track,
    desc: rubric.desc,
    dimensions: rubric.dimensions.map((d) => ({
      name: d.name,
      weight: d.weight,
      description: d.description || '',
      indicators: d.indicators ? [...d.indicators] : [],
    })),
  }))

  const total = form.dimensions.reduce((s, d) => s + (Number(d.weight) || 0), 0)

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const setDim = (i, k, v) => setForm((f) => {
    const dims = [...f.dimensions]; dims[i] = { ...dims[i], [k]: v }; return { ...f, dimensions: dims }
  })
  const addDim = () => setForm((f) => ({ ...f, dimensions: [...f.dimensions, blankDimension()] }))
  const delDim = (i) => setForm((f) => ({ ...f, dimensions: f.dimensions.filter((_, idx) => idx !== i) }))
  const setInd = (di, ii, v) => setForm((f) => {
    const dims = [...f.dimensions]; const inds = [...dims[di].indicators]; inds[ii] = v
    dims[di] = { ...dims[di], indicators: inds }; return { ...f, dimensions: dims }
  })
  const addInd = (di) => setForm((f) => {
    const dims = [...f.dimensions]; dims[di] = { ...dims[di], indicators: [...dims[di].indicators, ''] }
    return { ...f, dimensions: dims }
  })
  const delInd = (di, ii) => setForm((f) => {
    const dims = [...f.dimensions]; dims[di] = { ...dims[di], indicators: dims[di].indicators.filter((_, idx) => idx !== ii) }
    return { ...f, dimensions: dims }
  })

  return (
    <>
      <div className="editor-head">
        <div>
          <h2 style={{ fontSize: 34, fontWeight: 800 }}>{rubric.__new ? 'New Rubric' : 'Edit Rubric'}</h2>
          <p className="muted" style={{ fontSize: 15.5, marginTop: 8 }}>Define competency dimensions and their weights.</p>
        </div>
        <button className="editor-cancel" onClick={onCancel}><X size={18} /> Cancel</button>
      </div>

      {/* Rubric details */}
      <div className="form-panel">
        <div className="form-panel__title">Rubric Details</div>
        <div className="form-grid-3">
          <div className="form-field">
            <label>Rubric Name</label>
            <input value={form.name} onChange={(e) => setField('name', e.target.value)} />
          </div>
          <div className="form-field">
            <label>Position</label>
            <input value={form.position} onChange={(e) => setField('position', e.target.value)} />
          </div>
          <div className="form-field">
            <label>Division</label>
            <div className="select" style={{ width: '100%' }}>
              <select value={form.division} onChange={(e) => setField('division', e.target.value)} style={{ minWidth: 0, width: '100%' }}>
                {DIV_OPTS.map((d) => <option key={d}>{d}</option>)}
              </select>
              <ChevronDown size={17} />
            </div>
          </div>
        </div>
        <div className="form-field">
          <label>Description (optional)</label>
          <textarea value={form.desc} onChange={(e) => setField('desc', e.target.value)} />
        </div>
      </div>

      {/* Dimensions */}
      <div className="form-panel">
        <div className="dims-head">
          <div>
            <h3 style={{ fontSize: 21, fontWeight: 700 }}>Dimensions</h3>
            <div className="total-weight">
              Total weight: <b className={total === 100 ? 'ok' : 'bad'}>{total}%</b> / 100%
            </div>
          </div>
          <button className="btn btn--ghost btn--sm" onClick={addDim}><Plus size={16} /> Add Dimension</button>
        </div>

        {form.dimensions.map((d, di) => (
          <div className="dim-editor" key={di}>
            <div className="dim-editor__top">
              <div>
                <label className="dim-editor__label">Dimension Name</label>
                <input value={d.name} onChange={(e) => setDim(di, 'name', e.target.value)} />
              </div>
              <div>
                <label className="dim-editor__label">Weight (%)</label>
                <input type="number" value={d.weight} onChange={(e) => setDim(di, 'weight', e.target.value)} />
              </div>
              <button className="dim-del" title="Remove dimension" onClick={() => delDim(di)}><Trash2 size={17} /></button>
            </div>

            <div style={{ marginTop: 14 }}>
              <label className="dim-editor__label">Description (optional)</label>
              <input placeholder="What does this dimension measure?" value={d.description} onChange={(e) => setDim(di, 'description', e.target.value)} />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="dim-editor__label">Indicators</label>
              {d.indicators.map((ind, ii) => (
                <div className="indicator-row" key={ii}>
                  <input value={ind} onChange={(e) => setInd(di, ii, e.target.value)} placeholder="Add an indicator…" />
                  <button className="indicator-x" onClick={() => delInd(di, ii)}><X size={16} /></button>
                </div>
              ))}
              <button className="add-link" onClick={() => addInd(di)}><Plus size={15} /> Add Indicator</button>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn btn--primary"><Save size={17} /> Save Rubric</button>
          <button className="btn btn--ghost" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default function Rubrics() {
  const [open, setOpen] = useState('core')
  const [editing, setEditing] = useState(null)

  if (editing) {
    return (
      <>
        <TopBar />
        <RubricEditor rubric={editing} onCancel={() => setEditing(null)} />
      </>
    )
  }

  return (
    <>
      <TopBar />
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="crumb">Configuration <span>/</span> Rubrics</div>
          <h2>Rubrics</h2>
          <p>Manage scoring rubrics used to evaluate candidates.</p>
        </div>
        <button className="btn btn--primary" onClick={() => setEditing({ __new: true, name: '', track: 'Cyber Security', tag: 'Cyber Security', desc: '', dimensions: [blankDimension()] })}>
          <Plus size={18} /> New Rubric
        </button>
      </div>

      <div className="rubric-list">
        {RUBRICS.map((r) => {
          const isOpen = open === r.key
          const total = r.dimensions.reduce((s, d) => s + d.weight, 0)
          return (
            <div className={`rubric-item ${isOpen ? 'open' : ''}`} key={r.key}>
              <div className="rubric-item__head">
                <div style={{ flex: 1 }}>
                  <div className="rubric-item__title">
                    <h4>{r.name}</h4>
                    <span className="tag-div">{r.track} Division</span>
                    <span className="tag-outline">{r.tag}</span>
                    {r.active && <span className="pill pill--green" style={{ fontSize: 11.5 }}>Active</span>}
                  </div>
                  <p className="rubric-item__desc">{r.dimensions.length} dimension(s) · {r.desc}</p>
                </div>
                <div className="rubric-item__actions">
                  <button className="icon-btn" title="Edit" onClick={() => setEditing(r)}><Pencil size={16} /></button>
                  <button className="icon-btn" title="Delete"><Trash2 size={16} /></button>
                  <button className="icon-btn" title="Expand" onClick={() => setOpen(isOpen ? null : r.key)}>
                    {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="rubric-dims">
                  {r.dimensions.map((d) => (
                    <div className="weight-row" key={d.name}>
                      <div className="weight-row__name">{d.name}</div>
                      <div className="weight-row__desc">{d.description || 'Scoring dimension used by AI evaluation for this track.'}</div>
                      <div className="weight-row__val">{d.weight}%</div>
                    </div>
                  ))}
                  <div className="weight-row" style={{ borderTop: '2px solid var(--line-strong)', borderBottom: 'none' }}>
                    <div className="weight-row__name" style={{ color: 'var(--ink-900)' }}>Total weight</div>
                    <div className="weight-row__desc" />
                    <div className="weight-row__val" style={{ color: total === 100 ? 'var(--green-600)' : 'var(--amber-600)' }}>{total}%</div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
