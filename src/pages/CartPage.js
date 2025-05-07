import React, { useState, useEffect } from "react";
import CartSummary from "../components/CartSummary";
import TotalSummary from "../components/TotalSummary";
import RecommendedCourses from "../courses/RecommendedCourse";

const CartPage = () => {
  const [courses, setCourses] = useState([]);

  const fetchCart = () => {
    fetch("http://localhost/get_cart.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCourses(data.data);
        } else {
          console.error("Failed to fetch cart:", data.message);
        }
      })
      .catch((err) => console.error("Error fetching cart:", err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveCourse = (product_id) => {
    fetch("http://localhost/remove_from_cart.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fetchCart(); // Refresh the cart
        } else {
          alert("Failed to remove: " + data.message);
        }
      })
      .catch((err) => console.error("Remove failed:", err));
  };
  
  return (
    <div className="mb-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <CartSummary courses={courses} handleRemoveCourse={handleRemoveCourse} />
        <TotalSummary courses={courses} />
      </div>
      <RecommendedCourses />
    </div>
  );
};

export default CartPage;
