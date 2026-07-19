import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles, FileCheck2, ShieldCheck, Users, Eye, EyeOff, KeyRound, LogIn, Cog,
} from 'lucide-react'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

const TRACKS = ['Red Team', 'Blue Team / SOC', 'Digital Forensics', 'App Security']

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('maliefrasyahermawan@gmail.com')
  const [password, setPassword] = useState('cybersecure')
  const [show, setShow] = useState(false)
  const [role, setRole] = useState('RECRUITER')

  const submit = (e) => {
    e.preventDefault()
    login(email, role)
    navigate('/', { replace: true })
  }

  return (
    <div className="auth">
      {/* ---------- Hero ---------- */}
      <section className="auth__hero">
        <div className="brand-row">
          <div className="brand">
            <div className="brand__logo"><Logo size={28} color="#fff" /></div>
            <div>
              <div className="brand__name">MBC Laboratory</div>
              <div className="brand__sub">ScreenAI Lab</div>
            </div>
          </div>
          <span className="chip">ScreenAI Lab</span>
        </div>

        <span className="auth__badge"><Sparkles size={15} /> Official Recruitment</span>

        <h1 className="auth__title">Cyber Security Recruitment Portal</h1>
        <p className="auth__lead">
          One official portal for candidates to take part in the Cyber Security selection
          process, manage documents, and track their registration status.
        </p>

        <div className="feature-card">
          <div className="feature-card__icon"><FileCheck2 size={22} /></div>
          <div>
            <h3>Structured selection stages</h3>
            <p>Track registration, document verification, evaluation, and announcements in one clear flow.</p>
            <div className="tag-row">
              {TRACKS.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        </div>

        <div className="mini-cards">
          <div className="mini-card">
            <div className="mini-card__icon"><ShieldCheck size={24} /></div>
            <h4>Candidate data is secure</h4>
            <p>The selection process runs through the official MBC Laboratory portal.</p>
          </div>
          <div className="mini-card">
            <div className="mini-card__icon"><Users size={24} /></div>
            <h4>Specialised focus</h4>
            <p>A dedicated Cyber Security division with easy-to-track selection status.</p>
          </div>
        </div>
      </section>

      {/* ---------- Form ---------- */}
      <section className="auth__form-wrap">
        <div className="auth-card">
          <span className="auth-card__badge">Candidate Portal</span>
          <h2>Sign in to the MBC Lab Recruitment Portal</h2>
          <p className="auth-card__lead">Manage your registration, documents, and selection status in one place.</p>

          <form onSubmit={submit}>
            <div className="field">
              <div className="field__label-row"><label>Sign in as</label></div>
              <div className="role-toggle">
                <button type="button" className={role === 'RECRUITER' ? 'active' : ''} onClick={() => setRole('RECRUITER')}>
                  <ShieldCheck size={16} /> Recruiter
                </button>
                <button type="button" className={role === 'ADMIN' ? 'active' : ''} onClick={() => setRole('ADMIN')}>
                  <Cog size={16} /> Admin
                </button>
              </div>
            </div>
            <div className="field">
              <div className="field__label-row"><label htmlFor="email">Email</label></div>
              <div className="input-wrap">
                <input
                  id="email" type="email" className="input" value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required
                />
              </div>
            </div>

            <div className="field">
              <div className="field__label-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="field__link" onClick={(e) => e.preventDefault()}>
                  <KeyRound size={14} /> Forgot password?
                </a>
              </div>
              <div className="input-wrap">
                <input
                  id="password" type={show ? 'text' : 'password'} className="input input--pw"
                  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" required
                />
                <button type="button" className="input-eye" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
                  {show ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn--primary btn--block">
              <LogIn size={19} /> Sign in
            </button>
          </form>

          <p className="auth-alt">
            Don&apos;t have an account? <a href="#" onClick={(e) => e.preventDefault()}>Create an account</a>
          </p>
          <div className="auth-hint">Demo portal — pick <b>Recruiter</b> or <b>Admin</b>, then click <b>Sign in</b>.</div>
        </div>
      </section>
    </div>
  )
}
