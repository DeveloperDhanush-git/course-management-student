import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa"; // Importing the check icon
import bgImage from "../assets/learningpagecontactgirl.jpg";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      setError("All fields are required.");
      setMessage(""); // Clear success message if there's an error
    } else {
      setMessage("Message sent successfully!");
      setError(""); // Clear error message if successful
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen pt-20 w-full  relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-3/4 p-5 rounded-lg text-white shadow-lg">
        {/* Left Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6 tracking-[3px]">Contact us</h2>

          <div className="mb-6">
            <p className="font-semibold tracking-[2px] mb-1">📍 ADDRESS:</p>
            <p className="text-gray-100">198 West 21th Street, Suite 721 New York NY 10016</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold tracking-[2px] mb-1">📞 PHONE:</p>
            <p className="text-gray-300">+1235 2355 98</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold tracking-[2px] mb-1">📧 EMAIL:</p>
            <p className="text-gray-300">info@yoursite.com</p>
          </div>

          <div>
            <p className="font-semibold tracking-[2px] mb-1">🌐 WEBSITE:</p>
            <p className="text-gray-300">yoursite.com</p>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div
          className="w-full md:w-1/2 bg-white text-black p-6 rounded-lg shadow-md mt-6 md:mt-0"
          style={{
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-4">Get in Touch</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-white font-semibold text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"
              />
            </div>

            <div>
              <label className="text-white font-semibold text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"
              />
            </div>

            <div>
              <label className="text-white font-semibold text-sm">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                className="w-full p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"
              />
            </div>

            <div>
              <label className="text-white font-semibold text-sm">Message</label>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-1"
              ></textarea>
            </div>

            {/* Display error message above the button */}
            {error && <p className="text-red-500 text-center mb-3">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-800 text-white p-3 font-semibold rounded-md cursor-pointer"
            >
              Send Message
            </button>

            {/* Display success message with a tick icon */}
            {message && (
              <p className="text-green-500 text-center mt-3 flex items-center justify-center gap-2">
                <FaCheckCircle className="text-green-500" /> {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;