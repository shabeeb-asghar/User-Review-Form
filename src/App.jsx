import React, { useEffect, useState } from "react";
import FormText from "./FormText";
import RatingSubmit from "./RatingSubmit";
import FeedbackDetails from "./FeedbackDetails";
import ThankYou from "./ThankYou";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Get name from query parameters, keep this logic the same
    const queryParams = new URLSearchParams(window.location.search);
    const nameParam = queryParams.get("name");
    setName(nameParam || "Anonymous");
    
    // Determine location from URL path (case insensitive)
    const path = window.location.pathname.toLowerCase();
    let locationFromPath = "";
    
    if (path.includes("/bris")) {
      locationFromPath = "Brisbane";
    } else if (path.includes("/geel")) {
      locationFromPath = "Geelong";
    } else if (path.includes("/melb")) {
      locationFromPath = "Melbourne";
    } else if (path.includes("/syd")) {
      locationFromPath = "Sydney";
    } else if (path.includes("/gc")) {
      locationFromPath = "Gold Coast";
    } else if (path.includes("/aus")) {
      locationFromPath = "Aus";
    } else {
      // Default to Melbourne if no location in path
      locationFromPath = "Melbourne";
    }
    
    setLocation(locationFromPath);
  }, []);

  const handleBackButton = () => {
    setShowInput(false);
  };

  const getReviewLinkByLocation = (location) => {
    const reviewLinks = {
      "Brisbane": "https://g.page/r/CW5iu21vrbo-EAE/review",
      "Geelong": "https://g.page/r/CVfJ9k_tJyirEBM/review",
      "Melbourne": "https://g.page/r/CZEdy_Gwvth1EBM/review",
      "Sydney": "https://g.page/r/CaRE2y-IkZGxEBM/review",
      "Gold Coast": "https://g.page/r/CTd5_h0YNf8fEAE/review",
      "Aus": "https://g.page/r/CaRE2y-IkZGxEBM/review",
    };

    return reviewLinks[location] || reviewLinks["Melbourne"]; // Default to Melbourne if location not found
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      setShowError(true);
    } else if (rating < 4) {
      setShowInput(true);
    } else {
      // For 4 or 5 stars: submit basic feedback and redirect to review page
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
        
        // Get the review link based on the location determined from the URL path
        const reviewLink = getReviewLinkByLocation(location);
        
        // Redirect to the appropriate review page
        window.location.href = reviewLink;
      } catch (error) {
        console.error(
          "Error submitting feedback:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col max-w-7xl mx-auto gap-6">
          {/* On mobile: Stack vertically; on larger screens: Side-by-side layout */}
          <div className="lg:flex lg:gap-8 lg:items-start">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <FormText />
            </div>

            <div className="lg:w-1/2 w-full">
              {!showInput && !showThankYou && (
                <RatingSubmit
                  handleSubmit={handleSubmitRating}
                  rating={rating}
                  setRating={setRating}
                  setShowError={setShowError}
                  showError={showError}
                />
              )}

              {showInput && !showThankYou && (
                <FeedbackDetails
                  goBack={handleBackButton}
                  name={name}
                  rating={rating}
                  setShowThankyou={setShowThankYou}
                />
              )}

              {showThankYou && <ThankYou />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;