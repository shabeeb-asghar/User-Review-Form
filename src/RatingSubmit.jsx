import React, { useState } from "react";
import SubmitButton from "./SubmitButton";

  const RatingSubmit = ({ handleSubmit, rating, setRating, setShowError, showError }) => {
    const ratingOptions = [1, 2, 3, 4, 5];

    return (
      <div className="flex flex-col p-6 sm:p-8 bg-white shadow-lg rounded-xl border border-gray-100 w-full">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Rate your experience</h2>
        
        <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          {ratingOptions.map((value) => (
            <button
              key={value}
              onClick={() => {
                setRating(value);
                setShowError(false);
              }}
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full 
                ${rating === value ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} 
                transition-all duration-200 font-semibold text-base sm:text-lg`}
            >
              {value}
            </button>
          ))}
        </div>
        
        {showError && (
          <p className="text-red-500 text-xs sm:text-sm text-center mb-4">
            Please select a rating before submitting.
          </p>
        )}
        
        <button
          onClick={handleSubmit}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit Feedback
        </button>
      </div>
    );
  };
  
  export default RatingSubmit;