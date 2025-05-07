// import React, { useState, useEffect } from "react";
// import { Star } from "lucide-react";
// import { useNavigate, useParams, useLocation } from "react-router-dom";

// const CourseSidebar = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const course = location.state?.course;

//   const [isFollowed, setIsFollowed] = useState(() => {
//     return localStorage.getItem(`followed_${id}`) === "true";
//   });

//   // Sync follow state with localStorage on mount
//   useEffect(() => {
//     const savedFollowState = localStorage.getItem(`followed_${id}`);
//     if (savedFollowState) {
//       setIsFollowed(savedFollowState === "true");
//     }
//   }, [id]);

//   if (!course) {
//     return <div className="text-center mt-20 text-xl font-bold">Course Not Found</div>;
//   }

//   const handleFollow = () => {
//     if (!isFollowed) {
//       // If the user is currently NOT following, navigate after 1 second
//       setIsFollowed(true);
//       localStorage.setItem(`followed_${id}`, "true");

//       setTimeout(() => {
//         navigate("/teacher-profile", { state: { course } });
//       }, 1000);
//     } else {
//       // If already following, just unfollow without navigation
//       setIsFollowed(false);
//       localStorage.setItem(`followed_${id}`, "false");
//     }
//   };

//   // Function to add course to cart in localStorage
//   const addCourseToCart = (course) => {
//     let cartCourses = JSON.parse(localStorage.getItem("cart")) || [];
//     if (!cartCourses.some((c) => c.id === course.id)) {
//       cartCourses.push(course);
//       localStorage.setItem("cart", JSON.stringify(cartCourses));
//     }
//   };

//   const handleShowBuy = () => {
//     addCourseToCart(course);
//     navigate("/checkout");
//   };

//   const handleAddToCart = () => {
//     addCourseToCart(course);
//     navigate("/checkout");
//   };

//   return (
//     <div className="bg-white rounded-lg p-2">
//       <div className="flex items-center space-x-3 cursor-pointer">
//         <img
//           src={course.teacherImage || "https://randomuser.me/api/portraits/men/5.jpg"}
//           alt="Instructor"
//           className="w-12 h-12 rounded-full"
//           onClick={() => navigate("/teacher-profile", { state: { course } })}
//         />
//         <div>
//           <h3 className="font-semibold text-gray-900" onClick={() => navigate("/teacher-profile", { state: { course } })}>{course.teacher}</h3>
//           <span className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-md" onClick={() => navigate("/teacher-profile", { state: { course } })}>{course.teachertype}</span>
//         </div>

//         <button
//           onClick={handleFollow}
//           className={`ml-auto text-sm px-3 py-1 rounded-md transition-all duration-300 ${
//             isFollowed ? "bg-gray-300 text-gray-800" : "bg-blue-100 text-blue-600"
//           }`}
//         >
//           {isFollowed ? "Unfollow" : "Follow"}
//         </button>
//       </div>

//       <div className="bg-gray-100 p-4 mt-7 rounded-lg">
//         <div className="flex items-center justify-between">
//           <h4 className="font-semibold text-gray-900 text-lg flex-1 truncate">{course.title}</h4>
//           <div className="flex items-center">
//             <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
//             <span className="ml-1 font-semibold text-gray-900">{course.rating}</span>
//           </div>
//         </div>

//         <div className="mt-3 text-gray-700 mb-7">
//           <p className="flex justify-between">
//             <span>Course ({course.lessons || "12"} lessons)</span>
//             <span className="font-medium">₹{course.price}</span>
//           </p>
//           <p className="flex justify-between items-center mt-5">
//             <span className="flex items-center space-x-2">
//               <span>Document</span>
//               <span className="text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">{course.doctype || "free"}</span>
//             </span>
//             <span className="font-medium text-gray-900">₹0</span>
//           </p>
//         </div>

//         <hr className="my-6 text-gray-300" />

//         <p className="flex justify-between font-semibold text-gray-900">
//           <span>Total</span>
//           <span className="text-indigo-600">₹{course.price}</span>
//         </p>

//         <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700" onClick={handleShowBuy}>
//           Buy now
//         </button>
//         <button className="mt-2 w-full border border-indigo-600 text-indigo-600 py-2 rounded-md font-semibold hover:bg-indigo-50" onClick={handleAddToCart}>
//           Add to cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CourseSidebar;
