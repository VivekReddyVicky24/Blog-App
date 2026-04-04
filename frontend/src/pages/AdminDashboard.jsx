import { useEffect, useState } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const fetchUsers = async () => {
    const { data } = await API.get("/admin/users");
    setUsers(data);
  };

  const fetchArticles = async () => {
    const { data } = await API.get("/admin/articles");
    setArticles(data);
  };

  const fetchDeleted = async () => {
    try {
      const { data } = await API.get("/articles/deleted");
      setDeleted(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchArticles();
    fetchDeleted();
  }, []);

  const toggleUser = async (id) => {
    await API.put(`/admin/users/${id}`);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await API.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  const deleteArticle = async (id) => {
    try {
      await API.delete(`/admin/articles/${id}`);
      // Remove from UI instantly
      setArticles(articles.filter(a => a._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete article: " + (error.response?.data?.message || error.message));
    }
  };

  const restoreArticle = async (id) => {
    try {
      await API.put(`/articles/restore/${id}`);

      // refresh UI
      fetchDeleted();
      fetchArticles();

    } catch (error) {
      console.error("Restore failed", error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* USERS */}
      <h3>Users</h3>
      {users.map((u) => (
        <div key={u._id} className="card">
          <p>{u.name} ({u.role})</p>
          <p>{u.email}</p>

          <button className="btn btn-warning" onClick={() => toggleUser(u._id)}>
            {u.isActive ? "Deactivate" : "Activate"}
          </button>

          <button className="btn btn-danger" onClick={() => deleteUser(u._id)}>
            Delete
          </button>
        </div>
      ))}

      {/* ARTICLES */}
      <h3>Articles</h3>
      {articles.map((a) => (
        <div key={a._id} className="card">
          <p>{a.title}</p>
          <small>By {a.author?.name}</small>

          <button onClick={() => deleteArticle(a._id)}>
            Delete
          </button>
        </div>
      ))}

      {/* DELETED ARTICLES */}
      <h3>Deleted Articles</h3>

      {deleted.length === 0 ? (
        <p>No deleted articles</p>
      ) : (
        deleted.map((a) => (
          <div key={a._id} className="card">
            <p>{a.title}</p>
            <small>By {a.author?.name}</small>

            <button onClick={() => restoreArticle(a._id)}>
              Restore
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;