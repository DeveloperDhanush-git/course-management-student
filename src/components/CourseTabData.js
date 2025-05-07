import { Video, Clock, Globe, Award, FileText, Check } from "lucide-react";

const courseTabsData = {
    1: {
      title: "Grow Your Video Editing Skills from Experts",
      description:
        "Learn the fundamentals of video editing from professionals. Understand tools like Adobe Premiere Pro and Final Cut Pro.",
      benefits: [
        { icon: Video, text: "10+ hours of expert video content" },
        { icon: Clock, text: "Lifetime access to course material" },
        { icon: Globe, text: "Taught by industry professionals" },
        { icon: Award, text: "Certified completion" },
      ],
      reviews: [
        {
          name: "Alice Johnson",
          rating: 5,
          time: "10:30 AM",
          comment: "Excellent course! I improved my editing skills significantly.",
          image: "https://randomuser.me/api/portraits/women/1.jpg",
        },
      ],
    },
  
    2: {
      title: "Easy and Creative Food Art Ideas Decoration",
      description:
        "Discover creative ways to present food beautifully using simple techniques. Perfect for photographers and food bloggers.",
      benefits: [
        { icon: Video, text: "6+ hours of HD video tutorials" },
        { icon: Clock, text: "24/7 access to course materials" },
        { icon: Award, text: "Certificate upon completion" },
      ],
      reviews: [
        {
          name: "John Doe",
          rating: 4.5,
          time: "1:15 PM",
          comment: "The course was fun and easy to follow. Great for beginners!",
          image: "https://randomuser.me/api/portraits/men/2.jpg",
        },
      ],
    },
  
    3: {
      title: "Create Your Own Sustainable Fashion Style",
      description:
        "A guide to creating an eco-friendly fashion line using sustainable fabrics and ethical production methods.",
      benefits: [
        { icon: Video, text: "5+ hours of tutorial content" },
        { icon: Globe, text: "Learn from fashion industry experts" },
        { icon: Award, text: "Certificate for completion" },
      ],
      reviews: [
        {
          name: "Samantha Green",
          rating: 5,
          time: "2:30 PM",
          comment: "Great insights on sustainability in fashion!",
          image: "https://randomuser.me/api/portraits/women/3.jpg",
        },
      ],
    },
  
    4: {
      title: "Grow Your Skills in Fashion Marketing",
      description:
        "Understand marketing strategies to grow your fashion brand and attract customers worldwide.",
      benefits: [
        { icon: Video, text: "8+ hours of case studies and tutorials" },
        { icon: FileText, text: "Exclusive marketing worksheets" },
        { icon: Check, text: "24/7 expert support" },
      ],
      reviews: [
        {
          name: "Mark Phillips",
          rating: 4.8,
          time: "5:00 PM",
          comment: "Helped me refine my brand marketing strategies!",
          image: "https://randomuser.me/api/portraits/men/4.jpg",
        },
      ],
    },
  };
  
  export default courseTabsData;
  