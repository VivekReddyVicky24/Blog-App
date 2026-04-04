import { useEffect, useState } from "react";
import API from "../services/api";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  const [articles, setArticles] = useState([]);

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

  return (
    <div className="container">
      <h2>Latest Articles</h2>

      {articles.length === 0 ? (
        <p>No articles yet</p>
      ) : (
        articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))
      )}
    </div>
  );
};

export default Home;