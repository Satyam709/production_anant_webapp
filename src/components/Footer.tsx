import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Team Anant', href: '/team_anant' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
    { name: 'Math Department', href: '/department' },
    { name: 'Developers', href: '/developers' },
    { name: 'Certificate-Verification', href: '/certificate-verification' },
    {
      name: 'Old Website',
      href: 'https://mathematics39.wixsite.com/anantnitkkr',
    },
    {
      name: 'Repository',
      href: 'https://github.com/Anant-WebDev/anant_webapp/',
    },
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-4 w-4" />,
      text: 'NIT Kurukshetra, Haryana - 136119',
    },
    {
      icon: <Mail className="h-4 w-4" />,
      text: 'mathematics@nitkkr.ac.in',
    },
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: 'https://www.linkedin.com/company/anant-the-mathematical-society/',
      label: 'LinkedIn',
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: 'https://www.instagram.com/anant_nit_kkr/',
      label: 'Instagram',
    },
    {
      icon: <Twitter className="h-4 w-4" />,
      href: 'https://x.com/MathDept_nitkkr',
      label: 'Twitter',
    },
    {
      icon: <Youtube className="h-4 w-4" />,
      href: 'https://www.youtube.com/@anant_nitkkr',
      label: 'YouTube',
    },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-32 items-start">
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col items-center ">
            <Link
              href="/"
              className="flex flex-col items-center space-x-3 group justify-center  w-[100%]"
            >
              <Image
                src="/anant_logo.png"
                alt="Anant Logo"
                width={100}
                height={100}
                className="transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="flex text-xl font-bold text-white flex-col items-center">
                <h2>Anant</h2>
                <p>The Mathematical Society</p>
                <p>NIT Kurukshetra</p>
              </div>
            </Link>
            <div className="text-sm text-gray-400 leading-tight  w-[100%] h-[100%] flex flex-col items-center justify-center">
              <p>TeamAnant | Mathematics Department</p>
              <p>National Institute of Technology </p>
              <p>Kurukshetra-136119, Haryana</p>
              <a
                href="mailto:mathematics@nitkkr.ac.in"
                className="text-blue-300 hover:underline"
              >
                mathematics@nitkkr.ac.in
              </a>
            </div>
            <div className="flex space-x-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-semibold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-1.5 bg-gray-800/50 rounded-md">
                    {info.icon}
                  </div>
                  <p className="text-sm text-gray-400">{info.text}</p>
                </div>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center text-sm px-4 py-2 mt-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg transition-colors duration-300"
              >
                Get in Touch
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-xs text-gray-400">
            <p>
              © {new Date().getFullYear()} Anant Mathematical Society. All
              rights reserved.
            </p>
            <div className="flex space-x-6">
              {/* <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy
              </Link> */}
              <Link
                href="/policy"
                className="hover:text-white transition-colors duration-300"
              >
                Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
