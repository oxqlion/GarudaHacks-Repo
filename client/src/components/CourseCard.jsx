import React from "react";

const CourseCard = ({ title, description, image }) => {
  return (
    <div className="flex-shrink-0 w-64 m-2 bg-white rounded-lg border border-black flex flex-col">
      <img
        src={image}
        alt={title}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <div className="flex-grow p-2">
        <h3 className="text-medium font-semibold overflow-hidden line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-gray-600 overflow-hidden line-clamp-2">
          {description}
        </p>
      </div>
      <div className="p-2 bg-white flex items-center justify-between rounded-lg">
        <p className="text-sm">sprax foundation</p>
        <button className="bg-secondary text-black text-sm rounded-md px-4 border border-black">
          ikuti
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
