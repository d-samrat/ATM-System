export function Alert({ type, msg }) {
  if (!msg) return null
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'
  return (
    <div className={`alert alert-${type}`}>
      <span>{icon}</span>
      {msg}
    </div>
  )
}
