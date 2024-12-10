import React, { useState, useEffect, useRef } from 'react'
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/auth';

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && 
                !dropdownRef.current.contains(event.target) && 
                !triggerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navTo = (path) => {
        navigate(path);
        setOpen(false); // Close dropdown after navigation
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        setOpen(false); // Close dropdown after logout
        navigate('/');
    };

    //Function for the items inside the dropdown menu
    function DropDownItem({ text, path, onClick }) {
        return (
            <li className="dropdown-item" onClick={onClick || (() => navTo(path))}>
                <button type="button" className="dropdown-link">
                    {text}
                </button>
            </li>
        )
    }

    //The header block containing the emergency button and the navigation dropdown
    return (
        <header className='header-container'>
            <div className='header-content'>
                <button 
                    className='emergency-button' 
                    onClick={() => window.open('https://mieli.fi/en/support-and-help/crisis-helpline/', '_blank')}
                > 
                    ! 
                </button>
                <h1 className='header-title' onClick={() => navTo('/')}>Mental Health Page</h1>
                <div className='dropdown-container'>
                    <div 
                        ref={triggerRef}
                        className='dropdown-trigger' 
                        onClick={() => setOpen(!open)}
                    >
                        <img src={user?.profileImage || Placeholder} alt={user ? 'Profile' : 'Menu'} />
                        {user && <span className="username">{user.username}</span>}
                    </div>
                    <div 
                        ref={dropdownRef}
                        className={`dropdown-menu ${open ? 'active' : 'inactive'}`}
                    >
                        <h3 className='dropdown-h3'>Where would you like to go next?</h3>
                        <ul>
                            {user ? (
                                <>
                                    <DropDownItem text="Dashboard" path="/dashboard" />
                                    <DropDownItem text="My Profile" path="/userinfo" />
                                    <DropDownItem text="Exercises" path="/exercises" />
                                    <DropDownItem text="About Us" path="/aboutus" />
                                    <DropDownItem text="Logout" onClick={handleLogout} />
                                </>
                            ) : (
                                <>
                                    <DropDownItem text="Login" path="/login" />
                                    <DropDownItem text="Sign Up" path="/signup" />
                                    <DropDownItem text="Exercises" path="/exercises" />
                                    <DropDownItem text="About Us" path="/aboutus" />
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}