import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import Home from "./pages/UserHome";
import UIDesignPage from "./pages/UIDesignPage";
import TeacherProfile from "./pages/TeacherProfile";
import CheckoutPage from "./pages/CheckoutPage";
import CartPage from "./pages/CartPage";
import MyCourses from "./pages/Mycourses";
import ScrollToTop from "./components/ScrollTop";
import Login from "./pages/Login";
import AllCourses from "./pages/AllCourses";
import CourseCard from "./courses/AllCoursesCard";
import CourseDetails from "./pages/Mycourses";
import AllCombinedCourses from "./pages/AllCombinedCourses";
import Support from "./pages/Support";
import Register from "./pages/Register";
import PaymentDone from "./pages/PaymentDone";
import UserEdit from "./pages/UserEdit";


export default function App() {

  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Now inside Router
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowed((prev) => !prev);
  };

  const footerSections = {
    Product: [{ name: "Home", link: "/" }, { name: "All Courses", link: "/all" },  { name: "My Courses", link: "/allcourses" },  { name: "Support", link: "/support" }],
   
  };

  const socialMediaLinks = [
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaLinkedinIn />, link: "#" },
    { icon: <FaYoutube />, link: "#" }
  ];

  const hideNavbarAndFooter = location.pathname === "/login" || location.pathname === "/register";
  const hideFooter = location.pathname === "/support" || location.pathname === "/edit-profile"; // Hide Footer only on support page

  return (
    <>
      {!hideNavbarAndFooter && (
        <Navbar title={["Home","All Courses","My Courses","Support"]} routes={["/","/all","/allcourses", "/support"]} />
      )}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/allcourses" element={<AllCourses />} />
          <Route path="/all" element={<AllCombinedCourses />} />

          <Route path="/support" element={<Support />} />
          <Route path="/mycourses" element={<MyCourses />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/teacher-profile" element={<TeacherProfile isFollowed={isFollowed} onFollowToggle={handleFollowToggle} />} />
          <Route path="/uidesign" element={<UIDesignPage isFollowed={isFollowed} onFollowToggle={handleFollowToggle} />} />
          <Route path="/course/:id" element={<UIDesignPage />} />
          <Route path="/course/:id" element={<CourseCard />} />
          <Route path="/paymentdone" element={<PaymentDone />} />
          <Route path="/edit-profile" element={<UserEdit />} />




        </Routes>
      </div>

      {!hideNavbarAndFooter && !hideFooter && ( <Footer bgColor="bg-gray-100" textColor="text-black" sections={footerSections} socialLinks={socialMediaLinks} />)}
    </>
  );
}