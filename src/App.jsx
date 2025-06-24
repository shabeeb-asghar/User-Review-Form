import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router";
import FormText from "./FormText";
import RatingSubmitMelbourne from "./RatingSubmitMelbourne";
import RatingSubmitGeelong from "./RatingSubmitGeelong";
import RatingSubmitGoldCoast from "./RatingSubmitGoldCoast";
import RatingSubmitBrisbane from "./RatingSubmitBrisbane";
import RatingSubmitSydney from "./RatingSubmitSydney";
import FeedbackDetails from "./FeedbackDetails";
import ThankYou from "./ThankYou";
import axios from "axios";

// Main component wrapper with Router
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// Content component that uses routing information
const AppContent = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Get name from query parameters
    const queryParams = new URLSearchParams(location.search);
    const nameParam = queryParams.get("name");
    setName(nameParam || "Anonymous");
  }, [location.search]);

  const handleBackButton = () => {
    setShowInput(false);
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      setShowError(true);
      return;
    } 
    
    if (rating < 4) {
      setShowInput(true);
      return;
    }
    
    // Determine location and review link based on current route
    let locationName;
    let reviewLink;
    
    // Get path from current location
    const path = location.pathname;
    
    // Set location name and review link based on path
    if (path.includes("/melb")) {
      locationName = "Melbourne";
      reviewLink = "https://g.page/r/CZEdy_Gwvth1EBM/review";
    } else if (path.includes("/geel")) {
      locationName = "Geelong";
      reviewLink = "https://g.page/r/CVfJ9k_tJyirEBM/review";
    } else if (path.includes("/bris")) {
      locationName = "Brisbane";
      reviewLink = "https://g.page/r/CW5iu21vrbo-EAE/review";
    } else if (path.includes("/gc")) {
      locationName = "Gold Coast";
      reviewLink = "https://g.page/r/CTd5_h0YNf8fEAE/review";
    } else if (path.includes("/wa")) {
      locationName = "Perth";
      reviewLink = "https://g.page/r/CUf7coiPFMDaEAE/review";
    } else {
      // Default to Sydney for root path or /syd
      locationName = "Sydney";
      reviewLink = "https://g.page/r/CaRE2y-IkZGxEBM/review";
    }
    
    // For 4 or 5 stars: submit basic feedback and redirect to review page
    const query = `
      mutation {
        create_item(
          board_id: 1950184477,
          item_name: "${name}",
          group_id: "topics",
          column_values: "${JSON.stringify({
            rating_mkkncwny: { rating: rating },
            location: { text: locationName }
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
      
      // Redirect to the appropriate review page
      window.location.href = reviewLink;
    } catch (error) {
      console.error(
        "Error submitting feedback:",
        error.response?.data || error.message
      );
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
                <Routes>
                  <Route 
                    path="/melb" 
                    element={
                      <RatingSubmitMelbourne
                        handleSubmit={handleSubmitRating}
                        rating={rating}
                        setRating={setRating}
                        setShowError={setShowError}
                        showError={showError}
                      />
                    } 
                  />
                  <Route 
                    path="/geel" 
                    element={
                      <RatingSubmitGeelong
                        handleSubmit={handleSubmitRating}
                        rating={rating}
                        setRating={setRating}
                        setShowError={setShowError}
                        showError={showError}
                      />
                    } 
                  />
                  <Route 
                    path="/bris" 
                    element={
                      <RatingSubmitBrisbane
                        handleSubmit={handleSubmitRating}
                        rating={rating}
                        setRating={setRating}
                        setShowError={setShowError}
                        showError={showError}
                      />
                    } 
                  />
                  <Route 
                    path="/gc" 
                    element={
                      <RatingSubmitGoldCoast
                        handleSubmit={handleSubmitRating}
                        rating={rating}
                        setRating={setRating}
                        setShowError={setShowError}
                        showError={showError}
                      />
                    } 
                  />
                  <Route 
                    path="/syd" 
                    element={
                      <RatingSubmitSydney
                        handleSubmit={handleSubmitRating}
                        rating={rating}
                        setRating={setRating}
                        setShowError={setShowError}
                        showError={showError}
                      />
                    } 
                  />
                  {/* Default route (homepage) */}
                  <Route 
                    path="/" 
                    element={
                      <RatingSubmitSydney
                        handleSubmit={handleSubmitRating}
                        rating={rating}
                        setRating={setRating}
                        setShowError={setShowError}
                        showError={showError}
                      />
                    } 
                  />
                </Routes>
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