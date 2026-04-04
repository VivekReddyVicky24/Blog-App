import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}>
      <div className="container" style={{ maxWidth: 'var(--container-sm)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-12)', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-4)' }}>✍️</div>
          <h1 className="h1" style={{ marginBottom: 'var(--sp-2)' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Join our community of writers and readers
          </p>
        </div>

        {/* Form Card */}
        <div className="card" style={{ padding: 'var(--sp-8)' }}>
          {error && (
            <div className="alert alert-error" style={{ marginBottom: 'var(--sp-6)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            {/* Name */}
            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                className="input-field"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address *</label>
              <input
                id="email"
                className="input-field"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label className="input-label" htmlFor="password">Password *</label>
              <input
                id="password"
                className="input-field"
                type="password"
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--sp-2)' }}>
                At least 6 characters recommended
              </p>
            </div>

            {/* Role */}
            <div className="input-group">
              <label className="input-label" htmlFor="role">I want to be a *</label>
              <select
                id="role"
                className="input-field"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={{ cursor: 'pointer', appearance: 'none', paddingRight: 'var(--sp-8)' }}
              >
                <option value="user">Reader</option>
                <option value="author">Writer/Author</option>
              </select>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--sp-2)' }}>
                Authors can publish articles. Readers can comment and save articles.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !form.name || !form.email || !form.password}
              className="btn btn-primary"
              style={{ marginTop: 'var(--sp-4)' }}
            >
              {loading ? 'Creating account...' : '✨ Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', margin: 'var(--sp-6) 0', opacity: 0.5 }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }}></div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }}></div>
          </div>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--sp-3)' }}>
              Already have an account?
            </p>
            <Link to="/login" className="btn btn-ghost" style={{ width: '100%' }}>
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;