import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 h-screen w-screen bg-gradient-to-r from-blue-900 via-blue-600 to-blue-500">
      <div className="relative w-full max-w-2xl text-center h-full">
        <img
          src="/car.jpg"
          alt="Error Image"
          className="w-full h-full object-cover rounded-lg shadow-lg border-4 border-white mb-6"
        />

        <div className="absolute rounded-md inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4 h-fit my-auto">
          <h1 className="text-3xl font-extrabold mb-4">Oops! Something Went Wrong</h1>
          <p className="text-lg mb-6">
            We couldn't find the page you were looking for. But don't worry, we're here to help you get back on track.
          </p>
          <p className="bg-yellow-500 text-black text-lg w-full text-center rounded-full py-5 font-semibold">
            Back to{' '}
            <Link
              to="/"
              className="inline-block bg-blue-900 text-white py-2 px-6 rounded-md text-sm font-bold hover:bg-blue-700 transition duration-300"
            >
              Home Page ↻
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
