// import React, { useState, useRef } from "react";
// import ClassDescription from "../components/Class";
// import Benefits from "../components/Benefits";
// import Reviews from "../components/Review";
// import CourseSidebar from "../components/CourseSidebar";
// import RelatedCourses from "../courses/RelatedCourses"
// import { Video, Clock, Globe, Award, FileText, Check } from "lucide-react";

// const TabsContent = ({ isFollowed, onFollowToggle }) => {
    
//     const [activeTab, setActiveTab] = useState("Class description");
//     const benefitsRef = useRef(null);
//     const reviewsRef = useRef(null);
//     const relatedCoursesRef = useRef(null);

//     const scrollToSection = (ref, tabName) => {
//         setActiveTab(tabName);
//         ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//     };

//     const courseDetails = {
//         title: "Class description",
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem lorem aliquam sed lacinia quis. Nibh dictumst vulputate odio pellentesque sit quis ac, sit ipsum. Sit rhoncus velit in sed massa arcu sit Vitae et vitae eget lorem non dui. Sollicitudin ut mi adipiscing duis.",
//     };

//     const courseBenefits = [
//         { icon: Video, text: "14 hours on-demand video" },
//         { icon: Clock, text: "Full lifetime access" },
//         { icon: Globe, text: "Native teacher" },
//         { icon: Award, text: "Certificate of completion" },
//         { icon: FileText, text: "100% free document" },
//         { icon: Check, text: "24/7 support" },
//     ];

//     const courseReviews = [
//         {
//             name: "Jay Rutherford",
//             rating: 5,
//             time: "12:00 PM",
//             comment: "Veniam mollit et veniam ea officia nisi minim fugiat minim consequat dolor pariatur",
//             image: "https://randomuser.me/api/portraits/men/10.jpg",
//         },
//         {
//             name: "Jevon Raynor",
//             rating: 5,
//             time: "12:00 PM",
//             comment: "Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est",
//             image: "https://randomuser.me/api/portraits/men/20.jpg",
//         },
//         {
//             name: "Annie Haley",
//             rating: 4.5,
//             time: "12:00 PM",
//             comment: "Nostrud excepteur magna id est quis in aliqua consequat. Exercitation enim eiusmod elit sint laborum",
//             image: "https://randomuser.me/api/portraits/women/10.jpg",
//         },
//         {
//             name: "Emily Rowey",
//             rating: 5,
//             time: "12:00 PM",
//             comment: "Deserunt minim incididunt cillum nostrud do voluptate excepteur",
//             image: "https://randomuser.me/api/portraits/women/20.jpg",
//         },
//     ];

//     return (
//         <div className="flex flex-col">
//             <div className="md:flex md:space-x-4">
//                 {/* Left side - Main Content */}
//                 <div className="md:w-4/6 w-full">
//                     <div className="border-b border-gray-300 mb-6">
//                         <div className="flex space-x-8 text-gray-600 text-sm font-medium">
//                             {["Class description", "Benefits", "Reviews", "Related Courses"].map((tab, index) => (
//                                 <button
//                                     key={index}
//                                     className={`py-3 ${activeTab === tab ? "text-indigo-600 font-semibold border-b-2 border-indigo-600" : ""}`}
//                                     onClick={() =>
//                                         tab === "Benefits"
//                                             ? scrollToSection(benefitsRef, tab)
//                                             : tab === "Reviews"
//                                                 ? scrollToSection(reviewsRef, tab)
//                                                 : tab === "Related Courses"
//                                                     ? scrollToSection(relatedCoursesRef, tab)
//                                                     : setActiveTab(tab)
//                                     }
//                                 >
//                                     {tab === "Reviews" ? `${tab} (99)` : tab}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     <div>
//                         <ClassDescription
//                             title={courseDetails.title}
//                             description={courseDetails.description}
//                         />
//                     </div>

//                     <div ref={benefitsRef}>
//                         <Benefits benefits={courseBenefits} />
//                     </div>
//                 </div>

//                 {/* Right side - Sidebar */}
//                 <div className="md:w-100 w-full md:mt-10">
//                 <CourseSidebar isFollowed={isFollowed} onFollowToggle={onFollowToggle} />
//                 </div>
//             </div>

//             {/* Reviews Section */}
//             <div ref={reviewsRef}>
//                 <Reviews
//                     reviews={courseReviews}
//                     averageRating={4.8}
//                     totalReviews={120}
//                 />
//             </div>

//             <div ref={relatedCoursesRef} className="mt-10">
//                 <RelatedCourses />
//             </div>


//         </div>
//     );
// };

// export default TabsContent;