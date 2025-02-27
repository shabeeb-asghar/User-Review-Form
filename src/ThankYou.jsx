import React from "react";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white shadow-lg rounded-xl border border-gray-100 w-full text-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4">Thank You!</h2>
      
      <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
        Your feedback has been submitted successfully. We appreciate your time and input!
      </p>
      
      <a 
        href="/" 
        className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base"
      >
        Back to Home
      </a>
    </div>
  );
};

export default ThankYou;