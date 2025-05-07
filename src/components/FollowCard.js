// import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from "react-router-dom";

// const FollowCard = () => {
//   const { id } = useParams();
//   const location = useLocation();
//   const course = location.state?.course;

//   const [copied, setCopied] = useState(false);
//   const [isFollowed, setIsFollowed] = useState(false);

//   // Load follow state from localStorage when the component mounts
//   useEffect(() => {
//     const savedFollowState = localStorage.getItem(`followed_${id}`);
//     if (savedFollowState === "true") {
//       setIsFollowed(true);
//     }
//   }, [id]);

//   if (!course) {
//     return <div className="text-center mt-20 text-xl font-bold">Course Not Found</div>;
//   }

//   const rating = course.rating || 4.8;

//   const getStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
//     const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

//     return (
//       <>
//         {"★".repeat(fullStars)}
//         {hasHalfStar && "⯪"}
//         {"☆".repeat(emptyStars)}
//       </>
//     );
//   };

//   // Function to copy link to clipboard
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(course.link).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   // Toggle Follow/Unfollow
//   const handleFollow = () => {
//     setIsFollowed((prev) => {
//       const newFollowState = !prev;
//       localStorage.setItem(`followed_${id}`, newFollowState.toString()); // Save to localStorage
//       return newFollowState;
//     });
//   };

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//       {/* Follow & Message Buttons */}
//       <button
//         onClick={handleFollow}
//         className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${
//           isFollowed ? "bg-gray-300 text-gray-800" : "bg-blue-500 text-white"
//         }`}
//       >
//         {isFollowed ? "Unfollow" : "Follow"}
//       </button>

//       <button className="w-full mt-2 border border-blue-600 text-blue-600 py-2 rounded-lg font-semibold">
//         Message
//       </button>

//       {/* Review Stats */}
//       <div className="mt-4 flex justify-between items-center">
//         <div className="text-center">
//           <p className="text-2xl font-bold">{rating}/5</p>
//           <p className="text-gray-600 text-sm">{course.reviews || "1000+"} reviews</p>
//           <div className="flex justify-center mt-2 text-yellow-400 text-lg">{getStars(rating)}</div>
//         </div>
//         <div className="w-2/3">
//           {[5, 4, 3, 2, 1].map((r, index) => (
//             <div key={index} className="flex items-center gap-2 mt-1">
//               <p className="text-gray-600 text-sm">{r}</p>
//               <div className="w-full h-2 bg-gray-300 rounded">
//                 <div
//                   className="h-full bg-yellow-400 rounded"
//                   style={{ width: `${(rating / 5) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Response Time */}
//       <div className="mt-6">
//         <p className="font-bold text-xl p-2">Response Time</p>
//         <p className="text-gray-500 text-sm ml-2">Very responsive to messages</p>
//       </div>

//       {/* Certificates */}
//       <div className="mt-4">
//         <p className="font-bold text-xl p-2">Certificates</p>
//         <p className="text-gray-500 text-sm ml-2">Google UX Design Professional</p>
//       </div>

//       {/* Profile Link */}
//       <div className="mb-2">
//         <p className="font-bold text-xl p-3">Profile Link</p>
//         <input
//           type="text"
//           className="w-full p-2 border rounded-lg text-gray-500 text-sm mt-1 bg-gray-100 ml-2"
//           value={course.link}
//           readOnly
//         />

//         {/* Copied Message */}
//         {copied && <p className="text-green-600 text-sm font-semibold mt-2 ml-3">Copied to clipboard!</p>}

//         <p className="text-blue-600 text-sm font-semibold mt-4 cursor-pointer ml-3" onClick={copyToClipboard}>
//           Copy Link
//         </p>
//       </div>
//     </div>
//   );
// };

// export default FollowCard;
