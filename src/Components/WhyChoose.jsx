import Lottie from "lottie-react";
import React from "react";

import garage from "../Lottie/garage.json";
import doller from "../Lottie/doller.json";
import calender from "../Lottie/calender.json";
import chat from "../Lottie/chat.json";
const WhyChoose = () => {
  return (
    <div className="container mx-auto py-4">
        <p className="text-center flex justify-center font-extrabold text-3xl  my-8 border-b-4">WHY CHOOSE US  <span className="text-yellow-500"> ?</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto">
        {/* //!one */}
        <div className="border rounded-2xl flex flex-col justify-center items-center px-4">
          <div className="w-56 md:w-full bg-yellow-500 h-auto md:h-52 m-4 flex justify-center items-center rounded-xl">
            <Lottie className="w-48" animationData={garage}></Lottie>
          </div>
          <p className="font-extrabold text-xl border-b-4 text-blue-900">Wide Variety of Cars</p>
          <p className="px-4 text-center font-medium">
            A selection of cars ranging from budget-friendly to luxury options.
          </p>
        </div>
        {/* //!two */}
        <div className="border rounded-2xl flex flex-col justify-center items-center px-4">
          <div className="w-56 md:w-full bg-yellow-500 h-auto md:h-52 m-4 flex justify-center items-center rounded-xl">
            <Lottie animationData={doller}></Lottie>
          </div>
          <p className="font-extrabold text-xl border-b-4 text-blue-900">Affordable Prices</p>
          <p className="px-4 text-center font-medium py-2">
            Transparent and competitive daily rental rates.
          </p>
        </div>
        {/* //!three */}
        <div className="border rounded-2xl flex flex-col justify-center items-center px-4">
          <div className="w-56 md:w-full bg-yellow-500 h-auto md:h-52 m-4 flex justify-center items-center rounded-xl">
            <Lottie animationData={calender}></Lottie>
          </div>
          <p className="font-extrabold text-xl border-b-4 text-blue-900">Easy Booking Process</p>
          <p className="px-4 text-center font-medium py-2">
            {" "}
            Simple, user-friendly booking with minimal steps.
          </p>
        </div>
        {/* //!four */}
        <div className="border rounded-2xl flex flex-col justify-center items-center px-4">
          <div className="w-56 md:w-full bg-yellow-500 h-auto md:h-52 m-4 flex justify-center items-center rounded-xl">
            <Lottie animationData={chat}></Lottie>
          </div>
          <p className="font-extrabold text-xl border-b-4 text-blue-900">Customer Support</p>
          <p className="px-4 text-center font-medium py-2">
            {" "}
            24/7 assistance for any queries or issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
