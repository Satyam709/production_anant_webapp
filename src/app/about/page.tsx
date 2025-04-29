import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-100 mb-8">
              About Anant
            </h1>
          </div>
        </section>

        {/* Welcome Note */}
        <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-200 mb-6">
          Welcome to Anant - The Mathematical Society
        </h2>
        <div className="text-lg text-blue-100/80 space-y-6 [text-align:justify] [text-justify:inter-word]">
          <p>
            At Anant - The Mathematical Society, our mission is to ignite and
            nurture a love for mathematics and technology.
          </p>

          <div>
            <p>We strive to:</p>
            <p>
              Encourage Mathematical Excellence: Inspire the exploration and
              understanding of math concepts through fun activities,
              workshops, and seminars. Promote Technological Innovation:
              Provide a platform for students to develop and showcase their
              tech skills through hackathons, coding competitions, and project
              displays.
            </p>
            <p>
              Share Knowledge: Offer opportunities to learn from experts via
              guest lectures, panel discussions, and mentorship programs.
            </p>
            <p>
              Build a Collaborative Community: Foster an inclusive environment
              where students can work together, share ideas, and support each
              other&apos;s academic and professional growth.
            </p>
          </div>

          <div>
            <p>Join Us:</p>
            <p>
              Whether you&apos;re passionate about math, fascinated by
              technology, or just curious about how these fields connect,
              Anant - The Mathematical Society welcomes you. By joining Anant,
              you become part of a supportive community that values curiosity,
              creativity, and critical thinking.
            </p>
          </div>

          <p>
            Together, let&apos;s explore the endless possibilities of
            mathematics and technology and make meaningful contributions to
            the world.
          </p>
        </div>
      </section>


        {/* Action Buttons */}
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/team"
            className="bg-black/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#00E0FF]/50 rounded-xl p-6 text-center transition-all group"
          >
            <h3 className="text-xl font-bold text-blue-100 group-hover:text-[#00E0FF] mb-2">
              Team Anant
            </h3>
            <p className="text-blue-200/60">Meet our dedicated team members</p>
          </Link>

          <Link
            href="/gallery"
            className="bg-black/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#00E0FF]/50 rounded-xl p-6 text-center transition-all group"
          >
            <h3 className="text-xl font-bold text-blue-100 group-hover:text-[#00E0FF] mb-2">
              Photo Gallery
            </h3>
            <p className="text-blue-200/60">View our events and activities</p>
          </Link>

          <Link
            href="/developers"
            className="bg-black/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#00E0FF]/50 rounded-xl p-6 text-center transition-all group"
          >
            <h3 className="text-xl font-bold text-blue-100 group-hover:text-[#00E0FF] mb-2">
              Developers
            </h3>
            <p className="text-blue-200/60">
              Know about the team behind this website
            </p>
          </Link>

          <Link
            href="/contact"
            className="bg-black/20 backdrop-blur-sm border border-blue-900/50 hover:border-[#00E0FF]/50 rounded-xl p-6 text-center transition-all group"
          >
            <h3 className="text-xl font-bold text-blue-100 group-hover:text-[#00E0FF] mb-2">
              Contact Us
            </h3>
            <p className="text-blue-200/60">Get in touch with our team</p>
          </Link>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
