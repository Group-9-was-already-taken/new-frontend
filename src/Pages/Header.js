import React, { useState } from 'react'
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../services/auth';

export default function Header() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [open, setOpen] = useState(false);

    const navTo = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        setUser(null);
        navigate('/');
    };

    //Function for the items inside the dropdown menu
    function DropDownItem({ text, path, onClick }) {
        return (
            <li className="dropdown-item" onClick={onClick || (() => navTo(path))}>
                <a>{text}</a>
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
                    <div className='dropdown-trigger' onClick={() => { setOpen(!open) }}>
                        <img src={user?.profileImage || Placeholder} alt={user ? 'Profile' : 'Menu'} />
                        {user && <span className="username">{user.username}</span>}
                    </div>
                    <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
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