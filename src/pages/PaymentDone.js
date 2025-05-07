import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Import Check Icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const DonePage = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-0">
      {/* ✅ Container with Padding */}
      <div className=" text-center">
        
        {/* ✅ Green Tick Icon */}
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-4" />

        
        {/* ✅ "Done" Button → Navigates to My Courses */}
        <button 
          onClick={() => navigate("/allcourses")} // ✅ Navigate on Click
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DonePage;