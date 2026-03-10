import { useState, useEffect } from 'react'
import { Alert } from '../ui/Alert'
import { Spinner } from '../ui/Spinner'
import { EmptyState } from '../ui/EmptyState'
import { formatCurrency, formatDate } from '../../utils/format'

export function TransactionsPage({ api, loggedInUser }) {
  // Customer: pre-locked to their own ID. Admin: can pick any.
  const isCustomer = loggedInUser?.role === 'customer'

  const [selectedUser, setSelectedUser] = useState(
    isCustomer ? String(loggedInUser.id) : ''
  )
  const [balance, setBalance]   = useState(null)
  const [history, setHistory]   = useState([])
  const [depositAmt, setDepositAmt] = useState('')
  const [transferAmt, setTransferAmt] = useState('')
  const [transferTo, setTransferTo]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [status, setStatus]     = useState(null)

  const refreshUser = (uid) => {
    const id = uid || selectedUser
    if (!id) return
    api.getBalance(id).then(setBalance).catch(() => setBalance(null))
    api.getTxHistory(id).then(setHistory).catch(() => setHistory([]))
  }

  useEffect(() => {
    setBalance(null)
    setHistory([])
    refreshUser(selectedUser)
  }, [selectedUser])

  const doDeposit = async () => {
    if (!depositAmt || isNaN(depositAmt) || Number(depositAmt) <= 0)
      return setStatus({ type: 'error', msg: 'Enter a valid amount.' })
    try {
      setLoading(true); setStatus(null)
      await api.deposit(selectedUser, Number(depositAmt))
      setStatus({ type: 'success', msg: `Deposited ${formatCurrency(depositAmt)} successfully.` })
      setDepositAmt('')
      refreshUser()
    } catch (e) {
      setStatus({ type: 'error', msg: e.message })
    } finally { setLoading(false) }
  }

  const doTransfer = async () => {
    if (!transferAmt || isNaN(transferAmt) || Number(transferAmt) <= 0)
      return setStatus({ type: 'error', msg: 'Enter a valid transfer amount.' })
    if (!transferTo)
      return setStatus({ type: 'error', msg: 'Enter a recipient user ID.' })
    try {
      setLoading(true); setStatus(null)
      await api.transfer(selectedUser, Number(transferAmt), Number(transferTo))
      setStatus({ type: 'success', msg: `Transferred ${formatCurrency(transferAmt)} to user #${transferTo}.` })
      setTransferAmt(''); setTransferTo('')
      refreshUser()
    } catch (e) {
      setStatus({ type: 'error', msg: e.message })
    } finally { setLoading(false) }
  }

  return (
    <div className="page-enter">

      {/* If customer: show their info banner. If admin: show a user ID input */}
      {isCustomer ? (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header" style={{ marginBottom: 0 }}>
            <div className="card-icon">🔍</div>
            <div>
              <div className="card-title">{loggedInUser.name}'s Account</div>
              <div className="card-sub">User ID #{loggedInUser.id}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header">
            <div className="card-icon">🔍</div>
            <div>
              <div className="card-title">Look Up Account</div>
              <div className="card-sub">Enter a user ID to manage their account</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="form-label">User ID</label>
              <input
                className="form-input"
                type="number"
                placeholder="e.g. 3"
                value={selectedUser}
                onChange={e => setSelectedUser(e.target.value)}
              />
            </div>
            <button className="btn btn-secondary" onClick={() => refreshUser(selectedUser)}>
              Load Account
            </button>
          </div>
        </div>
      )}

      {selectedUser && (
        <>
          {/* Balance stats */}
          <div className="grid-3" style={{ marginBottom: 20 }}>
            <div className="stat-card">
              <div className="stat-label">Current Balance</div>
              <div className="stat-value">
                {balance !== null ? formatCurrency(balance) : <Spinner />}
              </div>
              <div className="stat-sub">User #{selectedUser}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Transactions</div>
              <div className="stat-value" style={{ color: 'var(--accent2)' }}>
                {history.length}
              </div>
              <div className="stat-sub">total in history</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Status</div>
              <div className="stat-value" style={{ fontSize: 20, marginTop: 6 }}>
                <span className="badge badge-green">Active</span>
              </div>
              <div className="stat-sub">account standing</div>
            </div>
          </div>

          <Alert type={status?.type} msg={status?.msg} />

          <div className="grid-2" style={{ marginBottom: 20 }}>
            {/* Deposit */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'rgba(0,229,160,0.1)' }}>⬇</div>
                <div>
                  <div className="card-title">Deposit</div>
                  <div className="card-sub">POST /api/user/{'{id}'}/deposit</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="e.g. 5000"
                  value={depositAmt}
                  onChange={e => setDepositAmt(e.target.value)}
                  min="1"
                />
              </div>
              <button className="btn btn-primary" onClick={doDeposit} disabled={loading}>
                {loading ? <Spinner /> : '⬇'} Deposit Funds
              </button>
            </div>

            {/* Transfer */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon" style={{ background: 'rgba(255,107,53,0.1)', borderColor: 'rgba(255,107,53,0.2)' }}>↗</div>
                <div>
                  <div className="card-title">Transfer</div>
                  <div className="card-sub">POST /api/user/{'{id}'}/transfer</div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Recipient User ID</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="e.g. 3"
                  value={transferTo}
                  onChange={e => setTransferTo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  placeholder="e.g. 1000"
                  value={transferAmt}
                  onChange={e => setTransferAmt(e.target.value)}
                  min="1"
                />
              </div>
              <button
                className="btn"
                style={{ background: 'rgba(255,107,53,0.15)', color: 'var(--accent3)', border: '1px solid rgba(255,107,53,0.25)' }}
                onClick={doTransfer}
                disabled={loading}
              >
                {loading ? <Spinner /> : '↗'} Transfer Funds
              </button>
            </div>
          </div>

          {/* TX History */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon" style={{ background: 'rgba(0,119,255,0.1)', borderColor: 'rgba(0,119,255,0.2)' }}>📜</div>
              <div>
                <div className="card-title">Transaction History</div>
                <div className="card-sub">GET /api/user/{'{id}'}/txhistory</div>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => refreshUser()}
                style={{ marginLeft: 'auto' }}
              >
                ↻ Refresh
              </button>
            </div>

            {history.length === 0 ? (
              <EmptyState icon="📜" text="No transactions yet." />
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th><th>Type</th><th>Amount</th>
                      <th>From</th><th>To</th><th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((tx, i) => {
                      const isCredit =
                        tx.toUserId == selectedUser ||
                        tx.type === 'CREDIT' ||
                        tx.type === 'DEPOSIT'
                      return (
                        <tr key={tx.id || i}>
                          <td><span className="badge badge-blue">#{tx.id || i}</span></td>
                          <td>
                            <span className={`badge ${isCredit ? 'badge-green' : 'badge-red'}`}>
                              {tx.type || (isCredit ? 'CREDIT' : 'DEBIT')}
                            </span>
                          </td>
                          <td className={isCredit ? 'tx-credit' : 'tx-debit'} style={{ fontWeight: 600 }}>
                            {isCredit ? '+' : '-'}{formatCurrency(tx.amount)}
                          </td>
                          <td className="muted">#{tx.fromUserId || tx.senderId || '—'}</td>
                          <td className="muted">#{tx.toUserId   || tx.receiverId || '—'}</td>
                          <td className="muted">{formatDate(tx.timestamp || tx.date || tx.createdAt)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {!selectedUser && (
        <div className="card">
          <EmptyState icon="💳" text={isCustomer ? 'Loading your account…' : 'Enter a user ID above to view their account.'} />
        </div>
      )}
    </div>
  )
}
