import { useState, useEffect } from 'react'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'
import { EmptyState } from '../ui/EmptyState'

export function BanksPage({ api }) {
  const [banks, setBanks]   = useState([])
  const [loading, setLoading] = useState(false)
  const [name, setName]     = useState('')
  const [branch, setBranch] = useState('')
  const [status, setStatus] = useState(null)

  const load = () => {
    setLoading(true)
    api.getAllBanks()
      .then(setBanks)
      .catch(e => setStatus({ type: 'error', msg: e.message }))
      .finally(() => setLoading(false))
  }
  useEffect(load, [])

  const submit = async () => {
    if (!name.trim()) return setStatus({ type: 'error', msg: 'Bank name is required.' })
    try {
      setLoading(true)
      setStatus(null)
      await api.addBank({ name, branch })
      setStatus({ type: 'success', msg: `Bank "${name}" created successfully.` })
      setName('')
      setBranch('')
      load()
    } catch (e) {
      setStatus({ type: 'error', msg: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter">
      <div className="grid-2">
        {/* Create form */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">🏦</div>
            <div>
              <div className="card-title">Create Bank</div>
              <div className="card-sub">POST /api/bank</div>
            </div>
          </div>

          <Alert type={status?.type} msg={status?.msg} />

          <div className="form-group">
            <label className="form-label">Bank Name</label>
            <input
              className="form-input"
              placeholder="e.g. State Bank of India"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Branch (optional)</label>
            <input
              className="form-input"
              placeholder="e.g. Mumbai Main Branch"
              value={branch}
              onChange={e => setBranch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading ? <Spinner /> : '+'} Create Bank
          </button>
        </div>

        {/* Stats */}
        <div>
          <div className="stat-card">
            <div className="stat-label">Total Banks</div>
            <div className="stat-value">{banks.length}</div>
            <div className="stat-sub">registered in system</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon">📋</div>
          <div>
            <div className="card-title">All Banks</div>
            <div className="card-sub">GET /api/banks</div>
          </div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={load}
            disabled={loading}
            style={{ marginLeft: 'auto' }}
          >
            {loading ? <Spinner /> : '↻'} Refresh
          </button>
        </div>

        {banks.length === 0 && !loading ? (
          <EmptyState icon="🏦" text="No banks yet. Create one above." />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {banks.map(b => (
                  <tr key={b.id}>
                    <td><span className="badge badge-blue">#{b.id}</span></td>
                    <td style={{ fontWeight: 500 }}>{b.name}</td>
                    <td className="muted">{b.branch || '—'}</td>
                    <td><span className="badge badge-green">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
