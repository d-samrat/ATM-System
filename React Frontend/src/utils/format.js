export function formatCurrency(n) {
  return `₹ ${Number(n || 0).toLocaleString('en-IN')}`
}

export function formatDate(s) {
  if (!s) return '—'
  try {
    return new Date(s).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return s
  }
}
