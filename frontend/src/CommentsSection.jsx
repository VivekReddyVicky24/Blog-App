// src/components/Comments/CommentsSection.jsx

import { useState } from 'react';

export default function CommentsSection({ comments = [], onAddComment, onDeleteComment, currentUser }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    await onAddComment?.(text.trim());
    setText('');
    setLoading(false);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
        <h3 className="h3">Comments</h3>
        <span className="badge badge-rose">{comments.length}</span>
      </div>

      {currentUser ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
            <div className="avatar avatar-md avatar-rose" style={{ flexShrink: 0, marginTop: 4 }}>
              {currentUser.name?.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              <textarea
                className="input-field"
                rows={3}
                placeholder="Share your thoughts..."
                value={text}
                onChange={e => setText(e.target.value)}
                style={{ resize: 'vertical', minHeight: 80 }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary btn-sm" disabled={!text.trim() || loading}>
                  {loading ? 'Posting...' : 'Post comment'}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="alert alert-info">Sign in to leave a comment.</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        {comments.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--sp-10)', color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
            No comments yet. Be the first!
          </div>
        )}
        {comments.map(c => (
          <CommentCard key={c._id} comment={c} currentUser={currentUser} onDelete={onDeleteComment} />
        ))}
      </div>
    </section>
  );
}

function CommentCard({ comment, currentUser, onDelete }) {
  const { _id, text, author, user, createdAt } = comment;
  const commentAuthor = author || user; // Handle both 'author' and 'user' fields
  const initials = commentAuthor?.name?.slice(0, 2).toUpperCase() ?? '??';
  const canDelete = currentUser?.role === 'admin' || currentUser?._id === commentAuthor?._id;

  return (
    <div className="comment-card animate-fadeup">
      <div className="avatar avatar-md avatar-sky">{initials}</div>
      <div className="comment-body">
        <div className="comment-meta">
          <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
            {commentAuthor?.name ?? 'Anonymous'}
          </span>
          {commentAuthor?.role && commentAuthor.role !== 'user' && (
            <span className="badge badge-sky" style={{ fontSize: 10 }}>{commentAuthor.role}</span>
          )}
          <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
            {createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
          </span>
        </div>
        <p className="comment-text">{text}</p>
        {canDelete && (
          <button className="btn btn-sm btn-danger" style={{ alignSelf: 'flex-start', marginTop: 'var(--sp-2)' }}
            onClick={() => onDelete?.(_id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
