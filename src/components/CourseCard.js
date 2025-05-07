import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer w-full sm:max-w-[300px] min-h-[350px] flex flex-col"
      onClick={() => navigate(`/course/${course.id}`, { state: { course } })}
    >
      {/* Image with fixed size */}
      <motion.img
        src={course.image}
        alt={course.title}
        className="w-full h-[150px] md:h-[180px] object-contain"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-3 md:p-4 flex flex-col flex-grow">
        {/* Category & Tag Row with Fixed Height */}
        <div className="flex justify-between items-center min-h-[24px]">
          <motion.p
            className="text-xs md:text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            {course.category}
          </motion.p>

          {/* Tag (Fixed Height Even When Missing) */}
          <div className="min-h-[20px] flex items-center">
            <motion.span
              className={`bg-red-500 text-white px-2 py-1 text-[10px] md:text-xs rounded ${
                course.tag ? "opacity-100 visible" : "opacity-0 hidden"
              } block min-w-[50px] text-center`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {course.tag || "‎"} {/* Invisible character to maintain height */}
            </motion.span>
          </div>
        </div>

        {/* Title with Fixed Position */}
        <motion.h3
          className="text-sm md:text-lg font-semibold mt-2 h-[40px]  "
          initial={{ x: -10, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {course.title}
        </motion.h3>
        <motion.p
          className="text-sm md:text-lg font-semibold mt-6   "
          initial={{ x: -10, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
           <p className="text-xs text-gray-600">Instructor: <span className="font-semibold">{course.teacher}</span></p>
        </motion.p>

        {/* Rating & Price with Proper Alignment */}
        <div className="flex justify-between items-center mt-3">
          <motion.p
            className="text-black text-xs md:text-sm font-semibold flex items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
            {course.rating} ({course.reviews})
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <span className="text-md md:text-lg font-bold">₹{course.price}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}





















