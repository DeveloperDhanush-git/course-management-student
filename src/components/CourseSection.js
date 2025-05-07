import React, { useState } from "react";
import Coursecard from "../components/ProfileCoursecard";
import { useNavigate } from "react-router-dom";

const CoursesSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Grow Your Video Editing Skills from Experts",
      category: "Video",
      tag: "Best Seller",
      price: 39,
      rating: 4.5,
      reviews: 1233,
      lessons: 12,
      teacher: "Kiara Weaver",
      teacherImage: "https://randomuser.me/api/portraits/women/10.jpg",
      image: "https://think360studio-media.s3.ap-south-1.amazonaws.com/photo/plugin/article/2023/vue.js-11012023.png",
      categoryType: "Recommended",
      role: "Senior Video Editor",
      location: "New York, USA",
      description: "Expert in video editing, color grading, and storytelling.",
      totalCourses: 10,
      students: "5,000+",
      teachertype: "Top Teacher",
      link: "www.Kiara.com",
      profession: "Professor",
      workrole: "Developer",
      doctype: "Free",
    },
    {
      id: 2,
      title: "Graphic Design for Beginners",
      category: "Design",
      tag: "10% Off",
      price: 29,
      rating: 4.3,
      reviews: 800,
      lessons: 20,
      teacher: "Michael Brown",
      teacherImage: "https://randomuser.me/api/portraits/men/15.jpg",
      image: "https://logospng.org/download/npm/npm-1024.png",
      categoryType: "Recommended",
      role: "Graphic Designer",
      location: "Los Angeles, USA",
      description: "Learn the fundamentals of Adobe Illustrator and Photoshop.",
      totalCourses: 8,
      students: "4,000+",
      teachertype: "Top Teacher",
      link: "www.Michael.com",
      profession: "Professor",
      workrole: "Developer",
      doctype: "Paid",
    },
    {
      id: 3,
      title: "Advanced Photoshop Techniques",
      category: "Design",
      tag: "Best Seller",
      price: 49,
      rating: 4.8,
      reviews: 1500,
      lessons: 18,
      teacher: "Sophia Adams",
      teacherImage: "https://randomuser.me/api/portraits/women/20.jpg",
      image: "https://logospng.org/download/npm/npm-1024.png",
      categoryType: "Recommended",
      role: "Graphic Designer",
      location: "San Francisco, USA",
      description: "Master advanced Photoshop skills for professional design.",
      totalCourses: 6,
      students: "6,500+",
      teachertype: "Top Teacher",
      link: "www.Sophia.com",
      profession: "Professor",
      workrole: "Designer",
      doctype: "Paid",
    },
  ];

  const sortCourses = (courses, sortOption) => {
    let sortedCourses = [...courses];
    switch (sortOption) {
      case "Newest":
        sortedCourses.sort((a, b) => b.id - a.id);
        break;
      case "Popular":
        sortedCourses.sort((a, b) => b.reviews - a.reviews);
        break;
      case "Price":
        sortedCourses.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    return sortedCourses;
  };

  const sortedCourses = sortCourses(courses, sortOption);
  const displayedCourses = showAll ? sortedCourses : sortedCourses.slice(0, 2);

  // Function to add course to cart in localStorage
  const addCourseToCart = (course) => {
    let cartCourses = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cartCourses.some((c) => c.id === course.id)) {
      cartCourses.push(course);
      localStorage.setItem("cart", JSON.stringify(cartCourses));
    }
  };

  const handleShowBuy = (course) => {
    addCourseToCart(course);
    navigate("/checkout");
  };

  const handleAddToCart = (course) => {
    addCourseToCart(course);
    alert("Course added to cart!"); // Optional feedback message
  };

  return (
    <div className="p-6 bg-white w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <select
          className="border px-3 py-2 pr-8 rounded-md text-sm text-gray-600 appearance-none bg-white 
             relative cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
             focus:border-blue-500"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"gray\"><path fill-rule=\"evenodd\" d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\" clip-rule=\"evenodd\"/></svg>')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "20px",
          }}
        >
          <option value="Newest">Sort by: Newest</option>
          <option value="Popular">Sort by: Popular</option>
          <option value="Price">Sort by: Price</option>
        </select>
          
      </div>

      <div className="space-y-5">
        {displayedCourses.map((course) => (
          <Coursecard
            key={course.id}
            course={course}
            onAddToCart={handleAddToCart}
            onBuyNow={handleShowBuy}
          />
        ))}
      </div>

      <hr className="border-gray-300 mt-6" />

      <button
        className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md mt-6 text-sm"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show Less" : "Show All Courses"}
      </button>
    </div>
  );
};

export default CoursesSection;
