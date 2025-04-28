"use client";

import React from 'react';
import {useState, useEffect} from 'react';
import Navbar from "@/components/Navbar"
import NoticeHeader from '@/components/notice/NoticeHeader';
import Footer from "@/components/Footer"
import { category } from '@prisma/client';


const imageLinks= {
  Technical: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000', 
  General: 'https://images.unsplash.com/photo-1602497223003-531c7a191886?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Sponsorship: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000'
}

type Notice = {
  id: string;
  headline: string;
  body: string;
  category: category
  postedOn: Date;
};

export default function NoticePage() {

  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
      async function load_data() {
        const res = await fetch('/api/notices/');
        const parsed_response = await res.json();
        const notices = parsed_response.notices;
        console.log(notices);
  
        const modified_notices = notices.map((notice: any) => {
          return {
            id: notice.notice_id,
            headline: notice.headline,
            body: notice.body,
            category: notice.category,
            postedOn: new Date(notice.postedOn)
          }
        });
  
        setNotices(modified_notices);
      }
      load_data();
    }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Sponsorship':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

        <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <NoticeHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices && notices.map(notice => (
            <div
              key={notice.id} className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
            >
              {imageLinks[notice.category] && (
                <div className="relative h-48">
                  <img
                    src={imageLinks[notice.category]}
                    alt={notice.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(notice.category)}`}>
                    {notice.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {notice.postedOn.toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{notice.headline}</h3>
                <p className="text-gray-300 text-sm">{notice.body}</p>
              </div>
            </div>
          ))}
        </div>
        
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}