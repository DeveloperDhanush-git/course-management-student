import {Share2, Heart } from "lucide-react";

const Button = () => {
  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="flex items-center space-x-2 px-5 py-2 border border-gray-300 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
          <Share2 className="w-5 h-5 stroke-[#4D55CC]" />
          <span className="text-[#4D55CC]">Share</span>
        </button>
        <button className="flex items-center space-x-2 px-5 py-2 border border-gray-300 rounded-lg bg-[#4D55CC] hover:bg-[#3B44A8] transition">
          <Heart className="w-5 h-5 stroke-white" />
          <span className="text-white">Save</span>
        </button>
      </div>

     
    </>
  )
}

export default Button