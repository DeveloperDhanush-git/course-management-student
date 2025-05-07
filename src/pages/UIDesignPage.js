import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import FaCheckCircle for the success icon
import { Share2, Heart, X } from "lucide-react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ClassDescription from "../components/Class";
import Benefits from "../components/Benefits";
import Reviews from "../components/Review";
import RelatedCourses from "../courses/RelatedCourses";
import {
  Video,
  Clock,
  Globe,
  Award,
  FileText,
  Check,
  Star,
} from "lucide-react";
import SaveButton from "../components/SaveButton";

const UIDesignPage = ({ isFollowed, onFollowToggle }) => {
  const { id } = useParams();
  const location = useLocation();
  const course = location.state?.course;
  const currentURL = window.location.href;

  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false); // State for showing success message
  const [cartError, setCartError] = useState(""); // State for error message


  if (!course) {
    return (
      <div className="text-center mt-20 text-xl font-bold">
        Course Not Found
      </div>
    );
  }

  // Copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentURL);
    alert("Link copied to clipboard!");
  };

  // Save button click
  const handleSave = () => {
    setIsSaved((prev) => {
      const newState = !prev;
      localStorage.setItem(`saved_${id}`, newState.toString());
      return newState;
    });
  };

  const TabsContent = () => {
    const [activeTab, setActiveTab] = useState("Class description");
    const benefitsRef = useRef(null);
    const reviewsRef = useRef(null);
    const relatedCoursesRef = useRef(null);

    const scrollToSection = (ref, tab) => {
      if (ref.current) {
        setActiveTab(tab);
        const yOffset = -100; // You can adjust this offset (header height or margin)
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };


    const courseDetails = {
      title: "Class description",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem lorem aliquam sed lacinia quis. Nibh dictumst vulputate odio pellentesque sit quis ac, sit ipsum. Sit rhoncus velit in sed massa arcu sit Vitae et vitae eget lorem non dui. Sollicitudin ut mi adipiscing duis.",
    };

    const courseBenefits = [
      { icon: Video, text: "14 hours on-demand video" },
      { icon: Clock, text: "Full lifetime access" },
      { icon: Globe, text: "Native teacher" },
      { icon: Award, text: "Certificate of completion" },
      { icon: FileText, text: "100% free document" },
      { icon: Check, text: "24/7 support" },
    ];

    const courseReviews = [
      {
        name: "Jay Rutherford",
        rating: 5,
        time: "12:00 PM",
        comment:
          "Veniam mollit et veniam ea officia nisi minim fugiat minim consequat dolor pariatur",
        image: "https://randomuser.me/api/portraits/men/10.jpg",
      },
      {
        name: "Jevon Raynor",
        rating: 5,
        time: "12:00 PM",
        comment:
          "Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est",
        image: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        name: "Annie Haley",
        rating: 4.5,
        time: "12:00 PM",
        comment:
          "Nostrud excepteur magna id est quis in aliqua consequat. Exercitation enim eiusmod elit sint laborum",
        image: "https://randomuser.me/api/portraits/women/10.jpg",
      },
      {
        name: "Emily Rowey",
        rating: 5,
        time: "12:00 PM",
        comment:
          "Deserunt minim incididunt cillum nostrud do voluptate excepteur",
        image: "https://randomuser.me/api/portraits/women/20.jpg",
      },
      {
        name: "Emily Rowey",
        rating: 5,
        time: "12:00 PM",
        comment:
          "Deserunt minim incididunt cillum nostrud do voluptate excepteur",
        image: "https://randomuser.me/api/portraits/women/20.jpg",
      },
      {
        name: "Emily Rowey",
        rating: 5,
        time: "12:00 PM",
        comment:
          "Deserunt minim incididunt cillum nostrud do voluptate excepteur",
        image: "https://randomuser.me/api/portraits/women/20.jpg",
      },
    ];


    const totalReviews = courseReviews.length;
    const averageRating =
      totalReviews > 0
        ? (courseReviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
        : 0;

    const CourseSidebar = () => {
      const navigate = useNavigate();

      const [isFollowed, setIsFollowed] = useState(() => {
        return localStorage.getItem(`followed_${id}`) === "true";
      });

      // Sync follow state with localStorage on mount
      useEffect(() => {
        const savedState = localStorage.getItem(`saved_${id}`);
        if (savedState) {
          setIsSaved(savedState === "true");
        }
      }, [id]);

      const handleFollow = () => {
        navigate("/teacher-profile", { state: { course } });
      };

     
      const handleShowBuy = () => {
        
        navigate("/checkout");
      };

      const handleAddToCart = () => {
        // Reset error message before making the request
        setCartError("");
    
        fetch('http://localhost/add_to_cart.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_id: course.id,
            title: course.title,
            price: course.price,
            image: course.image,
            teacher: course.teacher,
          }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              setShowCartSuccess(true); // Show success UI
              setTimeout(() => setShowCartSuccess(false), 3000);
            } else {
              setCartError(data.message || 'Failed to add to cart'); // Set error message
            }
          })
          .catch(err => {
            console.error('Add to cart failed', err);
            setCartError('An error occurred while adding to the cart');
          });
      };

      return (
        <div className="bg-white rounded-lg shadow-md p-4 ">
          {/* Instructor Section */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 cursor-pointer">
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-start">
              <img
                src={
                  course.teacherImage ||
                  "https://randomuser.me/api/portraits/men/5.jpg"
                }
                alt="Instructor"
                className="w-16 h-16 rounded-full mb-3 sm:mb-0 sm:mr-4"
                onClick={() =>
                  navigate("/teacher-profile", { state: { course } })
                }
              />
              <div className="text-center sm:text-left">
                <h3
                  className="font-semibold truncate cursor-pointer"
                  onClick={() =>
                    navigate("/teacher-profile", { state: { course } })
                  }
                >
                  {course.teacher}
                </h3>
                <span
                  className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-md cursor-pointer"
                  onClick={() =>
                    navigate("/teacher-profile", { state: { course } })
                  }
                >
                  {course.teachertype}
                </span>
              </div>
            </div>
            <button
              onClick={handleFollow}
              className="ml-auto sm:ml-0 w-full sm:w-auto text-sm px-3 py-1 rounded-md transition-all duration-300 bg-gray-300 text-gray-800"
            >
              View Details
            </button>
          </div>


          {/* Course Info */}
          <div className=" p-4 mt-5 rounded-lg">
            <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-4">
              <h4 className="font-semibold text-gray-900 text-lg truncate w-full sm:w-auto">
                {course.title}
              </h4>
              <div className="flex items-center">
                <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
                <span className="ml-1 font-semibold text-gray-900">
                  {course.rating}
                </span>
              </div>
            </div>

            <div className="mt-3 text-gray-700 mb-7">
              <p className="flex justify-between">
                <span>Course ({course.lessons || "12"} lessons)</span>
                <span className="font-medium">₹{course.price}</span>
              </p>
              <p className="flex justify-between items-center mt-5">
                <span className="flex items-center space-x-2">
                  <span>Document</span>
                  <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">
                    {course.doctype || "free"}
                  </span>
                </span>
                <span className="font-medium text-gray-900">₹0</span>
              </p>
            </div>

            <hr className="my-6 text-gray-300" />

            <p className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span className="text-indigo-600">₹{course.price}</span>
            </p>

            <button
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700"
              onClick={handleShowBuy}
            >
              Buy now
            </button>
            <button
              className="mt-2 w-full border border-indigo-600 text-indigo-600 py-2 rounded-md font-semibold hover:bg-indigo-50"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            {/* Success Message */}
            {showCartSuccess && (
              <div className="mt-4 flex items-center justify-center text-green-600">
                <FaCheckCircle className="mr-2" />
                <span>Added to cart successfully!</span>
              </div>
            )}

            {/* Error Message */}
            {cartError && (
              <div className="mt-4 flex items-center justify-center text-red-600">
                <FaTimesCircle className="mr-2" />
                <span>{cartError}</span>
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="flex flex-col p-7 pr-3">
        <div className="md:flex md:space-x-4">
          {/* Left side - Main Content */}
          <div className="md:w-4/6 w-full">
            <div className="border-b border-gray-300 mb-6">
              <div className="flex flex-col sm:flex-row space-x-8 text-gray-600 text-sm font-medium">
                {[
                  "Class description",
                  "Benefits",
                  "Reviews",
                  "Related Courses",
                ].map((tab, index) => (
                  <button
                    key={index}
                    className={`py-3 ${activeTab === tab
                        ? "text-indigo-600 font-semibold border-b-2 border-indigo-600"
                        : ""
                      }`}
                    onClick={() =>
                      tab === "Benefits"
                        ? scrollToSection(benefitsRef, tab)
                        : tab === "Reviews"
                          ? scrollToSection(reviewsRef, tab)
                          : tab === "Related Courses"
                            ? scrollToSection(relatedCoursesRef, tab)
                            : setActiveTab(tab)
                    }
                  >
                    {tab === "Reviews" ? `${tab} (99)` : tab}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <ClassDescription
                title={courseDetails.title}
                description={courseDetails.description}
              />
            </div>

            <div ref={benefitsRef}>
              <Benefits benefits={courseBenefits} />
            </div>
          </div>

          {/* Right side - Sidebar */}
          <div className="md:w-100 w-full ">
            <CourseSidebar />
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef}>
          <Reviews
            reviews={courseReviews}
            averageRating={averageRating}
            totalReviews={totalReviews}
          />
        </div>

        <div ref={relatedCoursesRef} className="mt-10">
          <RelatedCourses />
        </div>
      </div>
    );
  };

  return (
    <div
      className="mt-35 max-w-7xl mx-auto p-7"
      style={{ fontFamily: "Montserrat" }}
    >
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4">
        <span>Home / {course.category} / </span>
        <span className="font-semibold text-gray-700">{course.title}</span>
      </nav>

      {/* Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl text-center font-bold text-gray-900">
          {course.title}
        </h1>
        <div className="flex gap-4">
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowSharePopup(true)}
          >
            <Share2 className="w-5 h-5 mr-2" /> Share
          </button>

          <SaveButton courseId={id} />
        </div>
      </div>

      {/* Rating and Teacher Name */}
      <div className="flex items-center gap-2 text-gray-700 mb-6">
        <FaStar className="text-yellow-500" />
        <span className="font-semibold">{course.rating}</span>
        <span className="text-sm">({course.reviews} reviews)</span>
        <button className="text-blue-500 font-semibold cursor-pointer">
          {course.teacher}
        </button>
      </div>

      {/* Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-120  object-contain"
          />
        </div>
        <div className="flex flex-col gap-4">
          <img
            src={course.image}
            alt="Alternate view"
            className="w-full h-58 object-contain"
          />
          <img
            src={course.image}
            alt="Another view"
            className="w-full h-58  object-contain"
          />
        </div>
      </div>

      <TabsContent />

      {/* Share Popup */}
      {showSharePopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              position: "relative",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowSharePopup(false)}
            >
              <X size={24} color="gray" />
            </button>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Share this Course
            </h2>
            <input
              type="text"
              value={currentURL}
              readOnly
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5",
                color: "#333",
                fontSize: "1rem",
              }}
            />
            <button
              style={{
                marginTop: "15px",
                width: "100%",
                backgroundColor: "#2563EB",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
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

export default UIDesignPage;
