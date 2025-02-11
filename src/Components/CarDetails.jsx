import React, { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProviders";

const CarDetails = () => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const car = useLoaderData();
  const [bookingStatus, setBookingStatus] = useState("");
  const [error, setError] = useState("");

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        "https://rentride-ecru.vercel.app/book-car",
        {
          carId: car._id,
          userEmail: user?.email,
          bookingDate: new Date(),
        },
        { withCredentials: true }
      );
      if (response.data) {
        setBookingStatus("Car booked successfully!");
        navigate('/my-bookings')
        console.log(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book the car!");
    }
  };
  console.log(car);
  return (
    <div className="flex flex-col md:flex-row container mx-auto justify-center space-x-4 mt-10">
      <div className="">
        <img
          src={car.imageUrl}
          alt=""
          className="w-auto max-w-96 h-full object-cover rounded-lg"
        />
      </div>
      <div className="border-b-4 border-blue-900 mt-4 md:mt-0">
        <p className={`w-fit rounded-3xl p-1 text-white font-bold ${car.availability === "Available" ? "bg-green-500" : "bg-red-500"}`}>
          {car.availability}
        </p>
        <p className="font-bold text-2xl uppercase">{car.carModel}</p>
        <p className="text-sm font-light">Rent Fee: {car.dailyRentalPrice}/day</p>

        <div className="border-l-4 pl-2 border-blue-900">
          <p className="font-semibold">Features</p>
          {Array.isArray(car.features) ? (
            car.features.map((feature, index) => (
              <p key={index} className="text-sm">⫸ {feature}</p>
            ))
          ) : (
            <p className="text-sm">⫸ {car.features}</p>
          )}
        </div>
        <p className="text-sm leading-loose">
          <span className="font-semibold">Description: </span> {car.description}
        </p>

        <button
          className="btn btn-primary btn-wide my-4"
          disabled={car.availability === "Unavailable"}
          onClick={handleBooking}
        >
          Book Now
        </button>

        {bookingStatus && <p className="text-green-500">{bookingStatus}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default CarDetails;
