import { InternshipWithUser } from "@/types/internship";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Linkedin, Link2 } from "lucide-react";
import Image from "next/image";

export default async function InternshipDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const internshipPromise = Promise.resolve().then(async () => {
    const response = await fetch(`${process.env.API_URL}/api/internships/${params.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch internship");
    }
    return response.json() as Promise<InternshipWithUser>;
  });

  const internship = await internshipPromise;

  if (!internship) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <p className="text-blue-200/60">Internship not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <article className="max-w-3xl mx-auto">
          {/* User Info */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-20 h-20">
              <Image
                src={internship.user.imageURL || "/placeholder-avatar.png"}
                alt={internship.user.name}
                className="rounded-full bg-blue-900/20 object-cover"
                fill
                sizes="(max-width: 80px) 100vw"
                priority
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-100 mb-2">
                {internship.title}
              </h1>
              <div className="flex items-center gap-2 text-blue-200/80">
                <span className="font-semibold">{internship.user.name}</span>
                <span>•</span>
                <span>{internship.user.branch}</span>
                <span>•</span>
                <span>{internship.user.batch}</span>
              </div>
            </div>
          </div>

          {/* Company & Duration */}
          <div className="bg-black/20 backdrop-blur-sm border border-blue-900/50 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-medium text-blue-200/60 mb-1">Company</h2>
                <p className="text-xl font-semibold text-blue-100">{internship.company_name}</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-blue-200/60 mb-1">Duration</h2>
                <p className="text-xl font-semibold text-blue-100">{internship.duration}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {internship.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-blue-100 mb-4">About the Internship</h2>
              <p className="text-blue-200/80 whitespace-pre-wrap">{internship.description}</p>
            </div>
          )}

          {/* Links */}
          {(internship.link) && (
            <div className="flex flex-wrap gap-4">
              {internship.link && (
                <a
                  href={internship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[#f5c722] hover:text-[#f7d452] transition-colors"
                >
                  {internship.link.includes('linkedin.com') ? (
                    <>
                      <Linkedin className="h-5 w-5" />
                      <span>View LinkedIn</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-5 w-5" />
                      <span>View Website</span>
                    </>
                  )}
                </a>
              )}
            </div>
          )}
        </article>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
