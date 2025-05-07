import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DigitalIllustrationSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="max-w-7xl w-full mx-auto py-10 px-4 relative overflow-hidden"> {/* Fix Overflow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-orange-100 rounded-lg shadow-lg flex flex-col md:flex-row items-center h-auto md:h-[350px] w-full overflow-hidden" // Fix Flex Overflow
        >
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center md:text-left w-full p-15 ">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-600 mt-3  text-sm md:text-lg">
              {slides[currentSlide].description}
            </p>
            <button className="mt-7 px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
              Explore More
            </button>
          </div>

          {/* Right Side - Image */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full md:w-[520px] h-[200px] md:h-[350px] object-cover rounded-lg max-w-full" // Fix Image Overflow
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-blue-500 w-5" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
