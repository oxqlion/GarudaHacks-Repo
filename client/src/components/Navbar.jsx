import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed w-full bg-slate-50 border-b border-black z-50">
      <div className="w-full flex flex-row justify-between items-center px-6 py-4">
        <h2 className="text-3xl font-bold text-primary font-inter">Convy</h2>
        <button
          className="md:hidden block border border-black focus:outline-none bg-primary p-4 rounded-lg"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="white"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <ul className="hidden md:flex md:flex-row md:items-center md:space-x-6 text-primary font-inter font-semibold">
          <li className="hover:text-blue-500 cursor-pointer">Home</li>
          <li className="hover:text-blue-500 cursor-pointer">Class</li>
          <li className="hover:text-blue-500 cursor-pointer">Contacts</li>
          <li className="hover:text-blue-500 cursor-pointer">About Us</li>
        </ul>
      </div>
      <ul
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden flex flex-col items-left space-y-6 pb-4 text-primary duration-300 ease-in-out font-inter transform px-8 font-semibold ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <li className="hover:text-blue-500 cursor-pointer">Home</li>
        <li className="hover:text-blue-500 cursor-pointer">Class</li>
        <li className="hover:text-blue-500 cursor-pointer">Contacts</li>
        <li className="hover:text-blue-500 cursor-pointer">About Us</li>
      </ul>
    </div>
  );
};

export default Navbar;
