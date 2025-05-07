import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { SlidersHorizontal, X } from "lucide-react";

const AllCombinedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Dynamic filter lists
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  // Filter modal state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState([]);
  const [priceFilter, setPriceFilter] = useState(""); // free/paid
  const [ratingFilter, setRatingFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState(""); // sorting

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost/get_courses.php");
        const result = await response.json();

        if (result.success) {
          const courseData = result.data;
          setCourses(courseData);
          setFilteredCourses(courseData);

          // Get unique categories
          const uniqueCategories = [
            ...new Set(courseData.map((item) => item.category).filter(Boolean)),
          ];
          setCategories(uniqueCategories);

          // Get unique categoryTypes
          const uniqueCategoryTypes = [
            ...new Set(
              courseData.map((item) => item.categoryType).filter(Boolean)
            ),
          ];
          setCategoryTypes(uniqueCategoryTypes);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Category filter handler
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Category type filter handler
  const handleCategoryTypeChange = (type) => {
    setSelectedCategoryTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = courses;

    if (selectedCategories.length) {
      filtered = filtered.filter((course) =>
        selectedCategories.includes(course.category)
      );
    }

    if (selectedCategoryTypes.length) {
      filtered = filtered.filter((course) =>
        selectedCategoryTypes.includes(course.categoryType)
      );
    }

    if (priceFilter) {
      filtered = filtered.filter((course) =>
        priceFilter === "free" ? course.doctype.toLowerCase() === "free" : course.doctype.toLowerCase() === "paid"
      );
    }

    if (ratingFilter) {
      filtered = filtered.filter((course) => course.rating >= ratingFilter);
    }

    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (sortOrder === "newest") {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortOrder === "oldest") {
          return new Date(a.created_at) - new Date(b.created_at);
        } else if (sortOrder === "priceLow") {
          return parseFloat(a.price) - parseFloat(b.price);
        } else if (sortOrder === "priceHigh") {
          return parseFloat(b.price) - parseFloat(a.price);
        }
        return 0;
      });
    }

    setFilteredCourses(filtered);
    setIsFilterOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedCategoryTypes([]);
    setPriceFilter("");
    setRatingFilter(null);
    setSortOrder("");
    setFilteredCourses(courses);
    setIsFilterOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-25">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">All Courses:</h1>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterOpen && (
 <div
 className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
 onClick={() => setIsFilterOpen(false)} // Close when clicked outside
>
 <div
   className="bg-white p-6 rounded-xl shadow-xl w-[800px] max-h-[90vh] overflow-auto"
   onClick={(e) => e.stopPropagation()} // Prevent closing when clicked inside modal
 >
   <div className="flex justify-between items-center mb-4">
     <h2 className="text-xl font-bold">Filter Courses</h2>
     <button onClick={() => setIsFilterOpen(false)}>
       <X className="w-5 h-5" />
     </button>
   </div>

      {/* Two-column grid for filter options */}
      <div className="grid grid-cols-2 gap-6">
        {/* Category */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Category</h3>
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>

        {/* Category Types */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Category Type</h3>
          {categoryTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={selectedCategoryTypes.includes(type)}
                onChange={() => handleCategoryTypeChange(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Price</h3>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="price"
              checked={priceFilter === "free"}
              onChange={() => setPriceFilter("free")}
            />
            Free
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="price"
              checked={priceFilter === "paid"}
              onChange={() => setPriceFilter("paid")}
            />
            Paid
          </label>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Rating</h3>
          {[4, 3].map((rating) => (
            <label key={rating} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={ratingFilter === rating}
                onChange={() => setRatingFilter(rating)}
              />
              {rating} stars & up
            </label>
          ))}
        </div>

        {/* Sort Order */}
        <div className="mb-4 col-span-2">
          <h3 className="font-semibold mb-2">Sort By</h3>
          <select
            className="w-full border px-3 py-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Select</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={resetFilters} className="text-gray-500">
          Reset
        </button>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply
        </button>
      </div>
    </div>
  </div>
)}


      {/* Render filtered course cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default AllCombinedCourses;
