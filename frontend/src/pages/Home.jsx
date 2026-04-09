import { useEffect, useState } from "react";
import API from "../services/api";
import { searchArticles } from "../services/api";
import HeroSection from "../HeroSection";
import ArticleCard from "../ArticleCard";
import LandingPage from "./LandingPage";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isGuest = !user;

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

  // Listen for search events from Navbar
  useEffect(() => {
    const handleSearch = (e) => {
      setSearchTerm(e.detail);
    };

    window.addEventListener('triggerSearch', handleSearch);
    return () => window.removeEventListener('triggerSearch', handleSearch);
  }, []);

  // Perform search when searchTerm changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      return;
    }

    const performSearch = async () => {
      try {
        setIsSearching(true);
        const { data } = await searchArticles(searchTerm);
        setArticles(data);
        setSelectedCategory("All");
        setIsSearching(false);
      } catch (error) {
        console.error("Search error:", error);
        setIsSearching(false);
      }
    };

    performSearch();
  }, [searchTerm]);

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (!query.trim()) {
      // Reset to all articles when search is cleared
      const fetchArticles = async () => {
        try {
          const { data } = await API.get("/articles");
          setArticles(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchArticles();
    }
  };

  // Filter articles by selected category (or use search results)
  const filteredArticles = selectedCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  // Show Landing Page for guests
  if (isGuest) {
    return <LandingPage />;
  }

  // Show full feed for authenticated users
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

          {/* Search Bar */}
          <div style={{ marginBottom: 'var(--sp-10)', maxWidth: '600px', margin: '0 auto var(--sp-10)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-surface)',
              borderRadius: '12px',
              padding: '14px 18px',
              border: '2px solid transparent',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              transition: 'all var(--dur-fast)'
            }}
            onFocus={() => {}}
            >
              <span style={{ marginRight: '10px', fontSize: '18px' }}>🔍</span>
              <input
                type="text"
                placeholder="Search articles by title or content..."
                value={searchTerm}
                onChange={handleSearch}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div style={{
            display: 'flex',
            gap: 'var(--sp-3)',
            justifyContent: 'center',
            marginBottom: 'var(--sp-12)',
            flexWrap: 'wrap',
            padding: '16px 0'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  cursor: 'pointer',
                  padding: '10px 18px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  transition: 'all var(--dur-fast)',
                  border: selectedCategory === cat ? 'none' : `2px solid var(--accent)`,
                  borderRadius: '20px',
                  background: selectedCategory === cat ? 'var(--accent)' : 'var(--bg-surface)',
                  color: selectedCategory === cat ? 'var(--accent-fg)' : 'var(--accent)',
                  boxShadow: selectedCategory === cat ? '0 4px 12px rgba(244,63,94,0.3)' : '0 2px 8px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.background = 'var(--accent)';
                    e.target.style.color = 'var(--accent-fg)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat) {
                    e.target.style.background = 'var(--bg-surface)';
                    e.target.style.color = 'var(--accent)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--sp-10)', color: 'var(--text-muted)' }}>
              <p>No articles found {searchTerm ? `matching "${searchTerm}"` : `in ${selectedCategory === "All" ? "the blog" : selectedCategory}`}. Check back soon!</p>
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