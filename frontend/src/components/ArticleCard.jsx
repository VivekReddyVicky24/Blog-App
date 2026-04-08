// Article card with design system theme
import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const {
    _id, title, content, coverImage, image, category,
    author, createdAt, views, likes,
  } = article;

  const initials = author?.name
    ? author.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'AU';

  const date = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  // Create excerpt from content if not provided
  const excerpt = content ? content.slice(0, 120) + '...' : '';

  // Calculate reading time
  const wordCount = content?.split(/\s+/).length || 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    <Link to={`/article/${_id}`} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
      <article 
        className="card article-card" 
        style={{ 
          width: '100%',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.05)',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(0)',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
        }}
      >
        <div className="article-card__image" style={{ overflow: 'hidden', height: '220px' }}>
          {coverImage || image
            ? <img src={coverImage || image} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} />
            : <PlaceholderCover title={title} />}
        </div>

        <div className="article-card__content" style={{ padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column', height: '100%' }}>
          {category && (
            <span className="badge badge-rose" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: 'var(--sp-3)', display: 'inline-block', width: 'fit-content' }}>{category}</span>
          )}

          <h3 className="article-card__title" style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--sp-3)', color: 'var(--text-primary)', lineHeight: 1.3 }}>{title}</h3>

          {excerpt && (
            <p className="article-card__excerpt" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--sp-4)', lineHeight: 1.5 }}>{excerpt}</p>
          )}

          <div className="article-card__footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
              <div className="avatar avatar-sm avatar-rose">{initials}</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
                  {author?.name ?? 'Unknown'}
                </p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0 }}>{date}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              <span title="Reading time">📖 {readingTime}m</span>
              <span title="View count">👁️ {views || 0}</span>
              <span title="Likes" style={{ color: 'var(--rose)', fontWeight: 600 }}>❤️ {likes || 0}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
}

function PlaceholderCover({ title }) {
  const colors = [
    ['var(--rose-light)', 'var(--sky-light)'],
    ['var(--sky-light)', 'var(--mint-light)'],
    ['var(--mint-light)', 'var(--cream-light)'],
    ['var(--cream-light)', 'var(--rose-light)'],
  ];
  const pair = colors[(title?.length ?? 0) % colors.length];

  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, ${pair[0]} 0%, ${pair[1]} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '2rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)',
      fontStyle: 'italic', padding: 'var(--sp-6)', textAlign: 'center',
    }}>
      {title?.slice(0, 2) ?? 'Bl'}
    </div>
  );
}