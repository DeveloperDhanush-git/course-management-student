import React from "react";
import { useParams, useLocation } from "react-router-dom";

const ProfileCard = () => {
  const { id } = useParams();
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    return <div className="text-center mt-20 text-xl font-bold">Course Not Found</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-[390px]">
      <div className="flex items-center gap-4">
        <img src={course.teacherImage} alt="Profile" className="w-20 h-20 rounded-full" />
        <div className="flex-1">
          <div className="text-2xl font-bold flex justify-between items-end">
            <span>{course.teacher}</span>
          </div>
          <p className="text-gray-500">{course.role || "Senior UI/UX Designer"}</p>
          <p className="text-gray-500">{course.location || "22B Baker Street, London, UK"}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
              {course.profession}
            </span>
            <span className="text-pink-600 bg-pink-100 px-3 py-1 rounded-full text-sm font-medium">
              {course.workrole}
            </span>
          </div>
        </div>
        <span className="mb-20 text-pink-600 bg-pink-100 px-3 py-1 rounded-full text-sm font-medium">
          {course.teachertype|| "Good Teacher"}
        </span>
      </div>
      <div className="mt-6 text-gray-600">
        <h2 className="text-xl font-bold">Overview</h2>
        <p className="text-m leading-relaxed">{course.description || "Experienced UI/UX Designer passionate about creating user-friendly interfaces."}</p>
      </div>
      <div className="mt-20 grid grid-cols-4 text-start ml-5">
        {[
          { label: "Rating", value: course.rating || "4.8" },
          { label: "Reviews", value: course.reviews || "1000+" },
          { label: "Courses", value: course.totalCourses || "12" },
          { label: "Students", value: course.students || "1000+" },
        ].map((item, index) => (
          <div key={index}>
            <p className="text-gray-700 text-m font-semibold">{item.label}</p>
            <p className="text-lg font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
