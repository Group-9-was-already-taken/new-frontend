import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
    };

    return (
        <footer className='footer-container'>
            <div className='footer-content'>
                <div className='footer-logo'>
                    <img src='' alt="Logo" />
                </div>
                <h2 className='footer-h2'> Address </h2>
                <h2 className='footer-h2' onClick={() => navTo('/aboutus')}> About Us </h2>
                <h2 className='footer-h2' onClick={() => navTo('/privacy')}> Privacy Policy </h2>
            </div>
        </footer>
    );
}