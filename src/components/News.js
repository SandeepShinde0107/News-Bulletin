import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
      setLoading(true);
      const data = await fetch(url);
      const parsedData = await data.json();

      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateNews();
  }, [props.category]);

  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
      const data = await fetch(url);
      const parsedData = await data.json();

      // Remove duplicate articles
      const newArticles = parsedData.articles.filter(
        (newArticle) =>
          !articles.some((existingArticle) => existingArticle.url === newArticle.url)
      );

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setTotalResults(parsedData.totalResults || 0);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: '30px 0px', marginTop: '90px' }}>
        News Bulletin - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div
                className="col-md-4"
                key={`${element.url}-${index}`} // Ensure uniqueness by combining URL and index
              >
                <Newsitem
                  title={element.title || "No Title Available"}
                  description={element.description || "No Description Available"}
                  imageUrl={element.urlToImage || "https://via.placeholder.com/150"}
                  newsUrl={element.url || "#"}
                  author={element.author || "Unknown"}
                  date={element.publishedAt || "Unknown Date"}
                  source={element.source?.name || "Unknown Source"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
