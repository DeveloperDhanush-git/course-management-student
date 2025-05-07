import video1 from "../assets/Screen Recording 2025-03-12 182437.mp4";

export const fallbackCourses = [
  {
    id: 1,
    title: "Grow Your Video Editing Skills from Experts",
    category: "Video",
    tag: "Best Seller",
    price: 39,
    rating: 4.5,
    reviews: 1233,
    lessons: 12,
    teacher: "Kiara Weaver",
    teacherImage: "https://randomuser.me/api/portraits/women/10.jpg",
    image:
      "https://think360studio-media.s3.ap-south-1.amazonaws.com/photo/plugin/article/2023/vue.js-11012023.png",
    completed: 3,
    total: 7,
    purchaseDate: "2025-03-23",
    video: video1,
    categoryType: "Recommended",
    role: "Senior Video Editor",
    location: "New York, USA",
    description: "Expert in video editing, color grading, and storytelling.",
    totalCourses: 10,
    students: "5,000+",
    teachertype: "Top Teacher",
    link: "www.Kiara.com",
    profession: "Professor",
    workrole: "Developer",
    doctype: "Free",
  },
];

export async function fetchCourses() {
  try {
    const response = await fetch("http://localhost/get_courses.php");
    const result = await response.json();
    if (result.success) {
      // You can map or modify here if needed
      return result.data.map((course) => ({
        ...course,
        video: video1, // attach your static video import if needed
      }));
    } else {
      return fallbackCourses;
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    return fallbackCourses;
  }
}
