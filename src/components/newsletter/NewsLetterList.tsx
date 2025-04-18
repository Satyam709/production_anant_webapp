import React from 'react';
import NewsletterCard from './NewsLetterCard';
import { NewsLetter } from '@prisma/client';

interface NewsletterListProps {
  newsletters: NewsLetter[];
}

const NewsletterList: React.FC<NewsletterListProps> = ({ newsletters }) => {
  return (
    <div className="space-y-4">
      {newsletters.map(newsletter => (
        <NewsletterCard key={newsletter.id} newsletter={newsletter} />
      ))}
    </div>
  );
};

export default NewsletterList;