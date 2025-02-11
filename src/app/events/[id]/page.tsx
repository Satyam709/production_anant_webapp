import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventDetails from "@/components/events/EventDetails";
import { Events } from "@prisma/client";

export const revalidate = 60; 
// export const dynamic = 'force-dynamic'

async function getEvent(id: string): Promise<Events | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/events/${id}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    const data: Events = (await response.json()).data;
    console.log("Event Data:", data);
  
    return data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

interface EventPageProps {
  params: {
    id: Promise<string>;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(await params.id);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        {event ? (
          <EventDetails event={event} />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Event not found</h2>
          </div>
        )}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
