import { Mail, MapPin, Phone } from "lucide-react";
// import customLogo from "/an"; // Adjust the path as necessary
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src='/anant_logo.png' // Adjust the path as necessary
                alt="Custom Logo"
                className="h-auto w-auto max-h-12 max-w-12 mr-2"
                width={150}
                height={150}
              />
              <span className="text-xl font-bold text-white">Anant</span>
            </div>
            <p className="mb-4">
              The Mathematical Society of NIT Kurukshetra, dedicated to
              fostering mathematical thinking and innovation.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-blue-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-500">
                  About
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-blue-500">
                  Events
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-blue-500">
                  Team
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                NIT Kurukshetra, Haryana
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                contact@anant.nitkkr.ac.in
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                +91 XXXXXXXXXX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Anant - The Mathematical Society.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
