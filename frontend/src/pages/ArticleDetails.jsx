import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const ArticleDetails = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // fetch article
  const fetchArticle = async () => {
    const { data } = await API.get(`/articles/${id}`);
    setArticle(data);
  };

  // fetch comments
  const fetchComments = async () => {
    const { data } = await API.get(`/comments/${id}`);
    setComments(data);
  };

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [id]);

  // add comment
  const addComment = async () => {
    if (!text) return;

    await API.post(`/comments/${id}`, { text });
    setText("");
    fetchComments();
  };

  // delete comment
  const deleteComment = async (commentId) => {
    await API.delete(`/comments/${commentId}`);
    fetchComments();
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{article.title}</h2>

      {article.image && (
        <img
          src={`http://localhost:5000/${article.image}`}
          alt=""
          style={{ width: "100%", borderRadius: "10px" }}
        />
      )}

      <p>{article.content}</p>

      <hr />

      <h3>Comments</h3>

      {/* Add Comment */}
      {user && (
        <div style={styles.commentBox}>
          <input
            className="input"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addComment()}
            style={{ marginBottom: 0 }}
          />

          <button className="btn btn-primary" onClick={addComment}>
            Add Comment
          </button>
        </div>
      )}

      {/* Comments List */}
      {comments.map((c) => (
        <div key={c._id} className="card">
          <p>{c.text}</p>
          <small>By {c.user?.name}</small>

          {user && (user._id === c.user._id || user.role === "admin") && (
            <button
              style={{ marginTop: "10px" }}
              onClick={() => deleteComment(c._id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  commentBox: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginTop: "15px"
  }
};

export default ArticleDetails;