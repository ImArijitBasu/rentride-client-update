import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
const Banner = () => {
  return (
    <div className="">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'
      >
        <SwiperSlide>
          {" "}
          <div
            style={{
              backgroundImage: `url('/bg.jpg')`,
            }}
            className="h-[800px] my-1 border-4 border-y-yellow-500 border-x-black bg-cover bg-center"
          >
            <div className="text-white text-center flex flex-col container mx-auto justify-center space-y-4 items-center h-full">
              <p className="text-yellow-500 font-extrabold text-4xl">
                Drive Your Dreams Today <span className="text-red-500">!</span>
              </p>
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur-md opacity-75 animate-pulse"
                  aria-hidden="true"
                ></div>
                <Link
                  to="/available-cars"
                  className="relative px-6 py-3 text-white bg-transparent rounded-full z-10 font-semibold hover:bg-blue-900 transition duration-300"
                >
                  View Available Cars
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div
            style={{
              backgroundImage: `url('/bg1.jpg')`,
            }}
            className="h-[800px] my-1 border-4 border-y-yellow-500 border-x-black bg-cover bg-center"
          >
            <div className="text-white text-center flex flex-col container mx-auto justify-center space-y-4 items-center h-full">
              <p className="text-yellow-500 font-extrabold text-4xl">
              Your Next Car Awaits You
              </p>
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur-md opacity-75 animate-pulse"
                  aria-hidden="true"
                ></div>
                <Link
                  to="/available-cars"
                  className="relative px-6 py-3 text-white bg-transparent rounded-full z-10 font-semibold hover:bg-blue-900 transition duration-300"
                >
                  View Available Cars
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div
            style={{
              backgroundImage: `url('/bg2.jpg')`,
            }}
            className="h-[800px] my-1 border-4 border-y-yellow-500 border-x-black bg-cover bg-center"
          >
            <div className="text-white text-center flex flex-col container mx-auto justify-center space-y-4 items-center h-full">
              <p className="text-yellow-500 font-extrabold text-4xl">
              Drive your passion, fuel your purpose
              </p>
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur-md opacity-75 animate-pulse"
                  aria-hidden="true"
                ></div>
                <Link
                  to="/available-cars"
                  className="relative px-6 py-3 text-white bg-transparent rounded-full z-10 font-semibold hover:bg-blue-900 transition duration-300"
                >
                  View Available Cars
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div
            style={{
              backgroundImage: `url('/bg3.jpg')`,
            }}
            className="h-[800px] my-1 border-4 border-y-yellow-500 border-x-black bg-cover bg-center"
          >
            <div className="text-white text-center flex flex-col container mx-auto justify-center space-y-4 items-center h-full">
              <p className="text-yellow-500 font-extrabold text-4xl">
              Let your wheels define your destination.
              </p>
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur-md opacity-75 animate-pulse"
                  aria-hidden="true"
                ></div>
                <Link
                  to="/available-cars"
                  className="relative px-6 py-3 text-white bg-transparent rounded-full z-10 font-semibold hover:bg-blue-900 transition duration-300"
                >
                  View Available Cars
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
