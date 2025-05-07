import React from "react";
import logo from "../assets/edlogo.png";

export default function Footer({
  bgColor = "bg-gray-100",
  textColor = "text-black",
  sections = {},
  socialLinks = [],
}) {
  return (
    <footer className={`${bgColor} ${textColor} pt-10 pb-5`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src={logo}
              alt="Logo"
              className="w-28 h-20 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Useful Links Section */}
          {Object.entries(sections).map(([sectionName, items], index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li key={idx}>
                    <a href={item.link} className="hover:text-blue-600">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section spanning 2 columns */}
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">
              Subscribe to our newsletter
            </h3>
            <p className="mb-4">
              For product announcements and exclusive insights
            </p>
            <div className="flex flex-col sm:flex-row items-center md:items-start w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-3/4 p-3 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:border-blue-500 mb-3 sm:mb-0 sm:rounded-l-lg"
              />
              <button className="sm:ml-2 w-full sm:w-auto px-6 py-3 rounded-lg sm:rounded-r-lg text-white bg-blue-600 hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section Centered */}
        <div className="mt-12 border-t border-gray-300 pt-6 text-center">
          <div className="space-x-4 text-sm mb-4">
            <span>© 2025 Brand, Inc.</span>
            <a href="#" className="hover:text-blue-600">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-600">
              Terms
            </a>
            <a href="#" className="hover:text-blue-600">
              Sitemap
            </a>
          </div>
          {/* Social Media Icons Centered */}
          <div className="flex justify-center space-x-5 mt-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="text-gray-600 text-2xl hover:text-blue-600 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}