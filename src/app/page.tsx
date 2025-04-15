import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import HomeContent from "@/components/home/HomeContent";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0 bg-gradient-to-b from-primary-blue/5 via-primary-purple/5 to-transparent pointer-events-none"></div>
      <Navbar />
      <Hero />
      <HomeContent />
      <Footer />
    </div>
  );
}
