import Navbar from "@/components/Navbar";
import EventsHeader from "@/components/events/EventsHeader";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import PastEvents from "@/components/events/PastEvents";
import Footer from "@/components/Footer";
import { Events } from "@prisma/client";

export default async function EventsPage() {
  const {upcomingEvents,pastEvents} = await getEvents();
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <EventsHeader />
        <UpcomingEvents events={upcomingEvents} />
        <PastEvents events={pastEvents} />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export async function getEvents() {
  try {
    // Fetch data for both upcoming and past events from the API
    const response = await fetch(
      `${process.env.API_URL}/api/events`
    );
    if (!response.ok) throw new Error("Failed to fetch events");

    const data = await response.json();
    const events = data.events as Events[];
    console.log(events);
    
    if (!events) {
      return {
        upcomingEvents: [],
        pastEvents: [],
      };
    }
    const now = new Date();
    const upcomingEvents = events.filter(
      (event: Events) => new Date(event.conductedOn) > now
    );
    const pastEvents = events.filter(
      (event: Events) => new Date(event.conductedOn) <= now
    );

    return {
        upcomingEvents,
        pastEvents,
    };
  } catch (error) {
    console.error("Error fetching events:", error);

    return {
        upcomingEvents: [],
        pastEvents: [],
    };
  }
}
