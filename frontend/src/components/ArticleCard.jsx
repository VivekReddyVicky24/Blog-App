import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/article/${article._id}`)}
      style={{ cursor: "pointer" }}
    >
      {article.image && (
        <img
          src={`http://localhost:5000/${article.image}`}
          alt="blog"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      )}

      <h3>{article.title}</h3>

      <p style={{ color: "#94A3B8" }}>
        {article.content.slice(0, 100)}...
      </p>

      <small>By {article.author?.name}</small>
    </div>
  );
};

export default ArticleCard;