import React, { useState } from "react";
import { Star } from "lucide-react"; // Importing star icon
import SubmitButton from "./SubmitButton";

const RatingSubmit = ({ handleSubmit, rating, setRating, setShowError, showError }) => {
  const maxStars = 5; // Maximum number of stars

  return (
    <div className="flex flex-col p-6 sm:p-8 bg-white shadow-lg rounded-xl border border-gray-100 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-6">
        Service rating
      </h2>
      
      <div className="flex gap-6 mb-4 sm:mb-6">
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={starValue}
              onClick={() => {
                setRating(starValue);
                setShowError(false);
              }}
              className="focus:outline-none"
            >
              <Star 
                size={32} // Adjust size as needed
                className={starValue <= rating ? "text-yellow-400" : "text-gray-300"}
                fill={starValue <= rating ? "currentColor" : "none"}
              />
            </button>
          );
        })}
      </div>
      
      {showError && (
        <p className="text-red-500 text-xs sm:text-sm text-center mb-4">
          Please select a rating before submitting.
        </p>
      )}

      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default RatingSubmit;