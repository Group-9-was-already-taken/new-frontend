import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../services/auth';
import { useAuth } from '../contexts/AuthContext';
import Placeholder from './Placeholder.jpg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const navTo = (path) => {
        navigate(path);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred during login');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-content'>
                <div className='login-input-container'>
                    <h2>Login</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <span onClick={() => navTo('/signup')} className="link">Sign up</span></p>
                </div>
                <div className='login-image'>
                    <img src={Placeholder} alt="Login" />
                </div>
            </div>
        </div>
    );
}
