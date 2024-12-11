import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MoodLogHistory() {
  const navigate = useNavigate();
  const { getToken, isAuthenticated } = useAuth();
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchMoodLogs = async () => {
      try {
        const token = getToken();
        const response = await axios.get('http://localhost:3001/api/mood-logs', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.data.success) {
          const sortedLogs = response.data.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setMoodLogs(sortedLogs);
        } else {
          setError("Failed to load mood logs: " + response.data.error);
        }
      } catch (error) {
        console.error('Error fetching mood logs:', error);
        setError(error.response?.data?.error || "Failed to load mood logs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMoodLogs();
  }, [isAuthenticated, navigate, getToken]);

  const moodChartData = {
    labels: moodLogs.map(log => new Date(log.timestamp).toLocaleDateString()),
    datasets: [
      {
        label: 'Mood Level',
        data: moodLogs.map(log => log.mood_level),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood History'
      }
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const moodLabels = ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'];
            return moodLabels[value - 1] || value;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="moodlog-history-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="moodlog-history-container">
        <div className="error">{error}</div>
        <button onClick={() => navigate('/moodlog')} className="return-button">
          Back to Mood Log
        </button>
      </div>
    );
  }

  return (
    <div className="moodlog-history-container">
      <div className="moodlog-history-content">
        <h1>Mood History</h1>
        
        {moodLogs.length === 0 ? (
          <div className="no-data">
            <p>No mood logs found. Start logging your mood to see your history!</p>
          </div>
        ) : (
          <>
            <div className="chart-container">
              <Line data={moodChartData} options={chartOptions} />
            </div>

            <div className="history-list">
              {moodLogs.map((log, index) => (
                <div key={index} className="history-item">
                  <div className="history-date">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </div>
                  <div className="history-details">
                    <p><strong>Mood Level:</strong> {log.mood_level}/5</p>
                    <p><strong>Notes:</strong> {log.mood_note || 'No notes'}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="button-container">
          <button onClick={() => navigate('/moodlog')} className="return-button">
            Back to Mood Log
          </button>
        </div>
      </div>
    </div>
  );
}
