import React from "react";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react"; // Import icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mailtoLink = "mailto:shimmy@closedash.io";

  return (
    <footer className="bg-[#1B2D41] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-6 mb-12">
          {/* Brand */}
          <div className="relative">
            <Image
              src="/closedash_full.jpeg"
              alt="CloseDash Logo"
              width={240}
              height={100}
              className="mb-4 rounded-lg shadow-blur"
            />
          </div>

          <p className="text-gray-300 text-lg">
            Be among the first to experience AI-driven sales coaching that
            actually feels human.
          </p>

          {/* Enhanced Support Email Section */}
          <div className="bg-[#1B2D41]/50 backdrop-blur-sm rounded-xl p-6 w-full max-w-md shadow-lg border border-[#E1766E]/20 mt-4">
            <div className="flex items-center justify-center mb-3">
              <Mail className="text-[#E1766E] mr-2" size={20} />
              <h3 className="text-lg font-medium text-white">Need Support?</h3>
            </div>

            <p className="text-gray-300 mb-4">
              Our team is ready to help with any questions or issues you might
              have.
            </p>

            <a
              href={mailtoLink}
              className="group flex items-center justify-center bg-[#E1766E] hover:bg-[#E1766E]/90 text-white py-3 px-5 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <span>Contact Support</span>
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </a>

            <p className="text-gray-400 text-sm mt-3">
              Or email us directly at{" "}
              <a
                href="mailto:shimmy@closedash.io"
                className="text-[#E1766E] hover:text-[#E1766E]/80 underline transition-colors"
              >
                shimmy@closedash.io
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[#E1766E]/20 pt-8 mt-8 text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {currentYear} CloseDash. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
