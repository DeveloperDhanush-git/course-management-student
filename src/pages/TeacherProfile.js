import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import TeacherProfileProfileCard from "../components/ProfileTeacherCard";
import CourseSection from "../components/CourseSection";
import DiscountCard from "../components/DiscountCard";

const TeacherProfile = ({ isFollowed, onFollowToggle }) => {
  const { id } = useParams();
  const location = useLocation();
  const course = location.state?.course;

  const [copied, setCopied] = useState(false);
  const [isFollowedLocal, setIsFollowedLocal] = useState(() => {
    return localStorage.getItem(`followed_${id}`) === "true";
  });

  // Load follow state from localStorage when the component mounts
  useEffect(() => {
    const savedFollowState = localStorage.getItem(`followed_${id}`);
    if (savedFollowState === "true") {
      setIsFollowedLocal(true);
    }
  }, [id]);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === `followed_${id}`) {
        setIsFollowedLocal(e.newValue === "true");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [id]);

  if (!course) {
    return <div className="text-center mt-20 text-xl font-bold">Course Not Found</div>;
  }

  const rating = course.rating || 4.8;

  const getStars = (rating) => {
    // Ensure the rating is between 0 and 5
    const validRating = Math.max(0, Math.min(5, rating)); // Ensures rating is within 0-5
  
    const fullStars = Math.floor(validRating); // Full stars are the integer part
    const hasHalfStar = validRating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Empty stars are the remaining ones
  
    return (
      <>
        {"★".repeat(fullStars)} {/* Full stars */}
        {hasHalfStar && "⯪"} {/* Half star */}
        {"☆".repeat(emptyStars)} {/* Empty stars */}
      </>
    );
  };
  

  // Function to copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(course.link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Toggle Follow/Unfollow
  const handleFollow = () => {
    const newFollowState = !isFollowedLocal;
    setIsFollowedLocal(newFollowState);
    localStorage.setItem(`followed_${id}`, newFollowState.toString());
  };

  return (
    <div className="bg-gray-100 mt-20">
      <div className="min-h-screen pt-18">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
          {/* Left Section - Profile and Courses */}
          <div className="col-span-2">
            <TeacherProfileProfileCard />
            <div className="bg-white p-6 rounded-lg shadow-md mt-9">
              <CourseSection />
            </div>
          </div>

          {/* Right Section - Follow & Discount */}
          <div className="col-span-1 flex flex-col gap-5">
            {/* Follow Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              {/* Follow & Message Buttons */}
              <button
                onClick={handleFollow}
                className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
                  isFollowedLocal ? "bg-gray-300 text-gray-800" : "bg-blue-500 text-white"
                }`}
              >
                {isFollowedLocal ? "Unfollow" : "Follow"}
              </button>

              <button className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold">
                Message
              </button>

              {/* Review Stats */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">{rating}/5</p>
                  <p className="text-gray-600 text-sm">{course.reviews || "1000+"} reviews</p>
                  <div className="flex justify-center mt-2 text-yellow-400 text-lg">{getStars(rating)}</div>
                </div>
                <div className="w-2/3">
                  {[5, 4, 3, 2, 1].map((r, index) => (
                    <div key={index} className="flex items-center gap-2 mt-1">
                      <p className="text-gray-600 text-sm">{r}</p>
                      <div className="w-full h-2 bg-gray-300 rounded">
                        <div
                          className="h-full bg-yellow-400 rounded"
                          style={{ width: `${(rating / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-6">
                <p className="font-bold text-xl p-2">Response Time</p>
                <p className="text-gray-500 text-sm ml-2">Very responsive to messages</p>
              </div>

              {/* Certificates */}
              <div className="mt-4">
                <p className="font-bold text-xl p-2">Certificates</p>
                <p className="text-gray-500 text-sm ml-2">Google UX Design Professional</p>
              </div>

              {/* Profile Link */}
              <div className="mb-2">
                <p className="font-bold text-xl p-3">Profile Link</p>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg text-gray-500 text-sm mt-1 bg-gray-100 ml-2"
                  value={course.link}
                  readOnly
                />

                {/* Copied Message */}
                {copied && <p className="text-green-600 text-sm font-semibold mt-2 ml-3">Copied to clipboard!</p>}

                <p className="text-blue-600 text-sm font-semibold mt-4 cursor-pointer ml-3" onClick={copyToClipboard}>
                  Copy Link
                </p>
              </div>
            </div>

            <DiscountCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;