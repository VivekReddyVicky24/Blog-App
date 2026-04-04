import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const { data } = await API.get("/articles");
      const user = JSON.parse(localStorage.getItem("user"));

      // filter only my articles
      const myArticles = data.filter(
        (a) => a.author?._id === user._id
      );

      setArticles(myArticles);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeleted = async () => {
    try {
      const { data } = await API.get("/articles/deleted");

      const user = JSON.parse(localStorage.getItem("user"));

      // If author → only own
      if (user.role === "author") {
        setDeleted(data.filter(a => a.author?._id === user._id));
      } else {
        // admin → show all
        setDeleted(data);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchDeleted();
  }, []);

  const deleteArticle = async (id) => {
    if (confirm("Move this article to trash?")) {
      try {
        await API.delete(`/articles/${id}`);
        setArticles(articles.filter(a => a._id !== id));
        fetchDeleted();
      } catch (error) {
        alert("Failed to delete article");
      }
    }
  };

  const restoreArticle = async (id) => {
    try {
      await API.put(`/articles/restore/${id}`);
      fetchArticles();
      fetchDeleted();
    } catch (error) {
      alert("Failed to restore article");
    }
  };

  const hardDelete = async (id) => {
    if (confirm("Permanently delete this article? This cannot be undone.")) {
      try {
        await API.delete(`/articles/${id}?permanent=true`);
        fetchDeleted();
      } catch (error) {
        alert("Failed to delete permanently");
      }
    }
  };

  if (loading) return <div className="container" style={{ paddingTop: 'var(--sp-12)', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ background: 'var(--bg-page)', paddingTop: 'var(--sp-12)', paddingBottom: 'var(--sp-12)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 'var(--container-lg)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'var(--sp-12)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-4)' }}>
            <h1 className="h1">My Articles</h1>
            <Link to="/create" className="btn btn-primary">✨ Create New</Link>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)' }}>
            Manage and view all your published articles
          </p>
        </div>

        {/* ACTIVE ARTICLES */}
        <div style={{ marginBottom: 'var(--sp-16)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
            <h2 className="h2">📝 Published Articles</h2>
            <span className="badge badge-sky">{articles.length}</span>
          </div>

          {articles.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-10)' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--sp-4)' }}>
                You haven't written any articles yet
              </p>
              <Link to="/create" className="btn btn-primary">Start Writing</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
              {articles.map((a) => (
                <div key={a._id} className="card animate-fadeup" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)', padding: 'var(--sp-5)', border: '1px solid var(--border-default)' }}>
                  {(a.coverImage || a.image) && (
                    <img
                      src={a.coverImage?.startsWith('http') ? a.coverImage : a.coverImage ? `http://localhost:5000/${a.coverImage}` : a.image?.startsWith('http') ? a.image : `http://localhost:5000/${a.image}`}
                      alt={a.title}
                      style={{ width: 'calc(100% + 2 * var(--sp-5))', height: 220, objectFit: 'cover', borderRadius: 'var(--r-md)', marginLeft: 'calc(-1 * var(--sp-5))', marginTop: 'calc(-1 * var(--sp-5))', marginRight: 'calc(-1 * var(--sp-5))' }}
                    />
                  )}
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--sp-3)', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {a.title}
                    </h3>
                    {a.category && (
                      <span className="badge badge-rose" style={{ marginBottom: 'var(--sp-3)', display: 'inline-block' }}>
                        {a.category}
                      </span>
                    )}
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 'var(--sp-3)' }}>
                      📅 {new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                    <Link 
                      to={`/article/${a._id}`}
                      className="btn btn-ghost btn-sm"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Read
                    </Link>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteArticle(a._id)}
                      style={{ flex: 1 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TRASH */}
        {deleted.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
              <h2 className="h2">🗑️ Trash</h2>
              <span className="badge badge-danger">{deleted.length}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
              {deleted.map((a) => (
                <div key={a._id} className="card animate-fadeup" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)', padding: 'var(--sp-5)', border: '1px solid var(--border-default)', opacity: 0.85 }}>
                  {(a.coverImage || a.image) && (
                    <img
                      src={a.coverImage?.startsWith('http') ? a.coverImage : a.coverImage ? `http://localhost:5000/${a.coverImage}` : a.image?.startsWith('http') ? a.image : `http://localhost:5000/${a.image}`}
                      alt={a.title}
                      style={{ width: 'calc(100% + 2 * var(--sp-5))', height: 220, objectFit: 'cover', borderRadius: 'var(--r-md)', filter: 'grayscale(100%)', marginLeft: 'calc(-1 * var(--sp-5))', marginTop: 'calc(-1 * var(--sp-5))', marginRight: 'calc(-1 * var(--sp-5))' }}
                    />
                  )}
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--sp-3)', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {a.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                      🗑️ Deleted on {new Date(a.deletedAt || a.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                    <button 
                      className="btn btn-sky btn-sm"
                      onClick={() => restoreArticle(a._id)}
                      style={{ flex: 1 }}
                    >
                      Restore
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => hardDelete(a._id)}
                      style={{ flex: 1 }}
                    >
                      Delete Forever
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArticles;