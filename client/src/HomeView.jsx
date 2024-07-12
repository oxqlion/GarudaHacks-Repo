import React, { useRef } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import CourseCard from "./components/CourseCard";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import Footer from "./components/Footer";
import { FaStar } from "react-icons/fa";
import "./index.css";

const Home = () => {
  const courses = [
    {
      title: "Course 1",
      description: "Description 1",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Course 2",
      description: "Description 2",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Course 3",
      description: "Description 3",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Course 4",
      description: "Description 4",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Course 5",
      description: "Description 5",
      image: "https://via.placeholder.com/150",
    },
    // Add more courses as needed
  ];

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full pt-20 bg-primary pb-2">
        <h1 className="text-white text-left text-3xl font-inter font-semibold px-8 pt-10 pb-4 mr-10">
          What Skill Do You Want To Learn Today?
        </h1>
        <h2 className="text-gray-300 px-8">Learn together with new friends!</h2>
        <Searchbar />
      </div>
      <div className="w-full mt-6">
        <div className="flex flex-row justify-between items-center mb-4 px-8">
          <div className="flex flex-row gap-2">
            <FaStar className="text-2xl text-yellow-500" />
            <h1 className="font-inter text-xl text-left font-bold">
              Popular Classes
            </h1>
          </div>
          <div className="flex flex-row space-x-2">
            <button onClick={scrollLeft} className="bg-transparent text-3xl">
              <IoIosArrowDropleft />
            </button>
            <button onClick={scrollRight} className="bg-transparent text-3xl">
              <IoIosArrowDropright />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className=" px-6 overflow-x-auto flex space-x-4 pb-4 scroll-smooth"
        >
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              image={course.image}
            />
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="flex flex-row justify-between items-center mb-4 px-8">
          <div className="flex flex-row gap-2">
            <h1 className="font-inter text-xl text-left font-bold">
              Live Now
            </h1>
          </div>
          <div className="flex flex-row space-x-2">
            <button onClick={scrollLeft} className="bg-transparent text-3xl">
              <IoIosArrowDropleft />
            </button>
            <button onClick={scrollRight} className="bg-transparent text-3xl">
              <IoIosArrowDropright />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className=" px-6 overflow-x-auto flex space-x-4 pb-4 scroll-smooth"
        >
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              image={course.image}
            />
          ))}
        </div>
      </div>
    <Footer />
    </div>
  );
};

export default Home;
