"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ProfileLayout from "@/components/profile/ProfileLayout";
import Footer from "@/components/Footer";
import axios from "axios";
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";

const Profile = () => {

  const [user, setUser] = useState({});
  const [activities, setActivities] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    async function fetchData(){
        try{
            const response = await axios.get(`/api/profile/${id}`);
            const data = await response.data;
            const user_data = {
                name: data.profile.name,
                roll_number: data.profile.roll_number,
                branch: data.profile.branch,
                batch: data.profile.batch,
                position: data.profile.position,
                club_dept: data.profile.club_dept,
                joined: data.profile.joined,
                imageURL: data.profile.imageURL
            }
            const user_act = {
                meetings_attended: data.profile.meetings_attended,
                meetings_conducted: data.profile.meetings_conducted,
                compititions_created: data.profile.compititions_created,
                notice_created: data.profile.notices
            }

            setUser(user_data);
            setActivities(user_act);

        }
        catch(error){
            console.log(error);
        }
    }
    fetchData();
},[]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <div className="fixed inset-0 pointer-events-none"></div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <ProfileLayout/>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
