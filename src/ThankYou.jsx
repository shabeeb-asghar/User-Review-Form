import React from "react";
import ThankYouImage from "./assets/Thankyou.png";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white shadow-lg rounded-3xl border border-gray-100 w-full text-center">
      <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
        <img src={ThankYouImage} alt="Thank You" />
      </div>
      
      <h2 className="text-xl sm:text-2xl w-2/3 font-semibold text-gray-800 mb-2 sm:mb-4">Thank you! Your submission has been received!</h2>
      
      <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
        Your feedback has been submitted successfully. We appreciate your time and input!
      </p>
      
      <a 
        href="/" 
        className="mt-6 py-5 w-[40%] bg-[#4A3AFF] text-white rounded-full shadow-xl shadow-[#4A3AFF42] hover:bg-blue-600 text-sm font-semibold transition duration-300"
      >
        Back to Home
      </a>
    </div>
  );
};

export default ThankYou;