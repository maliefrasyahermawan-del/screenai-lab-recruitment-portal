import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import Evaluation from './pages/Evaluation'
import Candidates from './pages/Candidates'
import DocumentVerification from './pages/DocumentVerification'
import Announcements from './pages/Announcements'
import Analytics from './pages/Analytics'
import Rubrics from './pages/Rubrics'
import Profile from './pages/Profile'
import CandidateDetail from './pages/CandidateDetail'
import AdminDashboard from './pages/AdminDashboard'
import Accounts from './pages/Accounts'

function HomeDashboard() {
  const { user } = useAuth()
  return user?.role === 'ADMIN' ? <AdminDashboard /> : <Dashboard />
}

function Protected({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default function App() {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<HomeDashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="applications" element={<Applications />} />
        <Route path="evaluation" element={<Evaluation />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="candidates/:id" element={<CandidateDetail />} />
        <Route path="documents" element={<DocumentVerification />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="rubrics" element={<Rubrics />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
