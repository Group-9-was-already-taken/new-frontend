import React, { useState, useEffect } from "react";
import Placeholder from "./Placeholder.jpg"; // Assuming this is used somewhere in your project
import { useNavigate } from "react-router-dom";

export default function MoodLogHistory() {
  // Placeholder data for mood logs
  const [moodLogs, setMoodLogs] = useState([]);

  // Simulate fetching data from a database
  useEffect(() => {
    // Placeholder for future database call
    const fetchedData = [
      { id: 1, mood: "5 - Excellent", thoughts: "Had a great day at work!" },
      { id: 2, mood: "3 - Neutral", thoughts: "Feeling okay, nothing special." },
      { id: 3, mood: "2 - Poor", thoughts: "Had a rough time today." },
    ];
    setMoodLogs(fetchedData);
  }, []);

  return (
    <div className="moodlog-history-container">
      <div className="moodlog-history-content">
        <h2>Mood Log History</h2>
        <div className="moodlog-history-box">
          {moodLogs.length > 0 ? (
            moodLogs.map((log) => (
              <div key={log.id} className="moodlog-entry">
                <h3>Mood: {log.mood}</h3>
                <p>Thoughts: {log.thoughts}</p>
              </div>
            ))
          ) : (
            <p>No mood logs available. Start logging your mood!</p>
          )}
        </div>
      </div>
    </div>
  );
}