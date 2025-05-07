import React from "react";
import { FiGrid, FiList } from "react-icons/fi";

const ViewToggle = ({ viewMode, setViewMode }) => {
    return (
        <div className="absolute top-4 right-4 flex gap-2">
            <button
                className={`px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition duration-300 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}
                onClick={() => setViewMode("grid")}
            >
                <FiGrid size={20} />
            </button>

            <button
                className={`px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition duration-300 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}
                onClick={() => setViewMode("list")}
            >
                <FiList size={20} />
            </button>
        </div>
    );
};

export default ViewToggle;