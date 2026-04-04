// src/components/AuthForms/LoginForm.jsx
// Keep all your existing form submission logic — only JSX/styles updated.

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginForm({ onSubmit, error, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit?.({ email, password }); // wire to your existing handler
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-6)', background: 'var(--bg-page)', position: 'relative', overflow: 'hidden' }}>
      {/* Soft bg blobs */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 20% 30%, rgba(249,178,215,0.20) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(207,236,243,0.20) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="card animate-fadeup" style={{ width: '100%', maxWidth: 420, padding: 0, position: 'relative' }}>
        <div style={{ padding: 'var(--sp-8)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <div style={{ width: 52, height: 52, borderRadius: 'var(--r-md)', background: 'linear-gradient(135deg, var(--rose) 0%, var(--sky) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-on-rose)', fontStyle: 'italic', margin: '0 auto var(--sp-4)' }}>B</div>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)' }}>Welcome back</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>Sign in to your account to continue</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email address</label>
              <input id="email" type="email" className="input-field" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input id="password" type="password" className="input-field" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--sp-2)' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            Do not have an account?{' '}
            <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 500 }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
