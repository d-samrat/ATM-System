import { useState } from 'react'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'

export function CustomerLoginPage({ api, onLogin, onBack }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleLogin = async () => {
    if (!username.trim() || !password.trim())
      return setError('Please enter both username and password.')
    try {
      setLoading(true)
      setError('')
      const user = await api.login(username, password)
      onLogin({ ...user, role: 'customer' })
    } catch (e) {
      setError(
        e.message.includes('401')
          ? 'Invalid username or password.'
          : `Connection error: ${e.message}`
      )
    } finally {
      setLoading(false)
    }
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
          <div style={{ fontSize: 32, marginBottom: 8 }}>👤</div>
          <div className="login-logo-text" style={{ fontSize: 24 }}>
            Customer <span>Login</span>
          </div>
          <div className="login-logo-sub">BankFlow Management System</div>
        </div>

        <div className="login-divider" />
        <div className="login-title">Sign in to your account</div>

        <Alert type="error" msg={error} />

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
          />
        </div>

        <button
          className="btn btn-primary btn-login"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <><Spinner /> Signing in…</> : '→ Sign In'}
        </button>

        <div style={{ marginTop: 16, textAlign: 'center', fontSize: 11, color: 'var(--text-dim)' }}>
          Contact your bank admin if you forgot your credentials
        </div>
      </div>
    </div>
  )
}
