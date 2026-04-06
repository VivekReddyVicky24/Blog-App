// src/components/ArticleCard/ArticleCard.jsx
// Drop-in card — pass your existing article data shape

import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const {
    _id, title, excerpt, content, coverImage, image, category,
    author, createdAt, readTime,
  } = article;

  const initials = author?.name
    ? author.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'AU';

  const date = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  // Get proper image URL
  const imageUrl = (() => {
    const img = coverImage || image;
    if (!img) return null;
    if (img.startsWith('http')) return img;
    return `http://localhost:5000/${img}`;
  })();

  // Get excerpt from content if not provided
  const displayExcerpt = excerpt || (content ? content.slice(0, 120) + '...' : '');

  return (
    <Link to={`/article/${_id}`} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
      <article className="card article-card" style={{ width: '100%' }}>
        <div className="article-card__image">
          {imageUrl
            ? <img src={imageUrl} alt={title} loading="lazy" />
            : <PlaceholderCover title={title} author={author} />}
        </div>

        <div className="article-card__content">
          {category && (
            <span className="badge badge-rose" style={{ display: 'inline-block', width: 'fit-content', marginBottom: 'var(--sp-3)' }}>{category}</span>
          )}

          <h3 className="article-card__title">{title}</h3>

          {displayExcerpt && (
            <p className="article-card__excerpt">{displayExcerpt}</p>
          )}

          <div className="article-card__footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
              <div className="avatar avatar-sm avatar-rose">{initials}</div>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {author?.name ?? 'Unknown'}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{date}</p>
              </div>
            </div>
            {readTime && (
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                {readTime} min read
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

function PlaceholderCover({ title, author }) {
  const colors = [
    ['var(--rose-light)', 'var(--sky-light)'],
    ['var(--sky-light)', 'var(--mint-light)'],
    ['var(--mint-light)', 'var(--cream-light)'],
    ['var(--cream-light)', 'var(--rose-light)'],
  ];
  const pair = colors[(title?.length ?? 0) % colors.length];
  
  const displayText = author?.name 
    ? author.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : title?.slice(0, 2) ?? 'Bl';

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${pair[0]} 0%, ${pair[1]} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '2rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)',
      fontStyle: 'italic', padding: 'var(--sp-6)', textAlign: 'center',
    }}>
      {displayText}
    </div>
  );
}
