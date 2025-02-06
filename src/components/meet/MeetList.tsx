"use client"
import React, { useEffect, useState } from "react";
import MeetCard from "./MeetCard";
import { Meeting } from "@prisma/client";

const MeetList = () => {

  const [meets, setMeets] = useState<Meeting[]>([]);

  useEffect(() => {
    // Fetch meetings from API
    const fetchMeets = async () => {
      try {
        const res = await fetch("/api/meetings");
        if (!res.ok) {
          console.error("Failed to fetch meetings");
          throw new Error("Failed to fetch meetings");
          return;
        }
        const data = await res.json();
        setMeets(data.meetings.upcoming);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMeets();
  }, []);

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Upcoming Meetings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meets.map((meeting, index) => (
          <MeetCard key={index} {...meeting} />
        ))}
      </div>
    </section>
  );
};

export default MeetList;
