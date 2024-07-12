import React from "react";
import Navbar from "./components/Navbar";
import Aboutbg from "./assets/aboutbg.png";
import Footer from "./components/Footer";

const AboutView = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <div className= "bg-primary pb-2 py-8">
            
        <div className="grid grid-cols-2 md:grid-cols-2 items-center  px-8 md:px-8 gap-6">
            <div className="w-full md:text-left mb-4 md:mb-0">
              <h2 className="md:text-md lg:text-2xl font-semibold mb-8 text-white">About Us</h2>
              <p className="md:text-xl lg:text-4xl font-bold mb-4 mt-8 text-white">
                “Where every learner finds hope and opportunity.”
              </p>
            </div>
            <div className="w-full mx-auto">
              <img src={Aboutbg} alt="Description of image" className="w-8/12 h-auto" />
            </div>
          </div>

        </div>
        
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          </div>
          <h3 className="text-2xl font-semibold lg:ml-4 mb-2">Our Values</h3>
          <div className="bg-primary lg:mr-80 py-6 mb-6 px-4 md:px-8 mx-4 rounded-lg">
            <p className="text-white">
              Convy is your gateway to a future of inclusive learning. This innovative platform empowers people with disabilities by offering synchronous skill development programs and real-time accessibility features. Convy's video conferencing utilizes sign language detection to convert gestures to text, while speech-to-text ensures everyone can follow along.
            </p>
          </div>
          <h3 className="text-2xl font-semibold lg:ml-96 mb-2">Our Mission</h3>
          <div className="bg-primary lg:ml-96 py-6 mb-6 px-4 md:px-8 mx-4 rounded-lg">
           
            <p className="text-white"> 
              Convy empowers individuals with disabilities to achieve their full potential through inclusive learning. We provide accessible and engaging programs, foster a supportive community, and champion the voices of people with disabilities. Our goal is to create a world where everyone has the opportunity to learn, grow, and succeed.
            </p>
          </div>
          <h3 className="text-2xl font-semibold lg:ml-4  mb-2">Our Vision</h3>
          <div className=" bg-primary pb-2 py-6 lg:mr-80 mb-6 px-4 md:px-8 mx-4 rounded-lg">
           
            <p className="text-white">
              Our vision is a world where learning has no barriers. We see a future where Convy is synonymous with inclusive education, a place where individuals with disabilities can confidently access the knowledge and skills they need to achieve their dreams.
            </p>
          </div>
        
        
        
      </div>
      <Footer/>
    </div>
  );
};

export default AboutView;
