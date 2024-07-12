import React, { useEffect } from "react";

const CourseCardBig = () => {
  return (
    <div className="bg-white border rounded-lg border-black w-full max-w-md mx-auto">
      {/* Image Section */}
      <div className="relative">
        <img
          src="https://via.placeholder.com/600x200"
          alt="Course"
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-blue-600 bg-opacity-50 flex justify-center items-center rounded-t-lg">
          <img
            src="https://via.placeholder.com/100"
            alt="Instructor"
            className="w-24 h-24 object-cover rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          Menguasai Seni Berkomunikasi
        </h2>
        <p className="text-gray-600 mb-4">11 Juli 2023 s/d 13 Juli 2024</p>
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Sparx Logo"
            className="w-8 h-8"
          />
          <span className="ml-2 text-gray-700">Sparx Foundation</span>
        </div>

        <div className="flex w-full gap-2">
          <button className="bg-secondary text-black text-xl flex-grow py-1 rounded-lg border border-black flex items-center justify-center">
            Ikuti Sekarang <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCardBig;
