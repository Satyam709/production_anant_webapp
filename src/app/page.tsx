import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import LatestNews from "@/components/home/LatestNews";
import Footer from "@/components/Footer";
import { latestNews } from "@/constants/news-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-primary-blue/5 via-primary-purple/5 to-transparent pointer-events-none"></div>
      <Navbar />
      <Hero />
      <About />
      <LatestNews latestNews={latestNews} />
      <Footer />
    </div>
  );
}