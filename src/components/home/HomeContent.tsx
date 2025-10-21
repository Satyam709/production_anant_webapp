'use client';
import { Events,Notice } from '@prisma/client';
import React, { useEffect, useState } from 'react';

import NewsTickerSection, { NewsItem } from '@/components/home/NewsTickerSection';

import HomeBlogsSection from './HomeBlogsSection';
import HomeEventsSection from './HomeEventsSection';
import HomeInternshipSection from './HomeInternshipSection';
import WelcomeSection from './WelcomeSection';

interface Blog {
  id: number;
  title: string;
  author: string;
  image: string;
  category: string;
}

const defaultNews = ['Welcome to the Mathematics Department!'];
const photos = [
  '/homeImages/image_0.avif',
  '/homeImages/image_1.avif',
  '/homeImages/image_2.avif',
  '/homeImages/image_3.avif',
  '/homeImages/image_4.avif',
  '/homeImages/image_5.avif',
  '/homeImages/image_6.avif',
  '/homeImages/image_7.avif',
  '/homeImages/image_8.avif',
  '/homeImages/image_9.avif',
  '/homeImages/image_10.avif',
  '/homeImages/image_11.avif',
  '/homeImages/image_12.avif',
];

const HomeContent = () => {
  const [latestEvents, setLatestEvents] = useState<Events[]>([]);
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '0',
      title: defaultNews[0],
      created_at: new Date().toString(),
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, eventsRes, blogsRes] = await Promise.all([
          fetch('/api/notices'),
          fetch('/api/events'),
          fetch('/api/blogs'),
        ]);

        if (!eventsRes.ok) {
          throw new Error('Failed to fetch events');
        }

        // Handle blogs
        if (blogsRes.ok) {
          const blogsData = await blogsRes.json();
          setLatestBlogs(blogsData.blogs.slice(0, 3));
        }

        // Handle notices
        if (noticesRes.ok) {
          const noticesData = await noticesRes.json();
          const parsedNotices = noticesData.notices as Notice[];
          const mappedNews = parsedNotices
            .filter((e) => e.is_active)
            .map((notice: Notice) => ({
              id: notice.notice_id,
              title: notice.headline,
              created_at: new Date(notice.postedOn).toString(),
            }));

          if (mappedNews.length > 0) {
            setNews(mappedNews);
          }
        }

        // Handle events
        const eventsData = await eventsRes.json();
        const parsedEvents = eventsData.upcomingEvents as Events[];
        setLatestEvents(parsedEvents.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Map notices to news format with fallback
  // const news = notices.filter(notice=>notice.is_active).map((notice) => notice.headline);
  // Fallback to default news if no notices are available

  return (
    <div className="pt-[70px] flex flex-col w-full space-y-24" id="content">
      <NewsTickerSection news={news} />
      <WelcomeSection photos={photos} />
      <HomeEventsSection events={latestEvents} />
      <HomeBlogsSection blogs={latestBlogs} />
      <div className="bg-black/15 backdrop-blur-sm">
        <HomeInternshipSection />
      </div>
      {/* <div className="bg-black/30 backdrop-blur-sm py-24">
        <HomeGallerySection photos={[]} />
      </div> */}
    </div>
  );
};

export default HomeContent;
