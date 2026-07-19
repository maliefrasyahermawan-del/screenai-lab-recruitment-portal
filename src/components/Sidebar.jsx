import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, Sparkles, Users, ShieldCheck,
  Bell, BarChart3, FileText, LogOut, GraduationCap, UserCog,
} from 'lucide-react'
import Logo from './Logo'
import { useAuth } from '../context/AuthContext'

const RECRUITER_NAV = [
  {
    label: 'Overview',
    items: [{ to: '/', end: true, icon: LayoutDashboard, text: 'Dashboard' }],
  },
  {
    label: 'Recruitment',
    items: [
      { to: '/applications', icon: ClipboardList, text: 'Applications' },
      { to: '/evaluation', icon: Sparkles, text: 'Evaluation' },
      { to: '/candidates', icon: Users, text: 'Candidates' },
      { to: '/documents', icon: ShieldCheck, text: 'Document Verification', badge: 1 },
      { to: '/announcements', icon: Bell, text: 'Announcements' },
      { to: '/analytics', icon: BarChart3, text: 'Analytics' },
    ],
  },
  {
    label: 'Configuration',
    items: [{ to: '/rubrics', icon: FileText, text: 'Rubrics' }],
  },
]

const ADMIN_NAV = [
  {
    label: 'Overview',
    items: [{ to: '/', end: true, icon: LayoutDashboard, text: 'Dashboard' }],
  },
  {
    label: 'Administration',
    items: [
      { to: '/accounts', icon: UserCog, text: 'Accounts' },
      { to: '/candidates', icon: Users, text: 'Candidates' },
      { to: '/applications', icon: ClipboardList, text: 'Applications' },
      { to: '/analytics', icon: BarChart3, text: 'Analytics' },
    ],
  },
  {
    label: 'Configuration',
    items: [{ to: '/rubrics', icon: FileText, text: 'Rubrics' }],
  },
]

export default function Sidebar({ open, onNavigate }) {
  const { user, logout } = useAuth()
  const NAV = user?.role === 'ADMIN' ? ADMIN_NAV : RECRUITER_NAV
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar__brand">
        <div className="sidebar__logo"><Logo size={26} color="#fff" /></div>
        <div>
          <h1>ScreenAI Lab</h1>
          <span>MBC Laboratory Recruitment</span>
        </div>
      </div>

      {NAV.map((group) => (
        <div className="nav-group" key={group.label}>
          <div className="nav-group__label">{group.label}</div>
          {group.items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} strokeWidth={2} />
              <span>{item.text}</span>
              {item.badge ? <span className="badge-dot">{item.badge}</span> : null}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="sidebar__account">
        <div className="nav-group__label">Account</div>
        <NavLink
          to="/profile"
          onClick={onNavigate}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <GraduationCap size={20} /> <span>Profile</span>
        </NavLink>
        <div className="acct-card" style={{ marginTop: 10 }}>
          <div className="acct-card__email">{user?.email}</div>
          <span className="acct-card__role">{user?.role}</span>
        </div>
        <button className="logout" onClick={logout}>
          <LogOut size={19} /> Log out
        </button>
      </div>
    </aside>
  )
}
