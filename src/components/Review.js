import React, { useState } from "react";
import { Star } from "lucide-react";

const Reviews = ({ reviews, averageRating, totalReviews }) => {
    const [showAll, setShowAll] = useState(false);

    const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

    const handleToggle = () => {
        setShowAll((prev) => !prev);
    };

    return (
        <div className="w-full mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reviews ({totalReviews})</h2>
            <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center">
                <Star className="text-yellow-500 fill-yellow-500 w-5 h-5 mr-1" /> {averageRating}
                <span className="text-gray-600 text-sm ml-2">({totalReviews} reviews)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedReviews.map((review, index) => (
                    <div key={index} className="flex space-x-4">
                        <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <p className="text-sm text-gray-500">Rated {review.rating} • {review.time}</p>
                            <p className="text-gray-700 mt-1">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            {reviews.length > 2 && (
                <button
                    className="mt-4 px-4 py-2 border rounded-md text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                    onClick={handleToggle}
                >
                    {showAll ? "Show Less" : "Show All Reviews"}
                </button>
            )}
        </div>
    );
};

Reviews.defaultProps = {
    averageRating: 4.5,
    totalReviews: 99,
    reviews: [
        {
            name: "Jay",
            rating: 5,
            time: "12:00 PM",
            comment: "Veniam mollit et veniam ea officia nisi minim fugiat minim consequat dolor pariatur",
            image: "https://randomuser.me/api/portraits/men/10.jpg",
        },
        {
            name: "Jevon Raynor",
            rating: 5,
            time: "12:00 PM",
            comment: "Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est",
            image: "https://randomuser.me/api/portraits/men/20.jpg",
        },
        {
            name: "Annie Haley",
            rating: 4.5,
            time: "12:00 PM",
            comment: "Nostrud excepteur magna id est quis in aliqua consequat. Exercitation enim eiusmod elit sint laborum",
            image: "https://randomuser.me/api/portraits/women/10.jpg",
        },
        {
            name: "Emily Rowey",
            rating: 5,
            time: "12:00 PM",
            comment: "Deserunt minim incididunt cillum nostrud do voluptate excepteur",
            image: "https://randomuser.me/api/portraits/women/20.jpg",
        },
        {
            name: "John Doe",
            rating: 4,
            time: "1:00 PM",
            comment: "Magna sint veniam voluptate mollit laborum pariatur laborum aliqua sit labore.",
            image: "https://randomuser.me/api/portraits/men/30.jpg",
        },
    ],
};

export default Reviews;