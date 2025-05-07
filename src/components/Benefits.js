import React from "react";

const Benefits = ({ benefits }) => {
  return (
    <div className="mt-10  mb-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-gray-700">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-3">
            <benefit.icon className="text-indigo-600 w-6 h-6" />
            <span className="text-base">{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Default Props (In case no props are passed)
Benefits.defaultProps = {
  benefits: [
    { icon: () => <span>📹</span>, text: "14 hours on-demand video" },
    { icon: () => <span>⏳</span>, text: "Full lifetime access" },
    { icon: () => <span>🌍</span>, text: "Native teacher" },
    { icon: () => <span>🏆</span>, text: "Certificate of completion" },
    { icon: () => <span>📄</span>, text: "100% free document" },
    { icon: () => <span>🕒</span>, text: "24/7 support" },
  ],
};

export default Benefits;