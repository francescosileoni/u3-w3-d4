import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  published_at: string; // Update the property name to match the API response
  image_url: string;
}

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles');
        const data = await response.json();
        setArticles(data.results); // Update to access the 'results' array
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Spaceflight News</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link to={`/articles/${article.id}`}>
              <div>
                <img src={article.image_url} alt={article.title} />
                <h3>{article.title}</h3>
                <p>{article.published_at}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
