import { useState, useEffect } from 'react'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'
import { EmptyState } from '../ui/EmptyState'

export function UsersPage({ api }) {
  const [banks, setBanks]           = useState([])
  const [selectedBank, setSelectedBank] = useState('')
  const [users, setUsers]           = useState([])
  const [loadingBanks, setLoadingBanks] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [name, setName]             = useState('')
  const [email, setEmail]           = useState('')
  const [username, setUsername]     = useState('')
  const [password, setPassword]     = useState('')
  const [status, setStatus]         = useState(null)

  useEffect(() => {
    setLoadingBanks(true)
    api.getAllBanks().then(setBanks).finally(() => setLoadingBanks(false))
  }, [])

  const loadUsers = () => {
    if (!selectedBank) return
    setLoadingUsers(true)
    api.getUsersByBank(selectedBank)
      .then(setUsers)
      .catch(e => setStatus({ type: 'error', msg: e.message }))
      .finally(() => setLoadingUsers(false))
  }
  useEffect(() => { setUsers([]); loadUsers() }, [selectedBank])

  const submit = async () => {
    if (!selectedBank) return setStatus({ type: 'error', msg: 'Select a bank first.' })
    if (!name.trim())  return setStatus({ type: 'error', msg: 'Full name is required.' })
    if (!username.trim()) return setStatus({ type: 'error', msg: 'Username is required for login.' })
    if (!password.trim()) return setStatus({ type: 'error', msg: 'Password is required.' })
    try {
      setLoadingUsers(true)
      setStatus(null)
      await api.addUser(selectedBank, { name, email, username, password })
      setStatus({ type: 'success', msg: `User "${name}" added to bank.` })
      setName(''); setEmail(''); setUsername(''); setPassword('')
      loadUsers()
    } catch (e) {
      setStatus({ type: 'error', msg: e.message })
    } finally {
      setLoadingUsers(false)
    }
  }

  return (
    <div className="page-enter">
      <div className="grid-2">
        {/* Add user form */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">👤</div>
            <div>
              <div className="card-title">Add User</div>
              <div className="card-sub">POST /api/bank/{'{id}'}/user</div>
            </div>
          </div>

          <Alert type={status?.type} msg={status?.msg} />

          <div className="form-group">
            <label className="form-label">Bank</label>
            <select
              className="select-input"
              value={selectedBank}
              onChange={e => setSelectedBank(e.target.value)}
            >
              <option value="">— Select bank —</option>
              {banks.map(b => (
                <option key={b.id} value={b.id}>#{b.id} {b.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="e.g. Ravi Kumar" value={name}
              onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email (optional)</label>
            <input className="form-input" placeholder="e.g. ravi@example.com" value={email}
              onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" placeholder="e.g. ravi123" value={username}
              onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Set a password" value={password}
              onChange={e => setPassword(e.target.value)} />
          </div>

          <button className="btn btn-primary" onClick={submit} disabled={loadingUsers}>
            {loadingUsers ? <Spinner /> : '+'} Add User
          </button>
        </div>

        {/* Users list */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">👥</div>
            <div>
              <div className="card-title">Users in Bank</div>
              <div className="card-sub">GET /api/bank/{'{id}'}/users</div>
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={loadUsers}
              disabled={loadingUsers || !selectedBank}
              style={{ marginLeft: 'auto' }}
            >
              ↻
            </button>
          </div>

          {!selectedBank ? (
            <EmptyState icon="🏦" text="Select a bank to view its users." />
          ) : loadingUsers ? (
            <EmptyState icon={<Spinner />} text="Loading..." />
          ) : users.length === 0 ? (
            <EmptyState icon="👤" text="No users in this bank yet." />
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Username</th><th>Email</th></tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td><span className="badge badge-blue">#{u.id}</span></td>
                      <td style={{ fontWeight: 500 }}>{u.name}</td>
                      <td className="muted">{u.username || '—'}</td>
                      <td className="muted">{u.email || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
