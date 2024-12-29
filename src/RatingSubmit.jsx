import React, { useState } from "react";
import SubmitButton from "./SubmitButton";

const RatingComponent = ({ rating, setRating, handleSubmit, showError, setShowError}) => {
  const [hover, setHover] = useState(0); // State to hold the hover rating

  return (
    <div className="flex mt-[7%] flex-col pl-8 pt-12 pb-52 bg-white shadow-2xl border w-[37%] h-100">
      <p className="text-[#170F49] font-bold text-lg">Service rating</p>

      {/* Star Rating */}
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= (hover || rating) ? "#FFD700" : "#E4E4E4"} // Yellow on hover or selected, gray otherwise
            className="w-8 h-8 cursor-pointer transition duration-300"
            onMouseEnter={() => {setHover(star)
                setShowError(false)
            }} // Highlight stars on hover
            onMouseLeave={() => setHover(0)} // Remove highlight on mouse leave
            onClick={() => setRating(star)} // Set the rating on click
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      {/* Error Message */}
    { showError && (
      <p className="text-red-500 mt-4 text-sm">Please select a rating before submitting.</p>
    )
    }
      {/* Submit Button */}
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
};

export default RatingComponent;
