import { useState } from 'react'
import { useApi } from './hooks/useApi'
import { LandingPage }       from './components/auth/LandingPage'
import { AdminLoginPage }    from './components/auth/AdminLoginPage'
import { CustomerLoginPage } from './components/auth/CustomerLoginPage'
import { BanksPage }         from './components/pages/BanksPage'
import { UsersPage }         from './components/pages/UsersPage'
import { TransactionsPage }  from './components/pages/TransactionsPage'

// screen: 'landing' | 'adminLogin' | 'customerLogin' | 'app'
export default function App() {
  const [screen, setScreen]   = useState('landing')
  const [session, setSession] = useState(null)   // { role, name, id, username, ... }
  const [page, setPage]       = useState('banks')
  const [baseUrl, setBaseUrl] = useState('http://localhost:8080')

  const api = useApi(baseUrl)

  const handleChoose = (role) =>
    setScreen(role === 'admin' ? 'adminLogin' : 'customerLogin')

  const handleLogin = (sessionData) => {
    setSession(sessionData)
    setPage(sessionData.role === 'admin' ? 'banks' : 'transactions')
    setScreen('app')
  }

  const handleLogout = () => {
    setSession(null)
    setScreen('landing')
  }

  // ── Auth screens ──────────────────────────────────────────────────────────
  if (screen === 'landing')
    return <LandingPage onChoose={handleChoose} />

  if (screen === 'adminLogin')
    return <AdminLoginPage onLogin={handleLogin} onBack={() => setScreen('landing')} />

  if (screen === 'customerLogin')
    return <CustomerLoginPage api={api} onLogin={handleLogin} onBack={() => setScreen('landing')} />

  // ── Main app ──────────────────────────────────────────────────────────────
  const isAdmin = session.role === 'admin'

  const NAV = isAdmin
    ? [
        { id: 'banks', label: 'Banks', icon: '🏦', section: 'Management' },
        { id: 'users', label: 'Users', icon: '👥', section: 'Management' },
      ]
    : [
        { id: 'transactions', label: 'My Account', icon: '💳', section: 'Account' },
      ]

  const titles = {
    banks:        'Bank Management',
    users:        'User Management',
    transactions: 'My Account',
  }

  const displayName = session.name || session.username || (isAdmin ? 'Admin' : 'User')
  const initials    = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  const accentRgb   = isAdmin ? '255,107,53' : '0,229,160'
  const accentVar   = isAdmin ? 'var(--accent3)' : 'var(--accent)'
  const roleBorder  = `rgba(${accentRgb},0.3)`

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <div className="sidebar">
        <div className="logo-area">
          <div className="logo">BankFlow <span>Management System</span></div>
          <div className="logo-sub">{isAdmin ? 'Admin Console' : 'Customer Portal'}</div>
        </div>

        <nav className="nav">
          <div className="nav-section-label">{NAV[0]?.section}</div>
          {NAV.map(item => (
            <div
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => setPage(item.id)}
              style={page === item.id && isAdmin ? {
                background: 'rgba(255,107,53,0.08)',
                color: 'var(--accent3)',
                borderColor: 'rgba(255,107,53,0.2)',
              } : {}}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Role badge */}
        <div style={{
          margin: '0 12px 12px', padding: '10px 14px',
          background: `rgba(${accentRgb},0.06)`,
          border: `1px solid ${roleBorder}`,
          borderRadius: 8, fontSize: 11,
        }}>
          <div style={{ fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 4 }}>
            Signed in as
          </div>
          <div style={{ color: accentVar, fontWeight: 500 }}>
            {isAdmin ? '🛡️ Administrator' : '👤 ' + displayName}
          </div>
        </div>

        <div className="api-indicator">
          <div className="api-label">API Base URL</div>
          <div className="api-url-display">{baseUrl}</div>
        </div>
      </div>

      {/* ── MAIN ────────────────────────────────────────────────────────── */}
      <div className="main">
        <div className="topbar">
          <div className="topbar-title">{titles[page]}</div>
          <div className="base-url-label">Base URL:</div>
          <input
            className="base-url-input"
            value={baseUrl}
            onChange={e => setBaseUrl(e.target.value.replace(/\/$/, ''))}
            placeholder="http://localhost:8080"
          />
          <div className="user-pill" style={{ borderColor: roleBorder }}>
            <div className="user-avatar" style={{
              background: `rgba(${accentRgb},0.15)`,
              borderColor: roleBorder,
              color: accentVar,
            }}>
              {initials}
            </div>
            <span>{displayName}</span>
            <span style={{
              fontSize: 9, letterSpacing: '1px', textTransform: 'uppercase',
              color: accentVar, padding: '1px 5px',
              background: `rgba(${accentRgb},0.1)`, borderRadius: 4,
            }}>
              {isAdmin ? 'ADMIN' : 'USER'}
            </span>
            <button className="logout-btn" onClick={handleLogout} title="Sign out">✕</button>
          </div>
        </div>

        <div className="content">
          {page === 'banks'        && <BanksPage api={api} />}
          {page === 'users'        && <UsersPage api={api} />}
          {page === 'transactions' && <TransactionsPage api={api} loggedInUser={session} />}
        </div>
      </div>
    </div>
  )
}
