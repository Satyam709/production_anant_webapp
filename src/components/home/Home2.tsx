"use client";
import React, { useEffect, useState } from "react";
import NewsTickerSection from "./NewsTickerSection";
import WelcomeSection from "./WelcomeSection";
import HomeEventsSection from "./HomeEventsSection";
import HomeBlogsSection from "./HomeBlogsSection";
import HomeProjectsSection from "./HomeProjectsSection";
import HomeGallerySection from "./HomeGallerySection";
import { Notice, Events } from "@prisma/client";
import { NewsItem } from "@/components/home/NewsTickerSection";

const defaultNews = ["Welcome to the Mathematics Department!"];

const HomePage2 = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [latestEvents, setLatestEvents] = useState<Events[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, eventsRes] = await Promise.all([
          fetch("/api/notices"),
          fetch("/api/events"),
        ]);

        if (!noticesRes.ok) {
          throw new Error("Failed to fetch notices");
        }
        if (!eventsRes.ok) {
          throw new Error("Failed to fetch events");
        }

        const noticesData = await noticesRes.json();
        const parsedNotices = noticesData.notices as Notice[];
        const eventsData = await eventsRes.json();
        const parsedEvents = eventsData.upcomingEvents as Events[];
        // console.log('Events:', eventsData);

        console.log("setting notices ");

        setNotices(parsedNotices);
        setLatestEvents(parsedEvents);

        // Map notices to news format
        const mappedNews = parsedNotices
          .filter((e) => e.is_active)
          .map((notice: Notice) => ({
            id: notice.notice_id,
            title: notice.headline,
            created_at: new Date(notice.postedOn).toString(),
          }));

        if (mappedNews.length === 0) {
          // Fallback to default news if no notices are available
          mappedNews.push({
            id: "0",
            title: defaultNews[0],
            created_at: new Date().toString(),
          });
        }

        setNews(mappedNews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Map notices to news format with fallback
  // const news = notices.filter(notice=>notice.is_active).map((notice) => notice.headline);
  // Fallback to default news if no notices are available

  return (
    <div className="flex flex-col w-full space-y-24">
      <NewsTickerSection news={news} />
      <WelcomeSection photos={[]} />
      <HomeEventsSection events={latestEvents} />
      <HomeBlogsSection blogs={[]} />
      <div className="bg-black/20 backdrop-blur-sm py-24">
        <HomeProjectsSection projects={[]} />
      </div>
      <div className="bg-black/30 backdrop-blur-sm py-24">
        <HomeGallerySection photos={[]} />
      </div>
    </div>
  );
};

export default HomePage2;
