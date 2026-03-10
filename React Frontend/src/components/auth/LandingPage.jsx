export function LandingPage({ onChoose }) {
  return (
    <div className="login-screen">
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', animation: 'fadeUp 0.4s ease' }}>

        <div className="login-logo" style={{ marginBottom: 48 }}>
          <div className="login-logo-text">BankFlow <span>Management System</span></div>
          {/* <div className="login-logo-sub">Banking System</div> */}
        </div>

        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 36, letterSpacing: '0.5px' }}>
          Who are you signing in as?
        </div>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'center' }}>
          {/* Admin Card */}
          <RoleCard
            emoji="🛡️"
            title="Admin"
            description={<>Manage banks,<br />register users,<br />system oversight</>}
            buttonLabel="Admin Login →"
            accentRgb="255,107,53"
            accentVar="var(--accent3)"
            onClick={() => onChoose('admin')}
          />

          {/* Customer Card */}
          <RoleCard
            emoji="👤"
            title="Customer"
            description={<>Check balance,<br />deposit & transfer,<br />transaction history</>}
            buttonLabel="Customer Login →"
            accentRgb="0,229,160"
            accentVar="var(--accent)"
            onClick={() => onChoose('customer')}
          />
        </div>
      </div>
    </div>
  )
}

function RoleCard({ emoji, title, description, buttonLabel, accentRgb, accentVar, onClick }) {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.borderColor = `rgba(${accentRgb},0.5)`
    e.currentTarget.style.background = `rgba(${accentRgb},0.05)`
    e.currentTarget.style.transform = 'translateY(-4px)'
  }
  const handleMouseLeave = (e) => {
    e.currentTarget.style.borderColor = 'var(--border)'
    e.currentTarget.style.background = 'var(--surface)'
    e.currentTarget.style.transform = 'translateY(0)'
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 200, padding: '32px 24px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16, cursor: 'pointer',
        transition: 'all 0.2s', textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 16 }}>{emoji}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>
        {description}
      </div>
      <div style={{
        marginTop: 20, padding: '7px 0', borderRadius: 8,
        background: `rgba(${accentRgb},0.12)`,
        color: accentVar,
        border: `1px solid rgba(${accentRgb},0.2)`,
        fontSize: 12,
      }}>
        {buttonLabel}
      </div>
    </div>
  )
}
