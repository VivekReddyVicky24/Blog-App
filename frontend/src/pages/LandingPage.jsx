import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../global.css";

const LandingPage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        const { data } = await API.get("/articles/featured/top?limit=5");
        setFeaturedArticles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured articles:", error);
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  const handleReadMore = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const getExcerpt = (content, length = 150) => {
    const text = content.replace(/<[^>]*>/g, "");
    return text.substring(0, length) + (text.length > length ? "..." : "");
  };

  return (
    <div style={{ background: "var(--bg-page)" }}>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
          paddingTop: "80px",
          paddingBottom: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="container hero__content"
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--sp-6)",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span
            className="badge"
            style={{
              fontSize: "var(--text-xs)",
              letterSpacing: "0.06em",
              background: "rgba(255, 255, 255, 0.9)",
              color: "var(--accent)",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: 600,
            }}
          >
            ✦ Welcome to Our Blog Community
          </span>

          <h1
            style={{
              maxWidth: 640,
              fontSize: "var(--text-4xl)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.3,
            }}
          >
            Discover Stories That Inspire
          </h1>

          <p
            style={{
              maxWidth: 520,
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "var(--text-lg)",
              lineHeight: 1.7,
            }}
          >
            Explore thoughtful articles on technology, creativity, design, and more. Sign up to read full stories and become part of our writing community.
          </p>

          <div
            style={{
              display: "flex",
              gap: "var(--sp-4)",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "var(--sp-4)",
            }}
          >
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "12px 32px",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                background: "white",
                color: "var(--accent)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all var(--dur-fast)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Sign In
            </button>

            <button
              onClick={() => navigate("/register")}
              style={{
                padding: "12px 32px",
                fontSize: "var(--text-base)",
                fontWeight: 600,
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "2px solid white",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all var(--dur-fast)",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section style={{ paddingTop: "var(--sp-16)", paddingBottom: "var(--sp-16)" }}>
        <div className="container">
          <div style={{ marginBottom: "var(--sp-12)", textAlign: "center" }}>
            <h2 className="h2">Featured Articles</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: "var(--sp-2)" }}>
              Start reading these popular stories from our community
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ color: "var(--text-muted)" }}>Loading featured articles...</p>
            </div>
          ) : featuredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{ color: "var(--text-muted)" }}>No articles available yet. Check back soon!</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "var(--sp-8)",
              }}
            >
              {featuredArticles.map((article) => (
                <div
                  key={article._id}
                  style={{
                    background: "var(--bg-surface)",
                    borderRadius: "var(--r-lg)",
                    overflow: "hidden",
                    border: "1px solid var(--border-default)",
                    transition: "all var(--dur-fast)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Article Image */}
                  {article.image && (
                    <div
                      style={{
                        height: 200,
                        overflow: "hidden",
                        background: "var(--bg-subtle)",
                      }}
                    >
                      <img
                        src={
                          article.image.startsWith("http")
                            ? article.image
                            : `http://localhost:5000/${article.image}`
                        }
                        alt={article.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div style={{ padding: "var(--sp-6)", flex: 1, display: "flex", flexDirection: "column" }}>
                    {article.category && (
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "var(--text-xs)",
                          fontWeight: 600,
                          background: "var(--accent-light)",
                          color: "var(--accent)",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          marginBottom: "var(--sp-3)",
                          width: "fit-content",
                        }}
                      >
                        {article.category}
                      </span>
                    )}

                    <h3
                      style={{
                        fontSize: "var(--text-lg)",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "var(--sp-3)",
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--text-secondary)",
                        marginBottom: "var(--sp-4)",
                        flex: 1,
                      }}
                    >
                      {getExcerpt(article.content, 120)}
                    </p>

                    {/* Meta Info */}
                    <div
                      style={{
                        display: "flex",
                        gap: "var(--sp-3)",
                        fontSize: "var(--text-xs)",
                        color: "var(--text-muted)",
                        borderTop: "1px solid var(--border-subtle)",
                        paddingTop: "var(--sp-3)",
                      }}
                    >
                      <span>By {article.author?.name || "Author"}</span>
                      <span>•</span>
                      <span>{article.views || 0} views</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <div style={{ padding: "0 var(--sp-6) var(--sp-6)" }}>
                    <button
                      onClick={() => handleReadMore(article._id)}
                      style={{
                        width: "100%",
                        padding: "10px 16px",
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all var(--dur-fast)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "var(--accent-dark)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "var(--accent)";
                      }}
                    >
                      Read Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div
            style={{
              marginTop: "var(--sp-16)",
              padding: "var(--sp-12)",
              background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)",
              borderRadius: "var(--r-lg)",
              textAlign: "center",
              color: "white",
            }}
          >
            <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 700, marginBottom: "var(--sp-4)" }}>
              Ready to read more stories?
            </h3>
            <p style={{ marginBottom: "var(--sp-6)", fontSize: "var(--text-base)" }}>
              Sign in to access the complete article library and join our community of writers.
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "12px 32px",
                background: "white",
                color: "var(--accent)",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "var(--text-base)",
                transition: "all var(--dur-fast)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              Sign In Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
