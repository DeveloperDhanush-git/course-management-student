import React from 'react'


import DigitalIllustrationCarousel from '../components/DigitalIllustrationCard';
import RecommendedCourse from '../courses/RecommendedCourse';
import Popular from "../courses/Popular"
import Trending from '../courses/Trending';

const UserHome = () => {
  
const slidesData = [
  {
    id: 1,
    title: "Digital Illustrations",
    description: "Learn digital painting techniques and creative concepts.",
    image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  },
  {
    id: 2,
    title: "Creative Design",
    description: "Explore UI/UX principles and modern web aesthetics.",
    image: "https://miro.medium.com/v2/resize:fit:1200/0*kQVFCuU_ti1_Da-C.png",
  },
  {
    id: 3,
    title: "Modern Web Development",
    description: "Master React, Tailwind, and cutting-edge tools.",
    image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
  },
];



  return (
    <div className="bg-white mt-35 max-w-7xl mx-auto mb-5">
      
      <RecommendedCourse/>
      <div>
      <DigitalIllustrationCarousel slides={slidesData} />
      </div>
      <Popular/>
      <Trending/>
      
    </div>
  )
}

export default UserHome