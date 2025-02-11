import React, { useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const imgbbApiKey = "d76c97c087075c4b2956fdd587e52a38";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const carData = Object.fromEntries(formData.entries());
    carData.features = carData.features.split(/[\n,]+/);
    const publisher = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
    };
    carData.publisher = publisher;
    carData.booked = false;
    carData.postDate = new Date();
    carData.dailyRentalPrice = parseInt(carData.dailyRentalPrice);
    carData.bookingCount = 0;
    carData.imageUrl = uploadedImage;

    try {
      const response = await axios.post("https://rentride-ecru.vercel.app/add-car", carData);
      if (response.status === 200) {
        toast.success("Data added successfully");
        navigate("/my-cars");
      }
    } catch (error) {
      console.error("Failed to add car data:", error);
      toast.error("Failed to add car");
    }
  };

  return (
    <div className="mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 bg-white shadow-md rounded border"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
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
                Drag and drop an image here, or click to select one (only images
                allowed)
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCar;
