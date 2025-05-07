import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/beautiful-mountains-landscape.jpg";
import tutorlogo from "../assets/edlogo.png";
import ToastAlert from "./ToastAlert";

const AuthForm = ({ mode }) => {
  const navigate = useNavigate();
  const isRegister = mode === "register";
  
  // Configuration constants
  const AUTH_CONFIG = {
    register: {
      title: "Register Your Account",
      buttonText: "Register Now",
      redirectText: "Already have an account?",
      redirectPath: "Login",
      redirectLink: "/login",
      successRedirect: "/login"
    },
    login: {
      title: "Login to Your Account",
      buttonText: "Login",
      redirectText: "Don't have an account?",
      redirectPath: "Register",
      redirectLink: "/register",
      successRedirect: "/"
    }
  };

  const { 
    title, 
    buttonText, 
    redirectText, 
    redirectPath, 
    redirectLink,
    successRedirect 
  } = AUTH_CONFIG[mode];

  // State management
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    otp: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Show alert message
  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 4000);
  };

  // Form validation
  const validate = () => {
    const tempErrors = {};
    
    if (isRegister) {
      if (!formData.fullName.trim()) {
        tempErrors.fullName = "Name is required";
      } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
        tempErrors.fullName = "Name must contain only alphabets";
      }
    }

    if (!formData.mobileNumber.trim()) {
      tempErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      tempErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    }

    if (!formData.otp.trim()) {
      tempErrors.otp = "OTP is required";
    } else if (formData.otp.length !== 6) {
      tempErrors.otp = "OTP must be 6 digits";
    }

    if (isRegister && !formData.termsAccepted) {
      tempErrors.termsAccepted = "You must accept the Terms & Privacy Policy";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const action = isRegister ? "register" : "login";
      const endpoint = `http://localhost/user_login.php?action=${action}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      showAlert(data.message, data.status === "success" ? "success" : "error");
      
      if (data.status === "success") {
        if (!isRegister) {
          // Store user data in localStorage after successful login
          localStorage.setItem('userData', JSON.stringify(data.user || {
            fullName: "User", // Default if not provided
            mobileNumber: formData.mobileNumber
          }));
        }
        navigate(successRedirect);
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("An error occurred. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Special handling for fullName to allow only letters and spaces
    if (name === "fullName" && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }

    // Special handling for mobileNumber to allow only numbers and limit to 10 digits
    if (name === "mobileNumber" && !/^\d{0,10}$/.test(value)) {
      return;
    }

    // Special handling for OTP to allow only numbers and limit to 6 digits
    if (name === "otp" && !/^\d{0,6}$/.test(value)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-cover bg-center p-4"
      style={{ 
        backgroundImage: `url(${bgImage})`,           
        backgroundColor: "rgba(0,0,0,0.5)", 
        backgroundBlendMode: "overlay" 
      }}
    >
      {alert.show && (
        <ToastAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ show: false, message: "", type: "" })}
        />
      )}

      {/* Mobile Logo (shown only on small screens) */}
      <div className="md:hidden flex items-center mb-8">
        <img
          src={tutorlogo}
          alt="Logo"
          className="h-20 w-16 cursor-pointer transition-transform duration-300 hover:scale-110"
        />
        <span className="text-3xl font-bold text-white ml-2">
          Learn<span className="text-blue-500">Pro</span>
        </span>
      </div>

      {/* Desktop Logo (shown only on medium screens and up) */}
      <div className="hidden md:flex md:absolute md:left-4 lg:left-10 xl:left-20 items-center">
        <img
          src={tutorlogo}
          alt="Logo"
          className="h-40 w-32 cursor-pointer transition-transform duration-300 hover:scale-110"
        />
        <span className="text-[45px] font-bold text-white">
          Learn<span className="text-blue-500">Pro</span>
        </span>
      </div>

      <div className="w-full md:w-[500px] bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">{title}</h2>
        <p className="text-gray-600 text-center mb-6">Please fill the form to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-gray-800 font-semibold text-sm mb-1">Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                className={`w-full p-3 rounded-md border ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-800 font-semibold text-sm mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter your 10-digit mobile number"
              className={`w-full p-3 rounded-md border ${errors.mobileNumber ? "border-red-500" : "border-gray-300"}`}
              value={formData.mobileNumber}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
          </div>

          <div>
            <label className="block text-gray-800 font-semibold text-sm mb-1">OTP</label>
            <input
              type="tel"
              name="otp"
              placeholder="Enter 6-digit OTP"
              className={`w-full p-3 rounded-md border ${errors.otp ? "border-red-500" : "border-gray-300"}`}
              value={formData.otp}
              onChange={handleChange}
              maxLength="6"
            />
            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
          </div>

          {isRegister && (
            <div className="flex items-start mt-2">
              <input
                type="checkbox"
                name="termsAccepted"
                id="termsAccepted"
                className="mt-1 mr-2"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                I agree with the <span className="text-blue-600 cursor-pointer">Terms & Privacy Policy</span>
              </label>
            </div>
          )}
          {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}

          <button
            className={`w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors mt-4 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              buttonText
            )}
          </button>

          <p className="text-center text-sm mt-4">
            {redirectText}{" "}
            <button
              type="button"
              className="text-blue-600 font-medium hover:text-blue-800"
              onClick={() => navigate(redirectLink)}
            >
              {redirectPath}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;