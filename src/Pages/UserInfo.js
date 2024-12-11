import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import '../styles/UserInfo.css';

const UserInfo = () => {
  const navigate = useNavigate();
  const { getToken, isAuthenticated, logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }

        const token = getToken();
        if (!token) {
          setError('No authentication token found');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3001/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response from backend:', response.data);

        if (response.data) {
          setUserInfo(response.data);
          console.log('User info set to:', response.data);
          setError("");
        } else {
          throw new Error('Failed to load user information');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        
        if (error.response) {
          if (error.response.status === 401) {
            setError('Session expired. Please login again.');
            await logout();
            navigate('/login');
          } else {
            setError(error.response.data.error || 'Failed to load user information');
          }
        } else if (error.request) {
          setError('Network error. Please check your connection.');
        } else {
          setError(error.message || 'An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [isAuthenticated, navigate, getToken, logout]); // Dependencies for the effect

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="userinfo-container">
        <div className="userinfo-content">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="userinfo-container">
        <div className="userinfo-content">
          <h2>Error</h2>
          <p className="error-message">{error}</p>
          <button onClick={() => navigate('/login')} className="button">
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="userinfo-container">
      <div className="userinfo-content">
        <h2>Your Profile</h2>
        {userInfo && (
          <div className="info-section">
            <div className="userinfo-content-box">
              <h3>Personal Information</h3>
              <div className="info-item">
                <label>Username:</label>
                <p>{userInfo.username}</p>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <p>{userInfo.email}</p>
              </div>
              <div className="info-item">
                <label>Full Name:</label>
                <p>{userInfo.name || 'Not set'}</p>
              </div>
              <div className="info-item">
                <label>Gender:</label>
                <p>{userInfo.gender || 'Not set'}</p>
              </div>
              <div className="info-item">
                <label>Birthday:</label>
                <p>{userInfo.birthday ? formatDate(userInfo.birthday) : 'Not set'}</p>
              </div>
            </div>

            <div className="userinfo-content-box">
              <h3>Account Actions</h3>
              <div className="action-buttons">
                <button 
                  className="action-button"
                  onClick={() => navigate('/profile')}
                >
                  View Activity Logs
                </button>
                <button 
                  className="action-button"
                  onClick={async () => {
                    await logout();
                    navigate('/login');
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;