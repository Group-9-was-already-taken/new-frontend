import React, { useState } from "react";
import Placeholder from "./Placeholder.jpg"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function MoodLog() {
  const [selectedMood, setSelectedMood] = useState(""); 
  const [dailyThoughts, setDailyThoughts] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, getToken, isAuthenticated } = useAuth();

  // Handle dropdown change
  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  // Handle input box change
  const handleThoughtsChange = (event) => {
    setDailyThoughts(event.target.value);
  };

  const navTo = (path) => {
    navigate(path);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setError("");

    if (!isAuthenticated) {
      setError("Please log in to save your mood");
      setTimeout(() => navTo('/login'), 2000);
      return;
    }

    if (!selectedMood) {
      setError("Please select a mood level");
      return;
    }

    const token = getToken();
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setTimeout(() => navTo('/login'), 2000);
      return;
    }

    const moodData = {
      mood_level: parseInt(selectedMood),
      mood_note: dailyThoughts || ""
    };

    try {
      console.log('Sending mood data:', moodData);

      const response = await fetch('http://localhost:3001/api/mood-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(moodData)
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expired. Please log in again.');
        }
        throw new Error(data.error || data.details || 'Failed to save mood');
      }

      // Clear the form
      setSelectedMood("");
      setDailyThoughts("");
      
      // Navigate to dashboard
      navTo("/dashboard");
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message);
      
      // If unauthorized, redirect to login
      if (err.message.includes('log in') || err.message.includes('expired')) {
        setTimeout(() => navTo('/login'), 2000);
      }
    }
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
            <option value={1}>1 - Very Poor</option>
            <option value={2}>2 - Poor</option>
            <option value={3}>3 - Neutral</option>
            <option value={4}>4 - Good</option>
            <option value={5}>5 - Excellent</option>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="moodlog-button" onClick={handleClick}>
            <h1>Log your mood!</h1>
        </div>
        <div className="moodlog-button" onClick={() => navTo('/profile')}>
            <h1>Return to log overview</h1>
        </div>
      </div>
    </div>
  );
}