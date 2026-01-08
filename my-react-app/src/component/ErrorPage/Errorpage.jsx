import React from 'react';
import { useNavigate } from 'react-router-dom';

const Errorpage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard/cost-explorer'); // or '/' depending on your app flow
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Oops! Page Not Found</h2>
      <p className="text-center text-gray-500 max-w-md mb-6">
        The page you're looking for doesn't exist, might have been moved, or the URL is wrong.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Errorpage;
