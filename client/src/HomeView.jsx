import React, { useRef, useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import CourseCard from "./components/CourseCard";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import Footer from "./components/Footer";
import { FaStar } from "react-icons/fa";
import "./index.css";
import CourseCardBig from "./components/CourseCardBig";
import { Link } from "react-router-dom";

const Home = () => {

  const [allCourse, setAllCourse] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const q = query(collection(db, "courses"));
      const querySnapshot = await getDocs(q);
      const coursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllCourse(coursesData);
    };

    fetchCourses();
  }, []);

  const courses = [
    {
      title: "American Sign Language (ASL) Basics",
      description: "11 July 2023 to 13 July 2024",
      image: "https://source.unsplash.com/?nature",
    },
    {
      title: "Deaf Culture and Community",
      description: "15 August 2023 to 17 August 2024",
      image: "https://source.unsplash.com/?technology",
    },
    {
      title: "Accessibility in Web Design",
      description: "22 September 2023 to 24 September 2024",
      image: "https://source.unsplash.com/?business",
    },
    {
      title: "Introduction to Closed Captioning",
      description: "5 October 2023 to 7 October 2024",
      image: "https://source.unsplash.com/?art",
    },
    {
      title: "Educational Strategies for Teaching Deaf Learners",
      description: "10 November 2023 to 12 November 2024",
      image: "https://source.unsplash.com/?science",
    },
    {
      title: "Sign Language Interpreting Techniques",
      description: "15 December 2023 to 17 December 2024",
      image: "https://source.unsplash.com/?science",
    },
    {
      title: "Advances in Hearing Aid Technology",
      description: "20 January 2024 to 22 January 2025",
      image: "https://source.unsplash.com/?technology",
    },
    {
      title: "Legal Rights and Advocacy for Deaf Individuals",
      description: "25 February 2024 to 27 February 2025",
      image: "https://source.unsplash.com/?technology",
    },
    {
      title: "Accessible Film Production",
      description: "3 March 2024 to 5 March 2025",
      image: "https://source.unsplash.com/?technology",
    },
    {
      title: "Empowerment through Visual Arts",
      description: "8 April 2024 to 10 April 2025",
      image: "https://source.unsplash.com/?art",
    },
    // Add more courses as needed
  ];

  const carouselRef = useRef(null);
  const carouselRef2 = useRef(null);

  const scrollLeft1 = () => {
    carouselRef.current.scrollBy({
      left: -carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight1 = () => {
    carouselRef.current.scrollBy({
      left: carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollLeft2 = () => {
    carouselRef2.current.scrollBy({
      left: -carouselRef2.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight2 = () => {
    carouselRef2.current.scrollBy({
      left: carouselRef2.current.offsetWidth,
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
            <button onClick={scrollLeft1} className="bg-transparent text-3xl">
              <IoIosArrowDropleft />
            </button>
            <button onClick={scrollRight1} className="bg-transparent text-3xl">
              <IoIosArrowDropright />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="px-6 overflow-x-auto flex space-x-4 pb-4 scroll-smooth"
        >
          {allCourse.map((course, index) => (
            <Link
              key={index}
              to={`/course/${course.id}`}
            >
              <CourseCard
                title={course.courseName}
                description={course.courseDescription}
                image={course.thumbnail}
              />
            </Link>
          ))}

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
            <h1 className="font-inter text-xl text-left font-bold">Live Now</h1>
          </div>
          <div className="flex flex-row space-x-2">
            <button onClick={scrollLeft2} className="bg-transparent text-3xl">
              <IoIosArrowDropleft />
            </button>
            <button onClick={scrollRight2} className="bg-transparent text-3xl">
              <IoIosArrowDropright />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef2}
          className="px-6 overflow-x-auto flex space-x-4 pb-4 scroll-smooth"
        >
          {allCourse.map((course, index) => (
            <Link
              key={index}
              to={`/course/${course.id}`}
            >
              <CourseCard
                title={course.courseName}
                description={course.courseDescription}
                image={course.thumbnail}
              />
            </Link>
          ))}

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
              Other Classes
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-8 gap-4 mb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CourseCardBig />
        <CourseCardBig />
        <CourseCardBig />
        <CourseCardBig />
        <CourseCardBig />
        <CourseCardBig />
        <CourseCardBig />
        <CourseCardBig />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
