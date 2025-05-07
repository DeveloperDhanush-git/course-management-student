import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaTimes, FaEdit, FaBell } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/edlogo.png";

export default function Navbar({ title = [], routes = [] }) {
  // State declarations
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [showDropdown, setShowDropdown] = useState(false);

  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Effect hooks
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCartCount = () => {
      fetch("http://localhost/get_cart.php")
        .then((response) => response.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            const cartItems = data.data.filter((item) => item.title);
            setCartCount(cartItems.length);
          } else {
            console.error("Failed to fetch cart:", data.message);
          }
        })
        .catch((err) => console.error("Error fetching cart:", err));
    };

    fetchCartCount();
    const intervalId = setInterval(fetchCartCount, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('.mobile-menu-button')
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler functions
  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/login");
    setMobileMenuOpen(false);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
    setMobileMenuOpen(false);
    setShowDropdown(false);
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
    setMobileMenuOpen(false);
    setShowDropdown(false);
  };

  // Render
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled ? "bg-white shadow-md" : "bg-white shadow-md"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo and Desktop Menu */}
        <div className="flex items-center flex-1 h-15">
       
        <span className="text-xl font-bold text-black">
          Course<span className="text-blue-600">D</span>
        </span>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 lg:space-x-8 text-black font-semibold text-base lg:text-lg ml-4 lg:ml-10">
            {title.map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  to={routes[index]}
                  className={`cursor-pointer transition duration-300 hover:text-blue-400 ${location.pathname === routes[index] ||
                      (routes[index] !== "/" && location.pathname === routes[index]) // Check for exact match
                      ? "text-blue-400"
                      : ""
                    }`}
                >
                  {item}
                </Link>
                <span
                  className={`absolute left-0 top-7 lg:top-9 h-[3px] lg:h-[4px] bg-blue-400 transition-all duration-300 ${location.pathname === routes[index] ||
                      (routes[index] !== "/" && location.pathname === routes[index]) // Check for exact match
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                    }`}
                ></span>
              </li>
            ))}
          </ul>

        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          {/* Notification Icon - Desktop */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-black transition-all duration-300 hidden md:block"
          >
            <FaBell className="text-xl" />
          </motion.button>

          {/* Cart Icon with Count Badge */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative cursor-pointer"
            onClick={() => {
              navigate("/cart");
              setMobileMenuOpen(false);
            }}
          >
            <FaShoppingCart className="text-black text-xl sm:text-2xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </motion.div>

          {/* Profile Dropdown - Desktop */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <div
              className="flex items-center space-x-1 lg:space-x-2 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {isLoggedIn ? (
                <motion.img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="User"
                  className="w-7 h-7 lg:w-8 lg:h-8 rounded-full transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <FiUser className="w-8 h-8 lg:w-10 lg:h-10 p-2 text-gray-500 transition-transform duration-300 hover:scale-110 border-1 rounded-[50%]" />
              )}
              <motion.div animate={{ rotate: showDropdown ? 180 : 0 }}>
                <FaChevronDown className="text-gray-600 text-sm lg:text-base transition-transform duration-300 hover:text-blue-500" />
              </motion.div>
            </div>

            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 border border-gray-300 shadow-lg rounded-md py-2 bg-white"
              >
                {isLoggedIn && (
                  <>
                    <button
                      onClick={handleEditProfile}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-800 transition-all duration-300 hover:bg-gray-100"
                    >
                      <FaEdit className="mr-2 text-blue-500" />
                      Edit Profile
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-800 transition-all duration-300 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2 text-red-500" />
                      Logout
                    </button>
                  </>
                )}
                {!isLoggedIn && (
                  <button
                    onClick={handleLogin}
                    className="flex items-center w-full text-left px-4 py-2 text-gray-800 transition-all duration-300 hover:bg-gray-100"
                  >
                    <FiUser className="mr-2 text-blue-500" />
                    Login
                  </button>
                )}
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-black focus:outline-none ml-4 text-2xl mobile-menu-button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FaTimes /> : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>
                <ul className="space-y-4">
                  {title.map((item, index) => (
                    <li key={index}>
                      <Link
                        to={routes[index]}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block py-3 text-lg font-semibold ${location.pathname === routes[index] ||
                            (routes[index] !== "/" &&
                              location.pathname.startsWith(routes[index]))
                            ? "text-blue-400"
                            : "text-gray-800 hover:text-blue-400"
                          }`}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}

                  {/* Mobile Profile Actions */}
                  <li className="pt-4 border-t border-gray-200">
                    {isLoggedIn && (
                      <>
                        <button
                          onClick={handleEditProfile}
                          className="w-full flex items-center justify-start py-2 text-lg font-semibold text-gray-800 hover:text-blue-400"
                        >
                          <FaEdit className="mr-3 text-blue-500" />
                          Edit Profile
                        </button>
                        <div className="border-t border-gray-200 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-start py-2 text-lg font-semibold text-gray-800 hover:text-red-400"
                        >
                          <FiLogOut className="mr-3 text-red-500" />
                          Logout
                        </button>
                      </>
                    )}
                    {!isLoggedIn && (
                      <button
                        onClick={handleLogin}
                        className="w-full flex items-center justify-start py-2 text-lg font-semibold text-gray-800 hover:text-blue-400"
                      >
                        <FiUser className="mr-3 text-blue-500" />
                        Login
                      </button>
                    )}
                  </li>

                  {/* Mobile Notification and Cart */}
                  <li className="pt-4 border-t border-gray-200 flex items-center justify-between">
                    <button className="flex items-center py-2 text-lg font-semibold text-gray-800 hover:text-blue-400">
                      <FaBell className="mr-3 text-blue-500" />
                      Notifications
                    </button>
                    <div
                      className="flex items-center py-2 text-lg font-semibold text-gray-800 hover:text-blue-400"
                      onClick={() => {
                        navigate("/cart");
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FaShoppingCart className="mr-3 text-blue-500" />
                      Cart {cartCount > 0 && `(${cartCount})`}
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}