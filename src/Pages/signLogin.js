import React, {useState} from 'react';
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";

export default function SignLogin() {

    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };

    return (

        <div className='sign-log-container'>
            <div className='sign-log-content'>
                <div className='sign-log-content-box'>
                    <div className='sign-log-buttons'>
                    <h2 onClick={() => navTo('/login')}>Log in</h2>
                    </div>
                    <div className='sign-log-buttons'>
                    <h2 onClick={() => navTo('/signup')}>Sign Up</h2>
                    </div>
                </div>
            </div>
        </div>

    )

}