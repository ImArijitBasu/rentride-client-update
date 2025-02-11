import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentCard from "./RecentCard";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const RecentListing = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://rentride-ecru.vercel.app/cars/recent")
      .then((res) => {
        console.log(res.data);
        setCars(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto text-center my-4">
      <p className="uppercase text-3xl font-extrabold border-b-4 my-6">
        Recent Listing
      </p>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
          {cars.map((car, idx) => (
            <RecentCard key={idx} car={car} />
          ))}
        </div>
      )}
      <div className="w-full flex justify-end my-5">
      <Link className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none" to="/available-cars">
        See more
      </Link>
      </div>
    </div>
  );
};

export default RecentListing;
