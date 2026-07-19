import { CalendarDays, User } from 'lucide-react'
import { RECRUITMENT } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

export default function TopBar({ variant = 'default' }) {
  const { user } = useAuth()
  return (
    <div className="topbar">
      <div className="topbar__left">
        <div className="topbar__icon"><CalendarDays size={24} /></div>
        <div>
          <div className="topbar__title">{RECRUITMENT.title}</div>
          <div className="topbar__phase">Current phase: {RECRUITMENT.phase} · Division: {RECRUITMENT.division}</div>
        </div>
      </div>
      <div className="topbar__right">
        {variant === 'welcome' ? (
          <div className="welcome-pill">
            <span>✓</span> Welcome, {user?.name}
          </div>
        ) : (
          <div className="user-pill">
            <span className="role-tag">{user?.role}</span>
            <div className="user-pill__avatar"><User size={20} /></div>
            <span className="user-pill__email">{user?.email}</span>
          </div>
        )}
      </div>
    </div>
  )
}
