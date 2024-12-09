import React, { useState } from "react";
import Placeholder from "./Placeholder.jpg"; // Assuming this is used somewhere in your project
import { useNavigate } from "react-router-dom";

export default function MoodLog() {
  const [selectedMood, setSelectedMood] = useState(""); // State to track the selected mood
  const [dailyThoughts, setDailyThoughts] = useState(""); // State to track the user's daily thoughts

  // Handle dropdown change
  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  // Handle input box change
  const handleThoughtsChange = (event) => {
    setDailyThoughts(event.target.value);
  };

  const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };

  return (
    <div className="moodlog-container">
      <div className="moodlog-content">
        <h2>Log your daily mood</h2>
        <div className="moodlog-info-box">
          <h1>On a scale of 1-5, how are you feeling?</h1>
          {/* Dropdown Menu */}
          <select
            value={selectedMood}
            onChange={handleMoodChange}
            className="mood-dropdown"
          >
            <option value="" disabled>
              Select your mood
            </option>
            <option value="1">1 - Very Poor</option>
            <option value="2">2 - Poor</option>
            <option value="3">3 - Neutral</option>
            <option value="4">4 - Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          {/* Display selected mood */}
          {selectedMood && (
            <p className="selected-mood">You selected: {selectedMood}</p>
          )}
        </div>
        <div className="moodlog-info-box">
          <h1>Write down your thoughts</h1>
          {/* Input Box */}
          <textarea
            value={dailyThoughts}
            onChange={handleThoughtsChange}
            className="thoughts-input"
            placeholder="Write your thoughts here..."
          ></textarea>
          {/* Display Saved Thoughts */}
          {dailyThoughts && (
            <p className="saved-thoughts">
              Your thoughts: {dailyThoughts}
            </p>
          )}
        </div>
        <div className="moodlog-button">
            <h1>Log your mood!</h1>
        </div>
        <div className="moodlog-button" onClick={() => navTo('/profile')}>
            <h1>Return to log overview</h1>
        </div>
      </div>
    </div>
  );
}