import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import Loading from "../Components/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import UpdateCar from "../Components/UpdateCar";

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`https://rentride-ecru.vercel.app/cars/${user.email}`,{
        withCredentials:true
      })
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
        setLoading(false);
      });
  }, [user.email]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://rentride-ecru.vercel.app/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
      toast.success("Car deleted successfully!");
    } catch (err) {
      console.error("Error deleting car:", err);
      toast.error("Error deleting the car!");
    }
  };

  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const sortCars = (option) => {
    let sortedCars = [...cars];
    if (option === "date_newest") {
      sortedCars.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
    } else if (option === "date_oldest") {
      sortedCars.sort((a, b) => new Date(a.postDate) - new Date(b.postDate));
    } else if (option === "price_lowest") {
      sortedCars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
    } else if (option === "price_highest") {
      sortedCars.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
    }
    setCars(sortedCars);
    setSortOption(option);
  };


  const handleUpdate = (carId) => {
    setSelectedCarId(carId);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto flex justify-between items-center">
        <div>Total cars: {cars.length}</div>
        <div className="my-4">
          <select
            value={sortOption}
            onChange={(e) => sortCars(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="">Sort by</option>
            <option value="date_newest">Date Added (Newest First)</option>
            <option value="date_oldest">Date Added (Oldest First)</option>
            <option value="price_lowest">Price (Lowest First)</option>
            <option value="price_highest">Price (Highest First)</option>
          </select>
        </div>
      </div>


      <div className="overflow-x-auto">
        {cars.length > 0 ? (
          <div>
            <table className="table border-4 border-blue-900">
              <thead>
                <tr>
                  <th>Car details</th>
                  <th>Bookings</th>
                  <th>Date</th>
                  <th>Availability</th>
                  <th>Price</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loading />
                ) : (
                  cars.map((car) => (
                    <tr key={car._id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                              {car.imageUrl ? (
                                <img
                                  src={car.imageUrl}
                                  alt={car.carModel}
                                  className="object-cover h-full w-full rounded-md"
                                />
                              ) : (
                                <Loading />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{car.carModel}</div>
                          </div>
                        </div>
                      </td>
                      <td>{car.bookingCount}</td>
                      <td>{new Date(car.postDate).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge badge-ghost badge-sm ${
                            car.availability === "Available"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {car.availability}
                        </span>
                      </td>
                      <td>{car.dailyRentalPrice}</td>
                      <th>
                        <div className="flex gap-2">
                          <div
                            onClick={() => handleUpdate(car._id)}
                            className="btn"
                          >
                            <GrUpdate />
                          </div>
                          <div
                            onClick={() => modernDelete(car._id)}
                            className="btn"
                          >
                            <MdDeleteForever />
                          </div>
                        </div>
                      </th>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* UpdateCar modal */}
            <UpdateCar
            key={selectedCarId}
              carId={selectedCarId}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          </div>
        ) : (
          <p className="text-center font-bold text-lg">
            Please add a car via{" "}
            <Link className="text-yellow-500 text-xl" to="/add-car">
              Add Car
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCars;
