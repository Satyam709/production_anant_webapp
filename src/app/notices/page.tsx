"use client";

import React from 'react';
import Navbar from "@/components/Navbar"
import NoticeHeader from '@/components/notice/NoticeHeader';
import NoticeList from '@/components/notice/NoticeList';
import Footer from "@/components/Footer"
import { useState, useEffect} from 'react';
import axios from 'axios';


export default function MeetPage() {

  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get('/api/notices', {
        params: {
          page: page || "1",
          category: category || "",
      }});
      const data = await response.data;
      setNotices(data.notices);         // array of objects
    }
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

        <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <NoticeHeader />
        <NoticeList />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}