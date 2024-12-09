import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { signup } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';
import Placeholder from './Placeholder.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthday: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        birthday: formData.birthday || null,
        gender: formData.gender || null
      };

      const user = await signup(userData);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred during signup');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-content'>
        <div className='login-input-container'>
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender (Optional)</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <span onClick={() => navigate('/login')} className="link">Login</span></p>
        </div>
        <div className='login-image'>
          <img src={Placeholder} alt="Sign Up" />
        </div>
      </div>
    </div>
  );
}