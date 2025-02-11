import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import 'animate.css';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const RentPriceTrends = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Rental Price",
        data: [],
        borderColor: "#4B89DC",
        backgroundColor: "rgba(75, 139, 220, 0.2)",
        fill: true,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    axios.get('https://rentride-ecru.vercel.app/cars/topPrice')
      .then(res => {
        const labels = res.data.map(car => car.carModel);
        const rentalPrices = res.data.map(car => car.dailyRentalPrice);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Rental Price",
              data: rentalPrices,
              borderColor: "#4B89DC",
              backgroundColor: "rgba(75, 139, 220, 0.2)",
              fill: true,
              tension: 0.1,
            },
          ],
        });
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <section className="bg-white p-12 rounded-md shadow-md animate__animated animate__fadeIn container mx-auto flex flex-col justify-center items-center">
      <h2 className="text-3xl font-extrabold mb-6 text-center">Rental Price Trends Over Time</h2>
      <div className="w-full h-auto flex justify-center items-center">
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Rental Price Trends",
              },
              legend: {
                position: "top",
              },
            },
          }}
        />
      </div>
    </section>
  );
};

export default RentPriceTrends;
