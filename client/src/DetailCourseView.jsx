import React, { useState } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { AiTwotoneCalendar } from "react-icons/ai";

const DetailCourse = () => {
  return (
    <div className="w-screen h-screen font-inter">
      <Navbar />
      <div className="w-full pt-12"></div>
      <div className="w-full h-full p-6 flex justify-center items-center">
        <div className="bg-slate-100 w-full md:w-2/3 lg:w-1/2 border border-black rounded-lg p-4">
          <h1 className="text-2xl font-semibold mb-2">
            {/* {course.courseName || "Course Name Not Available"} */}
          </h1>
          <p className="text-xs mb-4">Sparx Foundation</p>
          <img
            // src={course.thumbnail}
            // alt={course.courseName}
            className="w-full h-64 object-cover rounded-t-lg mb-4"
          />
          <div className="border-b border-black mb-4"></div>
          <div className="flex flex-row items-center mb-2">
            <LiaChalkboardTeacherSolid className="text-3xl mr-2" />
            <h1 className="text-xl font-semibold">Narasumber</h1>
          </div>
          <div className="rounded border border-black p-4 flex flex-row mb-4">
            <img
              src="path/to/speaker/image.jpg" // Replace with actual image path
              alt="Speaker"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-md font-semibold">
                {/* {course.teacherName || "Teacher Name Not Available"} */}
              </h1>
              <p className="text-xs">
                {/* {course.teacherBackground || "Teacher Background Not Available"} */}
              </p>
            </div>
          </div>
          <h1 className="text-xl font-semibold mb-2">Informasi Kelas</h1>
          <p className="text-sm mb-4">
            {/* {course.courseDescription || "Description Not Available"} */}
          </p>
          <h2 className="text-xs font-semibold mb-2 flex items-center pb-5">
            <AiTwotoneCalendar className="mr-2 text-xl" />
            {/* {course.courseDate || "Date Not Available"}, {course.courseTime || "Time Not Available"} */}
          </h2>
          <div className="flex w-full gap-2">
            <button className="bg-primary text-white w-full py-1 px-4 rounded-md border border-black flex-grow">
              Ikut Sekarang
            </button>
            <button className="bg-gray-200 text-black w-full py-1 px-4 rounded-md border border-black flex-grow">
              Simpan
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCourse;
