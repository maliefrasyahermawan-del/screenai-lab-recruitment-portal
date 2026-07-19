import { createContext, useContext, useMemo, useState } from 'react'
import { ACCOUNTS, computeAccountStats, computeAccountsByRole } from '../data/mockData'

const AccountsContext = createContext(null)

function load() {
  try {
    const saved = sessionStorage.getItem('screenai_accounts')
    return saved ? JSON.parse(saved) : ACCOUNTS.map((a) => ({ ...a }))
  } catch {
    return ACCOUNTS.map((a) => ({ ...a }))
  }
}

function save(accounts) {
  sessionStorage.setItem('screenai_accounts', JSON.stringify(accounts))
}

export function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState(load)

  const update = (id, patch) => {
    setAccounts((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
      save(next)
      return next
    })
  }

  const setRole = (id, role) => update(id, { role })
  const setStatus = (id, status) => update(id, { status })
  const toggleBlock = (id) => {
    setAccounts((prev) => {
      const next = prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'Blocked' ? (a.prevStatus || 'Active') : 'Blocked', prevStatus: a.status === 'Blocked' ? undefined : a.status }
          : a
      )
      save(next)
      return next
    })
  }

  const stats = useMemo(() => computeAccountStats(accounts), [accounts])
  const byRole = useMemo(() => computeAccountsByRole(accounts), [accounts])

  return (
    <AccountsContext.Provider value={{ accounts, setRole, setStatus, toggleBlock, stats, byRole }}>
      {children}
    </AccountsContext.Provider>
  )
}

export const useAccounts = () => useContext(AccountsContext)
