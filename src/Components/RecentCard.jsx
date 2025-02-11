import React from "react";
import { Link } from "react-router-dom";

const RecentCard = ({ car }) => {
  const { carModel, imageUrl, dailyRentalPrice, availability, postDate, _id } =
    car;
  const calculateDaysAgo = (postDate) => {
    const now = new Date();
    const postDateObj = new Date(postDate);
    const timeDifference = now - postDateObj;
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysAgo;
  };
  const daysAgo = calculateDaysAgo(postDate);
  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white hover:bg-yellow-50/30 border-transparent hover:border-yellow-500 border-4 p-4 rounded-md shadow-md relative hover:shadow-lg transition duration-300 ease-in-out ">
      {availability === "Available" ? (
        <p className="text-base absolute -top-2 -left-2  font-bold bg-green-500 w-fit p-2 rounded-2xl text-right text-green-50">
          {availability}
        </p>
      ) : (
        <p></p>
      )}

      {imageUrl ? (
        <img
          src={imageUrl}
          alt={carModel}
          className="w-full h-52 rounded-md shadow-md object-cover"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}
      <div className="mt-4">
        <p className="font-bold text-xl uppercase text-left border-b-4">
          {carModel}
        </p>
        <p className=" py-2 text-yellow-500 font-semibold">
          Rental Price: ${dailyRentalPrice}/day
        </p>

        <p className="text-sm text-gray-400 dark:text-white text-right py-3 mb-5">
          Added {daysAgo} days ago
        </p>
        <Link to={`/available-cars/${car._id}`} className="btn absolute -bottom-2 -right-2 bg-blue-900 dark:bg-slate-900 text-white hover:bg-blue-600 dark:border-yellow-500 dark:hover:bg-slate-800">see more</Link>
      </div>
    </div>
  );
};

export default RecentCard;
