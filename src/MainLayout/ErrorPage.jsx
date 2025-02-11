import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='container mx-auto flex flex-col justify-center items-center p-4'>
            <img src="/car.jpg" alt="" className='w-screen rounded-md md:rounded-3xl' />
            <p className='bg-yellow-500 text-white w-full text-center mt-4 rounded-full py-5 font-bold'>
                Back to <Link to="/" className='btn bg-blue-900 rounded-full text-white'>Home page ↻</Link>
            </p>
        </div>
    );
};

export default ErrorPage;