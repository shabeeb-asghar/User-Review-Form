import React, { useEffect, useState } from "react";
import FormText from "./FormText";
import RatingSubmit from "./RatingSubmit";
import FeedbackDetails from "./FeedbackDetails";
import ThankYou from "./ThankYou";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const nameParam = queryParams.get("name");
    setName(nameParam || "Anonymous");
  }, []);

  const handleBackButton = () => {
    setShowInput(false);
  };

  // Helper: Convert degrees to radians.
  const deg2rad = (deg) => deg * (Math.PI / 180);

  // Helper: Haversine formula to calculate distance (in km) between two lat/lng points.
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSubmitRating = async () => {
    if (rating === 0) {
      setShowError(true);
    } else if (rating < 4) {
      setShowInput(true);
    } else {
      // For 4 or 5 stars: submit basic feedback and then determine nearest location
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

        // Use Google Geolocation API to get user's current location
        const geoApiKey = "YOUR_GOOGLE_GEOLOCATION_API_KEY";
        const geoRes = await fetch(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${geoApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // empty body
          }
        );
        const geoData = await geoRes.json();
        if (!geoData.location) {
          alert("Unable to determine your location.");
          return;
        }
        const { lat, lng } = geoData.location;

        // Define the known locations with provided coordinates
        const locations = [
          {
            name: "Easy Concrete Supply Melbourne",
            lat: -37.7965214,
            lng: 145.0262562,
          },
          {
            name: "Easy Concrete Supply Sydney",
            lat: -33.8677813,
            lng: 151.2008871,
          },
          {
            name: "Easy Concrete Supply Brisbane",
            lat: -27.4695391,
            lng: 153.0183226,
          },
          {
            name: "Easy Concrete Supply Gold Coast",
            lat: -28.0020782,
            lng: 153.4241828,
          },
          {
            name: "Easy Concrete Supply Geelong",
            lat: -38.1469362,
            lng: 144.3557738,
          },
        ];

        // Determine the nearest location using the Haversine distance.
        let nearestLocation = locations[0];
        let minDistance = getDistanceFromLatLonInKm(
          lat,
          lng,
          locations[0].lat,
          locations[0].lng
        );

        for (let i = 1; i < locations.length; i++) {
          const distance = getDistanceFromLatLonInKm(
            lat,
            lng,
            locations[i].lat,
            locations[i].lng
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestLocation = locations[i];
          }
        }

        // Construct the Google Maps URL for the nearest location.
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          nearestLocation.name
        )}&center=${nearestLocation.lat},${nearestLocation.lng}&zoom=15`;
        window.location.href = mapsUrl;
      } catch (error) {
        console.error(
          "Error submitting feedback or fetching location:",
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



