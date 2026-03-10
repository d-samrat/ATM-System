import { useState } from 'react'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'

// ⚠️ Hardcoded admin credentials — fine for learning, change before going to production
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export function AdminLoginPage({ onLogin, onBack }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleLogin = () => {
    if (!username || !password) return setError('Please fill in both fields.')
    setLoading(true)
    // Small timeout so it doesn't feel instant
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLogin({ role: 'admin', name: 'Administrator' })
      } else {
        setError('Invalid admin credentials.')
        setLoading(false)
      }
    }, 500)
  }

  const handleKey = (e) => { if (e.key === 'Enter') handleLogin() }

  return (
    <div className="login-screen">
      <div className="login-box">
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: 'var(--text-muted)',
          cursor: 'pointer', fontSize: 12, marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 6, padding: 0,
        }}>
          ← Back
        </button>

        <div className="login-logo">
          <div style={{ fontSize: 32, marginBottom: 8 }}>🛡️</div>
          <div className="login-logo-text" style={{ fontSize: 24 }}>
            Admin <span>Portal</span>
          </div>
          <div className="login-logo-sub">Restricted Access</div>
        </div>

        <div className="login-divider" />
        <div className="login-title">Administrator Sign In</div>

        <Alert type="error" msg={error} />

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            placeholder="admin"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>

        <button
          className="btn btn-login"
          style={{
            background: 'rgba(255,107,53,0.15)',
            color: 'var(--accent3)',
            border: '1px solid rgba(255,107,53,0.3)',
            width: '100%',
            justifyContent: 'center',
            marginTop: 6,
          }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <><Spinner /> Verifying…</> : '🛡️ Sign In as Admin'}
        </button>
      </div>
    </div>
  )
}
