import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ── Real auth from localStorage ──────────────────────────────
  const user = JSON.parse(localStorage.getItem('user')) || null;
  
  const logout = () => {
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/login');
  };
  // ────────────────────────────────────────────────────────────

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar__inner">

        <Link to="/" className="navbar__brand">
          <div className="navbar__logo">✍️</div>
          <span className="navbar__brand-name">Blog</span>
        </Link>

        <div className="navbar__nav">
          <NavLink to="/" end className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>Home</NavLink>
          {(user?.role === 'author' || user?.role === 'admin') && (
            <NavLink to="/create" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>Write</NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin"  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>Dashboard</NavLink>
          )}
        </div>

        <div className="navbar__actions">
          {user ? (
            <div style={{ position: 'relative' }}>
              <div
                className="navbar__avatar"
                title={user.name}
                onClick={() => setMenuOpen(v => !v)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setMenuOpen(v => !v)}
              >
                {initials}
              </div>
              {menuOpen && (
                <div className="navbar__dropdown">
                  {user.role !== 'user' && (
                    <Link to="/my-articles" className="navbar__dropdown-item" onClick={() => setMenuOpen(false)}>My Articles</Link>
                  )}
                  <hr className="navbar__dropdown-divider" />
                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    onClick={logout}
                  >Sign out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"    className="btn btn-ghost btn-sm">Sign in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
            </>
          )}
          <button
            className="navbar__hamburger btn btn-ghost btn-icon"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(v => !v)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              {menuOpen
                ? <><line x1="2" y1="2" x2="16" y2="16"/><line x1="16" y1="2" x2="2" y2="16"/></>
                : <><line x1="2" y1="5" x2="16" y2="5"/><line x1="2" y1="9" x2="16" y2="9"/><line x1="2" y1="13" x2="16" y2="13"/></>}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          <NavLink to="/" end        className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
          {(user?.role === 'author' || user?.role === 'admin') && (
            <NavLink to="/create"    className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Write</NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin"     className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          )}
          <hr className="divider" />
          {user
            ? <button className="navbar__mobile-link danger" onClick={logout}>Sign out</button>
            : <><NavLink to="/login"    className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Sign in</NavLink>
                <NavLink to="/register" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Get started →</NavLink></>}
        </div>
      )}
    </nav>
  );
}