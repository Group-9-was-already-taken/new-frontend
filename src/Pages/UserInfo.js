import React, {useState} from 'react';
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";

export default function UserInfo() {

    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };

    return(
    <div className='userinfo-container'>
        <div className='userinfo-content'>
            <h2>Your Profile!</h2>
            <div className='userinfo-content-box'>
                <h1> Username here </h1>
            </div>
            <div className='userinfo-content-box'>
                <h1> Email here </h1>
            </div>
            <div className='userinfo-content-box'>
                <h1 onClick={() => navTo('/profile')}> Go to your activity logs </h1>
            </div>
            <div className='userinfo-content-box'>
                <h1> Log out of this account </h1>
            </div>
        </div>
    </div>
    )

}