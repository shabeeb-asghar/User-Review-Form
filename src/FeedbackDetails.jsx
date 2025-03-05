import React, { useState } from "react";
import axios from "axios";
import SubmitButton from "./SubmitButton";

const FeedbackDetails = ({ goBack, rating, setShowThankyou, name }) => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    additionalFeedback: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(false);
  };

  const Submit = async () => {
    const isEmpty = Object.values(formData).some(
      (value) => value.trim() === ""
    );
    if (isEmpty) {
      setError(true);
    } else {
      setError(false);

      const query = `
        mutation {
          create_item(
            board_id: 1950184477,
            item_name: "${name}",
            group_id: "topics",
            column_values: "${JSON.stringify({
              rating_mkkncwny: { rating: rating },
              text_mkknfy1h: formData.firstName,
              dup__of_first_name_mkknhyv5: formData.lastName,
              long_text_mkkn4xch: formData.additionalFeedback,
            }).replace(/"/g, '\\"')}"
          ) {
            id
          }
        }
      `;

      const body = JSON.stringify({ query });
      const headers = {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0OTY4MzMxMSwiYWFpIjoxMSwidWlkIjo2Njc3ODU4NSwiaWFkIjoiMjAyNC0xMi0xOFQxNjo0MDoxMi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU3MzkxOTEsInJnbiI6ImFwc2UyIn0.x3L4XHLXNML2F5ZGacTOltfNkxdzyGtYmHS9lMqBiSA",
      };

      try {
        await axios.post("https://api.monday.com/v2", body, {
          headers,
        });
        setShowThankyou(true);
      } catch (error) {
        console.error(
          "Error submitting feedback:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="flex flex-col p-6 sm:p-8 bg-white shadow-lg rounded-2xl border border-gray-100 w-full mt-16">
      <button
        onClick={goBack}
        className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200 font-medium mb-4 sm:mb-6 text-sm sm:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 11H20a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Rating
      </button>

      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Tell us more
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-xs sm:text-sm">
          Please fill in all fields before submitting.
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="px-3 rounded-full py-2 sm:px-4 sm:py-3 border border-gray-300 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base"
              placeholder="Your first name"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="px-3 rounded-full py-2 sm:px-4 sm:py-3 border border-gray-300 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                 hover:border-gray-400 transition-all duration-200 text-sm sm:text-base"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div className="flex flex-col mb-4 sm:mb-6">
          <label
            htmlFor="additionalFeedback"
            className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
          >
            Additional Feedback
          </label>
          <textarea
            rows="4"
            id="additionalFeedback"
            value={formData.additionalFeedback}
            onChange={handleChange}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
               hover:border-gray-400 transition-all duration-200 resize-none text-sm sm:text-base"
            placeholder="If you have any additional feedback, please share it here..."
          />
        </div>

        <SubmitButton handleSubmit={Submit} />
      </form>
    </div>
  );
};

export default FeedbackDetails;














// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SubmitButton from "./SubmitButton";

// const FeedbackDetails = ({ goBack, rating, setShowThankyou, name }) => {
//   const [error, setError] = useState(false);
//   const [mapsOpened, setMapsOpened] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     additionalFeedback: "",
//   });

//   // This function opens a blank window immediately to avoid popup blockers,
//   // then requests geolocation and sets the window's location.
//   const handleHighRating = () => {
//     const newWindow = window.open("", "_blank");
//     if (!newWindow) {
//       alert("Popup blocked! Please allow popups for this site.");
//       return;
//     }
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Easy+Concrete+Supply&center=${latitude},${longitude}&zoom=15`;
//           newWindow.location.href = mapsUrl;
//         },
//         (error) => {
//           alert("Location access denied or unavailable. Redirecting to default search.");
//           newWindow.location.href = "https://www.google.com/maps/search/?api=1&query=Easy+Concrete+Supply";
//         }
//       );
//     } else {
//       newWindow.location.href = "https://www.google.com/maps/search/?api=1&query=Easy+Concrete+Supply";
//     }
//   };

//   // Trigger the high-rating logic only once when rating is 4 or 5.
//   useEffect(() => {
//     if (rating >= 4 && !mapsOpened) {
//       setMapsOpened(true);
//       handleHighRating();
//     }
//   }, [rating, mapsOpened]);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//     setError(false);
//   };

//   const Submit = async () => {
//     const isEmpty = Object.values(formData).some(
//       (value) => value.trim() === ""
//     );
//     if (isEmpty) {
//       setError(true);
//     } else {
//       setError(false);

//       const query = `
//         mutation {
//           create_item(
//             board_id: 1950184477,
//             item_name: "${name}",
//             group_id: "topics",
//             column_values: "${JSON.stringify({
//               rating_mkkncwny: { rating: rating },
//               text_mkknfy1h: formData.firstName,
//               dup__of_first_name_mkknhyv5: formData.lastName,
//               long_text_mkkn4xch: formData.additionalFeedback,
//             }).replace(/"/g, '\\"')}"
//           ) {
//             id
//           }
//         }
//       `;

//       const body = JSON.stringify({ query });
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization:
//           "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0OTY4MzMxMSwiYWFpIjoxMSwidWlkIjo2Njc3ODU4NSwiaWFkIjoiMjAyNC0xMi0xOFQxNjo0MDoxMi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU3MzkxOTEsInJnbiI6ImFwc2UyIn0.x3L4XHLXNML2F5ZGacTOltfNkxdzyGtYmHS9lMqBiSA",
//       };

//       try {
//         await axios.post("https://api.monday.com/v2", body, { headers });
//         setShowThankyou(true);
//       } catch (error) {
//         console.error(
//           "Error submitting feedback:",
//           error.response?.data || error.message
//         );
//       }
//     }
//   };

//   // For ratings 4 or 5, display a simple message while redirection is in progress.
//   if (rating >= 4) {
//     return (
//       <div className="flex flex-col p-6 sm:p-8 bg-white shadow-lg rounded-2xl border border-gray-100 w-full mt-16">
//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
//           Redirecting to Google Maps...
//         </h2>
//       </div>
//     );
//   }

//   // Render the feedback form for ratings 1-3.
//   return (
//     <div className="flex flex-col p-6 sm:p-8 bg-white shadow-lg rounded-2xl border border-gray-100 w-full mt-16">
//       <button
//         onClick={goBack}
//         className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200 font-medium mb-4 sm:mb-6 text-sm sm:text-base"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//           className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
//         >
//           <path
//             fillRule="evenodd"
//             d="M9.707 16.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 11H20a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
//             clipRule="evenodd"
//           />
//         </svg>
//         Back to Rating
//       </button>

//       <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
//         Tell us more
//       </h2>

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-6 text-xs sm:text-sm">
//           Please fill in all fields before submitting.
//         </div>
//       )}

//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
//           <div className="flex flex-col">
//             <label
//               htmlFor="firstName"
//               className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//             >
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="px-3 rounded-full py-2 sm:px-4 sm:py-3 border border-gray-300 text-gray-800 placeholder-gray-400 
//                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
//                  hover:border-gray-400 transition-all duration-200 text-sm sm:text-base"
//               placeholder="Your first name"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="lastName"
//               className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//             >
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="px-3 rounded-full py-2 sm:px-4 sm:py-3 border border-gray-300 text-gray-800 placeholder-gray-400 
//                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
//                  hover:border-gray-400 transition-all duration-200 text-sm sm:text-base"
//               placeholder="Your last name"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col mb-4 sm:mb-6">
//           <label
//             htmlFor="additionalFeedback"
//             className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
//           >
//             Additional Feedback
//           </label>
//           <textarea
//             rows="4"
//             id="additionalFeedback"
//             value={formData.additionalFeedback}
//             onChange={handleChange}
//             className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 
//                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
//                hover:border-gray-400 transition-all duration-200 resize-none text-sm sm:text-base"
//             placeholder="If you have any additional feedback, please share it here..."
//           />
//         </div>

//         <SubmitButton handleSubmit={Submit} />
//       </form>
//     </div>
//   );
// };

// export default FeedbackDetails;
