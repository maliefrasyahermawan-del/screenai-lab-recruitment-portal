import { createContext, useContext, useState } from 'react'
import { RECRUITER } from '../data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem('screenai_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = (email, role = 'RECRUITER') => {
    const isAdmin = role === 'ADMIN'
    const u = {
      name: RECRUITER.name,
      email: email || RECRUITER.email,
      role: isAdmin ? 'ADMIN' : 'RECRUITER',
    }
    setUser(u)
    sessionStorage.setItem('screenai_user', JSON.stringify(u))
    return u
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('screenai_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
