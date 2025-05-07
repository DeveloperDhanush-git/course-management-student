import React from "react";
import { RiMastercardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const TotalSummary = ({ courses }) => {
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (courses.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    localStorage.setItem("purchasedCourses", JSON.stringify(courses)); 
    
    window.location.href = "/checkout";
  };

  // Apply $15 discount per course
  const discount = courses.length * 15;

  // Calculate subtotal (sum of all course prices)
  const subtotal = courses.reduce((total, course) => total + course.price, 0);

  // Calculate total price after discount
  const total = subtotal - discount > 0 ? subtotal - discount : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-35">
      <div className="mt-4 pt-4">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="flex justify-between">
          <span>Subtotal</span> <span>₹{subtotal}</span>
        </p>
        <p className="flex justify-between">
          <span>Discount</span> <span>- ₹{discount}</span>
        </p>
        <p className="flex justify-between">
          <span>Fee</span> <span>₹0</span>
        </p>
        <p className="flex justify-between font-bold text-lg border-top mt-2">
          <span>Total</span> <span className="text-blue-500">₹{total}</span>
        </p>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
        onClick={handlePurchase}
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default TotalSummary;









