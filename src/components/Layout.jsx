import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import Logo from './Logo'

export default function Layout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="shell">
      <div className="mobile-bar">
        <button onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
        <Logo size={22} color="#b91c1c" />
        <strong>ScreenAI Lab</strong>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <Sidebar open={open} onNavigate={() => setOpen(false)} />

      <main className="main">
        <div className="fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
