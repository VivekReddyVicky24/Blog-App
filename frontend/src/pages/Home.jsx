import { useEffect, useState } from "react";
import API from "../services/api";
import HeroSection from "../HeroSection";
import ArticleCard from "../ArticleCard";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technology", "Lifestyle", "Design", "Culture", "Science"];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await API.get("/articles");
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles by selected category
  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <>
      <HeroSection />
      <section style={{ paddingTop: 'var(--sp-12)', paddingBottom: 'var(--sp-12)', background: 'var(--bg-page)' }}>
        <div className="container">
          {/* Header */}
          <div style={{ marginBottom: 'var(--sp-8)', textAlign: 'center' }}>
            <h2 className="h2">Latest Articles</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: 'var(--sp-2)' }}>
              Discover insights and inspiration from our community
            </p>
          </div>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            gap: 'var(--sp-3)',
            justifyContent: 'center',
            marginBottom: 'var(--sp-10)',
            flexWrap: 'wrap'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`badge ${selectedCategory === cat ? 'badge-rose' : 'badge-neutral'}`}
                style={{
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: selectedCategory === cat ? 600 : 500,
                  transition: 'all var(--dur-fast)',
                  border: 'none',
                  background: selectedCategory === cat ? 'var(--rose)' : 'var(--bg-subtle)',
                  color: selectedCategory === cat ? 'var(--text-on-rose)' : 'var(--text-secondary)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--sp-10)', color: 'var(--text-muted)' }}>
              <p>No articles found in {selectedCategory === "All" ? "the blog" : `${selectedCategory}`}. Check back soon!</p>
            </div>
          ) : (
            <div className="article-grid">
              {filteredArticles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;