import { useState, useEffect } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const AUTH_BASE = "http://localhost:8765/auth-service/auth";
const ACCOUNT_BASE = "http://localhost:8765/account-service/account";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #2E7D4F;
    --green-light: #4CAF73;
    --green-pale: #E8F5EE;
    --green-dark: #1B5235;
    --white: #FFFFFF;
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-400: #9CA3AF;
    --gray-600: #4B5563;
    --gray-800: #1F2937;
    --red: #DC2626;
    --red-light: #FEE2E2;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
    --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
    --radius: 16px;
    --radius-sm: 10px;
  }

  body { font-family: 'Inter', sans-serif; background: var(--gray-50); color: var(--gray-800); }

  /* ── NAVBAR ── */
  .navbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 68px;
    background: var(--white); border-bottom: 1px solid var(--gray-200);
    position: sticky; top: 0; z-index: 100;
    box-shadow: var(--shadow-sm);
  }
  .navbar-brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .navbar-logo-icon {
    width: 36px; height: 36px; background: var(--green);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
  }
  .navbar-logo-icon svg { width: 20px; height: 20px; fill: white; }
  .navbar-brand-name { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--green-dark); }
  .navbar-links { display: flex; gap: 8px; align-items: center; }
  .nav-btn {
    padding: 8px 20px; border-radius: 8px; font-size: 0.9rem; font-weight: 500;
    cursor: pointer; border: none; transition: all 0.18s;
  }
  .nav-btn-ghost { background: transparent; color: var(--gray-600); }
  .nav-btn-ghost:hover { background: var(--gray-100); color: var(--gray-800); }
  .nav-btn-solid { background: var(--green); color: white; }
  .nav-btn-solid:hover { background: var(--green-dark); }
  .nav-user { display: flex; align-items: center; gap: 12px; }
  .nav-avatar {
    width: 38px; height: 38px; border-radius: 50%; background: var(--green-pale);
    border: 2px solid var(--green); display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }
  .nav-avatar svg { width: 20px; height: 20px; fill: var(--green); }
  .nav-logout {
    padding: 7px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 500;
    background: transparent; color: var(--red); border: 1px solid var(--red);
    cursor: pointer; transition: all 0.18s;
  }
  .nav-logout:hover { background: var(--red-light); }

  /* ── LANDING ── */
  .landing { min-height: calc(100vh - 68px); }
  .hero {
    display: flex; flex-direction: column; align-items: center;
    padding: 80px 24px 40px;
    background: linear-gradient(160deg, var(--green-pale) 0%, var(--white) 60%);
    text-align: center;
  }
  .hero-eyebrow {
    display: inline-block; padding: 5px 14px; border-radius: 20px;
    background: var(--green-pale); color: var(--green); font-size: 0.8rem;
    font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 20px;
  }
  .hero-title {
    font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 5vw, 3.6rem);
    color: var(--gray-800); line-height: 1.15; max-width: 720px; margin-bottom: 18px;
  }
  .hero-title span { color: var(--green); }
  .hero-sub { font-size: 1.05rem; color: var(--gray-600); max-width: 520px; line-height: 1.6; margin-bottom: 36px; }
  .hero-cta {
    padding: 14px 36px; background: var(--green); color: white;
    border: none; border-radius: 50px; font-size: 1rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 14px rgba(46,125,79,0.35);
  }
  .hero-cta:hover { background: var(--green-dark); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(46,125,79,0.4); }

  .earth-section {
    display: flex; flex-direction: column; align-items: center;
    padding: 60px 24px; background: var(--white); border-top: 1px solid var(--gray-100);
  }
  .earth-wrap { position: relative; margin-bottom: 32px; }
  .earth-svg { width: 260px; height: 260px; filter: drop-shadow(0 8px 24px rgba(46,125,79,0.18)); }
  .earth-badge {
    position: absolute; top: 20px; right: -10px;
    background: var(--green); color: white; border-radius: 12px;
    padding: 6px 12px; font-size: 0.75rem; font-weight: 600;
    box-shadow: var(--shadow-md);
  }
  .earth-badge2 {
    position: absolute; bottom: 20px; left: -10px;
    background: var(--white); color: var(--green); border-radius: 12px;
    padding: 6px 12px; font-size: 0.75rem; font-weight: 600;
    box-shadow: var(--shadow-md); border: 1px solid var(--green-pale);
  }
  .earth-heading {
    font-family: 'Playfair Display', serif; font-size: 1.8rem;
    color: var(--gray-800); text-align: center; margin-bottom: 12px;
  }
  .earth-para {
    font-size: 0.97rem; color: var(--gray-600); text-align: center;
    max-width: 540px; line-height: 1.7;
  }

  .features-section { padding: 60px 40px; background: var(--gray-50); }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; max-width: 900px; margin: 0 auto; }
  .feature-card {
    background: var(--white); border-radius: var(--radius); padding: 28px 24px;
    border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm);
    transition: transform 0.18s, box-shadow 0.18s;
  }
  .feature-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
  .feature-icon {
    width: 44px; height: 44px; border-radius: 12px; background: var(--green-pale);
    display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
  }
  .feature-icon svg { width: 22px; height: 22px; stroke: var(--green); fill: none; }
  .feature-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 6px; color: var(--gray-800); }
  .feature-desc { font-size: 0.85rem; color: var(--gray-600); line-height: 1.55; }
  .section-label {
    text-align: center; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--green); margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Playfair Display', serif; font-size: 1.7rem;
    text-align: center; margin-bottom: 32px; color: var(--gray-800);
  }

  /* ── AUTH CARD ── */
  .auth-page {
    min-height: calc(100vh - 68px); display: flex;
    align-items: center; justify-content: center;
    background: linear-gradient(140deg, var(--green-pale) 0%, var(--gray-50) 100%);
    padding: 40px 16px;
  }
  .auth-card {
    background: var(--white); border-radius: 24px; padding: 40px 36px;
    width: 100%; max-width: 420px; box-shadow: var(--shadow-lg);
    border: 1px solid var(--gray-200);
  }
  .auth-icon-wrap {
    width: 64px; height: 64px; border-radius: 18px; background: var(--green-pale);
    display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
  }
  .auth-icon-wrap svg { width: 32px; height: 32px; stroke: var(--green); fill: none; }
  .auth-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; text-align: center; margin-bottom: 6px; }
  .auth-sub { font-size: 0.88rem; color: var(--gray-400); text-align: center; margin-bottom: 28px; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 0.82rem; font-weight: 500; color: var(--gray-600); margin-bottom: 6px; }
  .form-input {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1.5px solid var(--gray-200); font-size: 0.92rem;
    background: var(--gray-50); outline: none; transition: border 0.15s;
    font-family: 'Inter', sans-serif;
  }
  .form-input:focus { border-color: var(--green); background: var(--white); }
  .form-input::placeholder { color: var(--gray-400); }
  .btn-primary {
    width: 100%; padding: 13px; background: var(--green); color: white;
    border: none; border-radius: 50px; font-size: 0.95rem; font-weight: 600;
    cursor: pointer; margin-top: 8px; transition: all 0.18s;
    font-family: 'Inter', sans-serif;
  }
  .btn-primary:hover { background: var(--green-dark); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
  .auth-switch { text-align: center; margin-top: 18px; font-size: 0.85rem; color: var(--gray-600); }
  .auth-switch span { color: var(--green); font-weight: 600; cursor: pointer; }
  .auth-switch span:hover { text-decoration: underline; }
  .error-msg {
    background: var(--red-light); color: var(--red); padding: 10px 14px;
    border-radius: 8px; font-size: 0.84rem; margin-bottom: 14px; text-align: center;
  }
  .success-msg {
    background: var(--green-pale); color: var(--green-dark); padding: 10px 14px;
    border-radius: 8px; font-size: 0.84rem; margin-bottom: 14px; text-align: center;
  }

  /* ── DASHBOARD ── */
  .dashboard { padding: 32px 40px; max-width: 1100px; margin: 0 auto; }
  .dashboard-grid { display: grid; grid-template-columns: 280px 1fr; gap: 24px; margin-bottom: 24px; }

  .profile-card {
    background: var(--white); border-radius: var(--radius); padding: 32px 24px;
    border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm);
    display: flex; flex-direction: column; align-items: center; text-align: center;
  }
  .profile-avatar {
    width: 72px; height: 72px; border-radius: 50%; background: var(--green-pale);
    border: 3px solid var(--green); display: flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
  }
  .profile-avatar svg { width: 36px; height: 36px; fill: var(--green); }
  .profile-name { font-weight: 700; font-size: 1.1rem; margin-bottom: 4px; }
  .profile-email { font-size: 0.82rem; color: var(--gray-400); margin-bottom: 20px; }
  .profile-badge {
    padding: 5px 14px; background: var(--green-pale); color: var(--green);
    border-radius: 20px; font-size: 0.78rem; font-weight: 600; margin-bottom: 12px;
  }
  .profile-bank { font-size: 0.82rem; color: var(--gray-400); margin-top: 4px; }

  .right-col { display: flex; flex-direction: column; gap: 20px; }

  .balance-card {
    background: var(--white); border-radius: var(--radius); overflow: hidden;
    border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm);
  }
  .balance-header {
    background: var(--green); padding: 14px 20px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .balance-header-label { color: white; font-weight: 600; font-size: 0.95rem; }
  .balance-body { padding: 22px 24px; }
  .balance-amount { font-family: 'Playfair Display', serif; font-size: 2.4rem; color: var(--gray-800); }
  .balance-currency { font-size: 1rem; color: var(--gray-400); margin-left: 4px; }

  .actions-card {
    background: var(--white); border-radius: var(--radius); padding: 20px 24px;
    border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm);
  }
  .actions-title { font-weight: 600; font-size: 0.9rem; color: var(--gray-600); margin-bottom: 14px; }
  .actions-row { display: flex; gap: 12px; }
  .action-btn {
    flex: 1; padding: 12px 10px; border-radius: var(--radius-sm);
    border: 1.5px solid var(--gray-200); background: var(--gray-50);
    cursor: pointer; font-size: 0.88rem; font-weight: 500; color: var(--gray-700);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    transition: all 0.18s; font-family: 'Inter', sans-serif;
  }
  .action-btn:hover { border-color: var(--green); background: var(--green-pale); color: var(--green); }
  .action-btn svg { width: 22px; height: 22px; stroke: currentColor; fill: none; }

  /* ── TRANSACTIONS ── */
  .tx-card {
    background: var(--white); border-radius: var(--radius); padding: 24px;
    border: 1px solid var(--gray-200); box-shadow: var(--shadow-sm);
  }
  .tx-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .tx-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; }
  .tx-list { display: flex; flex-direction: column; gap: 10px; }
  .tx-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 16px; background: var(--gray-50); border-radius: var(--radius-sm);
    border: 1px solid var(--gray-100); transition: background 0.15s;
  }
  .tx-item:hover { background: var(--green-pale); }
  .tx-left { display: flex; align-items: center; gap: 12px; }
  .tx-dot {
    width: 36px; height: 36px; border-radius: 50%; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
  }
  .tx-dot-debit { background: var(--red-light); }
  .tx-dot-credit { background: var(--green-pale); }
  .tx-dot svg { width: 16px; height: 16px; stroke: currentColor; fill: none; }
  .tx-dot-debit svg { stroke: var(--red); }
  .tx-dot-credit svg { stroke: var(--green); }
  .tx-type { font-weight: 600; font-size: 0.9rem; }
  .tx-id { font-size: 0.75rem; color: var(--gray-400); margin-top: 2px; }
  .tx-amount { font-weight: 700; font-size: 1rem; }
  .tx-amount-debit { color: var(--red); }
  .tx-amount-credit { color: var(--green); }
  .tx-empty { text-align: center; padding: 32px; color: var(--gray-400); font-size: 0.9rem; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45);
    display: flex; align-items: center; justify-content: center; z-index: 200; padding: 16px;
  }
  .modal {
    background: var(--white); border-radius: 20px; padding: 32px;
    width: 100%; max-width: 400px; box-shadow: var(--shadow-lg);
  }
  .modal-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 6px; }
  .modal-sub { font-size: 0.85rem; color: var(--gray-400); margin-bottom: 22px; }
  .modal-actions { display: flex; gap: 10px; margin-top: 16px; }
  .btn-secondary {
    flex: 1; padding: 12px; background: var(--gray-100); color: var(--gray-700);
    border: none; border-radius: 50px; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.15s;
  }
  .btn-secondary:hover { background: var(--gray-200); }
  .btn-danger {
    flex: 1; padding: 12px; background: var(--red); color: white;
    border: none; border-radius: 50px; font-size: 0.9rem; font-weight: 600;
    cursor: pointer; font-family: 'Inter', sans-serif; transition: background 0.15s;
  }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 300;
    padding: 12px 20px; border-radius: 12px; font-size: 0.88rem; font-weight: 500;
    box-shadow: var(--shadow-lg); animation: slideUp 0.25s ease;
  }
  .toast-success { background: var(--green); color: white; }
  .toast-error { background: var(--red); color: white; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  @media (max-width: 700px) {
    .dashboard { padding: 20px 16px; }
    .dashboard-grid { grid-template-columns: 1fr; }
    .navbar { padding: 0 16px; }
    .auth-card { padding: 28px 20px; }
  }
`;

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon = {
  Leaf: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  UserFill: () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
    </svg>
  ),
  Transfer: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M16 12H8M13 9l3 3-3 3"/>
    </svg>
  ),
  Deposit: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  ),
  ArrowDown: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  ),
  ArrowUp: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M19 12l-7-7-7 7"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="earth-svg">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

// ─── API HELPERS ──────────────────────────────────────────────────────────────
async function apiCall(url, options = {}) {
  const token = localStorage.getItem("gb_token");
  const headers = { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) };
  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }
  if (!res.ok) throw new Error(typeof data === "string" ? data : JSON.stringify(data));
  return data;
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []);
  if (!msg) return null;
  return <div className={`toast toast-${type}`}>{msg}</div>;
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onRegister, onLogin }) {
  return (
    <div className="landing">
      <div className="hero">
        <span className="hero-eyebrow">🌱 Green Banking</span>
        <h1 className="hero-title">Your Money. Your Future. <span>Our Promise.</span></h1>
        <p className="hero-sub">Banking that grows with you — secure, fast, and borderless. Open your account in minutes.</p>
        <button className="hero-cta" onClick={onRegister}>Open Account</button>
      </div>

      <div className="earth-section">
        <div className="earth-wrap">
          <svg viewBox="0 0 200 200" className="earth-svg" stroke="var(--green)" fill="none" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="100" cy="100" r="90" fill="var(--green-pale)" stroke="var(--green)" strokeWidth="2"/>
            <ellipse cx="100" cy="100" rx="40" ry="90" strokeDasharray="6 4"/>
            <line x1="10" y1="100" x2="190" y2="100"/>
            <line x1="100" y1="10" x2="100" y2="190"/>
            <path d="M30 60 Q55 50 80 65 Q100 75 120 60 Q145 45 165 65"/>
            <path d="M20 130 Q50 120 75 135 Q100 150 130 130 Q155 115 175 135"/>
            <path d="M60 30 Q70 50 65 75 Q60 95 70 115"/>
            <path d="M130 25 Q140 45 135 70 Q130 90 140 110"/>
          </svg>
          <div className="earth-badge">🔒 Bank-grade Security</div>
          <div className="earth-badge2">🌍 Global Transfers</div>
        </div>
        <h2 className="earth-heading">Banking Without Borders</h2>
        <p className="earth-para">
          At Green Bank, we believe money should have no boundaries. Whether you're sending funds across the street or across the globe, we make it seamless, secure, and instant. Built on trust, powered by technology — your world, your bank.
        </p>
      </div>

      <div className="features-section">
        <p className="section-label">Why Green Bank</p>
        <h2 className="section-title">Everything you need, nothing you don't</h2>
        <div className="features-grid">
          {[
            { icon: <Icon.Shield />, title: "Bank-Grade Security", desc: "JWT-secured sessions and encrypted transactions keep your money safe 24/7." },
            { icon: <Icon.Zap />, title: "Instant Transfers", desc: "Send money to any account in real time. No delays, no hidden fees." },
            { icon: <Icon.Chart />, title: "Full Transparency", desc: "Every transaction tracked with a unique ID. Your full history, always accessible." },
            { icon: <Icon.Globe />, title: "Global Reach", desc: "One account. Every corner of the world. Your money moves as fast as you do." },
          ].map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ onSuccess, onRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setErr(""); setLoading(true);
    try {
      const data = await apiCall(`${AUTH_BASE}/login`, { method: "POST", body: JSON.stringify({ email: form.email, password: form.password }) });
      // Expect { token, holderName, email } or just a token string
      const token = typeof data === "string" ? data : (data.token || data.jwt || data.accessToken);
      if (!token) throw new Error("No token received");
      localStorage.setItem("gb_token", token);
      // Store user info if available
      if (data.holderName) localStorage.setItem("gb_name", data.holderName);
      if (data.email) localStorage.setItem("gb_email", data.email);
      else localStorage.setItem("gb_email", form.email);
      onSuccess();
    } catch (e) { setErr(e.message || "Login failed. Check your credentials."); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon-wrap"><Icon.Shield /></div>
        <h2 className="auth-title">Sign in with email</h2>
        <p className="auth-sub">Welcome back to Green Bank</p>
        {err && <div className="error-msg">{err}</div>}
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input className="form-input" type="email" placeholder="Enter your email" value={form.email} onChange={set("email")} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Enter your password" value={form.password} onChange={set("password")} />
        </div>
        <button className="btn-primary" onClick={submit} disabled={loading}>{loading ? "Signing in…" : "Login"}</button>
        <div className="auth-switch">Don't have an account? <span onClick={onRegister}>Register</span></div>
      </div>
    </div>
  );
}

// ─── REGISTER ─────────────────────────────────────────────────────────────────
function Register({ onLogin, onSuccess }) {
  const [form, setForm] = useState({ holderName: "", email: "", password: "" });
  const [err, setErr] = useState(""); const [ok, setOk] = useState(""); const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    setErr(""); setOk(""); setLoading(true);
    try {
      await apiCall(`${AUTH_BASE}/register`, { method: "POST", body: JSON.stringify(form) });
      setOk("Account created! You can now log in.");
      setTimeout(onLogin, 1800);
    } catch (e) { setErr(e.message || "Registration failed."); }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon-wrap"><Icon.User /></div>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">Join Green Bank — free, fast, secure</p>
        {err && <div className="error-msg">{err}</div>}
        {ok && <div className="success-msg">{ok}</div>}
        <div className="form-group">
          <label className="form-label">Full name</label>
          <input className="form-input" placeholder="Holder name" value={form.holderName} onChange={set("holderName")} />
        </div>
        <div className="form-group">
          <label className="form-label">Email address</label>
          <input className="form-input" type="email" placeholder="Email address" value={form.email} onChange={set("email")} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Password" value={form.password} onChange={set("password")} />
        </div>
        <button className="btn-primary" onClick={submit} disabled={loading}>{loading ? "Creating account…" : "Create Account"}</button>
        <div className="auth-switch">Already have an account? <span onClick={onLogin}>Login</span></div>
      </div>
    </div>
  );
}

// ─── DEPOSIT MODAL ────────────────────────────────────────────────────────────
function DepositModal({ onClose, onDone }) {
  const [amount, setAmount] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) { setErr("Enter a valid amount."); return; }
    setLoading(true); setErr("");
    try {
      await apiCall(`${ACCOUNT_BASE}/deposit`, { method: "POST", body: JSON.stringify({ amount: Number(amount) }) });
      onDone("Deposit successful!");
    } catch (e) { setErr(e.message || "Deposit failed."); setLoading(false); }
  };
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3 className="modal-title">Deposit Funds</h3>
        <p className="modal-sub">Add money to your Green Bank account</p>
        {err && <div className="error-msg">{err}</div>}
        <div className="form-group">
          <label className="form-label">Amount (₹)</label>
          <input className="form-input" type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{flex:1,marginTop:0}} onClick={submit} disabled={loading}>{loading ? "Processing…" : "Deposit"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── TRANSFER MODAL ───────────────────────────────────────────────────────────
function TransferModal({ onClose, onDone }) {
  const [form, setForm] = useState({ receiverAccNo: "", amount: "" });
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = async () => {
    if (!form.receiverAccNo || !form.amount || Number(form.amount) <= 0) { setErr("Fill all fields correctly."); return; }
    setLoading(true); setErr("");
    try {
      await apiCall(`${ACCOUNT_BASE}/transfer`, { method: "POST", body: JSON.stringify({ receiverAccNo: Number(form.receiverAccNo), amount: Number(form.amount) }) });
      onDone("Transfer successful!");
    } catch (e) { setErr(e.message || "Transfer failed."); setLoading(false); }
  };
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3 className="modal-title">Transfer Funds</h3>
        <p className="modal-sub">Send money to another account</p>
        {err && <div className="error-msg">{err}</div>}
        <div className="form-group">
          <label className="form-label">Receiver Account Number</label>
          <input className="form-input" type="number" placeholder="Account number" value={form.receiverAccNo} onChange={set("receiverAccNo")} />
        </div>
        <div className="form-group">
          <label className="form-label">Amount (₹)</label>
          <input className="form-input" type="number" placeholder="0.00" value={form.amount} onChange={set("amount")} />
        </div>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{flex:1,marginTop:0}} onClick={submit} disabled={loading}>{loading ? "Sending…" : "Transfer"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ onLogout }) {
  const [balance, setBalance] = useState(null);
  const [txList, setTxList] = useState([]);
  const [modal, setModal] = useState(null); // "deposit" | "transfer"
  const [toast, setToast] = useState(null);

  const name = localStorage.getItem("gb_name") || "Account Holder";
  const email = localStorage.getItem("gb_email") || "user@greenbank.com";

  const fetchBalance = async () => {
    try { const b = await apiCall(`${ACCOUNT_BASE}/balance`); setBalance(b); }
    catch { setBalance("—"); }
  };
  const fetchTx = async () => {
    try { const tx = await apiCall(`${ACCOUNT_BASE}/txhistory`); setTxList(Array.isArray(tx) ? tx : []); }
    catch { setTxList([]); }
  };

  useEffect(() => { fetchBalance(); fetchTx(); }, []);

  const handleDone = msg => {
    setModal(null);
    setToast({ msg, type: "success" });
    fetchBalance();
    fetchTx();
  };

  const fmt = n => n !== null && n !== "—" ? Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "—";

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar"><Icon.UserFill /></div>
          <div className="profile-name">{name}</div>
          <div className="profile-email">{email}</div>
          <div className="profile-badge">Savings Account</div>
          <div className="profile-bank">Green Bank</div>
        </div>

        {/* Right column */}
        <div className="right-col">
          <div className="balance-card">
            <div className="balance-header">
              <span className="balance-header-label">Current Balance</span>
              <button onClick={fetchBalance} style={{background:"rgba(255,255,255,0.2)",border:"none",borderRadius:8,padding:"4px 10px",color:"white",cursor:"pointer",fontSize:"0.8rem"}}>Refresh</button>
            </div>
            <div className="balance-body">
              <span className="balance-amount">₹{fmt(balance)}</span>
            </div>
          </div>

          <div className="actions-card">
            <div className="actions-title">Quick Actions</div>
            <div className="actions-row">
              <button className="action-btn" onClick={() => setModal("transfer")}>
                <Icon.Transfer />Transfer
              </button>
              <button className="action-btn" onClick={() => setModal("deposit")}>
                <Icon.Deposit />Deposit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="tx-card">
        <div className="tx-header">
          <h2 className="tx-title">Transactions</h2>
          <button onClick={fetchTx} style={{background:"var(--green-pale)",border:"none",borderRadius:8,padding:"6px 14px",color:"var(--green)",fontSize:"0.82rem",fontWeight:600,cursor:"pointer"}}>Refresh</button>
        </div>
        <div className="tx-list">
          {txList.length === 0
            ? <div className="tx-empty">No transactions yet. Make your first deposit!</div>
            : txList.map((tx, i) => {
                const isDebit = tx.type === "DEBIT" || tx.type === "TRANSFER" || (tx.amount < 0);
                return (
                  <div className="tx-item" key={i}>
                    <div className="tx-left">
                      <div className={`tx-dot ${isDebit ? "tx-dot-debit" : "tx-dot-credit"}`}>
                        {isDebit ? <Icon.ArrowUp /> : <Icon.ArrowDown />}
                      </div>
                      <div>
                        <div className="tx-type">{tx.type || (isDebit ? "Debit" : "Deposit")}</div>
                        <div className="tx-id">{tx.transactionId || tx.id || `TX${String(i).padStart(10,"0")}`}</div>
                      </div>
                    </div>
                    <div className={`tx-amount ${isDebit ? "tx-amount-debit" : "tx-amount-credit"}`}>
                      {isDebit ? "-" : "+"}₹{fmt(Math.abs(tx.amount))}
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>

      {modal === "deposit" && <DepositModal onClose={() => setModal(null)} onDone={handleDone} />}
      {modal === "transfer" && <TransferModal onClose={() => setModal(null)} onDone={handleDone} />}
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(() => localStorage.getItem("gb_token") ? "dashboard" : "landing");

  const logout = () => {
    ["gb_token","gb_name","gb_email"].forEach(k => localStorage.removeItem(k));
    setPage("landing");
  };

  const isAuth = page === "dashboard";

  return (
    <>
      <style>{css}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setPage(isAuth ? "dashboard" : "landing")}>
          <div className="navbar-logo-icon"><Icon.Leaf /></div>
          <span className="navbar-brand-name">Green Bank</span>
        </div>
        {isAuth
          ? <div className="nav-user">
              <div className="nav-avatar"><Icon.UserFill /></div>
              <button className="nav-logout" onClick={logout}>Logout</button>
            </div>
          : <div className="navbar-links">
              <button className="nav-btn nav-btn-ghost" onClick={() => setPage("register")}>Register</button>
              <button className="nav-btn nav-btn-solid" onClick={() => setPage("login")}>Login</button>
            </div>
        }
      </nav>

      {/* Pages */}
      {page === "landing"   && <Landing onRegister={() => setPage("register")} onLogin={() => setPage("login")} />}
      {page === "login"     && <Login onSuccess={() => setPage("dashboard")} onRegister={() => setPage("register")} />}
      {page === "register"  && <Register onLogin={() => setPage("login")} onSuccess={() => setPage("login")} />}
      {page === "dashboard" && <Dashboard onLogout={logout} />}
    </>
  );
}
