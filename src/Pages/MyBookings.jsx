import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProviders";
import Loading from "../Components/Loading";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState(null); 
  const [isUpdating, setIsUpdating] = useState(false);
  const [carDetails, setCarDetails] = useState([]);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `https://rentride-ecru.vercel.app/my-bookings/${user.email}`,
          { withCredentials: true }
        );
        setBookings(response.data);
        const carIds = response.data?.map((booking) => booking.carId);
        if (carIds?.length) {
          const carResponse = await axios.post(
            `https://rentride-ecru.vercel.app/cars-by-ids`,
            { carIds },
            { withCredentials: true }
          );
          setCarDetails(carResponse.data);
        }
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.email]);

  useEffect(() => {
    if (carDetails.length > 0) {
      const data = carDetails.map((car) => ({
        carModel: car.carModel,
        dailyRentalPrice: car.dailyRentalPrice,
      }));
      setChartData(data);
    }
  }, [carDetails]);

  const handleCancelBooking = async (bookingId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `https://rentride-ecru.vercel.app/cancel-booking/${bookingId}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setBookings(bookings.filter((booking) => booking._id !== bookingId));
          Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
        } else {
          Swal.fire("Failed!", "Failed to cancel the booking. Try again.", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "An error occurred. Please try again.", "error");
      }
    }
  };

  const handleModifyBookingDate = (booking) => {
    setSelectedBooking(booking);
    setNewDate(new Date(booking.bookingDate)); 
    setModalVisible(true);
  };

  const handleSaveNewDate = async () => {
    if (!newDate) {
      Swal.fire("Error", "Please select a valid date", "error");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await axios.put(
        `https://rentride-ecru.vercel.app/update-booking/${selectedBooking._id}`,
        { bookingDate: newDate }, 
        { withCredentials: true }
      );

      if (response.status === 200) {
        setBookings(
          bookings.map((booking) =>
            booking._id === selectedBooking._id
              ? { ...booking, bookingDate: newDate }
              : booking
          )
        );
        Swal.fire("Updated!", "Your booking date has been updated.", "success");
        setModalVisible(false);
      } else {
        Swal.fire("Failed!", "Failed to update the booking date. Try again.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", "An error occurred. Please try again.", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="container mx-auto text-center mt-5 bg-blue-900 py-4 text-white">
        <p className="text-2xl"><span className="text-red-500">No data</span> to show <span className="text-sm">({error})</span></p>
        <p className="text-xs text-gray-400 underline">cause there is no bookings associated with  the email : <span className="text-yellow-500">{user.email}</span></p>
        <span className="loading loading-infinity loading-lg text-blue-200"></span>
    </div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You don't have any bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Car Image</th>
                <th className="border px-4 py-2">Car Model</th>
                <th className="border px-4 py-2">Booking Date</th>
                <th className="border px-4 py-2">Rent Fee</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const car = carDetails.find((car) => car._id === booking.carId);
                return (
                  <tr key={booking._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">
                      {car ? (
                        <img
                          src={car.imageUrl}
                          alt={car.carModel}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">{car ? car.carModel : 'Loading...'}</td>
                    <td className="border px-4 py-2">
                      {format(new Date(booking.bookingDate), 'dd-MM-yyyy HH:mm')}
                    </td>
                    <td className="border px-4 py-2">{car ? `$${booking.rentFee}` : 'Loading...'}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full bg-amber-500 text-white`}
                      >
                        Pending...
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleModifyBookingDate(booking)}
                        className="ml-4 bg-blue-900 text-white px-4 py-2 rounded-md"
                      >
                        Modify Date
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Bar Chart */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Car Rental Price Comparison</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="carModel" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="dailyRentalPrice" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Modify Booking Date</h2>
            <DatePicker
              selected={newDate}
              onChange={(date) => setNewDate(date)} 
              className="border px-4 py-2 rounded-md"
              minDate={new Date()} 
            />
            <div className="mt-4">
              <button
                onClick={handleSaveNewDate}
                className="bg-green-500 text-white px-6 py-2 rounded-md"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Save Changes"}
              </button>
              <button
                onClick={() => setModalVisible(false)}
                className="ml-4 bg-gray-300 text-black px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
