// src/pages/AdminDashboard/AdminDashboard.jsx
// Replace your existing admin page JSX — keep ALL API calls and state logic unchanged.
// Only the rendering section changes.

import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useAdminData } from '../../hooks/useAdminData'; // your existing hook

// ── Paste your existing data-fetching logic above the return ──────────────
// const { users, articles, deletedArticles, ... } = useAdminData();

export default function AdminDashboard() {
  // ── Replace placeholders with your real state/data ──────────
  const stats = { users: 0, articles: 0, deleted: 0, comments: 0 };
  const users = [];
  const articles = [];
  const deletedArticles = [];
  const [activeTab, setActiveTab] = useState('users');
  // ────────────────────────────────────────────────────────────

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="sidebar">
        <p className="sidebar__section-label">Overview</p>
        <SidebarLink icon="📊" label="Statistics"  tab="stats"   active={activeTab} onClick={setActiveTab} />

        <p className="sidebar__section-label" style={{ marginTop: 'var(--sp-4)' }}>Manage</p>
        <SidebarLink icon="👥" label="Users"       tab="users"    active={activeTab} onClick={setActiveTab} />
        <SidebarLink icon="📝" label="Articles"    tab="articles" active={activeTab} onClick={setActiveTab} />
        <SidebarLink icon="🗑️" label="Trash"       tab="trash"    active={activeTab} onClick={setActiveTab} />
        <SidebarLink icon="💬" label="Comments"    tab="comments" active={activeTab} onClick={setActiveTab} />
      </aside>

      {/* ── Main content ────────────────────────────────── */}
      <main className="dashboard-main">

        {/* Page header */}
        <div className="animate-fadeup">
          <h1 className="h2" style={{ marginBottom: 'var(--sp-1)' }}>Admin Dashboard</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Manage your blog's content, users, and settings.
          </p>
        </div>

        {/* ── Stat cards ───────────────────────────────── */}
        <div className="stat-grid animate-fadeup stagger-1">
          <StatCard label="Total Users"    value={stats.users}    color="rose"  icon="👥" />
          <StatCard label="Published"      value={stats.articles} color="sky"   icon="📝" />
          <StatCard label="In Trash"       value={stats.deleted}  color="cream" icon="🗑️" />
          <StatCard label="Comments"       value={stats.comments} color="mint"  icon="💬" />
        </div>

        {/* ── Tab content ──────────────────────────────── */}
        <div className="animate-fadeup stagger-2">

          {activeTab === 'users' && (
            <Section title="Users" badge={users.length}>
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 && (
                      <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--sp-8)', color: 'var(--text-muted)' }}>No users yet</td></tr>
                    )}
                    {users.map(u => (
                      <tr key={u._id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                            <div className="avatar avatar-sm avatar-rose">
                              {u.name?.slice(0,2).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{u.name}</span>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td><RoleBadge role={u.role} /></td>
                        <td><StatusBadge active={u.isActive} /></td>
                        <td>
                          <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                            {/* ↓ Wire your existing handlers here */}
                            <button className="btn btn-sm btn-mint">Activate</button>
                            <button className="btn btn-sm btn-danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {activeTab === 'articles' && (
            <Section title="All Articles" badge={articles.length}>
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length === 0 && (
                      <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--sp-8)', color: 'var(--text-muted)' }}>No articles yet</td></tr>
                    )}
                    {articles.map(a => (
                      <tr key={a._id}>
                        <td style={{ fontWeight: 500, color: 'var(--text-primary)', maxWidth: 240 }}>
                          <span style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {a.title}
                          </span>
                        </td>
                        <td>{a.author?.name}</td>
                        <td>{a.category && <span className="badge badge-sky">{a.category}</span>}</td>
                        <td><span className="badge badge-mint">Published</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                            <button className="btn btn-sm btn-ghost">Edit</button>
                            <button className="btn btn-sm btn-danger">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {activeTab === 'trash' && (
            <Section title="Deleted Articles" badge={deletedArticles.length}>
              <div className="data-table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Deleted At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedArticles.length === 0 && (
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: 'var(--sp-8)', color: 'var(--text-muted)' }}>Trash is empty</td></tr>
                    )}
                    {deletedArticles.map(a => (
                      <tr key={a._id}>
                        <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{a.title}</td>
                        <td>{a.author?.name}</td>
                        <td style={{ color: 'var(--text-muted)' }}>
                          {new Date(a.deletedAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                            {/* ↓ Wire your restore/hard-delete handlers */}
                            <button className="btn btn-sm btn-sky">Restore</button>
                            <button className="btn btn-sm btn-danger">Delete forever</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {activeTab === 'stats' && (
            <Section title="Site Statistics">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--sp-5)' }}>
                <MetricBox label="Total reads" value="—" />
                <MetricBox label="Avg read time" value="—" />
                <MetricBox label="New users (30d)" value="—" />
                <MetricBox label="Comments (30d)" value="—" />
              </div>
            </Section>
          )}
        </div>
      </main>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────

function SidebarLink({ icon, label, tab, active, onClick }) {
  return (
    <button
      className={`sidebar__link${active === tab ? ' active' : ''}`}
      onClick={() => onClick(tab)}
      style={{ width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none', fontFamily: 'var(--font-body)' }}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <div className={`stat-card ${color}`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className="stat-card__label">{label}</p>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <p className="stat-card__value">{value}</p>
    </div>
  );
}

function Section({ title, badge, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
        <h2 className="h3">{title}</h2>
        {badge !== undefined && (
          <span className="badge badge-rose">{badge}</span>
        )}
      </div>
      {children}
    </div>
  );
}

function RoleBadge({ role }) {
  const map = { admin: 'badge-rose', author: 'badge-sky', user: 'badge-neutral' };
  return <span className={`badge ${map[role] ?? 'badge-neutral'}`}>{role}</span>;
}

function StatusBadge({ active }) {
  return active
    ? <span className="badge badge-mint">Active</span>
    : <span className="badge badge-danger">Inactive</span>;
}

function MetricBox({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">{value}</p>
    </div>
  );
}
