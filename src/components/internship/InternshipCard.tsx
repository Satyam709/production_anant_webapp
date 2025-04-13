"use client";

import { InternshipWithUser } from "@/types/internship";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Linkedin, Link2 } from "lucide-react";

interface InternshipCardProps {
  internship: InternshipWithUser;
}

const InternshipCard = ({ internship }: InternshipCardProps) => {
  const router = useRouter();

  return (
    <div 
      onClick={() => router.push(`/internship/${internship.id}`)}
      className="bg-black/20 backdrop-blur-sm border border-blue-900/50 hover:border-blue-800/50 rounded-xl overflow-hidden transition-all cursor-pointer group"
    >
      {/* User Info Section */}
      <div className="flex items-center gap-4 p-6 border-b border-blue-900/30">
        <div className="relative w-16 h-16">
          <Image
            className="rounded-full bg-blue-900/20 object-cover" 
            src={internship.user.imageURL || "/placeholder-avatar.png"}
            alt={internship.user.name}
            fill
            sizes="(max-width: 64px) 100vw"
            priority
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-blue-100 group-hover:text-[#f5c722] transition-colors">
            {internship.title}
          </h3>
          <p className="text-blue-200/80">
            {internship.user.branch} {internship.user.batch}
          </p>
        </div>
      </div>

      {/* Internship Details */}
      <div className="p-6">
        <div>
          <p className="text-blue-100 mb-2">{internship.company_name}</p>
          <p className="text-blue-200/70 mb-4">{internship.duration}</p>
        </div>

        <div className="flex items-center gap-2 text-[#f5c722]">
          {internship.link && (
            <>
              {internship.link.includes('linkedin.com') ? (
                <Linkedin className="h-4 w-4" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
            </>
          )}
          <span className="text-blue-200/60">Click to view details</span>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
