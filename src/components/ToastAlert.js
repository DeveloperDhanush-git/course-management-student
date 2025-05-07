import React, { useEffect } from "react";

const ToastAlert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // auto-close after 4s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 max-w-sm w-full flex items-start bg-white border ${
        type === "success" ? "border-green-400" : "border-red-400"
      } rounded shadow-md px-4 py-3 animate-slideIn`}
    >
      <span className="text-xl mr-3">
        {type === "success" ? "✅" : "⚠️"}
      </span>
      <div className="flex-grow text-gray-700">{message}</div>
      <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
        ✖
      </button>
    </div>
  );
};

export default ToastAlert;

<style>
  {`
    @keyframes slideIn {
  0% {
    transform: translateX(150%);
    opacity: 0;
  }
  30% {
    transform: translateX(0%);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(150%);
    opacity: 0;
  }
}

.animate-slideIn {
  animation: slideIn 4s forwards;
}

  `}
</style>
