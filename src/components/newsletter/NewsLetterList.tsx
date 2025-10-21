import { NewsLetter } from '@prisma/client';
import React from 'react';

import NewsletterCard from './NewsLetterCard';

interface NewsletterListProps {
  newsletters: NewsLetter[];
  onDelete: any;
  deleteOpt: boolean;
}

const NewsletterList: React.FC<NewsletterListProps> = ({
  newsletters,
  onDelete,
  deleteOpt,
}) => {
  return (
    <div className="space-y-4">
      {newsletters.map((newsletter) => (
        <NewsletterCard
          key={newsletter.id}
          newsletter={newsletter}
          onDelete={onDelete}
          deleteopt={deleteOpt}
        />
      ))}
    </div>
  );
};

export default NewsletterList;
