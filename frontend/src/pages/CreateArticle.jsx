import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    if (form.category) formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
      await API.post("/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/my-articles");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-12)' }}>
      <div className="container" style={{ maxWidth: 'var(--container-md)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-12)' }}>
          <h1 className="h1" style={{ marginBottom: 'var(--sp-2)' }}>✍️ Create Article</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Share your thoughts and ideas with the world
          </p>
        </div>

        {/* Form Card */}
        <div className="card animate-fadeup" style={{ padding: 'var(--sp-8)', marginBottom: 'var(--sp-8)', border: '1px solid var(--border-default)' }}>
          {error && (
            <div className="alert alert-error" style={{ marginBottom: 'var(--sp-8)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
            
            {/* Title */}
            <div className="input-group">
              <label className="input-label" htmlFor="title">Article Title *</label>
              <input
                id="title"
                className="input-field"
                placeholder="Enter an engaging title..."
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                style={{ padding: 'var(--sp-3) var(--sp-4)' }}
              />
            </div>

            {/* Category & More */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)' }}>
              {/* Category */}
              <div className="input-group">
                <label className="input-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  className="input-field"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ cursor: 'pointer', appearance: 'none', paddingRight: 'var(--sp-8)' }}
                >
                  <option value="">Select a category...</option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Design">Design</option>
                  <option value="Culture">Culture</option>
                  <option value="Science">Science</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Content */}
            <div className="input-group">
              <label className="input-label" htmlFor="content">Content *</label>
              <textarea
                id="content"
                className="input-field"
                placeholder="Write your article content here... (markdown supported)"
                rows="12"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                style={{ fontFamily: 'var(--font-body)', resize: 'vertical', padding: 'var(--sp-4)' }}
              />
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 'var(--sp-3)' }}>
                💡 Tip: Minimum 50 characters recommended for better discoverability
              </p>
            </div>

            {/* Cover Image */}
            <div className="input-group">
              <label className="input-label" htmlFor="image">Cover Image</label>
              <div style={{
                border: '2px dashed var(--border-default)',
                borderRadius: 'var(--r-lg)',
                padding: 'var(--sp-6)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all var(--dur-fast)',
                background: 'var(--bg-subtle)'
              }}>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
                  style={{ display: 'none' }}
                />
                <label htmlFor="image" style={{ cursor: 'pointer', display: 'block' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 'var(--sp-3)' }}>🖼️</div>
                  <p style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: 'var(--sp-1)' }}>
                    {form.image ? form.image.name : 'Click to upload cover image'}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                    or drag and drop
                  </p>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)', justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => navigate('/my-articles')}
                className="btn btn-ghost"
                style={{ width: '100%' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !form.title || !form.content}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                {loading ? 'Publishing...' : '✨ Publish Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;