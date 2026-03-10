import { useCallback } from 'react'

export function useApi(baseUrl) {
  const req = useCallback(async (method, path, body) => {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    }
    if (body) opts.body = JSON.stringify(body)

    const res = await fetch(baseUrl + path, opts)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`HTTP ${res.status}: ${text}`)
    }
    const ct = res.headers.get('content-type') || ''
    return ct.includes('application/json') ? res.json() : res.text()
  }, [baseUrl])

  return {
    // Auth
    login:         (username, password)         => req('POST', '/api/login',                  { username, password }),
    // Banks
    addBank:       (bank)                       => req('POST', '/api/bank',                   bank),
    getAllBanks:   ()                            => req('GET',  '/api/banks'),
    // Users
    addUser:       (bankId, user)               => req('POST', `/api/bank/${bankId}/user`,    user),
    getUsersByBank:(bankId)                      => req('GET',  `/api/bank/${bankId}/users`),
    // Account
    deposit:       (userId, amount)             => req('POST', `/api/user/${userId}/deposit`, { amount }),
    getBalance:    (userId)                     => req('GET',  `/api/user/${userId}/balance`),
    transfer:      (userId, amount, toId)       => req('POST', `/api/user/${userId}/transfer`,{ amount, id: toId }),
    getTxHistory:  (userId)                     => req('GET',  `/api/user/${userId}/txhistory`),
  }
}
