import React from 'react';
import { Calendar } from 'react-feather';

interface News {
  date: string;
  title: string;
  description: string;
  link?: string;
}

const LatestNews = ({ latestNews }: { latestNews: News[] }) => {
  if (!Array.isArray(latestNews)) {
    return null; // or handle the error appropriately
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((news, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div className="flex items-center gap-2 text-primary-cyan mb-3">
                <Calendar size={16} />
                <span className="text-sm">{news.date}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{news.title}</h3>
              <p className="text-gray-400">{news.description}</p>
              {news.link && (
                <a
                  href={news.link}
                  className="inline-block mt-4 text-primary-cyan hover:text-primary-blue transition-colors"
                >
                  Read more →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
