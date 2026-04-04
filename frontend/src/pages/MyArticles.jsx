import { useEffect, useState } from "react";
import API from "../services/api";

const MyArticles = () => {
  const [articles, setArticles] = useState([]);
  const [deleted, setDeleted] = useState([]);

  const fetchArticles = async () => {
    const { data } = await API.get("/articles");
    const user = JSON.parse(localStorage.getItem("user"));

    // filter only my articles
    const myArticles = data.filter(
      (a) => a.author?._id === user._id
    );

    setArticles(myArticles);
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
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchDeleted();
  }, []);

  const deleteArticle = async (id) => {
    await API.delete(`/articles/${id}`);
    fetchArticles();
    fetchDeleted();
  };

  const restoreArticle = async (id) => {
    await API.put(`/articles/restore/${id}`);
    fetchArticles();
    fetchDeleted();
  };

  return (
    <div className="container">
      <h2>My Articles</h2>

      {/* ACTIVE ARTICLES */}
      {articles.map((a) => (
        <div key={a._id} className="card">
          <h3>{a.title}</h3>

          <button onClick={() => deleteArticle(a._id)}>
            Move to Trash
          </button>
        </div>
      ))}

      <hr />

      {/* TRASH */}
      <h2>Trash</h2>

      {deleted.length === 0 ? (
        <p>No deleted articles</p>
      ) : (
        deleted.map((a) => (
          <div key={a._id} className="card">
            <h3>{a.title}</h3>

            <button onClick={() => restoreArticle(a._id)}>
              Restore
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyArticles;