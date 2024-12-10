import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Exercises() {
    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
    };

    return (
        <div className='exercises-container'> 
            <div className='exercises-content'>
                <div className='exercises-content-box'>
                    <img src={'https://media.istockphoto.com/id/1332742273/fi/valokuva/mies-venyttelee-k%C3%A4ytt%C3%A4ess%C3%A4%C3%A4n-kannettavaa-tietokonetta-kotona.jpg?s=2048x2048&w=is&k=20&c=gpi-H1W8iLuVveskE_wgjgYgu00g5f1GFcFJ2Eq9GhM='}
                         alt="Office exercises"
                         className="exercise-image" />
                    <h2 className='exercises-content-box-text' onClick={() => navTo('/officeexercises')}> Daily office exercises </h2>
                </div>

                <div className='exercises-content-box'>
                    <img src={'https://as1.ftcdn.net/v2/jpg/01/41/86/02/1000_F_141860204_UWGjTQLGs0feOoBojJ5NLVpeJUL8TFMn.jpg'}
                         alt="Yoga exercises"
                         className="exercise-image" />
                    <h2 className='exercises-content-box-text' onClick={() => navTo('/yogaexercise')}> Yoga to clear your mind </h2>
                </div>

                <div className='exercises-content-box'>
                    <img src={'https://media.istockphoto.com/id/2158127409/fi/valokuva/push-ups.jpg?s=2048x2048&w=is&k=20&c=tRXf_r40PmiHJ9PRWKCHupZoSe4i_eFbyStBudls7xo='}
                         alt="Muscle exercises"
                         className="exercise-image" />
                    <h2 className='exercises-content-box-text' onClick={() => navTo('/muscleexercise')}> Exercise to build up muscle </h2>
                </div>

                <div className='exercises-content-box'>
                    <img src={'https://as1.ftcdn.net/v2/jpg/01/41/86/02/1000_F_141860204_UWGjTQLGs0feOoBojJ5NLVpeJUL8TFMn.jpg'}
                         alt="Log exercises"
                         className="exercise-image" />
                    <h2 className='exercises-content-box-text' onClick={() => navTo('/exerciselog')}> Log Your Exercises </h2>
                </div>
            </div>
        </div>
    );
}