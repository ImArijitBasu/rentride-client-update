import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="text-black dark:text-white ">
      {/* hero */}
      <div className="relative w-full h-[700px]">
        <img
          src="/aboutBg.jpg"
          alt="About RentRide"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/*//! Overlay*/}
        <div className="absolute inset-0 bg-blue-900/30 dark:bg-slate-900/50 bg-opacity-50 transition-colors ease-in-out duration-700"></div>

        <div className="relative  flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold uppercase">
            Your Trusted Rental Partner
          </h1>
          <p className="mt-2 text-lg md:text-xl max-w-2xl">
            Seamless, Affordable, and Hassle-Free Vehicle Rentals for Everyone.
          </p>
          <Link
            to={"/available-cars"}
            className="mt-4 bg-blue-900 hover:bg-slate-900 px-6 py-3 rounded-md text-lg font-medium transition"
          >
            Explore Rentals
          </Link>
        </div>
      </div>
      {/* our Journey */}
      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Our Journey: From an Idea to a Reliable Service
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            At RentRide, we started with one simple goal—making vehicle rentals
            effortless. From our humble beginnings to a growing fleet, we strive
            to offer affordability, convenience, and top-notch service.
          </p>
          <p className="mt-6 text-lg font-semibold text-blue-900 dark:text-yellow-500">
            "We believe in providing accessible, flexible, and cost-effective
            rental solutions to everyone, from daily commuters to adventure
            seekers."
          </p>
        </div>
        <div className="md:w-1/2 ">
          <img
            src="/happyCar.jpg"
            alt="RentRide Story"
            className="w-full rounded-lg shadow-lg object-cover max-h-[500px]"
          />
        </div>
      </div>
      {/* team */}
      <section className="bg-gradient-to-b from-blue-900 dark:from-slate-900 to-gray-800 py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 container">
        <div className="w-full h-80 rounded-full overflow-hidden border-4 border-yellow-500 shadow-lg">
          <img src="/creator.jpg" alt="Arijit Basu" className="w-full h-full object-cover hover:scale-150 duration-200" />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">Meet the Mind Behind RentRide</h2>
          <p className="text-gray-300 mb-4">
            RentRide is a one-person passion project, built with dedication and innovation to simplify vehicle rentals.
          </p>
          <div className="bg-gray-700 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400">🚀 Arijit Basu – Founder & Developer</h3>
            <p className="text-gray-300">
              "Hi, I'm Arijit Basu, the creator of RentRide. From designing the UI to coding the backend, I've built
              this platform to offer a smooth and hassle-free vehicle rental experience."
            </p>
          </div>

          <div className="mt-4 flex justify-center md:justify-start gap-4">
            <a href="https://github.com/ImArijitBasu" target="_blank" rel="noopener noreferrer" className="bg-blue-900 px-4 py-2 rounded-full hover:bg-blue-600 transition">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/imarijitbasu" target="_blank" rel="noopener noreferrer" className="bg-blue-900 px-4 py-2 rounded-full hover:bg-blue-600 transition">
              LinkedIn
            </a>
            <a href="https://arijitbasu.netlify.app/" target="_blank" rel="noopener noreferrer" className="bg-blue-900 px-4 py-2 rounded-full hover:bg-blue-600 transition">
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default About;
