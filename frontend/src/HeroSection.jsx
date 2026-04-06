// src/components/Hero/HeroSection.jsx

import { Link } from 'react-router-dom';

export default function HeroSection() {
  const user = JSON.parse(localStorage.getItem("user"));
  const canWrite = user && (user.role === "author" || user.role === "admin");

  return (
    <section className="hero">
      <div className="hero__bg" />
      <div className="container hero__content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-6)' }}>

        <span className="badge badge-rose animate-fadeup" style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.06em' }}>
          ✦ Stories worth reading
        </span>

        <h1 className="animate-fadeup stagger-1" style={{ maxWidth: 640, fontStyle: 'italic' }}>
          Ideas bloom here,<br />one story at a time.
        </h1>

        <p className="animate-fadeup stagger-2" style={{ maxWidth: 520, color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
          Discover thoughtful articles written by curious minds. From technology to creativity — there is always something new to explore.
        </p>

        <div className="animate-fadeup stagger-3" style={{ display: 'flex', gap: 'var(--sp-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary btn-lg">Browse articles</Link>
          {canWrite && <Link to="/create" className="btn btn-ghost btn-lg">Start writing</Link>}
        </div>
      </div>
    </section>
  );
}
