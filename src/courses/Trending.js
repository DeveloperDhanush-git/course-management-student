import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { fetchCourses } from "../data/courses";
import { FaChevronRight } from "react-icons/fa";

const CourseSection = ({ title, courses, setSelectedCourse }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest">
          {title}
        </h2>
        <button
          className="text-blue-500 hover:underline text-m sm:text-base flex items-center mr-5"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "View Less" : "View All"}
          <FaChevronRight
            className={`ml-2 text-sm transition-transform ${
              showAll ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.slice(0, showAll ? courses.length : 4).map((course) => (
          <div key={course.id} onClick={() => setSelectedCourse(course)}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TrendingCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };
    loadCourses();
  }, []);

  const trendingCourses = courses.filter(
    (course) => course.categoryType === "Trending"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <CourseSection
        title="🔥 Trending Courses"
        courses={trendingCourses}
        setSelectedCourse={setSelectedCourse}
      />
    </div>
  );
};

export default TrendingCourses;
