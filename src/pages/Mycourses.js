import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Share2, Heart, X } from "lucide-react";
import CustomVideoPlayer from "../components/CustomVideoPlayer";
import SessionList from "../components/SessionList";
import CommentSection from "../components/CommentSection";
import ProductCard from "../components/ProductCard";

const VideoCourseDetails = () => {
    const location = useLocation();
    const { course } = location.state || {};

    // Hooks for saved state & share popup
    const [isSaved, setIsSaved] = useState(course ? localStorage.getItem(`saved_${course.id}`) === "true" : false);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [activeTab, setActiveTab] = useState("Class description");

    // Refs for smooth scrolling
    const reviewsRef = useRef(null);
    const relatedCoursesRef = useRef(null);

    // Handle missing course
    if (!course) {
        return <p className="text-center text-gray-600">No course details available.</p>;
    }

    // Copy course link
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    // Save button click
    const handleSave = () => {
        setIsSaved(true);
        localStorage.setItem(`saved_${course.id}`, "true");
    };

    return (
        <div className="max-w-7xl mx-auto p-7  bg-white  rounded-lg mt-30">
            {/* Breadcrumb Navigation */}
            <nav className="text-sm text-gray-500 mb-4">
                <span>Home / {course.category} / </span>
                <span className="font-semibold text-gray-700">{course.title}</span>
            </nav>

            {/* Title and Action Buttons */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                <div className="flex gap-4">
                    {/* Share Button */}
                    <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
                        onClick={() => setShowSharePopup(true)}
                    >
                        <Share2 className="w-5 h-5 mr-2" /> Share
                    </button>

                    {/* Save Button */}
                    <button
                        className="px-4 py-2 rounded-lg flex items-center bg-indigo-500 text-white"
                        onClick={handleSave}
                        disabled={isSaved}
                    >
                        <Heart
                            className="w-6 h-6 mr-2"
                            style={{
                                fill: isSaved ? "red" : "none",
                                stroke: isSaved ? "red" : "white",
                                transition: "fill 0.2s ease-in-out",
                            }}
                        />
                        {isSaved ? "Saved" : "Save"}
                    </button>
                </div>
            </div>

            {/* Rating and Instructor */}
            <div className="flex items-center gap-2 text-gray-700 mb-6">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold">{course.rating}</span>
                <span className="text-sm">({course.reviews} reviews)</span>
                <button className="text-blue-500 font-semibold cursor-pointer">{course.teacher}</button>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-12 gap-6 mt-6">
                {/* Video Player Section */}
                <div className="col-span-8">
                <div className="relative w-full flex justify-center items-center">
    <div className="w-full max-w-4xl h-[500px]"> {/* Increased width & height */}
        <CustomVideoPlayer videoUrl={course.videoUrl || ""} />
    </div>
</div>


                    {/* Reviews */}
                    <div ref={reviewsRef} className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Student Reviews</h2>
                        <CommentSection />
                    </div>
                </div>

                {/* Sidebar: Sessions & Related Courses */}
                <div className="col-span-4 pl-6 -mt-6">
                    <SessionList sessions={course.sessions || []} />
                    <div ref={relatedCoursesRef} className="mt-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Courses</h2>
                        <ProductCard />
                    </div>
                </div>
            </div>

            {/* Share Popup */}
            {showSharePopup && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setShowSharePopup(false)}
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-xl font-bold mb-4">Share this Course</h2>
                        <input
                            type="text"
                            value={window.location.href}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                        />
                        <button
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                            onClick={copyToClipboard}
                        >
                            Copy Link
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoCourseDetails;