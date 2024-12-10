import React, { useState, useEffect } from "react";
import Placeholder from "./Placeholder.jpg"; // Placeholder not used here
import { useNavigate } from "react-router-dom";

export default function ExerciseLog() {

    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };
  const [exerciseLogs, setExerciseLogs] = useState([]);

  // Simulate fetching data from a database
  useEffect(() => {
    // Placeholder data simulating a database response
    const fetchedData = [
      {
        id: 1,
        date: "2024-12-04",
        exercises: ["Shoulder exercises", "Morning Yoga", "Lower body exercises"],
      },
      {
        id: 2,
        date: "2024-12-03",
        exercises: ["Neck exercises", "Pilates Yoga", "Upper body exercises"],
      },
    ];
    setExerciseLogs(fetchedData);
  }, []);

  return (
    <div className="moodlog-container">
      <div className="moodlog-content">
        <h1>Exercise Log</h1>
        <div className="exercise-log-blocks">
          {exerciseLogs.length > 0 ? (
            exerciseLogs.map((log) => (
              <div key={log.id} className="log-block">
                <h2>Date: {log.date}</h2>
                <ul>
                  {log.exercises.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No exercise logs available.</p>
          )}
        </div>
        <div className="moodlog-button">
            <h1>Log your exercises</h1>
        </div>
        <div className="moodlog-button" onClick={() => navTo('/profile')}>
            <h1>Return to profile</h1>
        </div>
      </div>
    </div>
  );
}