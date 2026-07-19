import { ShieldCheck, Pencil } from 'lucide-react'
import TopBar from '../components/TopBar'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'ADMIN'
  const roleLabel = isAdmin ? 'ADMIN' : 'RECRUITER'

  return (
    <>
      <TopBar />
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="crumb">Account</div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {isAdmin ? 'Admin Profile' : 'Recruiter Profile'}
            <span className="badge-soft blue" style={{ fontSize: 12.5 }}>{roleLabel}</span>
          </h2>
          <p>Account summary for the current {isAdmin ? 'administrator' : 'recruiter'}.</p>
        </div>
        <button className="btn btn--primary"><Pencil size={16} /> Edit Profile</button>
      </div>

      <div className="card" style={{ padding: 30 }}>
        <div className="detail-section-head">
          <h3><ShieldCheck size={20} color="var(--red-600)" /> Account Summary</h3>
          <p>Review your account identity and role assignment.</p>
        </div>
        <div className="prof-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px 40px' }}>
          <div className="prof-field">
            <div className="prof-field__label">Full Name</div>
            <div className="prof-field__value">{user?.name}</div>
          </div>
          <div className="prof-field">
            <div className="prof-field__label">Email</div>
            <div className="prof-field__value">{user?.email}</div>
          </div>
          <div className="prof-field">
            <div className="prof-field__label">Role</div>
            <div className="prof-field__value"><span className="badge-soft blue">{roleLabel}</span></div>
          </div>
          <div className="prof-field">
            <div className="prof-field__label">Account Status</div>
            <div className="prof-field__value"><span className="badge-soft green">ACTIVE</span></div>
          </div>
        </div>
      </div>

      <p className="muted" style={{ textAlign: 'center', fontSize: 13.5, marginTop: 28 }}>
        Found a bug or have feedback? Contact support@mbclaboratory.com
      </p>
    </>
  )
}
