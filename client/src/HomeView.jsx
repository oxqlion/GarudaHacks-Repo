import react from "react";
import "./index.css";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="w-full pt-20 bg-primary">
        {/* Adjust pt-20 based on navbar height */}
        <h1 className="text-white text-left text-3xl font-inter font-semibold px-8 pt-10 pb-4 mr-10">
          What Skill Do You Want To Learn Today?
        </h1>
        <h2 className="text-gray-300 px-8">Learn together with new friends!</h2>
      </div>
    </div>
  );
};

export default Home;
