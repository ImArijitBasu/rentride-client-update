import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateCar = ({ carId, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [carDetails, setCarDetails] = useState({});
  const [car ,setCar] = useState({})
  const imgbbApiKey = "d76c97c087075c4b2956fdd587e52a38";
  console.log(carId);
  useEffect(() => {
    if (carId) {
      axios
        .get(`https://rentride-ecru.vercel.app/car/${carId}`)
        .then((response) => {
          setCar(response.data);
          console.log(response.data);
          setUploadedImage(response.data.imageUrl || null); 
        })
        .catch((error) => console.error("Error fetching car details:", error));
    }
  }, [carId]);

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          formData
        );
        setUploadedImage(response.data.data.url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: handleDrop,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedCarData = {
        ...carDetails,
        imageUrl: uploadedImage,
      };
      await axios.put(
        `https://rentride-ecru.vercel.app/update-car/${carId}`,
        updatedCarData
      );
      toast.success("Car details updated successfully!");
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car details.");
    }
  };

  if (!isOpen) return null;
  console.log(car);
  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Update Car</h3>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
        >
          <div className="mb-4">
            <label
              htmlFor="carModel"
              className="block text-sm font-medium text-gray-700"
            >
              Car Model
            </label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              defaultValue={car.carModel}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dailyRentalPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Daily Rental Price
            </label>
            <input
              type="number"
              id="dailyRentalPrice"
              name="dailyRentalPrice"
                defaultValue={car?.dailyRentalPrice}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700"
            >
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="Available" selected={car?.availability === "Available"}>Available</option>
              <option value="Unavailable" selected={car?.availability === "Unavailable"}>Unavailable</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="registrationNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Vehicle Registration Number
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              defaultValue={car?.registrationNumber}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="features"
              className="block text-sm font-medium text-gray-700"
            >
              Features
            </label>
            <textarea
              id="features"
              name="features"
              defaultValue={car?.features}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={car?.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Car Image
            </label>
            <div
              {...getRootProps()}
              className={`mt-1 border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here...</p>
              ) : (
                <p>
                  Drag and drop an image here, or click to select one (only
                  images allowed)
                </p>
              )}
            </div>
            {uploadedImage && (
              <div className="mt-2">
                <p>Uploaded Image:</p>
                <img
                  src={uploadedImage}
                  alt="Uploaded Car"
                  className="w-full h-auto rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={car?.location}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Car
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateCar;
