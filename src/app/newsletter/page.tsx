import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsLetterHeader from "@/components/newsletter/NewsLetterHeader";
import NewsletterList from "@/components/newsletter/NewsLetterList";

export default async function NewsLetterPage() {

    const { newsletters } = await getNewsLetter();

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="fixed inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
        </div>

        <Navbar />

        <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
            <NewsLetterHeader />
            <NewsletterList newsletters={newsletters} deleteOpt={false} onDelete={null}/>
        </div>
        </main>

        <div className="relative z-10">
            <Footer />
        </div>
        </div>
    );
}

export async function getNewsLetter() {
  try {
    const response = await fetch(`${process.env.API_URL}/api/newsletter`);
    
    if (!response.ok) 
        throw new Error("Failed to fetch newsletter");

    const data = await response.json();

    if (!data) {
    return {newsletters:[]};
    }

    return { newsletters: data.newsletters };
    } catch (error) {
    
    console.error("Error fetching blogs:", error);
    return { newsletters: [] };
  }
}
