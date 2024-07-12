import React from "react";

const Footer = () => {
  return (
    <div className="w-screen bg-primary p-6 flex flex-cols-2 justify-between border-t border-black">
      <div className="w-full">
        <h1 className="text-white text-2xl font-semibold">Convy</h1>
      </div>
      <div className="w-full">
        <h1 className="text-white text-lg font-semibold">Other Info</h1>
    <ul className="text-white text-md">
    <li>
      Instagram
    </li>
    <li>
      YouTube
    </li>
    <li>
      Facebook
    </li>
    </ul>
      </div>
    </div>
  );
};

export default Footer;
