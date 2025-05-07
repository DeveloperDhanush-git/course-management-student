import React from "react";

const ClassDescription = ({ title, description }) => {
  return (
    <div className="">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 text-center sm:text-left">
        {title}
      </h2>
      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg text-center sm:text-left">
        {description}
      </p>
    </div>
  );
};

// Default Props (In case no props are passed)
ClassDescription.defaultProps = {
  title: "Class description",
  description: "No description available.",
};

export default ClassDescription;