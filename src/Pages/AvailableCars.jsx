import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://rentride-ecru.vercel.app/cars");
        setCars(response.data);
        setFilteredCars(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    let updatedCars = [...cars];

    if (search) {
      updatedCars = updatedCars.filter((car) =>
        `${car.carModel} ${car.brand} ${car.location}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sortOption) {
      updatedCars.sort((a, b) => {
        if (sortOption === "priceLowToHigh") {
          return a.dailyRentalPrice - b.dailyRentalPrice;
        } else if (sortOption === "priceHighToLow") {
          return b.dailyRentalPrice - a.dailyRentalPrice;
        } else if (sortOption === "modelAZ") {
          return a.postDate.localeCompare(b.postDate);
        } else if (sortOption === "modelZA") {
          return b.postDate.localeCompare(a.postDate);
        }
        return 0;
      });
    }

    setFilteredCars(updatedCars);
  }, [search, sortOption, cars]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between md:items-center flex-col md:flex-row my-4 space-y-2 md:space-y-0">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by model, brand, or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </form>
        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
          <option value="modelAZ">Oldest</option>
          <option value="modelZA">Newest</option>
        </select>
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          className="border p-2 rounded btn btn-sm"
        >
          Toggle View
        </button>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {filteredCars.map((car) => (
          <div key={car.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{car.carModel}</h3>
            <p>Location: {car.location}</p>
            <p>Price: ${car.dailyRentalPrice}/day</p>
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
            >
              <Link to={`/available-cars/${car._id}`}>Details</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
