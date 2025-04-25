import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  ExternalLink,
  Mail,
} from "react-feather";
import Link from "next/link";

export default function ContactPage() {
  const socialLinks = [
    {
      icon: <Instagram className="h-6 w-6" />,
      href: "https://www.instagram.com/anant_nitkkr/",
      label: "Instagram",
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      href: "https://www.youtube.com/channel/UC",
      label: "YouTube",
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      href: "https://x.com/MathDept_nitkkr",
      label: "Twitter",
    },
    {
      icon: <Linkedin />,
      href: "https://www.linkedin.com/company/anant-the-mathematical-society",
      label: "LinkedIn",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        {/* Contact Card */}
        <section className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-blue-100 mb-12">
            Contact Us
          </h1>

          <div className="bg-black/20 backdrop-blur-sm border border-blue-900/50 rounded-xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              {/* Address */}
              <div className="space-y-2">
                <p className="text-blue-100/90">Mathematics Department,</p>
                <p className="text-blue-100/90">
                  National Institute of Technology
                </p>
                <p className="text-blue-100/90">Kurukshetra-136119, Haryana</p>
              </div>

              {/* Team Anant Button */}
              <div>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 bg-blue-900/20 hover:bg-blue-900/30 border border-blue-900/50 px-6 py-3 rounded-lg text-[#00E0FF] hover:text-[#f7d452] transition-all"
                >
                  Team Anant
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-medium text-blue-200 mb-4">
                  Follow us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-100/80 hover:text-[#00E0FF] transition-colors"
                      title={link.label}
                    >
                      {link.icon}
                      <span className="sr-only">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-lg font-medium text-blue-200 mb-2">
                  Drop a line
                </h3>
                <a
                  href="mailto:mathematics@nitkkr.ac.in"
                  className="inline-flex items-center gap-2 text-[#00E0FF] hover:text-[#f7d452] transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  mathematics@nitkkr.ac.in
                </a>
              </div>
            </div>

            {/* Right Content - Infinity Logo */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-48 h-48">
                <Image
                  src="/anant_logo.png"
                  alt="Anant Logo"
                  fill
                  className="object-contain opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm border border-blue-900/50 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d670.8443268355226!2d76.81663549808746!3d29.947650759421897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e3faf8cd702a7%3A0xfc36228e26ad8e0e!2sAnant%20NIT%20KKR!5e0!3m2!1sen!2sin!4v1744544930972!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NIT Kurukshetra Mathematics Department Location"
              className="w-full"
            />
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
