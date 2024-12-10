import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

export default function MoodLogHistory() {
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getToken, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchMoodLogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/mood-logs', {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch mood logs');
        }

        const data = await response.json();
        if (data.success) {
          // Sort logs by timestamp, most recent first
          const sortedLogs = data.data.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
          );
          setMoodLogs(sortedLogs);
        } else {
          throw new Error(data.error || 'Failed to fetch mood logs');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodLogs();
  }, [isAuthenticated, getToken, navigate]);

  const getMoodLabel = (level) => {
    const labels = {
      1: 'Very Poor',
      2: 'Poor',
      3: 'Neutral',
      4: 'Good',
      5: 'Excellent'
    };
    return `${level} - ${labels[level]}`;
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
      <div className="moodlog-history-container">
        <div>Loading your mood history...</div>
      </div>
    );
  }

  return (
    <div className="moodlog-history-container">
      <div className="moodlog-history-content">
        <h2>Your Mood History</h2>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <div className="moodlog-history-box">
          {moodLogs.length > 0 ? (
            moodLogs.map((log) => (
              <div 
                key={log.log_id} 
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '15px',
                  backgroundColor: '#fff'
                }}
              >
                <div style={{ marginBottom: '10px' }}>
                  <h3>Mood: {getMoodLabel(log.mood_level)}</h3>
                  <span style={{ color: '#666' }}>
                    {formatDate(log.timestamp)}
                  </span>
                </div>
                {log.mood_note && (
                  <div style={{ marginTop: '10px' }}>
                    <p>Thoughts: {log.mood_note}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>No mood logs available. Start tracking your mood!</p>
              <button 
                onClick={() => navigate('/moodlog')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Log Your First Mood
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}