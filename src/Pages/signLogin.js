import React from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/signLogin.css';

const SignLogin = () => {
  const navigate = useNavigate();

  const navTo = (path) => {
    navigate(path);
  };

  return (
    <div className="sign-login-container">
      <div className="auth-options">
        <div className="auth-card">
          <h2>Sign Up</h2>
          <p>Create a new account to start tracking your mental wellness journey</p>
          <button onClick={() => navTo('/signup')}>Sign Up</button>
        </div>

        <div className="auth-card">
          <h2>Login</h2>
          <p>Already have an account? Sign in to continue your progress</p>
          <button onClick={() => navTo('/login')}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default SignLogin;