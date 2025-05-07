import React from "react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, handleProgress }) => {
  const navigate = useNavigate();

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const purchaseDate = new Date(course.purchaseDate + "T00:00:00Z");
  purchaseDate.setUTCHours(0, 0, 0, 0);

  const daysSincePurchase = Math.floor(
    (today - purchaseDate) / (1000 * 60 * 60 * 24)
  );
  const remainingDays = Math.max(21 - daysSincePurchase, 0);

  const handleCardClick = () => {
    if (remainingDays > 0) {
      navigate(`/course-details/${course.id}`, { state: { course } });
    }
  };

  return (
    <div>
      <div
        className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={course.image}
              alt={course.title}
              className="w-16 h-16 object-contain rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold flex justify-between w-full">
                {course.title}
                {remainingDays > 0 ? (
                  <span className="text-sm text-gray-500 ml-2">
                    ({remainingDays} days left)
                  </span>
                ) : (
                  <span className="text-sm text-red-600 ml-2">(Expired)</span>
                )}
              </h3>
              <p className="text-gray-500">
                Lessons: {course.completed} of {course.total}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-2 bg-gray-300 rounded-full mt-3">
          <div
            className="h-2 bg-blue-500 rounded-full"
            style={{ width: `${(course.completed / course.total) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between mt-3">
          {course.completed === course.total ? (
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
              Completed <TiTick size={20} className="ml-2" />
            </button>
          ) : remainingDays > 0 ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
              onClick={handleCardClick}
            >
              Continue <IoPlayCircleOutline size={20} className="ml-2" />
            </button>
          ) : (
            <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
              Expired
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;