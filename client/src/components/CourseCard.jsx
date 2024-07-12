import React from 'react';

const CourseCard = ({ title, description, image }) => {
  return (
    <div className="flex-shrink-0 w-64 m-2 bg-white rounded-lg border border-black">
      <img src={image} alt={title} className="w-full h-32 object-cover rounded-t-lg" />
      <div className="p-2">
        <h3 className="text-medium font-semibold">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>
    <div className='flex flex-row justify-end items-center mt-8'>
    <p className='text-sm px-2'>sprax foundation</p>
    <button className='bg-secondary text-black text-sm rounded-md px-4 border border-black'>ikuti</button>
    </div>
      </div>
    </div>
  );
};

export default CourseCard;
