import { useState } from "react";
import SubmitButton from "./SubmitButton";
import axios from "axios";

const FeedbackDetails = ({ goBack, rating, setShowThankyou, item_id }) => {
  const [error, setError] = useState(false); // State to handle error
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    additionalFeedback: "",
  }); // State to handle form inputs

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError(false); // Clear the error when any input field is clicked or updated
  };

  const Submit = async () => {
    const isEmpty = Object.values(formData).some((value) => value.trim() === "");
    if (isEmpty) {
      setError(true);
    } else {
      setError(false);
      console.log(item_id)
      const query = `mutation {
        change_multiple_column_values(
          item_id: ${item_id},
          board_id: 1950184477,
          column_values: "${JSON.stringify({
            rating_mkkncwny: { rating },
            text_mkknfy1h: formData.firstName,
            dup__of_first_name_mkknhyv5: formData.lastName,
            long_text_mkkn4xch: formData.additionalFeedback,
          }).replace(/"/g, '\\"')}"
        ) {
          id
        }
      }`;

      const body = JSON.stringify({ query });
      const headers = {
        "Content-Type": "application/json",
        Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQ0OTY4MzMxMSwiYWFpIjoxMSwidWlkIjo2Njc3ODU4NSwiaWFkIjoiMjAyNC0xMi0xOFQxNjo0MDoxMi4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MjU3MzkxOTEsInJnbiI6ImFwc2UyIn0.x3L4XHLXNML2F5ZGacTOltfNkxdzyGtYmHS9lMqBiSA",
      };

      try {
        let response = await axios.post("https://api.monday.com/v2", body, { headers });
        console.log(response)
        setShowThankyou(true);
      } catch (error) {
        console.error("Error submitting feedback:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="flex mt-[5%] flex-col py-12 pl-8 pb-46 bg-white shadow-2xl border w-[37%] h-100">
      <button
        onClick={goBack}
        className="flex items-center text-[#484558] hover:text-black transition duration-300 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 11H20a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Go Back
      </button>
      {error && (
        <p className="text-red-500 mt-2">Please fill in all fields before submitting.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          Submit();
        }}
      >
        <div className="flex w-full gap-12">
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="text-sm font-bold text-[#484558] mb-2 mt-6"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="ml-2 px-4 py-3 border-2 border-gray-300 rounded-full text-blue-700 placeholder-gray-400 
               focus:outline-none focus:border-blue-500 
               hover:border-blue-500"
              placeholder="First Name"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="lastName"
              className="text-sm font-bold text-[#484558] mb-2 mt-6"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="ml-2 px-4 py-3 border-2 border-gray-300 rounded-full text-blue-700 placeholder-gray-400 
               focus:outline-none focus:border-blue-500 
               hover:border-blue-500"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="additionalFeedback"
            className="text-sm font-bold text-[#484558] mb-2 mt-6"
          >
            Additional Feedback
          </label>
          <textarea
            rows="5"
            id="additionalFeedback"
            value={formData.additionalFeedback}
            onChange={handleChange}
            className="ml-2 w-[87%] px-4 py-3 border-2 border-gray-300 rounded-lg text-blue-700 placeholder-gray-400 
               focus:outline-none focus:border-blue-500 
               hover:border-blue-500 resize-none"
            placeholder="If you have any additional feedback, please type it in here..."
          />
        </div>
        <SubmitButton
        handleSubmit={Submit}
        />
      </form>
    </div>
  );
};

export default FeedbackDetails;