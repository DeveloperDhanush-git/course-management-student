import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
const OrderSummary = ({ courses, handleRemoveCourse }) => {
  return (
    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md h-[400px] mt-35 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="flex justify-between items-center py-3">
            <div className="flex items-center gap-4">
              <img src={course.image} alt={course.title} className="w-16 h-16 object-contain rounded-md" />
              <div>
                <p className="font-semibold">{course.title}</p>
                <p className="text-sm text-gray-500">{course.teacher}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="mr-4 font-semibold">₹{course.price}</p>
              <RiDeleteBin5Line className="text-gray-500 cursor-pointer" onClick={() => handleRemoveCourse(course.product_id)} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default OrderSummary;