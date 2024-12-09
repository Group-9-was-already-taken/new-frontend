import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navTo = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome, {user?.username || 'User'}!</h1>
        
        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => navTo('/moodlog')}>
            <h2>Log Mood</h2>
            <p>Track your daily mood and feelings</p>
          </div>

          <div className="dashboard-card" onClick={() => navTo('/exercises')}>
            <h2>Exercises</h2>
            <p>View recommended exercises</p>
          </div>

          <div className="dashboard-card" onClick={() => navTo('/moodloghistory')}>
            <h2>Mood History</h2>
            <p>View your mood tracking history</p>
          </div>

          <div className="dashboard-card" onClick={() => navTo('/profile')}>
            <h2>Profile</h2>
            <p>Manage your account settings</p>
          </div>
        </div>

        <div className="dashboard-quick-actions">
          <button className="emergency-button" onClick={() => navTo('/emergency')}>
            Emergency Support
          </button>
        </div>
      </div>
    </div>
  );
}
