import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsLetterHeader from "@/components/newsletter/NewsLetterHeader";
import NewsLetterCard from "@/components/newsletter/NewsLetterCard";
import {NewsLetter} from "@prisma/client"

export default async function NewsLetterPage() {

    const { newsletters } = await getNewsLetter();
    console.log(newsletters);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="fixed inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
        </div>

        <Navbar />

        <main className="relative z-10 container mx-auto px-4 py-20">
            <NewsLetterHeader />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {newsletters.map((newsletter: NewsLetter) => (
                <NewsLetterCard key={newsletter.id} {...newsletter}/>
            ))}
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
