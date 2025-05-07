import React from "react";
import { RiMastercardFill } from 'react-icons/ri';
const PaymentSummary = ({ courses }) => {
  const handlePurchase = () => {
    if (courses.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    localStorage.setItem("purchasedCourses", JSON.stringify(courses)); 
    
    window.location.href = "/paymentdone";
  };
  
  // Apply $15 discount per course
  const discount = courses.length * 15;
  // Calculate subtotal (sum of all course prices)
  const subtotal = courses.reduce((total, course) => total + course.price, 0);
  // Calculate total price after discount
  const total = subtotal - discount > 0 ? subtotal - discount : 0;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-35">
      <h2 className="text-xl font-bold mb-4">Payment method</h2>
      <button className="text-blue-500 text-sm mb-2">Change payment methods</button>
      <div className="flex items-center justify-between p-4 border-2 border-blue-500 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-5">
            <RiMastercardFill className="absolute left-0 text-red-500 text-2xl opacity-90" />
          </div>
          <span className="font-semibold text-blue-700">Mastercard</span>
        </div>
        <span className="text-blue-700 font-semibold">**** 5987</span>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Voucher</h3>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="₹15 OFF" className="border p-2 w-full rounded-md" />
          <button className="bg-blue-50 text-black px-4 py-2 rounded-md">Apply</button>
        </div>
        <button className="bg-red-200 text-red-700 px-3 py-1 mt-2 rounded-md text-sm">₹{discount} OFF</button>
      </div>
      <div className="mt-4 pt-4">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="flex justify-between"><span>Subtotal</span> <span>₹{subtotal}</span></p>
        <p className="flex justify-between"><span>Discount</span> <span>- ₹{discount}</span></p>
        <p className="flex justify-between"><span>Fee</span> <span>₹0</span></p>
        <p className="flex justify-between font-bold text-lg border-top mt-2"><span>Total</span> <span className="text-blue-500">₹{total}</span></p>
      </div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4" onClick={handlePurchase} >Proceed to payment</button>
    </div>
  );
};
export default PaymentSummary;