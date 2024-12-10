import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import '../styles/UserInfo.css';

export default function UserInfo() {
    const navigate = useNavigate();
    const { getToken, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const token = getToken();
            if (!token) {
                setError('Please log in to view your profile');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            const response = await fetch('http://localhost:3001/api/auth/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                throw new Error('Please log in to view your profile');
            }

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch user information');
            }

            if (!data.success || !data.user) {
                throw new Error('No user data received');
            }

            setUserInfo(data.user);
        } catch (err) {
            console.error('Error fetching user info:', err);
            setError(err.message);
            if (err.message.includes('log in') || err.message.includes('token')) {
                setTimeout(() => navigate('/login'), 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (err) {
            setError('Failed to log out');
        }
    };

    if (loading) {
        return (
            <div className='userinfo-container'>
                <div className='userinfo-content'>
                    <h2>Loading your profile...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='userinfo-container'>
                <div className='userinfo-content'>
                    <h2>Error</h2>
                    <p className="error-message">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='userinfo-container'>
            <div className='userinfo-content'>
                <h2>Your Profile</h2>
                {userInfo && (
                    <>
                        <div className='userinfo-content-box'>
                            <h1>Username</h1>
                            <p>{userInfo.username}</p>
                        </div>
                        <div className='userinfo-content-box'>
                            <h1>Email</h1>
                            <p>{userInfo.email}</p>
                        </div>
                        {userInfo.name && (
                            <div className='userinfo-content-box'>
                                <h1>Name</h1>
                                <p>{userInfo.name}</p>
                            </div>
                        )}
                        {userInfo.birthday && (
                            <div className='userinfo-content-box'>
                                <h1>Birthday</h1>
                                <p>{new Date(userInfo.birthday).toLocaleDateString()}</p>
                            </div>
                        )}
                        {userInfo.gender && (
                            <div className='userinfo-content-box'>
                                <h1>Gender</h1>
                                <p>{userInfo.gender}</p>
                            </div>
                        )}
                    </>
                )}
                <div className='userinfo-content-box clickable' onClick={() => navigate('/profile')}>
                    <h1>View Activity Logs</h1>
                </div>
                <div className='userinfo-content-box clickable' onClick={handleLogout}>
                    <h1>Log Out</h1>
                </div>
            </div>
        </div>
    );
}