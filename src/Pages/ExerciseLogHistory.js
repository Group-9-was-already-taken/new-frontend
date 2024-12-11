import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ExerciseLogHistory() {
  const [exerciseLogs, setExerciseLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExerciseLogs();
  }, []);

  const fetchExerciseLogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/exercises/history', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exercise logs');
      }

      const data = await response.json();
      
      // Sort logs by date, most recent first
      const sortedLogs = data.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      
      setExerciseLogs(sortedLogs);
    } catch (err) {
      setError('Failed to load exercise history');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="moodlog-container">
        <div className="moodlog-content">
          <h1>Loading exercise history...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="moodlog-container">
        <div className="moodlog-content">
          <h1>Error</h1>
          <p>{error}</p>
          <div className="moodlog-button" onClick={() => navigate('/dashboard')}>
            <h1>Return to Dashboard</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="moodlog-container">
      <div className="moodlog-content">
        <h1>Exercise History</h1>
        
        {exerciseLogs.length === 0 ? (
          <p>No exercise logs found. Start logging your exercises!</p>
        ) : (
          <div className="history-list">
            {exerciseLogs.map((log, index) => (
              <div key={index} className="history-item">
                <h3>{formatDate(log.date)}</h3>
                <div className="exercise-list">
                  {log.exercises.map((exercise, i) => (
                    <div key={i} className="exercise-item">
                      • {exercise}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="moodlog-button" onClick={() => navigate('/exerciselog')}>
          <h1>Log New Exercise</h1>
        </div>

        <div className="moodlog-button" onClick={() => navigate('/dashboard')}>
          <h1>Return to Dashboard</h1>
        </div>
      </div>
    </div>
  );
}