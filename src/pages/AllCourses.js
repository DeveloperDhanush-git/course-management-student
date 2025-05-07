import React, { useState, useEffect } from "react";
import CourseCard from "../courses/AllCoursesCard";
import ViewToggle from "../components/ViewToggle";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("inProgress"); // Tabs: inProgress, completed, expired

  useEffect(() => {
    // Dummy data to simulate courses
    const dummyCourses = [
      {
        id: 1,
        title: "Course 1",
        purchaseDate: "2025-03-20",
        completed: 2,
        total: 5,
      },
      {
        id: 2,
        title: "Course 2",
        purchaseDate: "2025-03-25",
        completed: 5,
        total: 5,
      },
      {
        id: 3,
        title: "Course 3",
        purchaseDate: "2024-02-15",
        completed: 0,
        total: 5,
      },
      {
        id: 4,
        title: "Course 4",
        purchaseDate: "2023-12-15",
        completed: 0,
        total: 5,
      },
    ];
    setCourses(dummyCourses);
  }, []);

  const today = new Date();

  const inProgressCourses = [];
  const completedCourses = [];
  const expiredCourses = [];

  courses.forEach((course) => {
    const purchaseDate = new Date(course.purchaseDate);
    const daysSincePurchase = Math.floor(
      (today - purchaseDate) / (1000 * 60 * 60 * 24)
    );

    if (daysSincePurchase > 21) {
      expiredCourses.push(course);
    } else if (course.completed >= course.total) {
      completedCourses.push(course);
    } else {
      inProgressCourses.push(course);
    }
  });

  // Determine which list of courses to show
  const getCoursesByTab = () => {
    if (activeTab === "inProgress") return inProgressCourses;
    if (activeTab === "completed") return completedCourses;
    if (activeTab === "expired") return expiredCourses;
    return [];
  };

  return (
    <div className="relative min-h-screen mx-auto p-4 sm:p-10 mt-20">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold">My Courses</h2>
        <div className="hidden sm:block">
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      {/* Tab Bar (Mobile Optimized) */}
      <div className="flex border-b border-gray-300 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {["inProgress", "completed", "expired"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 min-w-max text-base sm:text-lg font-medium border-b-4 transition
            ${
              activeTab === tab
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab === "inProgress" && "In Progress"}
            {tab === "completed" && "Completed"}
            {tab === "expired" && "Expired"}
          </button>
        ))}
      </div>

      {/* Mobile View Toggle */}
      <div className="sm:hidden flex justify-end mb-4">
        <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {/* Course Display with Responsive Grid */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
            : "space-y-4"
        }
      >
        {getCoursesByTab().length > 0 ? (
          getCoursesByTab().map((course) =>
            activeTab === "expired" ? (
              <div key={course.id} className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-bold">{course.title}</h4>
                <p className="text-red-600 mt-1">This course has expired.</p>
              </div>
            ) : (
              <CourseCard key={course.id} course={course} />
            )
          )
        ) : (
          <p className="text-gray-500 mt-4">
            {activeTab === "inProgress" && "No courses in progress."}
            {activeTab === "completed" && "No completed courses yet."}
            {activeTab === "expired" && "No expired courses."}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
