"use client";
import React, { useEffect, useState } from "react";
import NewsTickerSection from "./NewsTickerSection";
import WelcomeSection from "./WelcomeSection";
import HomeEventsSection from "./HomeEventsSection";
import HomeBlogsSection from "./HomeBlogsSection";
import HomeProjectsSection from "./HomeProjectsSection";
import HomeGallerySection from "./HomeGallerySection";
import { Notice, Events } from "@prisma/client";

const HomePage2 = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [latestEvents, setLatestEvents] = useState<Events[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, eventsRes] = await Promise.all([
          fetch('/api/notices'),
          fetch('/api/events')
        ]);
        
        const noticesData = await noticesRes.json();
        const eventsData = await eventsRes.json();
        
        setNotices(Array.isArray(noticesData) ? noticesData : []);
        setLatestEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Map notices to news format with fallback
  const news = notices?.length > 0 ? notices.map(notice => notice.headline) : [
    "Registration for Code Mathon 2025 is now open!",
    "Anant Newsletter Volume 3 released - Explore Ancient Indian Mathematics",
    "Workshop on Financial Mathematics scheduled for May 5th",
  ];

  // Map events to our event format with fallback
  const events = latestEvents?.length > 0 ? latestEvents.map(event => ({
    id: event.event_id,
    title: event.eventName,
    date: new Date(event.conductedOn).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    venue: event.venue,
    image: event.imageURL || "/api/placeholder/400/250",
    description: event.description
  })) : [
    {
      id: "1",
      title: "APM 2025",
      date: "April 25, 2025",
      venue: "Lecture Hall Complex",
      image: "/api/placeholder/400/250",
      description:
        "Annual Programming Marathon - test your coding skills in this 12-hour competition",
    },
    {
      id: "2",
      title: "Math Olympiad",
      date: "May 10, 2025",
      venue: "Main Auditorium",
      image: "/api/placeholder/400/250",
      description:
        "Challenge yourself with complex mathematical problems and compete with peers",
    },
    {
      id: "3",
      title: "Guest Lecture: Cryptography",
      date: "May 17, 2025",
      venue: "Mathematics Department",
      image: "/api/placeholder/400/250",
      description:
        "Learn about modern cryptographic algorithms and their mathematical foundations",
    },
  ];

  const blogs = [
    {
      id: 1,
      title: "Understanding Ramanujan's Infinite Series",
      author: "Dr. Priya Sharma",
      image: "/api/placeholder/400/250",
      category: "Indian Mathematics",
    },
    {
      id: 2,
      title: "Mathematical Models in Epidemiology",
      author: "Rajat Verma",
      image: "/api/placeholder/400/250",
      category: "Applied Mathematics",
    },
    {
      id: 3,
      title: "Game Theory: Nash Equilibrium Explained",
      author: "Ankita Patel",
      image: "/api/placeholder/400/250",
      category: "Probability and Game",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Machine Learning for Mathematical Pattern Recognition",
      department: "Mathematics & Computer Science",
      image: "/api/placeholder/400/250",
    },
    {
      id: 2,
      title: "Financial Models for Stock Market Prediction",
      department: "Mathematics & Economics",
      image: "/api/placeholder/400/250",
    },
    {
      id: 3,
      title: "Cryptographic Algorithm Development",
      department: "Mathematics",
      image: "/api/placeholder/400/250",
    },
  ];

  const photos = [
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
    "/api/placeholder/800/500",
  ];

  const galleryPhotos = Array(8)
    .fill(null)
    .map((_, index) => `/api/placeholder/${300 + index}/${300 + index}`);

  return (
    <div className="flex flex-col w-full space-y-24">
      <NewsTickerSection news={news} />
      <WelcomeSection photos={photos} />
      <HomeEventsSection events={events} />
      <HomeBlogsSection blogs={blogs} />
      <div className="bg-black/20 backdrop-blur-sm py-24">
        <HomeProjectsSection projects={projects} />
      </div>
      <div className="bg-black/30 backdrop-blur-sm py-24">
        <HomeGallerySection photos={galleryPhotos} />
      </div>
    </div>
  );
};

export default HomePage2;
