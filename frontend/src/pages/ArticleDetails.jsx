import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import CommentsSection from "../CommentsSection";

const ArticleDetails = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  // fetch article
  const fetchArticle = async () => {
    try {
      const { data } = await API.get(`/articles/${id}`);
      setArticle(data);
      setLikeCount(data.likes || 0);
      if (user) {
        setIsLiked(data.likedBy?.some(u => u._id === user._id) || false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch comments
  const fetchComments = async () => {
    try {
      const { data } = await API.get(`/comments/${id}`);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  // handle like
  const handleLike = async () => {
    if (!user) {
      alert("Please login to like articles");
      return;
    }

    try {
      const { data } = await API.post(`/articles/${id}/like`);
      setIsLiked(data.isLiked);
      setLikeCount(data.likes);
    } catch (error) {
      console.error("Failed to like article:", error);
      alert("Failed to like article");
    }
  };

  useEffect(() => {
    fetchArticle();
    fetchComments();
  }, [id]);

  // add comment
  const addComment = async (text) => {
    try {
      await API.post(`/comments/${id}`, { text });
      fetchComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment");
    }
  };

  // delete comment
  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment");
    }
  };

  if (!article) return <div className="container" style={{ paddingTop: 'var(--sp-12)', textAlign: 'center' }}>Loading...</div>;

  const date = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  // Calculate reading time (average 200 words per minute)
  const wordCount = article.content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article style={{ background: 'var(--bg-page)', minHeight: '100vh', paddingBottom: 'var(--sp-12)' }}>
      {/* Hero image with shadow */}
      {(article.coverImage || article.image) && (
        <div style={{ width: '100%', height: 400, overflow: 'hidden', backgroundColor: 'var(--bg-subtle)', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
          <img
            src={article.coverImage?.startsWith('http') ? article.coverImage : article.coverImage ? `http://localhost:5000/${article.coverImage}` : article.image?.startsWith('http') ? article.image : `http://localhost:5000/${article.image}`}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      <div className="container" style={{ maxWidth: 'var(--container-md)', paddingTop: 'var(--sp-12)' }}>
        {/* Article card wrapper */}
        <div style={{ 
          background: 'var(--bg-surface)', 
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-10)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid var(--border-default)'
        }}>
          {/* Article header */}
          <div style={{ marginBottom: 'var(--sp-8)' }}>
            <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
              {article.category && <span className="badge badge-sky">{article.category}</span>}
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{date}</span>
            </div>
            
            <h1 className="h1" style={{ marginBottom: 'var(--sp-6)' }}>{article.title}</h1>
            
            {article.author && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
                <div className="avatar avatar-md avatar-rose">
                  {article.author.name?.slice(0, 2).toUpperCase() ?? 'AU'}
                </div>
                <div>
                  <p style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>
                    {article.author.name}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                    {article.author.role === 'admin' ? 'Admin Author' : 'Author'}
                  </p>
                </div>
              </div>
            )}

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: 'var(--sp-6)', alignItems: 'center', flexWrap: 'wrap', marginTop: 'var(--sp-4)', padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>📖 {readingTime} min read</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>👁️ {article.views || 0} views</span>
            </div>
          </div>

          {/* Divider */}
          <hr style={{ borderColor: 'var(--border-weak)', marginBottom: 'var(--sp-8)' }} />

          {/* Article content */}
          <div style={{ 
            fontSize: 'var(--text-lg)', 
            lineHeight: 1.8, 
            color: 'var(--text-primary)',
            marginBottom: 'var(--sp-10)',
            maxWidth: '100%',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap'
          }}>
            {article.content}
          </div>

          {/* Divider */}
          <hr style={{ borderColor: 'var(--border-weak)', marginBottom: 'var(--sp-8)' }} />

          {/* Like and Share Section */}
          <div style={{
            display: 'flex',
            gap: 'var(--sp-4)',
            alignItems: 'center',
            padding: 'var(--sp-6)',
            background: 'var(--accent-light)',
            borderRadius: '12px',
            marginBottom: 'var(--sp-10)',
            opacity: 0.3
          }}>
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: isLiked ? 'var(--accent)' : 'var(--bg-surface)',
                border: isLiked ? 'none' : `2px solid var(--accent)`,
                color: isLiked ? 'var(--accent-fg)' : 'var(--accent)',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: 'var(--text-base)',
                fontWeight: 600,
                transition: 'all var(--dur-fast)',
                boxShadow: isLiked ? '0 4px 12px rgba(244,63,94,0.3)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isLiked) {
                  e.target.style.background = 'var(--accent)';
                  e.target.style.color = 'var(--accent-fg)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLiked) {
                  e.target.style.background = 'var(--bg-surface)';
                  e.target.style.color = 'var(--accent)';
                }
              }}
            >
              {isLiked ? '❤️' : '🤍'} <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
            </button>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>Did you enjoy this article?</p>
          </div>
          
          <hr style={{ borderColor: 'var(--border-weak)', marginBottom: 'var(--sp-10)' }} />
        </div>
      </div>

      {/* Comments section */}
      <div className="container" style={{ maxWidth: 'var(--container-md)', paddingTop: 'var(--sp-6)' }}>
        <CommentsSection 
          comments={comments}
          onAddComment={addComment}
          onDeleteComment={deleteComment}
          currentUser={user}
        />
      </div>
    </article>
  );
};

export default ArticleDetails;