import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsLetterPost from "@/components/newsletter/NewsLetterPost";
import Page404 from "@/components/Page404";

export default async function NewsLetterPostPage({ params }: { params: { id: string } }) {

    const {id} = await params;
    const { newsletter } = await getNewsLetter(id);

    if(newsletter==null){
        return <Page404/>
    }
    
    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="fixed inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
        </div>
    
        <Navbar />
    
        <main className="relative z-10 container mx-auto px-4 py-20">
            <NewsLetterPost key={newsletter.id} {...newsletter} />
        </main>
    
        <div className="relative z-10">
            <Footer />
        </div>
        </div>
    );
}


export async function getNewsLetter(id: string) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/newsletter/${id}`);
      
      const data = await response.json();
  
      if (!data) {
        return {newsletter: null};
      }
  
      return { newsletter: data.newsletter };
      } catch (error) {

      console.error("Error fetching blogs:", error);
      return {newsletter: null};
    }
  }
  