import React from "react";

const DiscountCard = () => {
  return (
    <div className="bg-red-50 p-4 rounded-lg shadow-md relative">
      <span className="absolute right-10 top-7 bg-red-500 text-white text-xs px-2 py-2 rounded-full">30% Off</span>
      <img
        src="https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1562151270-c7d22ceb586a"
        alt="Photography"
        className="rounded-lg"
      />
      <p className="text-lg flex items-center justify-center font-bold mt-2">Photography</p>
      <p className="text-center text-m p-2">
        Learn the art of photography from industry experts.
      </p>
      <div className="flex justify-center items-center mt-4">
        <button className="w-30 flex justify-center items-center bg-blue-600 text-white py-2  rounded-lg mb-3">
          View more
        </button>
      </div>
    </div>
  );
};

export default DiscountCard;