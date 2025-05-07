import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";

const SaveButton = ({ courseId }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem(`saved_${courseId}`);
    if (savedState) {
      setIsSaved(savedState === "true");
    }
  }, [courseId]);

  const handleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    localStorage.setItem(`saved_${courseId}`, newState.toString());
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg flex items-center ${
        isSaved ? "bg-pink-100 text-pink-600" : "bg-gray-200 text-gray-700"
      }`}
      onClick={handleSave}
    >
      <Heart
        className={`w-5 h-5 mr-2 ${
          isSaved ? "fill-pink-600 text-pink-600" : ""
        }`}
      />
      {isSaved ? "Saved" : "Save"}
    </button>
  );
};

export default SaveButton;