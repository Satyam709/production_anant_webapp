"use client"
import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Trophy,
  Calendar,
  Users,
  Bell,
  Menu,
  X,
  LogOut,
  UserPlus,
  Send,
  ImageIcon,
  Newspaper,
  Pencil,
  Briefcase,
  Star
} from "lucide-react";
import CompForm from "@/components/forms/CompForm";
import EventForm from "@/components/forms/EventForm";
import MeetForm from "@/components/forms/MeetForm";
import NoticeForm from "@/components/forms/NoticeForm";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TeamDashboard from "@/components/teams/TeamDashboard";
import { signOut, useSession } from "next-auth/react";
import {  useRouter } from "next/navigation";
import PhotoGallery from "@/components/gallery/admin/GalleryManage";
import BlogDashBoard from "@/components/blogs/BlogDashBoard";
import InternshipDashboard from "@/components/internship/Dashboard";
import AchievementForm from "@/components/forms/AchievementForm";
import NewsLetterDashboard from "@/components/newsletter/NewsLetterDashboard";
import isAdmin from "@/lib/actions/Admin";
import isSuperAdmin  from "@/lib/actions/Admin";

type TabType =
  | "competitions"
  | "events"
  | "meetings"
  | "notices"
  | "teams"
  | "shop"
  | "gallery"
  | "newsletter"
  | "blogs"
  | "internships"
  | "achievements";

async function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const session = useSession();
  const router = useRouter();
  const isadmin = await isAdmin();
  const issuperadmin = await isSuperAdmin();
  const defTab = isadmin ? "notices" : "teams";
  const [activeTab, setActiveTab] = useState<TabType>(defTab);

  const handleLogout = () => {
    signOut({callbackUrl: '/login'});
  };

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session.status, router]);

  const normaltabs = [
    { id: "teams", label: "Teams", icon: UserPlus }
  ];

  const adminTabs = [
    { id: "meetings", label: "Meetings", icon: Users },
    { id: "notices", label: "Notices", icon: Bell },
    { id: "teams", label: "Teams", icon: UserPlus },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "blogs", label: "Blogs", icon: Pencil },
    { id: "internships", label: "Internships", icon: Briefcase },
  ];

  const superadminTabs = [
    { id: "competitions", label: "Competitions", icon: Trophy },
    { id: "events", label: "Events", icon: Calendar },
    { id: "meetings", label: "Meetings", icon: Users },
    { id: "notices", label: "Notices", icon: Bell },
    { id: "teams", label: "Teams", icon: UserPlus },
    { id: "shop", label: "Shop", icon: Send },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "newsletter", label: "Newsletter", icon: Newspaper },
    { id: "blogs", label: "Blogs", icon: Pencil },
    { id: "internships", label: "Internships", icon: Briefcase },
    { id: "achievements", label: "Achievements", icon: Star },
  ]

  const tabs = issuperadmin? superadminTabs: (isadmin ? adminTabs : normaltabs);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      {/* Mobile Sidebar Toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800/50
        transform transition-transform duration-200 ease-in-out z-40
        flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <header className="p-6 border-b border-gray-800/50">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-primary-cyan" />
            <h1 className="text-xl font-bold">{isadmin?"Admin Dashboard":"Dashboard"}</h1>
          </div>
        </header>

        <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg
                transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-blue/20 to-primary-cyan/20 text-white border border-primary-blue/20"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                }
              `}
            >
              <tab.icon
                className={`h-5 w-5 ${
                  activeTab === tab.id ? "text-primary-cyan" : ""
                }`}
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <footer className="p-6 border-t border-gray-800/50 bg-gray-900/50 backdrop-blur-xl mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
            onDoubleClick={handleLogout} // Require double click for logout
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </footer>
      </aside>

      {/* Main Content */}
      <div
        className={`
        min-h-screen transition-all duration-200 ease-in-out
        ${isSidebarOpen ? "lg:pl-64" : "pl-0"}
      `}
      >
        <div className="p-8">
          <DashboardHeader activeTab={activeTab} />

          <div className="mt-8">
            {activeTab === "competitions" && <CompForm />}
            {activeTab === "events" && <EventForm />}
            {activeTab === "meetings" && <MeetForm />}
            {activeTab === "notices" && <NoticeForm />}
            {activeTab === "teams" && <TeamDashboard />}
            {activeTab === "shop" && <Shop />}
            {activeTab === "gallery" && <PhotoGallery />}
            {activeTab === "blogs" && <BlogDashBoard />}
            {activeTab === "newsletter" && <NewsLetterDashboard />}
            {activeTab === "internships" && <InternshipDashboard />}
            {activeTab === "achievements" && <AchievementForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

const Shop = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/shop/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <div className="p-8 text-center">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-4">Hello!</h2>
          <p className="text-lg mb-6">
            Click the button below to enter the shop admin panel.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-primary-cyan text-white rounded-lg hover:bg-primary-cyan/80 transition-colors duration-200"
          >
            Enter Shop Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
};



export default App;
