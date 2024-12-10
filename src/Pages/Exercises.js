import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function ExerciseLog() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loggedExercises, setLoggedExercises] = useState([]);
  const [saveStatus, setSaveStatus] = useState(''); // For showing save status

  const exerciseBlocks = {
    "Office Exercises": ["Shoulder exercises", "Neck exercises", "Sitting fix exercises"],
    "Yoga": ["Morning Yoga", "Pilates Yoga"],
    "Muscle Building Exercises": ["Upper body exercises", "Lower body exercises"],
  };

  const handleCheckboxChange = (exercise) => {
    setLoggedExercises((prev) =>
      prev.includes(exercise)
        ? prev.filter((e) => e !== exercise) // Remove if already logged
        : [...prev, exercise] // Add if not logged
    );
  };

  const saveExerciseLog = async () => {
    if (!user) {
      setSaveStatus('Please log in to save exercises');
      return;
    }

    if (loggedExercises.length === 0) {
      setSaveStatus('Please select at least one exercise');
      return;
    }

    try {
      setSaveStatus('Saving...');
      const response = await fetch('http://localhost:3001/api/exercises/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          exercises: loggedExercises,
          date: new Date().toISOString()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSaveStatus('Exercises logged successfully!');
        setLoggedExercises([]); // Clear the form
        setTimeout(() => {
          navigate('/profile'); // Navigate after successful save
        }, 1500);
      } else {
        setSaveStatus(data.error || 'Failed to save exercises');
      }
    } catch (error) {
      console.error('Save exercise error:', error);
      setSaveStatus('Error saving exercises. Please try again.');
    }
  };

  return (
    <div className="moodlog-container">
      <div className="moodlog-content">
        <h1>Exercise Log</h1>
        {Object.entries(exerciseBlocks).map(([blockName, exercises]) => (
          <div key={blockName} className="exercise-block">
            <h2>{blockName}</h2>
            {exercises.map((exercise) => (
              <label key={exercise} className="exercise-label">
                <input
                  type="checkbox"
                  value={exercise}
                  onChange={() => handleCheckboxChange(exercise)}
                  checked={loggedExercises.includes(exercise)}
                />
                {exercise}
              </label>
            ))}
          </div>
        ))}
        
        {saveStatus && (
          <div className={`save-status ${saveStatus.includes('success') ? 'success' : 'error'}`}>
            {saveStatus}
          </div>
        )}

        <div className="moodlog-button" onClick={saveExerciseLog}>
          <h1>Save Exercise Log</h1>
        </div>

        <div className="moodlog-button" onClick={() => navigate('/profile')}>
          <h1>Return to Profile</h1>
        </div>
      </div>
    </div>
  );
}