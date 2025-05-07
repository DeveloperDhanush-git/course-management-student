import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, showButtons = true }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation();

        // Get the existing cart from localStorage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the course is already in the cart
        const isAlreadyInCart = cart.some((item) => item.id === course.id);

        if (!isAlreadyInCart) {
            cart.push(course); // Add course to cart
            localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        }

        // Redirect to checkout if clicked "Buy Now"
        if (e.target.innerText === "Buy now") {
            navigate("/checkout");
        }
    };


    return (
        <motion.div
            ref={ref}

            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer w-full max-w-2xl mx-auto flex flex-col p-4 mb-6"
            
        >
            {/* Title & Price */}
            <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">{course.title}</h2>
                <p className="text-xl font-bold">₹{course.price}</p>
            </div>

            {/* Date & Rating */}
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                {course.date}
                <span className="text-yellow-400 flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400" /> {course.rating} ({course.reviews})
                </span>
            </p>

            {/* Course Image & Details */}
            <div className="flex gap-6 items-start mt-4">
                {/* Course Image */}
                <motion.img
                    src={course.image}
                    alt={course.title}
                    className="w-36 h-36 rounded-md object-cover"

                />

                {/* Course Details Section */}
                <div className="flex-1">
                    {/* Badge */}
                    {course.showBadge && (
                        <motion.span
                            className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-medium"
                        >
                            Free Document
                        </motion.span>
                    )}

                    {/* Description */}
                    <p className="p-2 text-md font-semibold text-gray-700">{course.description}</p>

                    {/* Duration */}
                    <p className="text-xs text-gray-500 mt-1">14 hours / 12 lessons</p>

                    {/* Buttons */}
                    {showButtons && (
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm"
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </button>

                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                                onClick={handleAddToCart}
                            >
                                Buy now
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
