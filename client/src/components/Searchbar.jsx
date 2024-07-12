import React, { useState } from "react";
const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle the search functionality here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center border-b border bg-white border-black mx-8 my-2 p-2 rounded-2xl">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="flex-shrink-0 bg-primary hover:bg-primary-dark border-black hover:border-primary-dark text-sm border text-white py-2 px-2 rounded-xl font-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
