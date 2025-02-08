"use client";

import React, { useEffect, useState } from "react";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { Notice } from "@prisma/client";

const size = 3; 

const NoticeSkeleton = () => (
  <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
    {[1, 2, 3].map((index) => (
      <div
        key={index}
        className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800 p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-700 rounded-lg"></div>
            <div>
              <div className="h-6 w-48 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>
          </div>
          <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    ))}
  </div>
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-60">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-cyan-400/20 rounded-full"></div>
      <div className="w-12 h-12 border-4 border-transparent border-t-cyan-400 animate-spin rounded-full absolute top-0 left-0"></div>
    </div>
  </div>
);

const fetchNotices = async (page: number) => {
  try {
    const res = await fetch(`/api/notices?page=${page}`);
    if (!res.ok) {
      throw new Error("Failed to fetch notices");
    }
    const data = await res.json();
    return data.notices as Notice[];
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
};

const formatDate = (dateString: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
};

const NoticeList = ({ page = 1 }: { page?: number }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const getNotices = async () => {
      setIsLoading(true);
      const fetchedNotices = await fetchNotices(currentPage);
      setNotices(fetchedNotices);
      setIsLoading(false);
      if (isInitialLoad) setIsInitialLoad(false);
    };
    getNotices();
  }, [currentPage]);

  if (isInitialLoad) {
    return <NoticeSkeleton />;
  }

  if (isLoading && !isInitialLoad) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mb-20">
      {!notices || notices.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-400">
          <Bell size={40} className="text-gray-500 mb-3" />
          <h2 className="text-lg font-semibold text-white">No Notices Available</h2>
          <p className="text-gray-500">Check back later for updates.</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {notices.map((notice) => (
            <div
              key={notice.notice_id}
              className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Bell className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{notice.headline}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(notice.postedOn)}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-600">
                  {notice.category}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{notice.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-6">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Previous
          </button>
        )}
        {notices.length === size && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default NoticeList;