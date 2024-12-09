import React, {useState} from 'react';
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };


    return(
        <div className='profile-container'>
            <div className='profile-content'>
                <div className='profile-content-box'>
                    <div className='profile-content-title-container'>
                        <h1> Daily mood tracker </h1>
                    </div>
                    <div className='profile-content-box-menu'> 
                        <div className='time-log-container'>
                            <div className='profile-date'>
                                <h3>Current Time</h3>
                            </div>
                            <div className='profile-if-logged' onClick={() => navTo('/moodlog')}>
                                <h3>Click here to log mood</h3>
                            </div>
                        </div>
                        <div className='profile-log-history-button' onClick={() => navTo('/moodloghistory')} >
                            <h2> Click here to show log history</h2>
                        </div>
                    </div>
                </div>
                <div className='profile-content-box'>
                    <div className='profile-content-title-container'>
                    <h1> Daily Exercises</h1>
                    </div>
                    <div className='profile-content-box-menu'> 
                        <div className='time-log-container'>
                            <div className='profile-date'>
                                <h3>Check Exercises</h3>
                            </div>
                            <div className='profile-if-logged'>
                                 <h3>Not Logged</h3>
                            </div>
                        </div>
                        <div className='profile-log-history-button'>
                            <h2> Click here to show log history</h2>
                        </div>
                    </div>
                </div>
                <div className='profile-content-box'>
                    <div className='profile-content-title-container'>
                        <h1> Daily Exercises</h1>
                    </div>
                    <div className='profile-content-box-menu'> 
                        <div className='time-log-container'>
                            <div className='profile-date'>
                                <h3></h3>
                            </div>
                            <div className='profile-if-logged'>
                                <h3></h3>
                            </div>
                        </div>
                        <div className='profile-log-history-button'>
                            <h2> Click here to show log history</h2>
                        </div>
                    </div>
                </div>
                <div className='profile-content-box-user'>
                     <div className='go-to-user-info' onClick={() => navTo('/userinfo')} >
                        <h2>Go to your profile info!</h2>
                     </div>
                </div>
            </div>
        </div>
    )

}