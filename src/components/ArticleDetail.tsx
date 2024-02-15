import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ArticleDetailProps {}

const ArticleDetail: React.FC<ArticleDetailProps> = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }

        const data = await response.json();
        setArticle(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.news_site}</p>
      <img src={article.image_url} alt={article.title} />
      
    </div>
  );
};

export default ArticleDetail;
