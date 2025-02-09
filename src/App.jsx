import React, { useEffect, useState } from "react";
import FormText from "./FormText";
import RatingSubmit from "./RatingSubmit";
import FeedbackDetails from "./FeedbackDetails";
import ThankYou from "./ThankYou";
import axios from "axios";

const App = () => {
  const [name, setName] = useState(0);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get("name");
    console.log(name);
    setName(name);
  }, []);
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [showerror, setShowError] = useState(false);
  const [showThanyou, setShowThankyou] = useState(false);
  console.log(rating);
  const handleBackButton = () => {
    setShowInput(false);
  };
  const handleSubmitRating = async () => {
    if (rating === 0) {
      setShowError(true);
    } else if (rating < 4) {
      setShowInput(true);
    } else {
      const query = `
      mutation {
        create_item(
          board_id: 1950184477,
          item_name: "${name}",
          group_id: "topics",
          column_values: "${JSON.stringify({
            rating_mkkncwny: { rating: rating },
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
        await axios.post("https://api.monday.com/v2", body, { headers });
      } catch (error) {
        console.error(
          "Error submitting feedback:",
          error.response?.data || error.message
        );
      }
      window.location.href = "https://g.page/r/CZEdy_Gwvth1EAI/review";
    }
  };
  return (
    <>
      <div className="flex">
        <FormText />
        {!showInput && (
          <RatingSubmit
            handleSubmit={handleSubmitRating}
            rating={rating}
            setRating={setRating}
            setShowError={setShowError}
            showError={showerror}
          />
        )}
        {showInput && !showThanyou && (
          <FeedbackDetails
            goBack={handleBackButton}
            name={name}
            rating={rating}
            setShowThankyou={setShowThankyou}
          />
        )}
        {showThanyou && <ThankYou />}
      </div>
    </>
  );
};

export default App;
